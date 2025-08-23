// app.js

// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  increment
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// إعداد Firebase
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// تحديد اليوم الحالي
const todayId = new Date().toISOString().split("T")[0];
const colName = "global_counts_daily";

// 🟢 دالة لزيادة العدادات
async function incrementDhikr(dhikrKey) {
  const update = {};
  update[dhikrKey] = increment(1);
  update["total"] = increment(1);

  await setDoc(doc(db, colName, todayId), update, { merge: true });

  // تحديث واجهة المستخدم فوراً
  loadGlobalTotal();
}

// 🟢 دالة لجلب الإجمالي
async function loadGlobalTotal() {
  const snap = await getDoc(doc(db, colName, todayId));
  const data = snap.exists() ? snap.data() : {};
  const total = data.total || 0;

  const el = document.getElementById("global-total");
  if (el) {
    el.textContent = 📊 إجمالي المجتمع اليوم: ${total.toLocaleString()};
  }
}

// تحميل الإجمالي عند فتح التطبيق
loadGlobalTotal();

// تحديث كل دقيقتين
setInterval(loadGlobalTotal, 120000);

// 🟢 اربط الدالة بالأزرار
window.incrementDhikr = incrementDhikr;
