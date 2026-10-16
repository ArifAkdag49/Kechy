// Pages: network first, cache as fallback, so the site stays usable offline without serving stale content.
// Pictures, recordings and fonts never change under the same name: cache first, network once.
const CACHE = 'kechy-v2', MEDIA = 'kechy-media-v1';
const CORE = ['./', './index.html', './img/logo.png', './img/app/icon-192.png', './manifest.webmanifest'];
self.addEventListener('install', (e) => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE))); });
self.addEventListener('activate', (e) => e.waitUntil(caches.keys()
  .then((ks) => Promise.all(ks.filter((k) => k !== CACHE && k !== MEDIA).map((k) => caches.delete(k))))
  .then(() => self.clients.claim())));
const cacheFirst = (req) => caches.open(MEDIA).then((c) => c.match(req).then((hit) => hit || fetch(req).then((r) => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; })));
self.addEventListener('fetch', (e) => {
  const req = e.request, u = new URL(req.url);
  if (req.method !== 'GET' || req.headers.has('range')) return;
  if (/^fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) return e.respondWith(cacheFirst(req));
  if (u.origin !== self.location.origin || u.pathname.startsWith('/api/')) return;
  if (/^\/(img|audio)\//.test(u.pathname)) return e.respondWith(cacheFirst(req));
  e.respondWith(fetch(req).then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return r; })
    .catch(() => caches.match(req).then((m) => m || caches.match('./index.html'))));
});
