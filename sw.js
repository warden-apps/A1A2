/* Kotoba — service worker.
   The whole app is one static HTML file, so the strategy is simply: cache
   everything on install, then serve from cache first. That makes it work with
   no signal at all, which is the point — he studies on the train.

   Bump CACHE when you republish, or phones will keep serving the old copy. */
const CACHE = 'kotoba-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-192.png',
  './apple-touch-icon.png',
  './icons/apple-touch-icon.png',
  './icons/icon-48.png',
  './icons/icon-32.png',
  './icons/icon-16.png'
];

self.addEventListener('install', e => {
  // addAll fails the whole install if any single file 404s, so add them
  // individually and let a missing icon be survivable.
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(ASSETS.map(u => c.add(u).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(res => {
        // stash same-origin successes so a later visit works offline too
        if (res && res.ok && new URL(e.request.url).origin === location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => {
        // Only fall back to the app shell for page navigations. Returning
        // index.html for a missing image or script would hide the real error.
        if (e.request.mode === 'navigate') return caches.match('./index.html');
        return Response.error();
      });
    })
  );
});
