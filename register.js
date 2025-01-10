import { auth, db } from "./firebaseInit.js";
import { 
  createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { 
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { renderBoards } from "./workspace.js";

const submit = document.getElementById('signupBtn');
submit.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    alert("Creating Account...");

    await setDoc(doc(db, "users", user.uid), { lists: [] });

    // Lokalno 
    window.lists = [];
    renderBoards();

    const accountBtn = document.querySelector('.account-segment');
    accountBtn.classList.add('logged-in');
    accountBtn.innerHTML = `<img src="images/iconACCOUNT.png" alt="Ikona" style="width: 32px; height: 32px;">`
    window.closeAccountPopup();

  } catch (error) {
    alert(error.message);
  }
});
