import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { auth } from "../../firebase-config.js";

const renderLoginHTML = () => {
  let loginHTML = `<div class="container">
      <div class="main-signUp-container">
        <div class="form-heading">
          <div class="create-account-icon">
            <span class="material-symbols-outlined">
              person_add
            </span>
          </div>
          <div class="create-acc-writeUp">
            WELCOME BACK
          </div>
          
          <div class="strap">
            <img src="images/strap.png" alt="strap" />
          </div>
        </div>
        
        <div class="signUp-container">
          
          <div class="signUp-form">
            <div class="form-name">
              EMAIL ADDRESS
            </div>
            <div class="form-instruction">We'll never share your email</div>
            <div class="inputs-container">
              <span class="material-symbols-outlined">
                mail
              </span>
              <div class="input-bar">
                <input class="js-email-value" type="email" placeholder="Enter your email address" />
              </div>
            </div>
          </div>
          
          <div class="signUp-form">
            <div class="form-name">
              PASSWORD
            </div>
            <div class="form-instruction">create a strong password</div>
            <div class="inputs-container">
              <span class="material-symbols-outlined">
                lock
              </span>
              <div class="input-bar">
                <input class="js-password-value" type="password" placeholder="Enter your password" />
              </div>
            </div>
          </div>
          </div>
          <div>
            <a href="#" class="forget-password">forget password</a>
          </div>
          
          <button class="js-login-btn create-acc-container" type="submit">
            <span class="material-symbols-outlined add-person-icon">
              person_add
            </span>
            <div>
              LOGIN
            </div>
          </button>
          
          <div class="or-continer">
            <div class="line-beside-or"></div>
            <div>
              OR
            </div>
            <div class="line-beside-or"></div>
          </div>
          
          
          <button class="sign-in-button">
            <span class="material-symbols-outlined add-person-icon">
              person_add
            </span>
            <div>
              CREATE ACCOUNT
            </div>
          </button>
          
          <footer>
            <div class="footer">
              <span class="material-symbols-outlined">
                encrypted
              </span>
              <div>
                SECURE. PROTECTED. BROTHERHOOD.
              </div>
              <div>
                you data is encrypted and secure with us.
              </div>
            </div>
          </footer>
      </div>
      </div>
  `;
  document.querySelector("main").innerHTML = loginHTML;
}
renderLoginHTML();

const password = document.querySelector("js-password-value")
const email = document.querySelector("js-email-value")
const loginBtn = document.querySelector("js-login-btn")
const createAcc = document.querySelector(".sign-in-button")
console.log(loginBtn)

const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value)
      window.location.href = "dashboard.html"      
    } catch (error) {
       console.log(error)
    }
  
}

const createAccountRedirect = () => {
  createAcc.addEventListener("click", () => {
    window.location.href = "index.html"
  });
}

createAccountRedirect();

const loginHandler = () => {
loginBtn.addEventListener(async () => {
  await handleLogin()
 });
} 


loginHandler()