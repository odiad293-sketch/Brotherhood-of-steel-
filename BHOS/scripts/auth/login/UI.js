export const renderLoginHTML = () => {
  let loginHTML = `
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
              <span class="material-symbols-outlined password-toggle">  visibility  </span>
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

export function passwordVisibilityController() {
  const password = document.querySelector('.js-password-value');
  const  passwordToggle = document.querySelector('.password-toggle');
  
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

export const createAccountRedirect = () => {
  const createAcc = document.querySelector(".sign-in-button")
  createAcc.addEventListener("click", () => {
    window.location.href = "index.html"
  });
}

export function scrollToErrorMessage() {
  window.scrollTo({
    top: 180,
    behavior: 'smooth'
  });
}
