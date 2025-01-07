import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

import { renderBoards } from "./workspace.js"; 
import 'dotenv/config';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Inicijalizacija Firebase
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// Event listener za gumb "Sign Up"
const submit = document.getElementById('signupBtn');
submit.addEventListener("click", async (event) => {
  event.preventDefault();

  const email    = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  try {
    // Kreiraj korisnika (Firebase Auth)
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    alert("Creating Account...");

    //  Kreiraj prazan dokument u Firestore
    await setDoc(doc(db, "users", user.uid), {
      lists: []
    });

    renderBoards();

    const accountBtn = document.querySelector('.account-segment');
    accountBtn.classList.add('logged-in');
    accountBtn.innerText = 'A';

    window.closeAccountPopup();

  } catch (error) {
    alert(error.message);
  }
});
