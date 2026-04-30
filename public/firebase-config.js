import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBgN3HWNyEHFSzcBW8wTDF84HGJeBLmYdw",
  authDomain: "athir-ia-2d6be.firebaseapp.com",
  projectId: "athir-ia-2d6be",
  storageBucket: "athir-ia-2d6be.firebasestorage.app",
  messagingSenderId: "129304498324",
  appId: "1:129304498324:web:79784fcd9812dcd5a7a481"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

window.fbAuth = auth;
window.fbDB = db;
window.fbSignIn = () => signInWithPopup(auth, provider);
window.fbSignOut = () => signOut(auth);
window.fbSaveScript = async (script) => {
  const user = auth.currentUser;
  if (!user) return;
  await addDoc(collection(db, 'scripts'), {
    uid: user.uid,
    text: script,
    date: new Date()
  });
};
window.onAuthStateChanged = (cb) => onAuthStateChanged(auth, cb);
