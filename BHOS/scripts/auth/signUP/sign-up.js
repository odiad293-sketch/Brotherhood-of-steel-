import { formValidation } from './sign-up-validation.js';
import { auth } from "../../firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { rederSignInForm } from "./UI.js";
import { passwordVisibilityController } from '../../../utils/PVC.js';
import { populateTimezones } from "../../../utils/timezone.js";
import { pnwInfoCollector } from './services/nation-verification.js';
import { createAccount } from './services/create-account.js';
 
onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    window.location.href = "dashboard.html";
  }
});

rederSignInForm()


 const createAccoumtBtn = document.querySelector('.js-creat-account-btn');
 const signBtn = document.querySelector('.sign-in-button');
 const errorCard = document.querySelector('.error-card');
 const errorTryAgainBtn = document.querySelector('.retry-btn');
 const errorCancelBtn = document.querySelector('.close-btn');

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

const signInRedirect = () => {
  signBtn.addEventListener("click",() => {
    window.location.href ="login.html"
  });
}

passwordVisibilityController();
signInRedirect();
authLogic();
populateTimezones();