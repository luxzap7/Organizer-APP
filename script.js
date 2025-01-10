const savedBg = localStorage.getItem('userBgImage');
if (savedBg) {
  setBackground(savedBg);
}


function openAccountPopup() {
  const accountBtn = document.querySelector('.account-segment');

  if (accountBtn.classList.contains('logged-in')) {
    openLogoutPopup();
  } else {
    const accountPopup = document.getElementById('accountPopup');
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    accountPopup.style.display = 'flex';
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
  }
}

function closeAccountPopup() {
  const accountPopup = document.getElementById('accountPopup');
  accountPopup.style.display = 'none';
}

function showSignupForm() {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  signupForm.style.display = 'block';
  loginForm.style.display = 'none';
}

function showLoginForm() {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  signupForm.style.display = 'none';
  loginForm.style.display = 'block';
}

function openLogoutPopup() {
  const logoutPopup = document.getElementById('logoutPopup');
  logoutPopup.style.display = 'flex';
}

function closeLogoutPopup() {
  const logoutPopup = document.getElementById('logoutPopup');
  logoutPopup.style.display = 'none';
}

function setupLogoutListener() {
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', () => {
    closeLogoutPopup();

    const accountBtn = document.querySelector('.account-segment');
    accountBtn.classList.remove('logged-in');
    accountBtn.innerText = 'Account';

    signOut(auth);

    window.lists = [];
    renderBoards();
  });
}


//Postavljanje pozadine
function openBackgroundPicker() {
  const popup = document.getElementById('bgPickerPopup');
  popup.style.display = 'flex';
}

function closeBackgroundPicker() {
  const popup = document.getElementById('bgPickerPopup');
  popup.style.display = 'none';
}

function setBackground(imgPath) {
  document.body.style.backgroundImage = `url('${imgPath}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundRepeat = 'no-repeat';
  closeBackgroundPicker();
  localStorage.setItem('userBgImage', imgPath);
}



window.addEventListener('DOMContentLoaded', () => {
  setupLogoutListener();
});

window.openAccountPopup = openAccountPopup;
window.closeAccountPopup = closeAccountPopup;
window.showSignupForm = showSignupForm;
window.showLoginForm = showLoginForm;
window.openLogoutPopup = openLogoutPopup;
window.closeLogoutPopup = closeLogoutPopup;
window.openBackgroundPicker = openBackgroundPicker;
window.closeBackgroundPicker = closeBackgroundPicker;
window.setBackground = setBackground;
