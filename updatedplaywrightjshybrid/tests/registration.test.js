import { test, expect } from '../fixtures/test.js';
import RegistrationPage from '../pageObjects/RegistrationPage.js';

test('[2696] Verify that registration fails when username field is empty @Regression', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await test.step('STEP 1: Navigate to registration page from url', async () => {
    await registrationPage.navigate();
    await registrationPage.verifyRegistrationPageDisplayed();
  });

  await test.step('STEP 2: Leave username field empty', async () => {
    await registrationPage.leaveUsernameEmpty();
    await registrationPage.verifyUsernameFieldBlank();
  });

  await test.step('STEP 3: Enter valid email, password, and confirm password', async () => {
    await registrationPage.fillEmail(process.env.TEST_EMAIL);
    await registrationPage.fillPassword(process.env.TEST_PASSWORD);
    await registrationPage.fillConfirmPassword(process.env.TEST_PASSWORD);
    await registrationPage.verifyOtherFieldsFilled(
      process.env.TEST_EMAIL,
      process.env.TEST_PASSWORD,
      process.env.TEST_PASSWORD
    );
  });

  await test.step('STEP 4: Submit the registration form', async () => {
    await registrationPage.submitRegistrationForm();
  });

  await test.step('STEP 5: Verify username required validation message is displayed', async () => {
    await registrationPage.verifyUsernameRequiredMessageDisplayed();
  });

  await test.step('STEP 6: Verify user remains on registration page', async () => {
    await registrationPage.verifyUserRemainsOnRegistrationPage();
  });
});

