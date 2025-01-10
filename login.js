import { auth, db } from "./firebaseInit.js";
import { 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { 
  doc, getDoc 
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { renderBoards } from "./workspace.js";

async function loadUserData(uid) {
  const userDocRef = doc(db, "users", uid);
  const docSnap = await getDoc(userDocRef);
  if (docSnap.exists()) {
    const userData = docSnap.data();
    window.lists = userData.lists || [];
  } else {
    window.lists = [];
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
    accountBtn.innerHTML = `<img src="images/iconACCOUNT.png" alt="Ikona" style="width: 32px; height: 32px;">`

    window.closeAccountPopup();

  } catch (error) {
    alert(error.message);
  }
});
