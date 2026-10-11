import { formValidation } from "../scripts/auth/signUP/sign-up-validation.js"
describe('formValidation', function () {
    beforeEach(() => {
        const formContainer = document.createElement("div")
        formContainer.id = "test-form";
        document.body.appendChild(formContainer)
        document.querySelector('#test-form').innerHTML = `
            <div class="error-card">
  <div class="error-icon">!</div>

  <div class="error-content">
    <h3>Something went wrong</h3>
    <p class='error-message'></p>
  </div>

  <div class="error-actions">
    <button class="error-btn retry-btn">Try Again</button>
    <button class="error-btn close-btn">Close</button>
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
    `;
        formValidation()
    });

    it("should make sure all require field are filled", function () {
        const nationName = document.querySelector('.js-nation-input');
        const nationId = document.querySelector('.js-nation-Id-input');
        const email = document.querySelector('.email-input');
        const countryselected = document.querySelector('.country-selected');
        const agreeToTerms = document.querySelector('.agree-to-terms');
        const errorCard = document.querySelector('.error-card');
        const formErrorMessage = document.querySelector('.error-message');
        const selectedTimezone = document.querySelector('.timezone-select');
        const password = document.querySelector('.password-value');
        const confirmPassword = document.querySelector('.js-confirm-password');

        nationName.value = "";
        nationId.value = "";
        email.value = "";
        confirmPassword.value = "";
        password.value = "";
        countryselected.value = "";
        selectedTimezone.value = "";
        !agreeToTerms.checked;

        formValidation()
        expect(formErrorMessage.textContent).toBe("Please fill in all required fields before creating your account.")
    });
});