import { auth } from '../firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
export const authState = () => {
  try {
    onAuthStateChanged(auth, (currentUser) => {
    if (!currentUser) {
    window.location.replace("login.html")
    }
  });
  } catch (error) {
   console.log(error)
  }
}

