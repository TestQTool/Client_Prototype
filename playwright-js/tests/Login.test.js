const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const testData = require('../test-data/loginData.json');

test.describe('User Login Functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate(process.env.BASE_URL || testData.baseUrl);
  });

  test('TC001 - Verify successful login with valid credentials', async ({ page }) => {
    const validUser = testData.validUser;
    await loginPage.login(validUser.username, validUser.password);
    await loginPage.verifyLoginSuccess();
  });

  test('TC002 - Verify login failure with invalid username', async ({ page }) => {
    const invalidUser = testData.invalidUsername;
    await loginPage.login(invalidUser.username, invalidUser.password);
    await loginPage.verifyLoginFailure(testData.errorMessages.invalidCredentials);
  });

  test('TC003 - Verify login failure with invalid password', async ({ page }) => {
    const invalidPassword = testData.invalidPassword;
    await loginPage.login(invalidPassword.username, invalidPassword.password);
    await loginPage.verifyLoginFailure(testData.errorMessages.invalidCredentials);
  });

  test('TC004 - Verify login failure with empty credentials', async ({ page }) => {
    await loginPage.login('', '');
    await loginPage.verifyLoginFailure(testData.errorMessages.requiredFields);
  });

  test('TC005 - Verify login failure with empty username', async ({ page }) => {
    await loginPage.login('', testData.validUser.password);
    await loginPage.verifyLoginFailure(testData.errorMessages.usernameRequired);
  });

  test('TC006 - Verify login failure with empty password', async ({ page }) => {
    await loginPage.login(testData.validUser.username, '');
    await loginPage.verifyLoginFailure(testData.errorMessages.passwordRequired);
  });
});
