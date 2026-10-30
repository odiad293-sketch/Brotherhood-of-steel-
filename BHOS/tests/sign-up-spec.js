
import { initSignUpPage } from "../scripts/auth/signUP/sign-up.js";

describe('Sign-up coordinator integration tests', function () {
  let elements;
  let documentRef;
  let windowRef;
  let dependencies;
  let authStateCallback;

  // Creates a lightweight fake DOM element.
  function createElement() {
    const listeners = {};

    return {
      style: { display: '' },
      listeners,

      addEventListener: jasmine
        .createSpy('addEventListener')
        .and.callFake((eventName, callback) => {
          listeners[eventName] = callback;
        }),

      async trigger(eventName) {
        if (!listeners[eventName]) {
          throw new Error(`No ${eventName} listener was registered.`);
        }

        return await listeners[eventName]();
      }
    };
  }

  // Creates a fresh, isolated test environment for each test.
  function setup() {
    elements = {
      createAccount: createElement(),
      signIn: createElement(),
      errorCard: createElement(),
      retry: createElement(),
      cancel: createElement()
    };

    const selectorMap = {
      '.js-creat-account-btn': elements.createAccount,
      '.sign-in-button': elements.signIn,
      '.error-card': elements.errorCard,
      '.retry-btn': elements.retry,
      '.close-btn': elements.cancel
    };

    documentRef = {
      querySelector: jasmine
        .createSpy('querySelector')
        .and.callFake(selector => selectorMap[selector] ?? null)
    };

    windowRef = {
      location: { href: '' }
    };

    authStateCallback = undefined;

    dependencies = {
      formValidation: jasmine
        .createSpy('formValidation')
        .and.returnValue(true),

      auth: { testAuth: true },

      onAuthStateChanged: jasmine
        .createSpy('onAuthStateChanged')
        .and.callFake((auth, callback) => {
          authStateCallback = callback;
          return jasmine.createSpy('unsubscribe');
        }),

      renderSignInForm: jasmine.createSpy('renderSignInForm'),

      passwordVisibilityController: jasmine
        .createSpy('passwordVisibilityController'),

      populateTimezones: jasmine.createSpy('populateTimezones'),

      pnwInfoCollector: jasmine
        .createSpy('pnwInfoCollector')
        .and.resolveTo(true),

      createAccount: jasmine
        .createSpy('createAccount')
        .and.resolveTo(),

      documentRef,
      windowRef
    };

    initSignUpPage(dependencies);
  }

  beforeEach(function () {
    setup();
  });

  describe('initialisation', function () {
    it('should render the form and initialise the supporting UI functions', function () {
      expect(dependencies.renderSignInForm).toHaveBeenCalledTimes(1);
      expect(
        dependencies.passwordVisibilityController
      ).toHaveBeenCalledTimes(1);
      expect(dependencies.populateTimezones).toHaveBeenCalledTimes(1);
    });

    it('should register the authentication-state observer', function () {
      expect(dependencies.onAuthStateChanged).toHaveBeenCalledOnceWith(
        dependencies.auth,
        jasmine.any(Function)
      );

      expect(authStateCallback).toEqual(jasmine.any(Function));
    });

    it('should register all required click listeners', function () {
      expect(elements.createAccount.addEventListener)
        .toHaveBeenCalledWith('click', jasmine.any(Function));

      expect(elements.retry.addEventListener)
        .toHaveBeenCalledWith('click', jasmine.any(Function));

      expect(elements.cancel.addEventListener)
        .toHaveBeenCalledWith('click', jasmine.any(Function));

      expect(elements.signIn.addEventListener)
        .toHaveBeenCalledWith('click', jasmine.any(Function));
    });
  });

  describe('signup workflow', function () {
    it('should validate, verify the nation, then create the account', async function () {
      await elements.createAccount.trigger('click');

      expect(dependencies.formValidation).toHaveBeenCalledTimes(1);
      expect(dependencies.pnwInfoCollector).toHaveBeenCalledTimes(1);
      expect(dependencies.createAccount).toHaveBeenCalledTimes(1);

      // Confirm the required order of the three operations.
      expect(
        dependencies.formValidation.calls.first().invocationOrder
      ).toBeLessThan(
        dependencies.pnwInfoCollector.calls.first().invocationOrder
      );

      expect(
        dependencies.pnwInfoCollector.calls.first().invocationOrder
      ).toBeLessThan(
        dependencies.createAccount.calls.first().invocationOrder
      );
    });

    it('should stop when form validation fails', async function () {
      dependencies.formValidation.and.returnValue(false);

      await elements.createAccount.trigger('click');

      expect(dependencies.formValidation).toHaveBeenCalledTimes(1);
      expect(dependencies.pnwInfoCollector).not.toHaveBeenCalled();
      expect(dependencies.createAccount).not.toHaveBeenCalled();
    });

    it('should stop when nation verification fails', async function () {
      dependencies.pnwInfoCollector.and.resolveTo(false);

      await elements.createAccount.trigger('click');

      expect(dependencies.formValidation).toHaveBeenCalledTimes(1);
      expect(dependencies.pnwInfoCollector).toHaveBeenCalledTimes(1);
      expect(dependencies.createAccount).not.toHaveBeenCalled();
    });

    it('should not verify the nation if validation throws an error', async function () {
      dependencies.formValidation.and.throwError('Validation failed');

      await expectAsync(
        elements.createAccount.trigger('click')
      ).toBeRejectedWithError('Validation failed');

      expect(dependencies.pnwInfoCollector).not.toHaveBeenCalled();
      expect(dependencies.createAccount).not.toHaveBeenCalled();
    });

    it('should not create an account if nation verification rejects', async function () {
      dependencies.pnwInfoCollector.and.rejectWith(
        new Error('Verification request failed')
      );

      await expectAsync(
        elements.createAccount.trigger('click')
      ).toBeRejectedWithError('Verification request failed');

      expect(dependencies.createAccount).not.toHaveBeenCalled();
    });

    it('should propagate an account-creation error without skipping cleanup', async function () {
      dependencies.createAccount.and.rejectWith(
        new Error('Account creation failed')
      );

      await expectAsync(
        elements.createAccount.trigger('click')
      ).toBeRejectedWithError('Account creation failed');

      // The coordinator should release its duplicate-submission guard.
      dependencies.createAccount.and.resolveTo();

      await elements.createAccount.trigger('click');

      expect(dependencies.createAccount).toHaveBeenCalledTimes(2);
    });
  });

  describe('duplicate-submission protection', function () {
    it('should ignore a second signup while the first is still running', async function () {
      let resolveVerification;

      dependencies.pnwInfoCollector.and.callFake(() => {
        return new Promise(resolve => {
          resolveVerification = resolve;
        });
      });

      const firstSubmission = elements.createAccount.trigger('click');

      // Allow the first handler to reach the pending verification call.
      await Promise.resolve();

      const secondSubmission = elements.createAccount.trigger('click');

      await secondSubmission;

      expect(dependencies.formValidation).toHaveBeenCalledTimes(1);
      expect(dependencies.pnwInfoCollector).toHaveBeenCalledTimes(1);
      expect(dependencies.createAccount).not.toHaveBeenCalled();

      resolveVerification(true);
      await firstSubmission;

      expect(dependencies.createAccount).toHaveBeenCalledTimes(1);
    });

    it('should allow a new attempt after validation fails', async function () {
      dependencies.formValidation.and.returnValues(false, true);

      await elements.createAccount.trigger('click');

      expect(dependencies.pnwInfoCollector).not.toHaveBeenCalled();

      await elements.createAccount.trigger('click');

      expect(dependencies.formValidation).toHaveBeenCalledTimes(2);
      expect(dependencies.pnwInfoCollector).toHaveBeenCalledTimes(1);
      expect(dependencies.createAccount).toHaveBeenCalledTimes(1);
    });
  });

  describe('retry and error-card behaviour', function () {
    it('should run the same signup workflow when retry is clicked', async function () {
      await elements.retry.trigger('click');

      expect(dependencies.formValidation).toHaveBeenCalledTimes(1);
      expect(dependencies.pnwInfoCollector).toHaveBeenCalledTimes(1);
      expect(dependencies.createAccount).toHaveBeenCalledTimes(1);
    });

    it('should hide the error card when cancel is clicked', async function () {
      elements.errorCard.style.display = 'block';

      await elements.cancel.trigger('click');

      expect(elements.errorCard.style.display).toBe('none');
    });
  });

  describe('navigation', function () {
    it('should redirect an authenticated user to the dashboard', function () {
      authStateCallback({ uid: 'test-user' });

      expect(windowRef.location.href).toBe('dashboard.html');
    });

    it('should not redirect when there is no authenticated user', function () {
      authStateCallback(null);

      expect(windowRef.location.href).toBe('');
    });

    it('should redirect to the login page when sign-in is clicked', async function () {
      await elements.signIn.trigger('click');

      expect(windowRef.location.href).toBe('login.html');
    });
  });
});
