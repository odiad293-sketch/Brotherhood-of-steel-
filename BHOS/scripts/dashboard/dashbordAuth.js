import { auth } from '../firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { isSignedIn } from "../auth/signUP/services/create-account.js";

export const authState = () => {
  try {
    onAuthStateChanged(auth, (currentUser) => {
    if (!currentUser && isSignedIn) {
    window.location.replace("index.html")
    }
  });
  } catch (error) {
   console.log(error)
  }
}

