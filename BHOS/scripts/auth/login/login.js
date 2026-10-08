import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { auth } from "../../firebase-config.js";
import {
  renderLoginHTML,
  createAccountRedirect,
  passwordVisibilityController,
  scrollToErrorMessage
} from './UI.js';
import { loadingStateManager, setLoadingState } from '../../../utils/loading-manager.js';
renderLoginHTML();

const errorTryAgainBtn = document.querySelector('.retry-btn');
const errorCancelBtn = document.querySelector('.close-btn');
const password = document.querySelector(".js-password-value");
const email = document.querySelector(".js-email-value");
const loginBtn = document.querySelector(".js-login-btn");
const errorCard = document.querySelector('.error-card');
const formErrorMessage = document.querySelector('.error-message');

const loginLogic = async () => {
  setLoadingState(true)
  loadingStateManager()
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    window.location.href = "dashboard.html"
  } catch (error) {
    errorCard.style.display = 'block';
    
    if (error.code === 'auth/invalid-email') {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'Please enter a valid email address.';
    }
    
    else if (error.code === 'auth/invalid-credential') {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'The email address or password is incorrect. Please check your details and try again.';
    }
    
    else if (error.code === 'auth/user-disabled') {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'This account has been disabled. Please contact support for assistance.';
    }
    
    else if (error.code === 'auth/user-not-found') {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'No account was found with this email address.';
    }
    
    else if (error.code === 'auth/wrong-password') {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'The password you entered is incorrect. Please try again.';
    }
    
    else if (error.code === 'auth/too-many-requests') {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'Too many login attempts have been made. Please wait a moment and try again.';
    }
    
    else if (error.code === 'auth/network-request-failed') {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'A network error occurred. Please check your internet connection and try again.';
    }
    
    else if (error.code === 'auth/operation-not-allowed') {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'Email and password sign-in is currently unavailable. Please try again later.';
    }
    
    else if (error.code === 'auth/user-token-expired') {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'Your login session has expired. Please sign in again.';
    }
    
    else if (error.code === 'auth/requires-recent-login') {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'Please sign in again to continue.';
    }
    
    else if (error.code === 'auth/multi-factor-auth-required') {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'Additional verification is required to sign in.';
    }
    
    else {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'We could not sign you in. Please check your details and try again later.';
    }
    
  } finally {
    setLoadingState(false);
    loadingStateManager()
  }
}


createAccountRedirect();

const loginHandler = async () => {
  await loginLogic()
}

function loginLogicOperator() {
  loginBtn.addEventListener('click', loginHandler);
  errorTryAgainBtn.addEventListener('click', loginHandler);
  errorCancelBtn.addEventListener('click', () => {
    errorCard.style.display = 'none';
  });
}

loginLogicOperator()

passwordVisibilityController()