/**
 * verify-seo.mjs — fails the build if a generated page is missing metadata,
 * schema, an H1, or a sitemap entry. Run after `npm run build`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { CATEGORIES, TOOLS } from '../js/tools.js';
import { SITE_URL, TOOL_SEO, CATEGORY_SEO, GROUP_SEO, PAGE_SEO, ROOT_SEO, toolKey, toolUrl } from '../js/data/seo.js';

const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const errors = [];
const fail = (message) => errors.push(message);

const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const unescape = (value) => String(value)
  .replace(/&#39;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&');

const pages = [];

for (const tool of TOOLS) {
  const seo = TOOL_SEO[toolKey(tool.group, tool.id)];
  const key = toolKey(tool.group, tool.id);
  if (!seo) { fail(`missing SEO entry: ${key}`); continue; }
  const file = `${seo.slug}.html`;
  if (!fs.existsSync(path.join(ROOT, file))) { fail(`missing page: ${file}`); continue; }
  pages.push({ kind: 'tool', file, seo, tool });
}

for (const category of CATEGORIES) {
  const seo = CATEGORY_SEO[category.id];
  if (!seo) { fail(`missing category SEO: ${category.id}`); continue; }
  const file = `${seo.slug}.html`;
  if (!fs.existsSync(path.join(ROOT, file))) { fail(`missing page: ${file}`); continue; }
  pages.push({ kind: 'category', file, seo, category });
}

for (const [group, seo] of Object.entries(GROUP_SEO)) {
  const file = `${seo.slug}.html`;
  if (!fs.existsSync(path.join(ROOT, file))) { fail(`missing page: ${file}`); continue; }
  pages.push({ kind: 'group', file, seo, group });
}

for (const [page, seo] of Object.entries(PAGE_SEO)) {
  const file = `${seo.slug}.html`;
  if (!fs.existsSync(path.join(ROOT, file))) { fail(`missing page: ${file}`); continue; }
  pages.push({ kind: page, file, seo, page });
}

const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();
const schemas = [];

for (const page of pages) {
  const html = read(page.file);
  if (html.includes('${')) fail(`${page.file}: unresolved template placeholder`);

  const title = unescape((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
  const description = unescape((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const canonical = unescape((html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '');
  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => match[1]);

  if (title !== page.seo.title) fail(`${page.file}: title mismatch`);
  if (description !== page.seo.description) fail(`${page.file}: description mismatch`);
  if (canonical !== `${SITE_URL}/${page.seo.slug}`) fail(`${page.file}: canonical mismatch (${canonical})`);
  if (h1Count !== 1) fail(`${page.file}: expected 1 H1, found ${h1Count}`);
  if (!html.includes('class="site-header"')) fail(`${page.file}: missing site header`);
  if (!html.includes('https://fatahtech.com/tools/freebies')) fail(`${page.file}: missing FatahTech suite link`);
  if (!html.includes('data-static')) fail(`${page.file}: missing data-static`);
  if (page.kind === 'tool' && !html.includes(`data-boot="/${page.tool.group}/${page.tool.id}"`)) {
    fail(`${page.file}: missing calculator boot hook`);
  }
  if (page.kind === 'tool' && !html.includes(`href="/#/${page.tool.group}/${page.tool.id}"`)) {
    fail(`${page.file}: missing app fallback link`);
  }

  if (description.length < 120 || description.length > 200) {
    fail(`${page.file}: meta description length ${description.length}`);
  }
  if (titles.has(title)) fail(`duplicate title: ${page.file} and ${titles.get(title)}`);
  titles.set(title, page.file);
  if (descriptions.has(description)) fail(`duplicate description: ${page.file} and ${descriptions.get(description)}`);
  descriptions.set(description, page.file);
  if (canonicals.has(canonical)) fail(`duplicate canonical: ${page.file} and ${canonicals.get(canonical)}`);
  canonicals.set(canonical, page.file);

  const parsed = blocks.map((block, index) => {
    try {
      return JSON.parse(block);
    } catch (error) {
      fail(`${page.file}: JSON-LD block ${index + 1} does not parse (${error.message})`);
      return null;
    }
  }).filter(Boolean);
  schemas.push(...parsed);

  const nodes = parsed.flatMap((block) => block['@graph'] || [block]);
  const types = new Set(nodes.map((node) => node['@type']).filter(Boolean));
  if (!types.has('Organization')) fail(`${page.file}: missing Organization schema`);
  if (!types.has('BreadcrumbList')) fail(`${page.file}: missing BreadcrumbList schema`);

  if (page.kind === 'tool') {
    if (!types.has('ItemPage')) fail(`${page.file}: missing ItemPage schema`);
    if (!types.has('WebApplication')) fail(`${page.file}: missing WebApplication schema`);
    if (!types.has('FAQPage')) fail(`${page.file}: missing FAQPage schema`);
    const app = nodes.find((node) => node['@type'] === 'WebApplication');
    if (app) {
      if (app.name !== `${page.seo.title.split(' — ')[0]}` && !app.name) fail(`${page.file}: WebApplication name missing`);
      if (app.offers?.price !== '0' || app.offers?.priceCurrency !== 'USD') fail(`${page.file}: WebApplication offer is not free`);
      if (app.isAccessibleForFree !== true) fail(`${page.file}: WebApplication isAccessibleForFree not true`);
      if (app.publisher?.['@id'] !== 'https://fatahtech.com/#organization') fail(`${page.file}: WebApplication publisher @id missing`);
      if (app.applicationCategory !== 'UtilitiesApplication') fail(`${page.file}: WebApplication category mismatch`);
    }
    const faq = nodes.find((node) => node['@type'] === 'FAQPage');
    if (!faq?.mainEntity?.length) fail(`${page.file}: empty FAQPage`);
  }

  if (page.kind === 'category' || page.kind === 'group') {
    if (!types.has('CollectionPage')) fail(`${page.file}: missing CollectionPage schema`);
    if (!types.has('FAQPage')) fail(`${page.file}: missing FAQPage schema`);
  }

  if (page.kind === 'faq' && !types.has('FAQPage')) fail(`${page.file}: missing FAQPage schema`);
  if (page.kind === 'about' && !types.has('AboutPage')) fail(`${page.file}: missing AboutPage schema`);
}

/* ---------- sitemap and crawl files ---------- */
const sitemap = read('sitemap.xml');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (!locs.includes(`${SITE_URL}/`)) fail('sitemap: missing home URL');
for (const page of pages) {
  const expected = `${SITE_URL}/${page.seo.slug}`;
  if (!locs.includes(expected)) fail(`sitemap: missing ${expected}`);
}
const expectedCount = pages.length + 1;
if (locs.length !== expectedCount) fail(`sitemap: expected ${expectedCount} URLs, found ${locs.length}`);

