/**
 * seo.js — keeps the document head in sync with the current app view.
 *
 * Static clean URLs carry their own prerendered metadata. These helpers make
 * the equivalent hash view (and every in-app navigation) canonicalise to the
 * same URL, so search engines consolidate signals instead of indexing
 * fragments.
 */
import { SITE_URL, OG_IMAGE, OG_IMAGE_ALT } from '../data/seo.js';

const INDEX_ROBOTS = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';

function setMeta(attribute, key, content) {
  if (content === undefined || content === null) return;
  let el = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeLink(rel) {
  document.head.querySelectorAll(`link[rel="${rel}"]`).forEach((el) => el.remove());
}

export function canonicalFor(path = '/') {
  if (!path || path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function applySeo({
  title,
  description,
  path,
  canonical,
  robots = INDEX_ROBOTS,
  image = OG_IMAGE,
  imageAlt = OG_IMAGE_ALT,
  type = 'website'
} = {}) {
  if (title) {
    document.title = title;
    setMeta('property', 'og:title', title);
    setMeta('name', 'twitter:title', title);
  }

  if (description) {
    setMeta('name', 'description', description);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:description', description);
  }

  const href = canonical === null ? null : (canonical || canonicalFor(path));
  if (href) setLink('canonical', href);
  else removeLink('canonical');

  setMeta('name', 'robots', robots);
  setMeta('property', 'og:type', type);
  setMeta('property', 'og:site_name', 'FatahCalc Pro');
  setMeta('property', 'og:image', image);
  setMeta('property', 'og:image:alt', imageAlt);
  setMeta('name', 'twitter:image', image);
  setMeta('name', 'twitter:image:alt', imageAlt);
  setMeta('name', 'twitter:card', 'summary_large_image');
  if (href) setMeta('property', 'og:url', href);
}

export function noindexSeo({ title, description }) {
  applySeo({ title, description, canonical: null, robots: 'noindex,follow' });
}
