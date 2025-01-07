import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import 'dotenv/config';
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
const db = getFirestore(app);

window.lists = [];

export function renderBoards() {
  const boardsContainer = document.getElementById('boardsContainer');
  boardsContainer.innerHTML = '';

  if (window.lists.length === 0) {
    boardsContainer.innerHTML = `
      <div class="no-lists-container">
        <div class="create-list-box">
          <p>Nemaš još kreiranih listi.</p>
          <button id="createNewList">Kreiraj novu listu</button>
        </div>
      </div>
    `;
    document.getElementById('createNewList').addEventListener('click', createNewList);
  }

  else {
    window.lists.forEach((list, index) => {
      const tasksHtml = list.tasks.map((task, tIndex) => `
        <div class="card">
          ${task.title}
          <span class="close-task-btn" 
                data-listindex="${index}" 
                data-taskindex="${tIndex}">
            X
          </span>
        </div>
      `).join('');

      // HTML za ovu listu
      const listHtml = `
        <div class="board-list" data-index="${index}" style="position: relative;">
          <h3 style="margin: 0;">
            ${list.name}
            <span class="close-list-btn" data-listindex="${index}">X</span>
          </h3>
          <div class="task-cards">
            ${tasksHtml}
          </div>
          <button class="add-task-button">Dodaj zadatak</button>
        </div>
      `;
      boardsContainer.innerHTML += listHtml;
    });

    const addTaskButtons = boardsContainer.querySelectorAll('.add-task-button');
    addTaskButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const parentList = e.target.closest('.board-list');
        const idx = parentList.dataset.index;
        addTaskToList(idx);
      });
    });

    const closeListBtns = boardsContainer.querySelectorAll('.close-list-btn');
    closeListBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const listIndex = e.target.dataset.listindex;
        deleteList(listIndex);
      });
    });

    const closeTaskBtns = boardsContainer.querySelectorAll('.close-task-btn');
    closeTaskBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const lIndex = e.target.dataset.listindex;
        const tIndex = e.target.dataset.taskindex;
        deleteTask(lIndex, tIndex);
      });
    });
  }
}

//spremanje u firestore
function saveListsToFirestore() {
  const user = auth.currentUser;
  if (!user) {
    console.warn("Nema logiranog korisnika, preskačem save.");
    return;
  }

  const userDocRef = doc(db, "users", user.uid);

  setDoc(userDocRef, { lists: window.lists })
    .then(() => {
      console.log("Spremanje u Firestore uspješno.");
    })
    .catch(err => {
      console.error("Greška pri spremanju:", err);
    });
}


function createNewList() {
  const listName = prompt("Naziv nove liste?");
  if (listName) {
    window.lists.push({
      name: listName,
      tasks: []
    });
    renderBoards();
    saveListsToFirestore();
  }
}


function addTaskToList(listIndex) {
  const taskName = prompt("Naziv zadatka?");
  if (taskName) {
    window.lists[listIndex].tasks.push({ title: taskName });
    renderBoards();
    saveListsToFirestore();
  }
}


function deleteList(index) {
  const i = parseInt(index, 10);
  window.lists.splice(i, 1);
  renderBoards();
  saveListsToFirestore();
}

function deleteTask(listIndex, taskIndex) {
  const l = parseInt(listIndex, 10);
  const t = parseInt(taskIndex, 10);
  window.lists[l].tasks.splice(t, 1);
  renderBoards();
  saveListsToFirestore();
}

window.addEventListener('DOMContentLoaded', () => {
  renderBoards();
});