const robots = read('robots.txt');
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) fail('robots.txt: missing sitemap');
for (const bot of ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) {
  if (!robots.includes(`User-agent: ${bot}`)) fail(`robots.txt: missing allow rule for ${bot}`);
}

/* ---------- root document ---------- */
const index = read('index.html');
const rootTitle = unescape((index.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
if (rootTitle !== ROOT_SEO.title) fail('index.html: root title mismatch');
if (!index.includes(`<link rel="canonical" href="${SITE_URL}/">`)) fail('index.html: root canonical missing');
if (!index.includes('https://calc.fatahtech.com/Assets/og/fatahcalc-pro-og.png')) fail('index.html: OG image missing');
if (!index.includes('"@type": "WebApplication"')) fail('index.html: WebApplication schema missing');
if (!index.includes('"@type": "FAQPage"')) fail('index.html: FAQPage schema missing');
if (!index.includes('Part of FatahTech Suite')) fail('index.html: suite backlink missing');
for (const q of ['Is FatahCalc Pro completely free to use?', 'Can I install FatahCalc Pro as an offline PWA app?', 'Are my calculations private?']) {
  if (!index.includes(q)) fail(`index.html: missing FAQ question “${q}”`);
}
if (ROOT_SEO.description.length < 150 || ROOT_SEO.description.length > 160) {
  fail(`root description length ${ROOT_SEO.description.length}`);
}

/* ---------- data lengths and duplicates ---------- */
for (const [key, seo] of Object.entries({ ...TOOL_SEO, ...CATEGORY_SEO, ...GROUP_SEO, ...PAGE_SEO, root: ROOT_SEO })) {
  if (seo.description.length < 150 || seo.description.length > 160) {
    fail(`${key}: description is ${seo.description.length} chars (needs 150–160)`);
  }
  if (seo.title.length > 73) fail(`${key}: title is ${seo.title.length} chars`);
}

/* ---------- internal clean links ---------- */
const valid = new Set(['/', ...pages.map((page) => `/${page.seo.slug}`)]);
const assetPrefixes = ['/css/', '/js/', '/Assets/', '/manifest.json', '/sitemap.xml', '/robots.txt', '/#/'];
for (const page of pages) {
  const html = read(page.file);
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (href === '/') continue;
    if (assetPrefixes.some((prefix) => href.startsWith(prefix))) continue;
    if (!valid.has(href)) fail(`${page.file}: clean link points to missing page ${href}`);
  }
}

/* ---------- config files ---------- */
for (const file of ['manifest.json', 'vercel.json', 'package.json']) {
  try {
    JSON.parse(read(file));
  } catch (error) {
    fail(`${file}: invalid JSON (${error.message})`);
  }
}

if (errors.length) {
  console.error(`SEO verification failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(` - ${error}`);
  process.exit(1);
}

console.log(`SEO verification passed.`);
console.log(`Pages: ${pages.length} (${TOOLS.length} tools, ${CATEGORIES.length} categories, 2 hubs, FAQ, About)`);
console.log(`Sitemap URLs: ${locs.length}`);
console.log(`Schema blocks parsed: ${schemas.length}`);
console.log(`Unique titles: ${titles.size} · unique descriptions: ${descriptions.size}`);
