// Service worker dos avisos. Cole aqui a MESMA configuração do index.html.
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCNo2ru4lRnwNVHCsd2V-KKvInB13W53bI",
  authDomain: "nos-4-bfc16.firebaseapp.com",
  projectId: "nos-4-bfc16",
  storageBucket: "nos-4-bfc16.firebasestorage.app",
  messagingSenderId: "690592234660",
  appId: "1:690592234660:web:4a4452acd84bf62243ba31"
});
firebase.messaging();

// Selo (bolinha) no ícone do app quando chega mensagem
self.addEventListener("push", () => {
  if (self.navigator.setAppBadge) self.navigator.setAppBadge(1).catch(() => {});
});
