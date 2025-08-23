// service-worker.js
const CACHE_NAME = "muslim-azkar-v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/about.html",
  "/privacy.html",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// تثبيت الكاش
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// تفعيل وحذف الكاش القديم
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

// جلب الملفات من الكاش أو النت
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
