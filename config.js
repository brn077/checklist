// ============================================================
// CONFIGURAÇÃO DO FIREBASE
// ============================================================
// 1. Vá em https://console.firebase.google.com > seu projeto > Configurações do projeto
// 2. Role até "Seus apps" > Web (</>) e copie os dados abaixo
// 3. Ative em Authentication > Sign-in method > "E-mail/senha"
// 4. Crie um Realtime Database (não Firestore) em modo de produção
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyDXk_BOHPGy-KYBEW7nPqQlO6pvgfFgyd4",
  authDomain: "ckecklist-3ad91.firebaseapp.com",
  databaseURL: "https://ckecklist-3ad91-default-rtdb.firebaseio.com",
  projectId: "ckecklist-3ad91",
  storageBucket: "ckecklist-3ad91.firebasestorage.app",
  messagingSenderId: "738238600667",
  appId: "1:738238600667:web:a0e84565649c4d4ebc83fe"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// ============================================================
// REGRAS DE SEGURANÇA (cole em Realtime Database > Regras)
// ============================================================
// IMPORTANTE: se a aba "Clientes" do admin.html não carrega ninguém,
// é porque as regras não têm ".read" no nó "usuarios" (nível pai) —
// só no "$uid" (nível de cada usuário). O Realtime Database NÃO
// permite ler o nó pai inteiro usando apenas uma regra do filho;
// é preciso liberar explicitamente a leitura do nó pai pra admin.
// Cole exatamente isto no Firebase Console:
/*
{
  "rules": {
    "bonus": {
      ".read": "auth != null",
      ".write": "root.child('admins').child(auth.uid).val() === true"
    },
    "usuarios": {
      ".read": "auth != null && root.child('admins').child(auth.uid).val() === true",
      "$uid": {
        ".read": "auth != null && $uid === auth.uid",
        ".write": "auth != null && ($uid === auth.uid || root.child('admins').child(auth.uid).val() === true)"
      }
    },
    "admins": {
      ".read": "auth != null",
      ".write": false
    }
  }
}
*/

// ============================================================
// COMO TORNAR UM USUÁRIO ADMIN
// ============================================================
// 1. Crie a conta normalmente pelo cliente.html (ou pelo próprio admin.html)
// 2. No Firebase Console > Realtime Database, crie manualmente:
//    admins
//      └── UID_DO_USUARIO: true
//    (o UID aparece em Authentication > Users)
