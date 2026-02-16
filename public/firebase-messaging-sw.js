importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDVMg5m18gygzS9J_MI9Ej-Abld5pVPO8E",
  authDomain: "saba-app-53033.firebaseapp.com",
  projectId: "saba-app-53033",
  storageBucket: "saba-app-53033.firebasestorage.app",
  messagingSenderId: "586666098318",
  appId: "1:586666098318:web:36c0a989b945a0642293df",
  measurementId: "G-1YFHRPW76S"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Prevent showing duplicate notifications:
// - If the FCM message includes a `notification` payload, FCM/browser often auto-displays it.
// - If we ALSO call `showNotification` here, the user sees it twice.
// So we only show a custom notification for data-only messages.
const shownMessageIds = new Set();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const messageId = payload?.messageId || payload?.data?.messageId;
  if (messageId) {
    if (shownMessageIds.has(messageId)) return;
    shownMessageIds.add(messageId);
  }

  // If `notification` exists, it may already be displayed automatically.
  if (payload?.notification) {
    return;
  }

  const notificationTitle = payload?.data?.title || 'New Message';
  const notificationOptions = {
    body: payload?.data?.body || '',
    icon: payload?.data?.icon || '/ali.png',
    badge: payload?.data?.badge || '/ali.png',
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification click received.');
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('/');
    })
  );
});
