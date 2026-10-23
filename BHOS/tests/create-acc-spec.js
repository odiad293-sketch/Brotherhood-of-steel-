
import { createAccount } from "../scripts/auth/signUP/services/create-account.js";

describe("createAccount", function () {
  let formContainer;
  let mockFunction;

  const fakeUserCredential = {
    user: {
      uid: "mock-firebase-uid-abc123"
    }
  };

  const fakeUserRef = {
    id: fakeUserCredential.user.uid
  };

  beforeEach(function () {
    // Create the HTML fixture required by createAccount().
    formContainer = document.createElement("div");

    formContainer.innerHTML = `
      <div class="overlay">
        <div class="loading-state">
          <div class="loading-writeup">Loading...</div>
        </div>
      </div>

      <div class="error-card" style="display: none;">
        <div class="error-icon">!</div>
        <div class="error-content">
          <h3>Something went wrong</h3>
          <p class="error-message"></p>
        </div>
      </div>

      <div class="signUp-container">
        <input class="js-nation-input" type="text" />
        <input class="js-nation-Id-input" type="text" />
        <input class="email-input" type="email" />
        <input class="password-value" type="password" />
        <input class="js-confirm-password" type="password" />

        <select class="country-selected">
          <option value="canada">Canada</option>
        </select>

        <select class="timezone-select">
          <option value="Africa/Lagos">Africa/Lagos</option>
        </select>

        <input class="agree-to-terms" type="checkbox" />
      </div>
    `;

    document.body.appendChild(formContainer);

    // Create fresh spies for each test.
    mockFunction = jasmine.createSpyObj("mockFunction", [
      "createUser",
      "getDocumentRef",
      "saveDocument",
      "observeAuthState",
      "timestamp",
      "updateLoading",
      "manageLoading",
      "scrollError"
    ]);
  });

  function fillRequiredFields() {
    formContainer.querySelector(".js-nation-input").value =
      "Test Nation";

    formContainer.querySelector(".js-nation-Id-input").value =
      "12345";

    formContainer.querySelector(".email-input").value =
      "test@example.com";

    formContainer.querySelector(".password-value").value =
      "StrongPassword123";

    formContainer.querySelector(".js-confirm-password").value =
      "StrongPassword123";

    formContainer.querySelector(".country-selected").value =
      "canada";

    formContainer.querySelector(".timezone-select").value =
      "Africa/Lagos";

    formContainer.querySelector(".agree-to-terms").checked = true;
  }

  function getDependencies() {
    mockFunction.createUser.and.callFake(
      (auth, email, password) => {
        if (
          email === "test@example.com" &&
          password === "StrongPassword123"
        ) {
          return Promise.resolve(fakeUserCredential);
        }

        return Promise.reject(
          new Error("Invalid email or password")
        );
      }
    );

    mockFunction.getDocumentRef.and.returnValue(fakeUserRef);

    mockFunction.saveDocument.and.returnValue(
      Promise.resolve()
    );

    mockFunction.timestamp.and.returnValue(
      "Oct 17, 2026"
    );

    return {
      createUser: mockFunction.createUser,
      getDocumentRef: mockFunction.getDocumentRef,
      saveDocument: mockFunction.saveDocument,
      observeAuthState: mockFunction.observeAuthState,
      timestamp: mockFunction.timestamp,
      updateLoading: mockFunction.updateLoading,
      manageLoading: mockFunction.manageLoading,
      scrollError: mockFunction.scrollError
    };
  }

  it("should create an account successfully", async function () {
    fillRequiredFields();

    const dependencies = getDependencies();

    await createAccount(dependencies);

    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(true);

    expect(
      dependencies.manageLoading
    ).toHaveBeenCalled();

    // 1. Check that account creation received the expected values.
    expect(dependencies.createUser).toHaveBeenCalledWith(
      jasmine.anything(),
      "test@example.com",
      "StrongPassword123"
    );

    // 2. Check that the returned Firebase UID was used.
    expect(dependencies.getDocumentRef).toHaveBeenCalledWith(
      jasmine.anything(),
      "users",
      fakeUserCredential.user.uid
    );

    // 3. Check that Firestore received the correct reference
    // and user profile object.
    expect(dependencies.saveDocument).toHaveBeenCalledWith(
      fakeUserRef,
      jasmine.objectContaining({
        userName: "unknown",
        nation: "Test Nation",
        nationId: "12345",
        email: "test@example.com",
        country: "canada",
        timezone: "Africa/Lagos",
        agreedToTerms: true,
        role: "initiate",
        created_At: "Oct 17, 2026"
      })
    );

    // 4. Check that the auth-state observer was registered.
    expect(
      dependencies.observeAuthState
    ).toHaveBeenCalled();

    // 5. Check that loading started and was stopped.
    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(true);

    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(false);

    expect(
      dependencies.manageLoading
    ).toHaveBeenCalled();
  });

  it("should display an error if Firebase account creation fails", async function () {
    fillRequiredFields();

    const dependencies = getDependencies();

    dependencies.createUser.and.returnValue(
      Promise.reject({
        code: "auth/email-already-in-use"
      })
    );

    await createAccount(dependencies);

    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(true);

    expect(
      dependencies.manageLoading
    ).toHaveBeenCalled();

    const errorCard = formContainer.querySelector(".error-card");
    const errorMessage =
      formContainer.querySelector(".error-message");

    expect(errorCard.style.display).toBe("block");

    expect(errorMessage.textContent).toBe(
      "An account with this email already exists. Please sign in instead."
    );

    expect(dependencies.scrollError).toHaveBeenCalled();

    // The remaining Firebase operations should not run.
    expect(
      dependencies.getDocumentRef
    ).not.toHaveBeenCalled();

    expect(
      dependencies.saveDocument
    ).not.toHaveBeenCalled();

    // Loading should still stop after the failure.
    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(false);
  });

  it("should display an error if saving the profile to Firestore fails", async function () {
    fillRequiredFields();

    const dependencies = getDependencies();

    dependencies.saveDocument.and.returnValue(
      Promise.reject(new Error("Firestore unavailable"))
    );

    await createAccount(dependencies);
    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(true);

    expect(
      dependencies.manageLoading
    ).toHaveBeenCalled();

    const errorCard = formContainer.querySelector(".error-card");
    const errorMessage =
      formContainer.querySelector(".error-message");

    expect(dependencies.createUser).toHaveBeenCalled();

    expect(
      dependencies.getDocumentRef
    ).toHaveBeenCalled();

    expect(
      dependencies.saveDocument
    ).toHaveBeenCalled();

    expect(errorCard.style.display).toBe("block");

    expect(errorMessage.textContent).toBe(
      "We could not create your account. Please try again later."
    );

    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(false);
  });

  it("should display an error if email is already in use", async function () {
    fillRequiredFields();

    const dependencies = getDependencies();

    dependencies.createUser.and.returnValue(
      Promise.reject({
        code: 'auth/email-already-in-use'
      })
    );

    await createAccount(dependencies);

    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(true);

    expect(
      dependencies.manageLoading
    ).toHaveBeenCalled();

    const errorCard = formContainer.querySelector(".error-card");
    const errorMessage = formContainer.querySelector(".error-message");

    expect(dependencies.createUser).toHaveBeenCalled();

    expect(errorCard.style.display).toBe("block");

    expect(errorMessage.textContent).toBe(
      "An account with this email already exists. Please sign in instead."
    );

    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(false);
  });

   it("should display an error if email is invalid", async function () {
    fillRequiredFields();

    const dependencies = getDependencies();

    dependencies.createUser.and.returnValue(
      Promise.reject({
        code:  'auth/invalid-email'
      })
    );

    await createAccount(dependencies);

    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(true);

    expect(
      dependencies.manageLoading
    ).toHaveBeenCalled();

    const errorCard = formContainer.querySelector(".error-card");
    const errorMessage = formContainer.querySelector(".error-message");

    expect(dependencies.createUser).toHaveBeenCalled();

    expect(errorCard.style.display).toBe("block");

    expect(errorMessage.textContent).toBe(
      "Please enter a valid email address."
    );

    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(false);
  });

  it("should display an error if unstable internet connection is found", async function () {
    fillRequiredFields();

    const dependencies = getDependencies();

    dependencies.createUser.and.returnValue(
      Promise.reject({
        code:'auth/network-request-failed'
      })
    );

    await createAccount(dependencies);

    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(true);

    expect(
      dependencies.manageLoading
    ).toHaveBeenCalled();

    const errorCard = formContainer.querySelector(".error-card");
    const errorMessage = formContainer.querySelector(".error-message");

    expect(dependencies.createUser).toHaveBeenCalled();

    expect(errorCard.style.display).toBe("block");

    expect(errorMessage.textContent).toBe(
      "Network error. Please check your internet connection and try again."
    );

    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(false);
  });

  it("should display an error if too many acc creation request detected", async function () {
    fillRequiredFields();

    const dependencies = getDependencies();

    dependencies.createUser.and.returnValue(
      Promise.reject({
        code:'auth/too-many-requests'
      })
    );

    await createAccount(dependencies);

    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(true);

    expect(
      dependencies.manageLoading
    ).toHaveBeenCalled();

    const errorCard = formContainer.querySelector(".error-card");
    const errorMessage = formContainer.querySelector(".error-message");

    expect(dependencies.createUser).toHaveBeenCalled();

    expect(errorCard.style.display).toBe("block");

    expect(errorMessage.textContent).toBe(
      'Too many attempts. Please wait a moment and try again.'
    );

    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(false);
  });

   it("should display an error if Auth operation is not allowed", async function () {
    fillRequiredFields();

    const dependencies = getDependencies();

    dependencies.createUser.and.returnValue(
      Promise.reject({
        code: 'auth/operation-not-allowed'
      })
    );

    await createAccount(dependencies);

    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(true);

    expect(
      dependencies.manageLoading
    ).toHaveBeenCalled();

    const errorCard = formContainer.querySelector(".error-card");
    const errorMessage = formContainer.querySelector(".error-message");

    expect(dependencies.createUser).toHaveBeenCalled();

    expect(errorCard.style.display).toBe("block");

    expect(errorMessage.textContent).toBe(
      'Account creation is currently unavailable. Please try again later.'
    );

    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(false);
  });

it("should display an error if admin restriction found", async function () {
    fillRequiredFields();

    const dependencies = getDependencies();

    dependencies.createUser.and.returnValue(
      Promise.reject({
        code: 'auth/admin-restricted-operation'
      })
    );

    await createAccount(dependencies);

    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(true);

    expect(
      dependencies.manageLoading
    ).toHaveBeenCalled();

    const errorCard = formContainer.querySelector(".error-card");
    const errorMessage = formContainer.querySelector(".error-message");

    expect(dependencies.createUser).toHaveBeenCalled();

    expect(errorCard.style.display).toBe("block");

    expect(errorMessage.textContent).toBe(
        'Account creation is currently restricted. Please try again later.'
    );

    expect(
      dependencies.updateLoading
    ).toHaveBeenCalledWith(false);
  });

  afterEach(function () {
    formContainer.remove();
  });
});
