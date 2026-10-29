import { formValidation } from './sign-up-validation.js';
import { auth } from "../../firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { rederSignInForm } from "./UI.js";
import { passwordVisibilityController } from '../../../utils/PVC.js';
import { populateTimezones } from "../../../utils/timezone.js";
import { pnwInfoCollector } from './services/nation-verification.js';
import { createAccount } from './services/create-account.js';
let isSigning = false;
function signUPCoordinator(dependencies = {}) {

  const {
    obsaveAuthSateChange = onAuthStateChanged,
    pwnwInfoGiver = pnwInfoCollector,
    navigate = (page) => {
      window.location.href = page
    },
    passwordVisibilityControl = passwordVisibilityController,
    signInRedirector = signInRedirect,
    accountCreation = createAccount,
    authProcessor = authLogic,
    TimezonesPopulator = populateTimezones
  } = dependencies;

  obsaveAuthSateChange(auth, (currentUser) => {
    if (currentUser) {
      navigate("dashboard.html")
    }
  });

  rederSignInForm()

  const createAccoumtBtn = document.querySelector('.js-creat-account-btn');
  const signBtn = document.querySelector('.sign-in-button');
  const errorCard = document.querySelector('.error-card');
  const errorTryAgainBtn = document.querySelector('.retry-btn');
  const errorCancelBtn = document.querySelector('.close-btn');

  async function handleSignUp() {
    if (isSigning) return
    isSigning = true;
    if (formValidation() && await pwnwInfoGiver()) {
      await accountCreation();
    }
    isSigning = false;
  }

  function authLogic() {
    createAccoumtBtn.addEventListener('click', handleSignUp);
    errorTryAgainBtn.addEventListener('click', handleSignUp);
    errorCancelBtn.addEventListener('click', () => {
      errorCard.style.display = 'none';
    });
  }

  const signInRedirect = () => {
    signBtn.addEventListener("click", () => {
      navigate("login.html")
    });
  }

  passwordVisibilityControl();
  signInRedirector();
  authProcessor();
  TimezonesPopulator();
}
signUPCoordinator()