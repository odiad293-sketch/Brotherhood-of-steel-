import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { auth, db } from '../../firebase-config.js';
import{ formValidation } from './sign-up-validation.js';
import {} from '';
import {
   rederSignInForm,
   passwordVisibilityController,
   loadingStateManager,
   scrollToErrorMessage
  } from "./UI.js";
import { populateTimezones } from "../../../utils/timezone.js";
import { setDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { pnwInfoCollector, pnwVerifier } from './services/nationtion-verification.js';
import {createAccount} from './services/create-account.js';

export let loadingState = false;
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

authLogic();
passwordVisibilityController();
populateTimezones();