import {
     passwordToggle,
     confirmPasswordToggle,
     password,
     confirmPassword } from "./sign-up.js";

export function rederSignInForm() {
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

export function passwordVisibilityController() {
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

export function loadingStateManager() {
  if (loadingState === true) {
    overlay.style.display = "flex";
  }
  else {
    overlay.style.display = "none";
  }
}

export function scrollToErrorMessage() {
  window.scrollTo({
    top: 180,
    behavior: 'smooth'
  });
}