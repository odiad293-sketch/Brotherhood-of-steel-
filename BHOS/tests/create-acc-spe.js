import { createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { setDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { auth, db } from '../../../firebase-config.js';

describe("creatAccount", function () {
    let formContainer;
    beforeEach(function () {
        let email;
        let password;

        formContainer = document.createElement("div");
        document.body.appendChild(formContainer);
        formContainer.innerHTML = `
         <div class="signUp-form">
          <div class="form-name">PASSWORD</div>
          <input
            class="password-value"
            type="password"
            placeholder="Enter your password"
          />
        </div>
                <div class="signUp-form">
          <div class="form-name">EMAIL ADDRESS</div>
          <input
            class="email-input"
            type="email"
            placeholder="Enter your email address"
          />
        </div>

        `;
        function getFormElements() {
            return {
                password: document.querySelector(".password-value"),
                email: document.querySelector('.email-input'),
            }
        }
        spyOn(auth, "createUserWithEmailAndPassword")
        
    });
});