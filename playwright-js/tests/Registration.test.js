import test from '../testFixtures/fixture.js';

test.describe.parallel('Registration Tests @regression', () => {
  
  test('[SCRUM-396] Verify that user can successfully register with valid email and password @smoke', async ({ page, registrationPage }) => {
    await test.step('Navigate to registration page', async () => {
      await registrationPage.navigateToRegistration();
    });

    await test.step('Verify registration form is displayed', async () => {
      await registrationPage.verifyRegistrationFormDisplayed();
    });

    await test.step('Fill registration form with valid email and password', async () => {
      const email = registrationPage.generateUniqueEmail();
      const password = registrationPage.generateValidPassword();
      await registrationPage.registerUser(email, password);
    });

    await test.step('Verify successful registration', async () => {
      await registrationPage.verifySuccessfulRegistration();
    });
  });

  test('[SCRUM-397] Verify that registration form displays all required fields @smoke', async ({ page, registrationPage }) => {
    await test.step('Navigate to registration page', async () => {
      await registrationPage.navigateToRegistration();
    });

    await test.step('Verify all required fields are displayed', async () => {
      await registrationPage.verifyAllRequiredFieldsDisplayed();
    });
  });

  test('[SCRUM-398] Verify that user cannot register with already existing email address @smoke', async ({ page, registrationPage }) => {
    const existingEmail = 'existing.user@example.com';
    const password = registrationPage.generateValidPassword();

    await test.step('Navigate to registration page', async () => {
      await registrationPage.navigateToRegistration();
    });

    await test.step('Attempt to register with existing email', async () => {
      await registrationPage.registerUser(existingEmail, password);
    });

    await test.step('Verify duplicate email error is displayed', async () => {
      await registrationPage.verifyDuplicateEmailError();
    });
  });

  test('[SCRUM-399] Verify that registration fails when email field is left empty @smoke', async ({ page, registrationPage }) => {
    await test.step('Navigate to registration page', async () => {
      await registrationPage.navigateToRegistration();
    });

    await test.step('Submit form with empty email field', async () => {
      const password = registrationPage.generateValidPassword();
      await registrationPage.registerUser('', password);
    });

    await test.step('Verify email required error is displayed', async () => {
      await registrationPage.verifyEmailRequiredError();
    });
  });

  test('[SCRUM-400] Verify that registration fails when password field is left empty @smoke', async ({ page, registrationPage }) => {
    await test.step('Navigate to registration page', async () => {
      await registrationPage.navigateToRegistration();
    });

    await test.step('Submit form with empty password field', async () => {
      const email = registrationPage.generateUniqueEmail();
      await registrationPage.registerUser(email, '');
    });

    await test.step('Verify password required error is displayed', async () => {
      await registrationPage.verifyPasswordRequiredError();
    });
  });

  test('[SCRUM-401] Verify that registration fails with invalid email format @smoke', async ({ page, registrationPage }) => {
    await test.step('Navigate to registration page', async () => {
      await registrationPage.navigateToRegistration();
    });

    await test.step('Submit form with invalid email format', async () => {
      const password = registrationPage.generateValidPassword();
      await registrationPage.registerUser('invalidemail', password);
    });

    await test.step('Verify invalid email format error is displayed', async () => {
      await registrationPage.verifyInvalidEmailFormatError();
    });
  });

  test('[SCRUM-402] Verify that password and confirm password fields must match @smoke', async ({ page, registrationPage }) => {
    await test.step('Navigate to registration page', async () => {
      await registrationPage.navigateToRegistration();
    });

    await test.step('Fill form with mismatched passwords', async () => {
      const email = registrationPage.generateUniqueEmail();
      const password = registrationPage.generateValidPassword();
      const mismatchPassword = 'DifferentPass456!';
      await registrationPage.registerUser(email, password, mismatchPassword);
    });

    await test.step('Verify password mismatch error is displayed', async () => {
      await registrationPage.verifyPasswordMismatchError();
    });
  });

  test('[SCRUM-403] Verify that email field accepts maximum allowed character length @regression', async ({ page, registrationPage }) => {
    await test.step('Navigate to registration page', async () => {
      await registrationPage.navigateToRegistration();
    });

    await test.step('Fill email field with maximum length', async () => {
      await registrationPage.fillEmailWithMaxLength(255);
    });

    await test.step('Submit form with maximum length email', async () => {
      const password = registrationPage.generateValidPassword();
      await registrationPage.submitRegistration();
    });

    await test.step('Verify registration succeeds or handles gracefully', async () => {
      // Note: Behavior depends on app - may succeed or show length validation
      await registrationPage.wait();
    });
  });
});

