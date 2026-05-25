const CACHE = "daydream-beats-v3";

const FILES = [
  "./index.html",
  "./kaze.mp3",
  "./きらめく方程式.mp3",
  "./bg.jpg",
  "./combo30.mp3",
  "./combo50.mp3",
  "./combo70.mp3",
  "./combo100.mp3",
  "./miss.mp3"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(FILES).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).catch(() => cached);
    })
  );
});
