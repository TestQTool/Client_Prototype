import { test, expect } from '../fixtures/test.js';
import RegistrationPage from '../pageObjects/RegistrationPage.js';
import testData from '../test-data/testdata.json' assert { type: 'json' };

test('[3219] Verify that user can successfully register with valid unique username and password @Smoke', async ({ page }) => {
  test.info().annotations.push(
    { type: 'priority', description: '1-High' },
    { type: 'testcase_id', description: '3219' }
  );

  const registrationPage = new RegistrationPage(page);
  const username = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;
  const { successMessage } = testData.registration;

  await test.step('Navigate to url', async () => {
    await registrationPage.navigateToHomePage();
  });

  await test.step('Home page should load successfully', async () => {
    await registrationPage.verifyHomePageLoaded();
  });

  await test.step('Click the Sign Up button', async () => {
    await registrationPage.clickSignUpButton();
  });

  await test.step('Registration modal should open', async () => {
    await registrationPage.verifyRegistrationModalOpened();
  });

  await test.step('Enter unique username in Username field', async () => {
    await registrationPage.enterUsername(username);
  });

  await test.step('Username should be entered successfully', async () => {
    await registrationPage.verifyUsernameEntered();
  });

  await test.step('Enter password in Password field', async () => {
    await registrationPage.enterPassword(password);
  });

  await test.step('Password should be entered successfully', async () => {
    await registrationPage.verifyPasswordEntered();
  });

  await test.step('Click Sign Up button in the modal', async () => {
    await registrationPage.verifySuccessMessageDisplayed(successMessage);
    await registrationPage.submitRegistration();
  });

  await test.step('System should display account creation success message', async () => {
    await page.waitForTimeout(1000);
  });

  await test.step('Modal should close after successful registration', async () => {
    await registrationPage.verifyRegistrationModalClosed();
  });
});

