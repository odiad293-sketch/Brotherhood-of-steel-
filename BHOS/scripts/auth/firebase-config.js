import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCc6BiwoQIRC0MjZ8-tfmNww6aEZ7oh3VQ",
  authDomain: "brotherhood-of-steel-3152f.firebaseapp.com",
  projectId: "brotherhood-of-steel-3152f",
  storageBucket: "brotherhood-of-steel-3152f.firebasestorage.app",
  messagingSenderId: "171353206925",
  appId: "1:171353206925:web:42baa102794676bdcd32c4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);