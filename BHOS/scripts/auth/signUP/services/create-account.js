import { createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { setDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { auth, db } from '../../../firebase-config.js';
import { scrollToErrorMessage } from '../UI.js';
import { loadingStateManager, setLoadingState } from '../../../../utils/loading-manager.js';

export async function createAccount() {
  
  const nationName = document.querySelector('.js-nation-input');
  const nationId = document.querySelector('.js-nation-Id-input');
  const email = document.querySelector('.email-input');
  const countryselected = document.querySelector('.country-selected');
  const agreeToTerms = document.querySelector('.agree-to-terms');
  const errorCard = document.querySelector('.error-card');
  const formErrorMessage = document.querySelector('.error-message');
  const selectedTimezone = document.querySelector('.timezone-select');
  const password = document.querySelector(".js-password-value");
  
  try {
    setLoadingState(true);
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
    
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        window.location.href = "dashboard.html";
      }
      
    });
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
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'Your password is too weak. Please choose a stronger password.';
      
    } else if (error.code === 'auth/network-request-failed') {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'Network error. Please check your internet connection and try again.';
      
    } else if (error.code === 'auth/too-many-requests') {
      scrollToErrorMessage()
      formErrorMessage.textContent =
        'Too many attempts. Please wait a moment and try again.';
      
    } else if (error.code === 'auth/operation-not-allowed') {
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
    setLoadingState(false);
    loadingStateManager()
  }
}