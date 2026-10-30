// Tool modules are cached lazily when opened; the complete app shell is precached.
const CACHE_PREFIX = 'fatahcalc-pro-';
const CACHE = `${CACHE_PREFIX}v12`;
const SHELL = [
  './',
  './manifest.json',
  './Assets/Logo/logo-light-96.png',
  './Assets/Logo/logo-dark-96.png',
  './Assets/Favicon/favicon-64.png',
  './Assets/Favicon/icon-192.png',
  './Assets/Favicon/icon-512.png',
  './Assets/Favicon/icon-maskable.png',
  './css/variables.css',
  './css/base.css',
  './css/components.css',
  './css/themes.css',
  './css/seo.css',
  './js/main.js',
  './js/router.js',
  './js/tools.js',
  './js/data/seo.js',
  './js/utils/dom.js',
  './js/utils/format.js',
  './js/utils/seo.js',
  './js/utils/storage.js',
  './js/utils/validators.js',
  './js/views/home.js',
  './js/views/homePreviews.js',
  './js/views/category.js',
  './js/views/library.js',
  './js/views/faq.js',
  './js/views/shared.js',
  './js/core/toolPage.js',
  './js/core/unitTool.js',
  './js/core/UnitConverter.js',
  './js/core/Fraction.js'
];

self.addEventListener('install', (event) => {
  // Bypass the HTTP cache so upgrades cannot install an older branded shell.
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL.map((url) => new Request(url, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE && (key.startsWith(CACHE_PREFIX) || key.startsWith('calcsuite-'))).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // External fonts and exchange rates retain their normal browser caching behavior.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      // A full cache must not prevent a successful online response from loading.
      if (response.ok) await cache.put(request, response.clone()).catch(() => {});
      return response;
    })
  );
});
