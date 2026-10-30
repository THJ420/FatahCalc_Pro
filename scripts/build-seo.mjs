/**
 * build-seo.mjs — production build for FatahCalc Pro's search surface.
 *
 * Generates a clean, prerendered URL for every calculator, converter,
 * category and topical page; plus sitemap.xml and robots.txt. The interactive
 * calculator is progressively enhanced onto each tool page by js/main.js.
 *
 * Run with: npm run build
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { CATEGORIES, TOOLS } from '../js/tools.js';
import {
  SITE_URL,
  OG_IMAGE,
  OG_IMAGE_ALT,
  ROOT_SEO,
  GROUP_SEO,
  CATEGORY_SEO,
  PAGE_SEO,
  TOOL_SEO,
  toolKey,
  toolUrl
} from '../js/data/seo.js';
import {
  TOOL_CONTENT,
  CATEGORY_CONTENT,
  GROUP_CONTENT,
  HOME_FAQ,
  FAQ_PAGE,
  ABOUT_CONTENT,
  PRIVACY_FAQ
} from './seo/content.mjs';

const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const CATEGORY_TOOLS = new Map(CATEGORIES.map((c) => [c.id, TOOLS.filter((t) => t.categoryId === c.id)]));
const ORG_ID = 'https://fatahtech.com/#organization';
const WEBSITE_ID = `${SITE_URL}/#website`;
const SUITE_ID = `${SITE_URL}/#app`;

const CATEGORY_H1 = {
  math: 'Free Math Calculators',
  financial: 'Free Financial & Business Calculators',
  health: 'Free Health & Fitness Calculators',
  datetime: 'Free Date & Time Calculators',
  grade: 'Free Grade & GPA Calculators',
  electrical: 'Free Electrical & Physics Calculators',
  everyday: 'Free Everyday Utility Calculators',
  units: 'Free Unit & Measurement Converters',
  'number-system': 'Free Number System & Encoding Converters',
  color: 'Free Color Converter & Tools',
  'electrical-conv': 'Free Electrical & Energy Converters',
  currency: 'Free Currency Converter & Tools'
};

const CATEGORY_H2 = {
  math: 'Math Calculators',
  financial: 'Financial & Business Calculators',
  health: 'Health & Fitness Calculators',
  datetime: 'Date & Time Calculators',
  grade: 'Grade & Education Calculators',
  electrical: 'Electrical & Physics Calculators',
  everyday: 'Everyday Utility Calculators',
  units: 'Unit & Measurement Converters',
  'number-system': 'Number System & Encoding Converters',
  color: 'Color Converters',
  'electrical-conv': 'Electrical & Energy Converters',
  currency: 'Currency Converters'
};

const TOOL_H1 = {
  'calculators/standard-deviation': 'Free Standard Deviation Calculator',
  'calculators/quadratic': 'Free Quadratic Equation Solver',
  'calculators/vat-tax': 'Free VAT & Sales Tax Calculator',
  'calculators/bmr': 'Free BMR & Calorie Needs Calculator',
  'calculators/ideal-weight': 'Free Ideal Body Weight Calculator',
  'calculators/date-difference': 'Free Date Difference Calculator',
  'calculators/time-duration': 'Free Time Duration Calculator',
  'calculators/grade-percentage': 'Free Grade Calculator',
  'calculators/final-grade': 'Free Final Grade Calculator',
  'calculators/watt-volt-amp-ohm': 'Free Watt, Volt, Amp & Ohm Calculator',
  'calculators/power-calculator': 'Free Power & Energy Cost Calculator',
  'calculators/age-in-units': 'Free Age in Days & Hours Calculator',
  'converters/weight': 'Free Weight & Mass Converter',
  'converters/data-storage': 'Free Data Storage Converter',
  'converters/ascii-text': 'Free Text to ASCII, Binary & Hex Converter',
  'converters/fraction-decimal': 'Free Fraction, Decimal & Percent Converter',
  'converters/morse': 'Free Text to Morse Code Converter',
  'converters/cipher': 'Free Text & Cipher Converter'
};

const GROUP_ORDER = {
  calculators: ['financial', 'math', 'health', 'datetime', 'grade', 'electrical', 'everyday'],
  converters: ['units', 'number-system', 'color', 'electrical-conv', 'currency']
};

const escapeHTML = (value) =>
  String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

const attr = escapeHTML;
const url = (slug) => `${SITE_URL}/${slug}`;
const jsonLd = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const organizationNode = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'FatahTech',
  url: 'https://fatahtech.com/',
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/Assets/Favicon/icon-512.png`,
    width: 512,
    height: 512
  }
};

const websiteNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: 'FatahCalc Pro',
  publisher: { '@id': ORG_ID },
  inLanguage: 'en'
};

const faqNode = (id, items, partOfId) => ({
  '@type': 'FAQPage',
  '@id': id,
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a }
  })),
  ...(partOfId ? { isPartOf: { '@id': partOfId } } : {})
});

const breadcrumbNode = (id, items) => ({
  '@type': 'BreadcrumbList',
  '@id': id,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    ...(item.url ? { item: item.url } : {})
  }))
});

const toolCard = (tool) => {
  const seo = TOOL_SEO[toolKey(tool.group, tool.id)];
  return `<a class="tool-card" href="/${seo.slug}">
    <span class="tool-card-icon"><i class="${tool.icon}" aria-hidden="true"></i></span>
    <span class="tool-card-body"><h3>${escapeHTML(tool.name)}</h3><p>${escapeHTML(tool.desc)}</p></span>
  </a>`;
};

const categoryCard = (category) => {
  const seo = CATEGORY_SEO[category.id];
  return `<a class="seo-cat-card" href="/${seo.slug}">
    <span class="seo-cat-icon"><i class="${category.icon}" aria-hidden="true"></i></span>
    <span class="seo-cat-copy"><strong>${escapeHTML(category.name)}</strong><span>${category.tools.length} tool${category.tools.length === 1 ? '' : 's'}</span></span>
  </a>`;
};

const breadcrumbHTML = (items) => `<nav class="breadcrumb" aria-label="Breadcrumb">${items
  .map((item) => item.url
    ? `<a href="${attr(item.url)}">${escapeHTML(item.name)}</a>`
    : `<span>${escapeHTML(item.name)}</span>`)
  .join('<span aria-hidden="true">›</span>')}</nav>`;

function head({ title, description, canonical, jsonld = [], ogType = 'website', image = OG_IMAGE, imageAlt = OG_IMAGE_ALT }) {
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${escapeHTML(title)}</title>
<meta name="description" content="${attr(description)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<link rel="canonical" href="${attr(canonical)}">
<meta name="author" content="FatahTech — https://fatahtech.com/">
<meta name="application-name" content="FatahCalc Pro">
<meta name="apple-mobile-web-app-title" content="FatahCalc Pro">
<meta name="theme-color" content="#0A0E17">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="FatahCalc Pro">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(description)}">
<meta property="og:url" content="${attr(canonical)}">
<meta property="og:image" content="${attr(image)}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${attr(imageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(title)}">
<meta name="twitter:description" content="${attr(description)}">
<meta name="twitter:image" content="${attr(image)}">
<meta name="twitter:image:alt" content="${attr(imageAlt)}">
<link rel="icon" href="/Assets/Favicon/favicon-64.png" sizes="64x64" type="image/png">
<link rel="icon" href="/Assets/Favicon/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/Assets/Favicon/icon-192.png">
<link rel="manifest" href="/manifest.json">
<link rel="author" href="https://fatahtech.com/">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.2/css/all.min.css">
<link rel="stylesheet" href="/css/variables.css">
<link rel="stylesheet" href="/css/base.css">
<link rel="stylesheet" href="/css/components.css">
<link rel="stylesheet" href="/css/themes.css">
<link rel="stylesheet" href="/css/seo.css">
<script>
  (function () {
    try {
      var stored = JSON.parse(localStorage.getItem('calcsuite:theme'));
      var sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = (stored === 'light' || stored === 'dark') ? stored : (sysDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', theme === 'dark' ? '#0A0E17' : '#F6F8FB');
    } catch (e) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
</script>
${jsonld.map(jsonLd).join('\n')}`;
}

function header(activeGroup = '') {
  const navItem = (href, nav, icon, label, group) => {
    const active = group && group === activeGroup;
    return `<a href="${href}" data-nav="${nav}"${active ? ' class="is-active" aria-current="page"' : ''}><i class="${icon} nav-icon" aria-hidden="true"></i>${label}</a>`;
  };
  return `<header class="site-header" id="site-header">
  <div class="header-inner">
    <a class="brand" href="/" aria-label="FatahCalc Pro home">
      <span class="brand-mark">
        <img class="brand-logo brand-logo-light" src="/Assets/Logo/logo-light-96.png" width="34" height="34" alt="FatahTech">
        <img class="brand-logo brand-logo-dark" src="/Assets/Logo/logo-dark-96.png" width="34" height="34" alt="FatahTech">
      </span>
      <span class="brand-wordmark"><span class="brand-text">FatahCalc <span class="brand-pro">Pro</span></span><span class="brand-byline">BY FATAHTECH</span></span>
    </a>
    <button class="icon-btn nav-toggle" id="nav-toggle" type="button"
            aria-label="Open menu" aria-expanded="false" aria-controls="nav-panel">
      <i class="fa-solid fa-bars" aria-hidden="true"></i>
    </button>
    <div class="header-panel" id="nav-panel">
      <nav class="main-nav" id="main-nav" aria-label="Primary">
        ${navItem('/', '#/', 'fa-solid fa-house', 'Home')}
        ${navItem('/calculators', '#/calculators', 'fa-solid fa-calculator', 'Calculators', 'calculators')}
        ${navItem('/converters', '#/converters', 'fa-solid fa-right-left', 'Converters', 'converters')}
        ${navItem('/#/favorites', '#/favorites', 'fa-solid fa-star', 'Favorites')}
        ${navItem('/#/history', '#/history', 'fa-solid fa-clock-rotate-left', 'History')}
      </nav>
      <div class="search-wrap" role="search" aria-label="Global tool search">
        <i class="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></i>
        <input type="search" id="global-search" class="search-input" placeholder="Search tools…"
               autocomplete="off" aria-label="Search calculators and converters"
               role="combobox" aria-autocomplete="list" aria-haspopup="listbox"
               aria-keyshortcuts="Control+K Meta+K Slash" aria-expanded="false" aria-controls="search-results">
        <kbd class="search-kbd">Ctrl K</kbd>
        <div class="search-dropdown" id="search-results" role="listbox" hidden></div>
      </div>
      <div class="header-actions">
        <span class="instrument-chip"><span class="status-dot"></span><span id="instrument-count">52 instruments</span></span>
        <button class="icon-btn action-btn" id="theme-toggle" type="button" aria-label="Toggle dark and light theme" title="Toggle theme">
          <i class="fa-solid fa-moon icon-moon" aria-hidden="true"></i>
          <i class="fa-solid fa-sun icon-sun" aria-hidden="true"></i>
          <span class="action-label">Theme</span>
        </button>
        <a class="icon-btn action-btn" id="fatahtech-link" href="https://fatahtech.com/"
           target="_blank" rel="noopener noreferrer" title="Explore FatahTech" aria-label="Visit FatahTech">
          <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          <span class="action-label">FatahTech</span>
        </a>
      </div>
    </div>
  </div>
  <div class="route-progress" id="route-progress" aria-hidden="true"></div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <a class="brand" href="/" aria-label="FatahCalc Pro home">
        <span class="brand-mark">
          <img class="brand-logo brand-logo-light" src="/Assets/Logo/logo-light-96.png" width="29" height="29" alt="FatahTech" loading="lazy">
          <img class="brand-logo brand-logo-dark" src="/Assets/Logo/logo-dark-96.png" width="29" height="29" alt="FatahTech" loading="lazy">
        </span>
        <strong>FatahCalc Pro</strong>
      </a>
      <p>Every calculator and converter, in one modern place by <a href="https://fatahtech.com/">FatahTech</a>.</p>
      <p class="footer-suite">Part of FatahTech Suite — <a href="https://fatahtech.com/tools/freebies" target="_blank" rel="noopener noreferrer">Explore All Free Browser Tools</a></p>
    </div>
    <nav class="footer-links" aria-label="Footer">
      <a href="/calculators">All Calculators</a>
      <a href="/converters">All Converters</a>
      <a href="/#/favorites">Favorites</a>
      <a href="/#/history">History</a>
      <a href="/about">About</a>
      <a href="/faq">FAQ</a>
      <a href="https://fatahtech.com/tools/freebies" target="_blank" rel="noopener noreferrer">Explore FatahTech <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
    </nav>
    <div class="footer-status" role="group" aria-label="Application status">
      <span><span class="status-dot"></span>Offline-ready</span>
      <span><span class="status-dot status-dot--accent"></span>Local processing</span>
      <span><span class="status-dot status-dot--violet"></span>No account needed</span>
    </div>
    <p class="footer-note">© 2026 <a href="https://fatahtech.com/">FatahTech</a>. All rights reserved.</p>
  </div>
</footer>
<div class="toast" id="toast" role="status" aria-live="polite" hidden></div>
<script type="module" src="/js/main.js"></script>`;
}

function page({ title, description, canonical, jsonld, bodyAttrs = 'data-static', activeGroup = '', content }) {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
${head({ title, description, canonical, jsonld })}
</head>
<body ${bodyAttrs}>
<a class="skip-link" href="#main-content">Skip to main content</a>
${header(activeGroup)}
<main id="main-content" tabindex="-1">
${content}
</main>
${footer()}
</body>
</html>
`;
}

function toolPage(tool) {
  const key = toolKey(tool.group, tool.id);
  const seo = TOOL_SEO[key];
  const content = TOOL_CONTENT[key];
  const category = CATEGORIES.find((c) => c.id === tool.categoryId);
  const categorySeo = CATEGORY_SEO[tool.categoryId];
  const groupSeo = GROUP_SEO[tool.group];
  const faqs = [...content.faqs, PRIVACY_FAQ];
  const steps = tool.group === 'calculators'
    ? [
      'Enter the values you know in the fields above. Every result updates as you type — there is no Calculate button to press.',
      'Use any tabs, unit switch or grading scale offered by the tool when your inputs need a different mode.',
      'Copy the result with one click, or change an input to compare another scenario. Recent results are stored locally in your browser.'
    ]
    : tool.categoryId === 'currency'
      ? [
        'Choose the currency you are converting from and the currency you want to receive.',
        'Enter the amount. The converted value appears instantly using the latest cached reference rate.',
        'Swap the currencies for the reverse direction. Rates refresh when you are online and are marked as cached when you are offline.'
      ]
      : tool.categoryId === 'units' || tool.categoryId === 'electrical-conv'
        ? [
          'Choose the source unit and the target unit from the two dropdown menus.',
          'Type a value into either box. The other box updates instantly, and editing the other box reverses the direction.',
          'Use the swap button to reverse the units, or click any row in the all-units list to make it the target.'
        ]
        : [
          'Enter or paste the value you want to convert into the input field.',
          'Choose the format or direction offered by the tool, such as binary, ASCII, Roman numerals, HEX or RGB.',
          'Read the converted value and copy it. The tool validates input and shows an error when a value is not valid.'
        ];

  const h1 = TOOL_H1[key] || (tool.group === 'converters'
    ? `Free ${tool.name}${/(Converter|Generator)$/.test(tool.name) ? '' : ' Converter'}`
    : `Free ${tool.name}${/(Calculator|Solver|Generator|Timer)$/.test(tool.name) ? '' : ' Calculator'}`);

  const canonical = `${SITE_URL}/${seo.slug}`;
  const crumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: tool.group === 'calculators' ? 'Calculators' : 'Converters', url: `${SITE_URL}/${groupSeo.slug}` },
    { name: category.name, url: `${SITE_URL}/${categorySeo.slug}` },
    { name: h1 }
  ];
  const related = TOOLS.filter((t) => t.categoryId === tool.categoryId && t.id !== tool.id).slice(0, 4);

  const graph = [
    organizationNode,
    websiteNode,
    {
      '@type': 'ItemPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: seo.title,
      description: seo.description,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': `${canonical}#app` },
      mainEntity: { '@id': `${canonical}#app` },
      breadcrumb: { '@id': `${canonical}#breadcrumb` },
      primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
      inLanguage: 'en'
    },
    {
      '@type': 'WebApplication',
      '@id': `${canonical}#app`,
      name: h1,
      url: canonical,
      description: seo.description,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': ORG_ID },
      isPartOf: { '@id': WEBSITE_ID },
      inLanguage: 'en',
      featureList: [
        `${tool.name} with live results`,
        `${category.name} calculator`,
        'Free, no account required',
        'Runs locally in your browser',
        'Offline-ready PWA after first visit'
      ]
    },
    breadcrumbNode(`${canonical}#breadcrumb`, crumbs),
    faqNode(`${canonical}#faq`, faqs, `${canonical}#webpage`)
  ];

  const faqHTML = faqs.map((f) => `<div class="seo-faq">
    <h3>${escapeHTML(f.q)}</h3>
    <p>${escapeHTML(f.a)}</p>
  </div>`).join('');

  const contentHTML = `<div class="route-view seo-page">
  ${breadcrumbHTML(crumbs)}
  <header class="tool-head seo-tool-head">
    <div class="tool-head-main">
      <span class="hero-eyebrow seo-eyebrow"><span class="status-dot status-dot--accent" aria-hidden="true"></span>${escapeHTML(category.name)} · Free online tool</span>
      <h1>${escapeHTML(h1)}</h1>
      <p class="tool-desc">${escapeHTML(content.lead)}</p>
      <p class="seo-tool-meta"><span><i class="fa-solid fa-bolt" aria-hidden="true"></i> Instant results</span><span><i class="fa-solid fa-shield-halved" aria-hidden="true"></i> Private in your browser</span><span><i class="fa-solid fa-wifi" aria-hidden="true"></i> Offline-ready</span></p>
    </div>
  </header>

  <div id="route-outlet" data-route-outlet>
    <p class="seo-app-link"><a class="btn btn-primary" href="/#/${tool.group}/${tool.id}">Open the interactive ${escapeHTML(tool.name)} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></p>
  </div>

  <section class="seo-section" aria-labelledby="use-heading">
    <h2 id="use-heading">How to use the ${escapeHTML(tool.name)}</h2>
    <ol class="seo-steps">${steps.map((step) => `<li>${step}</li>`).join('')}</ol>
  </section>

  <section class="seo-section" aria-labelledby="how-heading">
    <h2 id="how-heading">How the ${escapeHTML(tool.name)} works</h2>
    <div class="seo-prose">${tool.how || '<p>The calculator applies the standard formula for this quantity and updates the result as you type.</p>'}</div>
  </section>

  <section class="seo-section" aria-labelledby="faq-heading">
    <h2 id="faq-heading">${escapeHTML(tool.name)} FAQ</h2>
    <div class="seo-faq-list">${faqHTML}</div>
  </section>

  ${related.length ? `<section class="seo-section" aria-labelledby="related-heading">
    <h2 id="related-heading">Related ${escapeHTML(category.name.toLowerCase())} tools</h2>
    <div class="tool-grid">${related.map(toolCard).join('')}</div>
  </section>` : ''}

  <p class="seo-suite-link">Part of the <a href="/">FatahCalc Pro</a> suite — 52 free calculators and converters.
    <a href="/${categorySeo.slug}">Browse all ${escapeHTML(category.name)} tools</a> or
    <a href="/${groupSeo.slug}">see every ${tool.group === 'calculators' ? 'calculator' : 'converter'}</a>.</p>
</div>`;

  return page({
    title: seo.title,
    description: seo.description,
    canonical,
    jsonld: graph,
    bodyAttrs: `data-static data-boot="/${tool.group}/${tool.id}"`,
    activeGroup: tool.group,
    content: contentHTML
  });
}

function categoryPage(category) {
  const seo = CATEGORY_SEO[category.id];
  const content = CATEGORY_CONTENT[category.id];
  const groupSeo = GROUP_SEO[category.group];
  const h1 = CATEGORY_H1[category.id];
  const canonical = `${SITE_URL}/${seo.slug}`;
  const faqs = [...content.faqs, PRIVACY_FAQ];
  const crumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: category.group === 'calculators' ? 'Calculators' : 'Converters', url: `${SITE_URL}/${groupSeo.slug}` },
    { name: h1 }
  ];
  const relatedCategories = CATEGORIES.filter((c) => c.group === category.group && c.id !== category.id);

  const graph = [
    organizationNode,
    websiteNode,
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: seo.title,
      description: seo.description,
      isPartOf: { '@id': WEBSITE_ID },
      breadcrumb: { '@id': `${canonical}#breadcrumb` },
      inLanguage: 'en'
    },
    {
      '@type': 'CollectionPage',
      '@id': `${canonical}#collection`,
      name: h1,
      url: canonical,
      description: seo.description,
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: CATEGORY_TOOLS.get(category.id).length,
        itemListElement: CATEGORY_TOOLS.get(category.id).map((tool, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: tool.name,
          url: toolUrl(tool.group, tool.id)
        }))
      }
    },
    breadcrumbNode(`${canonical}#breadcrumb`, crumbs),
    faqNode(`${canonical}#faq`, faqs, `${canonical}#webpage`)
  ];

  const contentHTML = `<div class="route-view seo-page">
  ${breadcrumbHTML(crumbs)}
  <header class="tool-head seo-tool-head">
    <div class="tool-head-main">
      <span class="hero-eyebrow seo-eyebrow"><span class="status-dot status-dot--accent" aria-hidden="true"></span>${category.tools.length} free ${category.tools.length === 1 ? 'tool' : 'tools'}</span>
      <h1>${escapeHTML(h1)}</h1>
      <p class="tool-desc">${escapeHTML(content.lead)}</p>
    </div>
  </header>

  <section class="seo-section" aria-labelledby="all-tools-heading">
    <h2 id="all-tools-heading">All ${escapeHTML(category.name)} tools</h2>
    <div class="tool-grid">${CATEGORY_TOOLS.get(category.id).map(toolCard).join('')}</div>
  </section>

  <section class="seo-section" aria-labelledby="guide-heading">
    <h2 id="guide-heading">${escapeHTML(CATEGORY_H2[category.id])} guide</h2>
    <div class="seo-prose">${content.intro.map((p) => `<p>${escapeHTML(p)}</p>`).join('')}</div>
  </section>

  <section class="seo-section" aria-labelledby="faq-heading">
    <h2 id="faq-heading">${escapeHTML(category.name)} FAQ</h2>
    <div class="seo-faq-list">${[...content.faqs, PRIVACY_FAQ].map((f) => `<div class="seo-faq"><h3>${escapeHTML(f.q)}</h3><p>${escapeHTML(f.a)}</p></div>`).join('')}</div>
  </section>

  <section class="seo-section" aria-labelledby="related-heading">
    <h2 id="related-heading">Related categories</h2>
    <div class="seo-cat-grid">
      ${relatedCategories.map(categoryCard).join('')}
      ${`<a class="seo-cat-card" href="/${groupSeo.slug}"><span class="seo-cat-icon"><i class="fa-solid fa-layer-group" aria-hidden="true"></i></span><span class="seo-cat-copy"><strong>All ${category.group === 'calculators' ? 'calculators' : 'converters'}</strong><span>${groupSeo.h1}</span></span></a>`}
    </div>
  </section>
</div>`;

  return page({
    title: seo.title,
    description: seo.description,
    canonical,
    jsonld: graph,
    activeGroup: category.group,
    content: contentHTML
  });
}

function groupPage(group) {
  const groupSeo = GROUP_SEO[group];
  const content = GROUP_CONTENT[group];
  const categories = GROUP_ORDER[group].map((id) => CATEGORIES.find((c) => c.id === id));
  const canonical = `${SITE_URL}/${groupSeo.slug}`;
  const faqs = [...content.faqs, PRIVACY_FAQ];
  const otherGroup = group === 'calculators' ? GROUP_SEO.converters : GROUP_SEO.calculators;
  const crumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: groupSeo.h1 }
  ];

  const graph = [
    organizationNode,
    websiteNode,
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: groupSeo.title,
      description: groupSeo.description,
      isPartOf: { '@id': WEBSITE_ID },
      breadcrumb: { '@id': `${canonical}#breadcrumb` },
      inLanguage: 'en'
    },
    {
      '@type': 'CollectionPage',
      '@id': `${canonical}#collection`,
      name: groupSeo.h1,
      url: canonical,
      description: groupSeo.description,
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: categories.reduce((n, c) => n + c.tools.length, 0),
        itemListElement: categories.flatMap((c) => CATEGORY_TOOLS.get(c.id)).map((tool, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: tool.name,
          url: toolUrl(tool.group, tool.id)
        }))
      }
    },
    breadcrumbNode(`${canonical}#breadcrumb`, crumbs),
    faqNode(`${canonical}#faq`, faqs, `${canonical}#webpage`)
  ];

  const contentHTML = `<div class="route-view seo-page">
  ${breadcrumbHTML(crumbs)}
  <header class="tool-head seo-tool-head">
    <div class="tool-head-main">
      <span class="hero-eyebrow seo-eyebrow"><span class="status-dot status-dot--accent" aria-hidden="true"></span>${group === 'calculators' ? '31 calculators' : '21 converters'} · 100% free</span>
      <h1>${escapeHTML(groupSeo.h1)}</h1>
      <p class="tool-desc">${escapeHTML(groupSeo.lead)}</p>
    </div>
  </header>

  <div class="seo-prose seo-intro">${content.intro.map((p) => `<p>${escapeHTML(p)}</p>`).join('')}</div>

  ${categories.map((category) => `<section class="seo-section" aria-labelledby="cat-${category.id}">
    <h2 id="cat-${category.id}">${escapeHTML(CATEGORY_H2[category.id])}</h2>
    <p class="seo-section-sub">${escapeHTML(category.blurb)}</p>
    <div class="tool-grid">${CATEGORY_TOOLS.get(category.id).map(toolCard).join('')}</div>
    <p class="seo-more"><a href="/${CATEGORY_SEO[category.id].slug}">View all ${escapeHTML(category.name)} tools <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></p>
  </section>`).join('')}

  <section class="seo-section" aria-labelledby="faq-heading">
    <h2 id="faq-heading">${group === 'calculators' ? 'Calculator' : 'Converter'} FAQ</h2>
    <div class="seo-faq-list">${faqs.map((f) => `<div class="seo-faq"><h3>${escapeHTML(f.q)}</h3><p>${escapeHTML(f.a)}</p></div>`).join('')}</div>
  </section>

  <p class="seo-suite-link">Looking for the other direction?
    <a href="/${otherGroup.slug}">Browse ${escapeHTML(otherGroup.h1)}</a> — or read the
    <a href="/faq">calculator FAQ</a> for privacy, offline and accuracy details.</p>
</div>`;

  return page({
    title: groupSeo.title,
    description: groupSeo.description,
    canonical,
    jsonld: graph,
    activeGroup: group,
    content: contentHTML
  });
}

function faqPage() {
  const seo = PAGE_SEO.faq;
  const canonical = `${SITE_URL}/${seo.slug}`;
  const allFaqs = FAQ_PAGE.sections.flatMap((s) => s.items);
  const crumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: seo.h1 }
  ];

  const graph = [
    organizationNode,
    websiteNode,
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: seo.title,
      description: seo.description,
      isPartOf: { '@id': WEBSITE_ID },
      breadcrumb: { '@id': `${canonical}#breadcrumb` },
      inLanguage: 'en'
    },
    breadcrumbNode(`${canonical}#breadcrumb`, crumbs),
    faqNode(`${canonical}#faq`, allFaqs, `${canonical}#webpage`)
  ];

  const contentHTML = `<div class="route-view seo-page">
  ${breadcrumbHTML(crumbs)}
  <header class="tool-head seo-tool-head">
    <div class="tool-head-main">
      <span class="hero-eyebrow seo-eyebrow"><span class="status-dot status-dot--accent" aria-hidden="true"></span>Pricing · privacy · offline</span>
      <h1>${escapeHTML(FAQ_PAGE.title)}</h1>
      <p class="tool-desc">${escapeHTML(FAQ_PAGE.lead)}</p>
    </div>
  </header>

  ${FAQ_PAGE.sections.map((section) => `<section class="seo-section" aria-labelledby="faq-${section.title.toLowerCase().replace(/[^a-z]+/g, '-')}">
    <h2 id="faq-${section.title.toLowerCase().replace(/[^a-z]+/g, '-')}">${escapeHTML(section.title)}</h2>
    <div class="seo-faq-list">${section.items.map((f) => `<div class="seo-faq"><h3>${escapeHTML(f.q)}</h3><p>${escapeHTML(f.a)}</p></div>`).join('')}</div>
  </section>`).join('')}

  <p class="seo-suite-link">Ready to calculate? Browse
    <a href="/calculators">all free calculators</a> or
    <a href="/converters">all free converters</a>, or read
    <a href="/about">about FatahCalc Pro</a>.</p>
</div>`;

  return page({
    title: seo.title,
    description: seo.description,
    canonical,
    jsonld: graph,
    content: contentHTML
  });
}

function aboutPage() {
  const seo = PAGE_SEO.about;
  const canonical = `${SITE_URL}/${seo.slug}`;
  const crumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: seo.h1 }
  ];

  const graph = [
    organizationNode,
    websiteNode,
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: seo.title,
      description: seo.description,
      isPartOf: { '@id': WEBSITE_ID },
      breadcrumb: { '@id': `${canonical}#breadcrumb` },
      inLanguage: 'en'
    },
    {
      '@type': 'AboutPage',
      '@id': `${canonical}#about`,
      url: canonical,
      name: ABOUT_CONTENT.title,
      description: seo.description,
      mainEntity: { '@id': ORG_ID },
      isPartOf: { '@id': WEBSITE_ID },
      inLanguage: 'en'
    },
    breadcrumbNode(`${canonical}#breadcrumb`, crumbs)
  ];

  const contentHTML = `<div class="route-view seo-page">
  ${breadcrumbHTML(crumbs)}
  <header class="tool-head seo-tool-head">
    <div class="tool-head-main">
      <span class="hero-eyebrow seo-eyebrow"><span class="status-dot status-dot--accent" aria-hidden="true"></span>Built by FatahTech</span>
      <h1>${escapeHTML(ABOUT_CONTENT.title)}</h1>
      <p class="tool-desc">${escapeHTML(ABOUT_CONTENT.lead)}</p>
    </div>
  </header>

  ${ABOUT_CONTENT.sections.map((section) => `<section class="seo-section">
    <h2>${escapeHTML(section.h2)}</h2>
    <div class="seo-prose">${section.paragraphs.map((p) => `<p>${escapeHTML(p)}</p>`).join('')}</div>
  </section>`).join('')}

  <section class="seo-section" aria-labelledby="explore-heading">
    <h2 id="explore-heading">Explore the suite</h2>
    <div class="seo-cat-grid">
      <a class="seo-cat-card" href="/calculators"><span class="seo-cat-icon"><i class="fa-solid fa-calculator" aria-hidden="true"></i></span><span class="seo-cat-copy"><strong>Calculators</strong><span>31 free tools</span></span></a>
      <a class="seo-cat-card" href="/converters"><span class="seo-cat-icon"><i class="fa-solid fa-right-left" aria-hidden="true"></i></span><span class="seo-cat-copy"><strong>Converters</strong><span>21 free tools</span></span></a>
      <a class="seo-cat-card" href="/faq"><span class="seo-cat-icon"><i class="fa-regular fa-circle-question" aria-hidden="true"></i></span><span class="seo-cat-copy"><strong>FAQ</strong><span>Privacy, offline and accuracy</span></span></a>
      <a class="seo-cat-card" href="https://fatahtech.com/tools/freebies" target="_blank" rel="noopener noreferrer"><span class="seo-cat-icon"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></span><span class="seo-cat-copy"><strong>FatahTech freebies</strong><span>More free browser tools</span></span></a>
    </div>
  </section>

  <p class="seo-suite-link">FatahCalc Pro is part of the <a href="https://fatahtech.com/">FatahTech</a> suite.
    <a href="https://fatahtech.com/tools/freebies" target="_blank" rel="noopener noreferrer">Explore all free browser tools</a>.</p>
</div>`;

  return page({
    title: seo.title,
    description: seo.description,
    canonical,
    jsonld: graph,
    content: contentHTML
  });
}

async function write(file, data) {
  await fs.writeFile(path.join(ROOT, file), data, 'utf8');
}

async function build() {
  const pages = [];

  for (const tool of TOOLS) {
    const seo = TOOL_SEO[toolKey(tool.group, tool.id)];
    if (!seo) throw new Error(`Missing SEO entry for ${toolKey(tool.group, tool.id)}`);
    const content = TOOL_CONTENT[toolKey(tool.group, tool.id)];
    if (!content) throw new Error(`Missing content for ${toolKey(tool.group, tool.id)}`);
    let how = '';
    try {
      const mod = await tool.load();
      how = mod.default?.how || '';
    } catch (error) {
      console.warn(`[warn] could not load ${toolKey(tool.group, tool.id)}: ${error.message}`);
    }
    pages.push({ file: `${seo.slug}.html`, html: toolPage({ ...tool, how }), canonical: `${SITE_URL}/${seo.slug}`, priority: '0.7' });
  }

  for (const category of CATEGORIES) {
    const seo = CATEGORY_SEO[category.id];
    if (!seo) throw new Error(`Missing category SEO for ${category.id}`);
    pages.push({ file: `${seo.slug}.html`, html: categoryPage(category), canonical: `${SITE_URL}/${seo.slug}`, priority: '0.8' });
  }

  for (const group of ['calculators', 'converters']) {
    const seo = GROUP_SEO[group];
    pages.push({ file: `${seo.slug}.html`, html: groupPage(group), canonical: `${SITE_URL}/${seo.slug}`, priority: '0.9' });
  }

  pages.push({ file: `${PAGE_SEO.faq.slug}.html`, html: faqPage(), canonical: `${SITE_URL}/${PAGE_SEO.faq.slug}`, priority: '0.6' });
  pages.push({ file: `${PAGE_SEO.about.slug}.html`, html: aboutPage(), canonical: `${SITE_URL}/${PAGE_SEO.about.slug}`, priority: '0.6' });

  for (const entry of pages) {
    await write(entry.file, entry.html);
  }

  const sitemapEntries = [
    { loc: `${SITE_URL}/`, priority: '1.0' },
    ...pages.map((entry) => ({ loc: entry.canonical, priority: entry.priority }))
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map((entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
  await write('sitemap.xml', sitemap);

  const robots = `# FatahCalc Pro — ${SITE_URL}/
User-agent: *
Allow: /

# AI and answer-engine crawlers are welcome to read the public pages.
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  await write('robots.txt', robots);

  console.log(`Built ${pages.length} static pages + sitemap.xml + robots.txt for ${SITE_URL}`);
  console.log(`Tools: ${TOOLS.length} · Categories: ${CATEGORIES.length} · Sitemap URLs: ${sitemapEntries.length}`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
