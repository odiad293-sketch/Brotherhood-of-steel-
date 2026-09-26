import { createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { setDoc, doc, serverTimestamp, getDoc } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { auth, db } from '../../../firebase-config.js';
import {scrollToErrorMessage, loadingStateManager} from '../UI.js';
import {
    setLoadingState,
    overlay,
    errorCard,
    formErrorMessage,
    nationName,
    nationId,
    email,
    password,
    countryselected,
    selectedTimezone,
    agreeToTerms } from '../sign-up.js';
export async function createAccount() {
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
    
    
  onAuthStateChanged( async (user) => {
    if (user) {
      const userRefres = doc(db, "users", user.uid)
     const userData = await getDoc(userRefres)
     console.log(userData)
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

function userAuthSate() {
  
}