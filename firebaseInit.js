import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth }       from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore }  from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "**********************************",
    authDomain: "web-organizer-471b8.firebaseapp.com",
    projectId: "web-organizer-471b8",
    storageBucket: "web-organizer-471b8.firebasestorage.app",
    messagingSenderId: "1090202517733",
    appId: "1:1090202517733:web:2e5a7b698f92d8a0e1940c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
