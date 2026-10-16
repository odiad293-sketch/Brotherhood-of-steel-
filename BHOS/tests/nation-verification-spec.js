import { pnwInfoCollector, pnwVerifier } from "../scripts/auth/signUP/services/nation-verification.js";

describe('pnwVerifier', function () {
  let formContainer;
  beforeEach(() => {

    formContainer = document.createElement("div");
    formContainer.id = "test-form";
    document.body.appendChild(formContainer)
    formContainer.innerHTML = ` 
         <div class="overlay">
    <div class="loading-state">
      <img class="bhos-logo-loading" src="images/BHOS-log.png" alt="logo" />
      <div class="loading-writeup">Loading...</div>
    </div>
  </div>
 
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
    `;

  });

  function getFormElements() {
    return {
      formErrorMessage: formContainer.querySelector('.error-message'),
      nationName: formContainer.querySelector(".js-nation-input"),
      nationID: formContainer.querySelector(".js-nation-Id-input")
    }
  }

  function fillRequiredFields() {
    const fields = getFormElements();
    formContainer.querySelector(".errorMessage")
    formContainer.querySelector(".error-card")

    fields.nationName.value = "UNITED STATE OF AMERICA";
    fields.nationID.value = "746171";
  }

  it("sould return true if nation name and ID is valid", async function () {

    fillRequiredFields()
    const info = await pnwInfoCollector()
    expect(info).toBe(true)
  });

  it("should return false if either nation name or ID is invalid", async function () {
    const fields = getFormElements();
    fields.nationName.value = "INVALID_NATION";
    fields.nationID.value = "INVALID_ID";
    const info = await pnwInfoCollector();
    expect(info).toBe(false);
  });

  it("should return false if nation name and ID is empty", async function () {
    const fields = getFormElements();
    fields.nationName.value = "";
    fields.nationID.value = "";
    const info = await pnwInfoCollector();
    expect(info).toBe(false);
  });

  it("should update the UI if nation name and ID is invalid, or if there is a server error", async function () {
    const fields = getFormElements();
    fillRequiredFields()
    fields.nationName.value = "INVALID_NATION";
    fields.nationID.value = "INVALID_ID";
    const formErrorMessage = document.querySelector('.error-message');
    let pnwAccVerifier = await pnwVerifier();
    expect(formErrorMessage.textContent).toBe(pnwAccVerifier.error)
  });


  afterEach(() => {
    formContainer.remove();
  })
}, 10000);