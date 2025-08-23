const CACHE_NAME = "muslim-azkar-v2";
const urlsToCache = [ "/", "/index.html", "/manifest.json", "/about.html", "/privacy.html", "/icons/icon-192.png", "/icons/icon-512.png" ];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keyList => Promise.all(keyList.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); });
self.addEventListener("fetch", e => { e.respondWith(caches.match(e.request).then(response => response || fetch(e.request))); });
const todayId = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
const colName = 'global_counts_daily'; // أو 'global_counts_daily' لو غيّرت الاسم
const update = {};
for (const [key, val] of Object.entries(pendingQueue)) {
  if (val > 0) {
    update[key] = firebase.firestore.FieldValue.increment(val);
    update['total'] = firebase.firestore.FieldValue.increment(val);
  }
}

// كتابة دمج (لا تستبدل القيم، بس تزودها)
await db.collection(colName).doc(todayId).set(update, { merge: true });

// (اختياري) لو عايز تحديث “كل الأوقات” كمان:
await db.collection('totals').doc('global').set(update, { merge: true });
async function loadGlobalTotal() {
  const snap = await db.collection(colName).doc(todayId).get();
  const data = snap.exists ? snap.data() : {};
  const total = data.total || 0;
  document.getElementById('global-total').textContent =
    📊 إجمالي المجتمع اليوم: ${total.toLocaleString()};
}
loadGlobalTotal();
setInterval(loadGlobalTotal, 120000); // كل دقيقتين
