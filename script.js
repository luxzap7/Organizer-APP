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
  });
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
