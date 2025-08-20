const CACHE = "emotion-radar-v1";
const ASSETS = [
  "/emotion-radar/",
  "/emotion-radar/index.html",
  "/emotion-radar/manifest.webmanifest",
  "/emotion-radar/icons/icon-192.PNG",
  "/emotion-radar/icons/icon-512.PNG"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});
self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
