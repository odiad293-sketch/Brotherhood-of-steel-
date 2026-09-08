import { getAuth } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { auth, db } from './firebase-config.js';
import {setDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
let loadingState = false;
function rederSignInForm() {
  let rederSignInFormHTML = `
   <section>
   <div class="error-card">
  <div class="error-icon">!</div>

  <div class="error-content">
    <h3>Something went wrong</h3>
    <p class='error-message'>
      
    </p>
  </div>

  <div class="error-actions">
    <button class="error-btn retry-btn">Try Again</button>
    <button class="error-btn close-btn">Close</button>
  </div>
</div>
   
      <div class="container">
        <div class="main-signUp-container">
          <div class="form-heading">
            <div class="create-account-icon">
              <span class="material-symbols-outlined">
                person_add
              </span>
            </div>
            <div class="create-acc-writeUp">
              CREATE YOUR ACCOUNT
            </div>
            
            <div>
              <img src="images/strap.png" alt="strap" />
            </div> 
          </div>
          
          <div class="signUp-container">
            
            <div class="signUp-form">
              <div class="form-name">
                NATION NAME
              </div>
              <div class="form-instruction">Enter your nation name</div>
              <div class="inputs-container">
                <span class="material-symbols-outlined">
                  flag
                </span>
                <div class="input-bar">
                  <input class="js-nation-input" type="text" placeholder="Enter nation name" />
                </div>
              </div>
            </div>
            
            
            <div class="signUp-form">
              <div class="form-name">
                NATION ID
              </div>
              <div class="form-instruction">Enter your unique politics & war nation ID</div>
              <div class="inputs-container">
                <span class="material-symbols-outlined">
                  shield
                </span>
                <div class="input-bar">
                  <input class="js-nation-Id-input"type="text" placeholder="Enter nation ID" />
                </div>
              </div>
            </div>
            
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
                  <input class="email-input" type="email" placeholder="Enter your email address" />
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
                  <input class="password-value" type="password" placeholder="Enter your password" />
                </div>
                  <span class="material-symbols-outlined password-toggle">  visibility  </span>
              </div>
            </div>
            
            <div class="signUp-form">
              <div class="form-name">
                CONFIRM PASSWORD
              </div>
              <div class="form-instruction">confirm your password</div>
              <div class="inputs-container">
                <span class="material-symbols-outlined">
                  lock
                </span>
                <div class="input-bar">
                  <input class="js-confirm-password" type="password" placeholder="Enter your password" />
                </div>
                  <span class="material-symbols-outlined confirm-password-toggle">visibility</span>
              </div>
            </div>
            
            <div class="country-and-timeZone-contaimer">
              <div class="country-selection ">
                
                <div class="form-name">
                  COUNTRY
                </div>
                <div class="form-instruction">
                  select your country
                </div>
                <div class="option-container">
                  <span class="material-symbols-outlined">
                    public
                  </span>
                  <div class="select">
                    <select class="country-selected">
                      <option value="" class="option">Select your country</option>
                      
                      <option value="us">United States</option>
                      <option value="canada">Canada</option>
                      <option value="uk">United Kingdom</option>
                      <option value="australia">Australia</option>
                      <option value="new-zealand">New Zealand</option>
                      
                      <option value="germany">Germany</option>
                      <option value="france">France</option>
                      <option value="netherlands">Netherlands</option>
                      <option value="sweden">Sweden</option>
                      <option value="norway">Norway</option>
                      
                      <option value="india">India</option>
                      <option value="philippines">Philippines</option>
                      <option value="singapore">Singapore</option>
                      
                      <option value="nigeria">Nigeria</option>
                      <option value="south-africa">South Africa</option>
                      
                      <option value="brazil">Brazil</option>
                      <option value="mexico">Mexico</option>
                      
                      <option value="other">Other (My country isn't listed, but please if you country isn't listed select it.)</option>
                    </select>
                  </div>
                </div>
                
              </div>
              
              
              <div class="timezone-selection">
                
              <div class="form-name">
                TIMEZONE
              </div>
              <div class="form-instruction">
                select your timezone
              </div>
              <div class="option-container">
                <span class="material-symbols-outlined">
                  schedule
                </span>
                <div class="select">
                  <select class="timezone-select">
                    <option value="" class="option-timeZone">Select your time zone</option>
                  </select>
                </div>
              </div>
              
              </div>
            </div>
          </div>
       <div class="agreement">
      <div class="checkbox">
        <input type="checkbox" class="agree-to-terms" />
      </div>
      <div>
        I agree to the <a href="#">terms and service</a> and <a href="#">privacy policy</a>
      </div>
    </div>
      
      <button class=" js-creat-account-btn create-acc-container" type="submit">
        <span class="material-symbols-outlined add-person-icon">
        person_add
      </span>
        <div>
         CREATE ACCOUNT 
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
          SIGN IN INSTEAD
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
  
  document.querySelector('main').innerHTML = rederSignInFormHTML;
  
}

rederSignInForm()

const nationName = document.querySelector('.js-nation-input');
const nationId = document.querySelector('.js-nation-Id-input');
const email = document.querySelector('.email-input');
const password = document.querySelector('.password-value');
const confirmPassword = document.querySelector('.js-confirm-password');
const countryselected = document.querySelector('.country-selected');
const agreeToTerms = document.querySelector('.agree-to-terms');
const createAccoumtBtn = document.querySelector('.js-creat-account-btn');
const signBtn = document.querySelector('.sign-in-button');
const errorCard = document.querySelector('.error-card');
const errorTryAgainBtn = document.querySelector('.retry-btn');
const errorCancelBtn = document.querySelector('.close-btn');
const passwordToggle = document.querySelector('.password-toggle');
const confirmPasswordToggle = document.querySelector('.confirm-password-toggle');
const selectedTimezone = document.querySelector('.timezone-select');
const formErrorMessage = document.querySelector('.error-message');
const overlay = document.querySelector('.overlay');

function passwordVisibilityController() {
  confirmPasswordToggle.addEventListener('click', () => {
    if (confirmPassword.type === 'password') {
      confirmPassword.type = 'text';
      confirmPasswordToggle.textContent = 'visibility_off';
    } else {
      confirmPassword.type = 'password';
      confirmPasswordToggle.textContent = 'visibility';
    }
  });
  
  passwordToggle.addEventListener('click', () => {
    if (password.type === 'password') {
      password.type = 'text';
      passwordToggle.textContent = 'visibility_off';
    } else {
      password.type = 'password';
      passwordToggle.textContent = 'visibility';
    }
  });
}

passwordVisibilityController()

async function createAccount() {
  loadingState = true
  try {
    const userDoc = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    
    const userRefres = doc(db, "users", userDoc.user.uid)
    await setDoc(userRefres,{
      userName:'unknown',
      nation: nationName.value,
      nationId: nationId.value,
      email: email.value,
      country: countryselected.value,
      timezone: selectedTimezone.value,
      agreedToTerms: agreeToTerms.checked,
      role: "initiate",
      created_At: serverTimestamp(),
    });
    loadingState = false;
    loadingStateManager()
    window.location.href="/BHOS/dashboard.html"
  } catch (error) {
    
    errorCard.style.display = 'block';
    
    if (error.code === 'auth/email-already-in-use') {
      showErrorMessage()
      formErrorMessage.textContent =
        'An account with this email already exists. Please sign in instead.';
      
    } else if (error.code === 'auth/invalid-email') {
      showErrorMessage()
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
      loadingState = false;
      showErrorMessage()
      formErrorMessage.textContent =
        'Account creation is currently unavailable. Please try again later.';
      
    } else if (error.code === 'auth/admin-restricted-operation') {
      showErrorMessage()
      formErrorMessage.textContent =
        'Account creation is currently restricted. Please try again later.';
      
    } else {
      showErrorMessage()
      formErrorMessage.textContent =
        'We could not create your account. Please try again later.';
    }
    console.log(error.code);
    console.log(error.message);
    loadingState = false;
    loadingStateManager()
  }
}

function loadingStateManager() {
  if (loadingState === true) {
    overlay.style.display = "flex";
  }
  else {
    overlay.style.display = "none";
  }
}

function formValidation() {
  let passwordValidation = false;
  if (
    nationName.value !== "" &&
    nationId.value !== "" &&
    email.value !== "" &&
    confirmPassword.value !== "" &&
    password.value !== "" &&
    countryselected.value !== "" &&
    selectedTimezone.value !== "" &&
    agreeToTerms.checked
  ) {
    
    if (password.value === confirmPassword.value) {
      
      if (password.value.length >= 8) {
        
        if (
          /\d/.test(password.value) &&
          /[A-Z]/.test(password.value) &&
          /[a-z]/.test(password.value) &&
          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]/.test(password.value)
        ) {
          passwordValidation = true;
        }
        
        else {
          showErrorMessage()
          errorCard.style.display = 'block';
          formErrorMessage.textContent = 'Password requirements: At least 8 characters, including an uppercase letter, lowercase letter, number, and special character. e.g: Secure@123';
          return
        }
        
      }
      
      else {
        showErrorMessage()
        errorCard.style.display = 'block';
        formErrorMessage.textContent = 'Password requirements: At least 8 characters, including an uppercase letter, lowercase letter, number, and special character. e.g: Secure@123';
        return
      }
    }
    
    else {
      showErrorMessage()
      errorCard.style.display = 'block';
      formErrorMessage.textContent = 'Please check if password match.';
      return
    }
  }
  
  else {
    showErrorMessage()
    errorCard.style.display = 'block';
    formErrorMessage.textContent = 'Please fill in all required fields before creating your account.';
    return
    
  }
  
  return passwordValidation
}

function showErrorMessage() {
  window.scrollTo({
    top: 180,
    behavior: 'smooth'
  });
}

function handleSignUp() {
  if (formValidation()) {
    createAccount();
    loadingStateManager();
  }
}

function authLogic() {
  
  createAccoumtBtn.addEventListener('click', handleSignUp);
  
  errorTryAgainBtn.addEventListener('click', handleSignUp);
  
  errorCancelBtn.addEventListener('click', () => {
    errorCard.style.display = 'none';
  });
  
}

authLogic()

function populateTimezones() {
  
  // Get all the timezones supported by the browser
  const timezones = Intl.supportedValuesOf('timeZone');
  
  // Get the user's current timezone
  const userTimezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Create an option for every timezone
  timezones.forEach((timezone) => {
    
    const option = document.createElement('option');
    
    option.value = timezone;
    option.textContent = timezone;
    
    // Automatically select the user's timezone
    if (timezone === userTimezone) {
      option.selected = true;
    }
    selectedTimezone.appendChild(option);
  });
  
}

populateTimezones();