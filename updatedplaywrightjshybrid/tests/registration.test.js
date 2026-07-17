import { test, expect } from '../fixtures/test.js';
import RegistrationPage from '../pageObjects/RegistrationPage.js';

/**
 * Registration Feature Tests
 * Test Case ID: 2697
 * Priority: 1-High
 */

test.describe('User Registration - Validation Tests', () => {
  
  test('[2697] Verify that registration fails when email field is empty @Regression', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const baseUrl = process.env.BASE_URL;
    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;

    await test.step('STEP 1: Navigate to registration page from url -> Registration page should be displayed', async () => {
      await registrationPage.navigateToRegistrationPage(`${baseUrl}/web/index.php/auth/login`);
      await registrationPage.verifyRegistrationPageDisplayed();
    });

    await test.step('STEP 2: Enter valid username -> Username should be entered successfully', async () => {
      await registrationPage.enterUsername(username);
      await registrationPage.verifyUsernameEntered();
    });

    await test.step('STEP 3: Leave email field empty -> Email field should remain blank', async () => {
      await registrationPage.leaveEmailEmpty();
      await registrationPage.verifyEmailFieldBlank();
    });

    await test.step('STEP 4: Enter valid password and confirm password -> Password fields should be filled', async () => {
      await registrationPage.enterPasswords(password, password);
      await registrationPage.verifyPasswordFieldsFilled();
    });

    await test.step('STEP 5: Submit the registration form -> Registration request should be submitted for validation', async () => {
      await registrationPage.submitRegistrationForm();
      await registrationPage.verifyRegistrationSubmittedForValidation();
    });

    await test.step('STEP 6: Verify email required validation message is displayed -> User should see error message for email field', async () => {
      await registrationPage.verifyEmailValidationMessageDisplayed();
    });
  });

});

