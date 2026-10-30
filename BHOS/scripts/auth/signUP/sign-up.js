
import { formValidation as defaultFormValidation } from './sign-up-validation.js';
import { auth as defaultAuth } from '../../firebase-config.js';
import {
  onAuthStateChanged as defaultOnAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';
import { rederSignInForm as defaultRenderSignInForm } from './UI.js';
import {
  passwordVisibilityController as defaultPasswordVisibilityController
} from '../../../utils/PVC.js';
import {
  populateTimezones as defaultPopulateTimezones
} from '../../../utils/timezone.js';
import {
  pnwInfoCollector as defaultPnwInfoCollector
} from './services/nation-verification.js';
import {
  createAccount as defaultCreateAccount
} from './services/create-account.js';

export function initSignUpPage(dependencies = {}) {
  const {
    formValidation = defaultFormValidation,
    auth = defaultAuth,
    onAuthStateChanged = defaultOnAuthStateChanged,
    renderSignInForm = defaultRenderSignInForm,
    passwordVisibilityController = defaultPasswordVisibilityController,
    populateTimezones = defaultPopulateTimezones,
    pnwInfoCollector = defaultPnwInfoCollector,
    createAccount = defaultCreateAccount,
    documentRef = document,
    windowRef = window
  } = dependencies;

  let isSigning = false;

  renderSignInForm();

  const createAccountBtn = documentRef.querySelector(
    '.js-creat-account-btn'
  );
  const signInBtn = documentRef.querySelector('.sign-in-button');
  const errorCard = documentRef.querySelector('.error-card');
  const errorTryAgainBtn = documentRef.querySelector('.retry-btn');
  const errorCancelBtn = documentRef.querySelector('.close-btn');

  async function handleSignUp() {
    if (isSigning) return;

    isSigning = true;

    try {
      if (formValidation() && await pnwInfoCollector()) {
        await createAccount();
      }
    } finally {
      isSigning = false;
    }
  }

  function authLogic() {
    createAccountBtn.addEventListener('click', handleSignUp);
    errorTryAgainBtn.addEventListener('click', handleSignUp);

    errorCancelBtn.addEventListener('click', () => {
      errorCard.style.display = 'none';
    });
  }

  function signInRedirect() {
    signInBtn.addEventListener('click', () => {
      windowRef.location.href = 'login.html';
    });
  }

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      windowRef.location.href = 'dashboard.html';
    }
  });

  passwordVisibilityController();
  signInRedirect();
  authLogic();
  populateTimezones();

  return { handleSignUp };
}
