import { test, expect } from '../fixtures/test.js';
import LoginPage from '../pageObjects/LoginPage.js';
import testData from '../test-data/testdata.json' assert { type: 'json' };

test('[2814] Verify that login fails when both username and password fields are empty @Regression', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const { emptyCredentials } = testData.login;

  await test.step('Navigate to login page', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.verifyLoginPageDisplayed();
  });

  await test.step('Leave both username and password fields empty', async () => {
    await loginPage.leaveBothFieldsEmpty();
    await loginPage.verifyBothFieldsBlank();
  });

  await test.step('Click the login button', async () => {
    await loginPage.clickLoginButton();
    await loginPage.verifyFormAttemptedSubmission();
  });

  await test.step('Verify validation error messages are displayed for both fields', async () => {
    await loginPage.verifyValidationErrorsDisplayed();
  });

  await test.step('Verify user remains on login page', async () => {
    await loginPage.verifyUserRemainsOnLoginPage();
  });
});

