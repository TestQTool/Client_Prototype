const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const testData = require('../test-data/loginTestData.json');

test.describe('User Login with Multi-Factor Authentication (MFA)', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate(process.env.BASE_URL || testData.baseUrl);
  });

  test('TC001 - Successful login with valid credentials and MFA code', async () => {
    const userData = testData.mfaLogin.validUser;
    
    await loginPage.login(userData.username, userData.password);
    await loginPage.verifyMfaPromptDisplayed();
    await loginPage.completeMfaVerification(userData.mfaCode);
    await loginPage.verifyDashboardDisplayed();
  });

  test('TC002 - Login fails with invalid MFA code', async () => {
    const userData = testData.mfaLogin.validUser;
    const invalidMfaData = testData.mfaLogin.invalidMfaCode;
    
    await loginPage.login(userData.username, userData.password);
    await loginPage.verifyMfaPromptDisplayed();
    await loginPage.completeMfaVerification(invalidMfaData.mfaCode);
    await loginPage.verifyErrorMessageDisplayed(invalidMfaData.expectedError);
  });

  test('TC003 - Login fails with expired MFA code', async () => {
    const userData = testData.mfaLogin.validUser;
    const expiredMfaData = testData.mfaLogin.expiredMfaCode;
    
    await loginPage.login(userData.username, userData.password);
    await loginPage.verifyMfaPromptDisplayed();
    await loginPage.completeMfaVerification(expiredMfaData.mfaCode);
    await loginPage.verifyErrorMessageDisplayed(expiredMfaData.expectedError);
  });

  test('TC004 - MFA prompt appears after valid credentials', async () => {
    const userData = testData.mfaLogin.validUser;
    
    await loginPage.login(userData.username, userData.password);
    await loginPage.verifyMfaPromptDisplayed();
  });

  test('TC005 - Login fails with invalid credentials before MFA', async () => {
    const invalidUser = testData.mfaLogin.invalidUser;
    
    await loginPage.login(invalidUser.username, invalidUser.password);
    await loginPage.verifyErrorMessageDisplayed(invalidUser.expectedError);
  });
});
