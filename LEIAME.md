# Nós 4 — configuração

## 1. Firebase (projeto novo, ex.: `chat-familia`)
1. Crie o projeto e adicione um **app Web**. Copie o `firebaseConfig` para o `index.html` **e** para o `firebase-messaging-sw.js`.
2. **Authentication → Email/senha → Ativar.** Em *Usuários*, crie as 3 contas com os e-mails do `FAMILY` (podem ser fictícios, ex.: `bento@familia.app`) e uma senha para cada.
3. **Firestore Database → Criar** (região `southamerica-east1`). Em *Regras*, cole o `firestore.rules` com os mesmos 3 e-mails e publique.
4. **Configurações do projeto → Cloud Messaging → Certificados push da Web → Gerar par de chaves.** Cole a chave em `VAPID_KEY` no `index.html`.

Fotos e áudios ficam guardados no próprio Firestore (comprimidos), sem precisar do Storage.

## 2. GitHub Pages
Crie o repositório `ChatFamilia` e suba: `index.html`, `firebase-messaging-sw.js`, `manifest.json` e os 3 ícones `.png`. Ative o Pages. O endereço fica `https://flcerqueira-boop.github.io/ChatFamilia/`.

Nesse ponto o chat já funciona (texto, emojis, fotos e áudio). Só faltam os avisos.

## 3. Avisos de mensagem (precisa do PC)
1. Mude o projeto para o plano **Blaze**. Para 3 pessoas o uso fica dentro da cota gratuita; crie um alerta de orçamento baixo (ex.: US$ 1) por segurança.
2. No PC, numa pasta com `firebase.json`, `firestore.rules` e a pasta `functions`:
   ```
   npm install -g firebase-tools
   firebase login
   firebase use --add        (escolha o projeto)
   cd functions && npm install && cd ..
   firebase deploy --only functions
   ```
   Confira o `APP_URL` em `functions/index.js` antes.

## 4. Em cada aparelho (iPad do Bento, seu iPhone, o da Joana)
1. Abra o endereço no **Safari** → Compartilhar → **Adicionar à Tela de Início**.
2. Abra pelo ícone, toque na carinha da pessoa e digite a senha (fica salvo).
3. ⚙️ → **Ativar avisos de mensagem** → Permitir.

## Uso
- Segure o dedo numa mensagem sua para apagar.
- Áudio: toque no 🎤, fale e toque em Enviar (até 1 minuto).
- Até 3 emojis sozinhos aparecem grandes.
- Para trocar nomes, emojis ou cores, edite o bloco `FAMILY` no topo do script.
