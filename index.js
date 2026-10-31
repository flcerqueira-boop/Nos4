// Envia aviso para os outros membros quando chega mensagem nova.
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");

initializeApp();

// Endereço do app no GitHub Pages (com barra no final)
const APP_URL = "https://flcerqueira-boop.github.io/Nos4/";
// Use a mesma região do banco Firestore
const REGION = "southamerica-east1";

exports.avisarMensagem = onDocumentCreated({ document: "messages/{id}", region: REGION }, async (event) => {
  const msg = event.data?.data();
  if (!msg) return;

  const db = getFirestore();
  const snap = await db.collection("tokens").get();
  const targets = [];
  snap.forEach((d) => {
    if (d.id === msg.uid) return; // não avisa quem enviou
    (d.data().tokens || []).forEach((token) => targets.push({ uid: d.id, token }));
  });
  if (!targets.length) return;

  const body = msg.type === "image" ? "📷 Foto"
    : msg.type === "audio" ? "🎤 Mensagem de voz"
    : String(msg.text || "").slice(0, 140);

  const res = await getMessaging().sendEachForMulticast({
    tokens: targets.map((t) => t.token),
    webpush: {
      notification: { title: msg.name || "Nós 4", body, icon: APP_URL + "icon-192.png" },
      fcmOptions: { link: APP_URL }
    }
  });

  // Remove aparelhos que não existem mais
  const dead = ["messaging/registration-token-not-registered", "messaging/invalid-registration-token"];
  await Promise.all(res.responses.map((r, i) =>
    !r.success && dead.includes(r.error?.code)
      ? db.collection("tokens").doc(targets[i].uid).update({ tokens: FieldValue.arrayRemove(targets[i].token) })
      : null
  ));
});
