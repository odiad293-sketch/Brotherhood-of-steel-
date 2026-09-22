import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { auth, db } from '../../firebase-config.js';
import{ formValidation } from './sign-up-validation.js';
import {
   rederSignInForm,
   passwordVisibilityController,
   loadingStateManager,
   scrollToErrorMessage
  } from "./UI.js";
import { populateTimezones } from "../../../utils/timezone.js";
import { setDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { pnwInfoCollector, pnwVerifier } from './services/nationtion-verification.js';

let loadingState = false;
rederSignInForm()

export const nationName = document.querySelector('.js-nation-input');
export const nationId = document.querySelector('.js-nation-Id-input');
export const email = document.querySelector('.email-input');
export const password = document.querySelector('.password-value');
export const confirmPassword = document.querySelector('.js-confirm-password');
export const countryselected = document.querySelector('.country-selected');
export const agreeToTerms = document.querySelector('.agree-to-terms');
export const createAccoumtBtn = document.querySelector('.js-creat-account-btn');
export const signBtn = document.querySelector('.sign-in-button');
export const errorCard = document.querySelector('.error-card');
export const errorTryAgainBtn = document.querySelector('.retry-btn');
export const errorCancelBtn = document.querySelector('.close-btn');
export const passwordToggle = document.querySelector('.password-toggle');
export const confirmPasswordToggle = document.querySelector('.confirm-password-toggle');
export const selectedTimezone = document.querySelector('.timezone-select');
export const formErrorMessage = document.querySelector('.error-message');
const overlay = document.querySelector('.overlay');

passwordVisibilityController()

async function createAccount() {
  
  try {
    loadingState = true
    loadingStateManager()
    const userDoc = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    
    const userRefres = doc(db, "users", userDoc.user.uid)
    await setDoc(userRefres, {
      userName: 'unknown',
      nation: nationName.value,
      nationId: nationId.value,
      email: email.value,
      country: countryselected.value,
      timezone: selectedTimezone.value,
      agreedToTerms: agreeToTerms.checked,
      role: "initiate",
      created_At: serverTimestamp(),
    });
    window.location.href = '/sign-in.html';
  } catch (error) {
    
    errorCard.style.display = 'block';
    
    if (error.code === 'auth/email-already-in-use') {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'An account with this email already exists. Please sign in instead.';
      
    } else if (error.code === 'auth/invalid-email') {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'Please enter a valid email address.';
      
    } else if (error.code === 'auth/weak-password') {
      showErrorMessage()
      formErrorMessage.textContent =
        'Your password is too weak. Please choose a stronger password.';
      
    } else if (error.code === 'auth/network-request-failed') {
      showErrorMessage()
      formErrorMessage.textContent =
        'Network error. Please check your internet connection and try again.';
      
    } else if (error.code === 'auth/too-many-requests') {
      showErrorMessage()
      formErrorMessage.textContent =
        'Too many attempts. Please wait a moment and try again.';
      
    } else if (error.code === 'auth/operation-not-allowed') {
      loadingState = false;
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'Account creation is currently unavailable. Please try again later.';
      
    } else if (error.code === 'auth/admin-restricted-operation') {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'Account creation is currently restricted. Please try again later.';
      
    } else {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'We could not create your account. Please try again later.';
    }
    console.log(error.code);
    console.log(error.message);
  } finally {
    loadingState = false;
    loadingStateManager()
  }
}


async function handleSignUp() {
  if (formValidation() && await pnwInfoCollector()) {
    await createAccount();
    
  }
}

function authLogic() {
  
  createAccoumtBtn.addEventListener('click', handleSignUp);
  
  errorTryAgainBtn.addEventListener('click', handleSignUp);
  
  errorCancelBtn.addEventListener('click', () => {
    errorCard.style.display = 'none';
  });
  
}

authLogic()

populateTimezones()