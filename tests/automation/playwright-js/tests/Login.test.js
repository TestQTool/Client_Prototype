const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const testData = require('../test-data/loginTestData.json');

test.describe('User Login Functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate(process.env.BASE_URL || testData.baseUrl);
  });

  test('TC001 - Successful login with valid credentials', async ({ page }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await loginPage.verifySuccessfulLogin();
  });

  test('TC002 - Login fails with invalid username', async ({ page }) => {
    await loginPage.login(testData.invalidUser.username, testData.validUser.password);
    await loginPage.verifyErrorMessageDisplayed(testData.errorMessages.invalidCredentials);
  });

  test('TC003 - Login fails with invalid password', async ({ page }) => {
    await loginPage.login(testData.validUser.username, testData.invalidUser.password);
    await loginPage.verifyErrorMessageDisplayed(testData.errorMessages.invalidCredentials);
  });

  test('TC004 - Login fails with empty username', async ({ page }) => {
    await loginPage.login('', testData.validUser.password);
    await loginPage.verifyErrorMessageDisplayed(testData.errorMessages.emptyUsername);
  });

  test('TC005 - Login fails with empty password', async ({ page }) => {
    await loginPage.login(testData.validUser.username, '');
    await loginPage.verifyErrorMessageDisplayed(testData.errorMessages.emptyPassword);
  });

  test('TC006 - Login fails with both empty fields', async ({ page }) => {
    await loginPage.login('', '');
    await loginPage.verifyErrorMessageDisplayed(testData.errorMessages.emptyFields);
  });
});

test.describe('User Login with Multi-Factor Authentication (MFA)', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate(process.env.BASE_URL || testData.baseUrl);
  });

  test('TC007 - MFA screen is displayed after valid credentials', async ({ page }) => {
    await loginPage.login(testData.mfaUser.username, testData.mfaUser.password);
    await loginPage.verifyMfaScreenDisplayed();
  });

  test('TC008 - Successful login with valid MFA code', async ({ page }) => {
    await loginPage.login(testData.mfaUser.username, testData.mfaUser.password);
    await loginPage.verifyMfaScreenDisplayed();
    await loginPage.completeMfaVerification(testData.mfaUser.validMfaCode);
    await loginPage.verifySuccessfulLogin();
  });

  test('TC009 - MFA verification fails with invalid code', async ({ page }) => {
    await loginPage.login(testData.mfaUser.username, testData.mfaUser.password);
    await loginPage.verifyMfaScreenDisplayed();
    await loginPage.completeMfaVerification(testData.mfaUser.invalidMfaCode);
    await loginPage.verifyMfaErrorMessageDisplayed(testData.errorMessages.invalidMfaCode);
  });

  test('TC010 - MFA verification fails with empty code', async ({ page }) => {
    await loginPage.login(testData.mfaUser.username, testData.mfaUser.password);
    await loginPage.verifyMfaScreenDisplayed();
    await loginPage.completeMfaVerification('');
    await loginPage.verifyMfaErrorMessageDisplayed(testData.errorMessages.emptyMfaCode);
  });

  test('TC011 - Resend MFA code functionality', async ({ page }) => {
    await loginPage.login(testData.mfaUser.username, testData.mfaUser.password);
    await loginPage.verifyMfaScreenDisplayed();
    await loginPage.clickResendMfaCode();
    await expect(page.locator('.mfa-resend-success')).toBeVisible();
  });

  test('TC012 - Remember device option during MFA', async ({ page }) => {
    await loginPage.login(testData.mfaUser.username, testData.mfaUser.password);
    await loginPage.verifyMfaScreenDisplayed();
    await loginPage.checkRememberDevice();
    await loginPage.completeMfaVerification(testData.mfaUser.validMfaCode);
    await loginPage.verifySuccessfulLogin();
  });

  test('TC013 - MFA verification with expired code', async ({ page }) => {
    await loginPage.login(testData.mfaUser.username, testData.mfaUser.password);
    await loginPage.verifyMfaScreenDisplayed();
    await loginPage.completeMfaVerification(testData.mfaUser.expiredMfaCode);
    await loginPage.verifyMfaErrorMessageDisplayed(testData.errorMessages.expiredMfaCode);
  });
});
