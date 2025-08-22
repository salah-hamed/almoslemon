const CACHE_NAME = "muslim-azkar-v2";
const urlsToCache = [ "/", "/index.html", "/manifest.json", "/about.html", "/privacy.html", "/icons/icon-192.png", "/icons/icon-512.png" ];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keyList => Promise.all(keyList.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); });
self.addEventListener("fetch", e => { e.respondWith(caches.match(e.request).then(response => response || fetch(e.request))); });