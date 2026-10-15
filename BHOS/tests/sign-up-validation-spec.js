import { formValidation } from "../scripts/auth/signUP/sign-up-validation.js";

describe("formValidation", function () {
  let formContainer;

  beforeEach(() => {
    formContainer = document.createElement("div");
    formContainer.id = "test-form";
    document.body.appendChild(formContainer);

    formContainer.innerHTML = `
      <div class="error-card" style="display: none;">
        <div class="error-icon">!</div>

        <div class="error-content">
          <h3>Something went wrong</h3>
          <p class="error-message"></p>
        </div>

        <div class="error-actions">
          <button class="error-btn retry-btn">Try Again</button>
          <button class="error-btn close-btn">Close</button>
        </div>
      </div>

      <div class="signUp-container">
        <div class="signUp-form">
          <div class="form-name">NATION NAME</div>
          <input
            class="js-nation-input"
            type="text"
            placeholder="Enter nation name"
          />
        </div>

        <div class="signUp-form">
          <div class="form-name">NATION ID</div>
          <input
            class="js-nation-Id-input"
            type="text"
            placeholder="Enter nation ID"
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

        <div class="signUp-form">
          <div class="form-name">PASSWORD</div>
          <input
            class="password-value"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <div class="signUp-form">
          <div class="form-name">CONFIRM PASSWORD</div>
          <input
            class="js-confirm-password"
            type="password"
            placeholder="Confirm your password"
          />
        </div>

        <div class="country-and-timeZone-contaimer">
          <div class="country-selection">
            <select class="country-selected">
              <option value="">Select your country</option>
              <option value="us">United States</option>
              <option value="canada">Canada</option>
              <option value="nigeria">Nigeria</option>
            </select>
          </div>

          <div class="timezone-selection">
            <select class="timezone-select">
              <option value="">Select your time zone</option>
              <option value="Africa/Lagos">Africa/Lagos</option>
            </select>
          </div>
        </div>
      </div>

      <div class="agreement">
        <input type="checkbox" class="agree-to-terms" />
        <span>I agree to the terms and privacy policy</span>
      </div>
    `;
  });

  function getFormElements() {
    return {
      nationName: formContainer.querySelector(".js-nation-input"),
      nationId: formContainer.querySelector(".js-nation-Id-input"),
      email: formContainer.querySelector(".email-input"),
      country: formContainer.querySelector(".country-selected"),
      agreeToTerms: formContainer.querySelector(".agree-to-terms"),
      errorCard: formContainer.querySelector(".error-card"),
      errorMessage: formContainer.querySelector(".error-message"),
      timezone: formContainer.querySelector(".timezone-select"),
      password: formContainer.querySelector(".password-value"),
      confirmPassword: formContainer.querySelector(
        ".js-confirm-password"
      ),
    };
  }

  function fillRequiredFields() {
    const fields = getFormElements();

    fields.nationName.value = "Test Nation";
    fields.nationId.value = "12345";
    fields.email.value = "test@example.com";
    fields.country.value = "canada";
    fields.timezone.value = "Africa/Lagos";
    fields.agreeToTerms.checked = true;
  }

  afterEach(() => {
    formContainer.remove();
  });

  it("should reject when required fields are empty", function () {
    const fields = getFormElements();

    formValidation();

    expect(fields.errorMessage.textContent).toBe(
      "Please fill in all required fields before creating your account."
    );
    expect(fields.errorCard.style.display).toBe("block");
  });

  it("should reject when passwords do not match", function () {
    const fields = getFormElements();

    fillRequiredFields();
    fields.password.value = "Secure@123";
    fields.confirmPassword.value = "Secure@456";

    formValidation();

    expect(fields.errorMessage.textContent).toBe(
      "Please check if password match."
    );
  });

  it("should reject a password shorter than 8 characters", function () {
    const fields = getFormElements();

    fillRequiredFields();
    fields.password.value = "Abc@123";
    fields.confirmPassword.value = "Abc@123";

    formValidation();

    expect(fields.errorMessage.textContent).toBe(
      "Password requirements: At least 8 characters, including an uppercase letter, lowercase letter, number, and special character. e.g: Secure@123"
    );
  });

  it("should reject a password without a special character", function () {
    const fields = getFormElements();

    fillRequiredFields();
    fields.password.value = "Secure1123";
    fields.confirmPassword.value = "Secure1123";

    formValidation();

    expect(fields.errorMessage.textContent).toBe(
      "Password requirements: At least 8 characters, including an uppercase letter, lowercase letter, number, and special character. e.g: Secure@123"
    );
  });

  it("should accept valid input", function () {
    const fields = getFormElements();

    fillRequiredFields();
    fields.password.value = "Secure@123";
    fields.confirmPassword.value = "Secure@123";

    const result = formValidation();

    expect(result).toBe(true);
  });
});