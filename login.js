import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import { 
  getFirestore, 
  doc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import 'dotenv/config';

window.lists = window.lists || []; 
function renderBoards() {

  console.log("renderBoards() =>", lists);
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

async function loadUserData(uid) {
  const userDocRef = doc(db, "users", uid);
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    const userData = docSnap.data();
    window.lists = userData.lists || [];
    console.log("Podaci učitani iz Firestore:", window.lists);
  } else {

    window.lists = [];
    console.log("Korisnik nema dokument, kreirat će se kasnije.");
  }
  
  renderBoards();
}

const submit = document.getElementById('loginBtn');
submit.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    alert("Logging in...");

    await loadUserData(user.uid);

    const accountBtn = document.querySelector('.account-segment');
    accountBtn.classList.add('logged-in');
    accountBtn.innerText = 'A';

    window.closeAccountPopup();

  } catch (error) {
    alert(error.message);
  }
});
