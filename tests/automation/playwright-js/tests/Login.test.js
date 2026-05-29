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
    const credentials = testData.validCredentials;
    
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.verifyLoginSuccess();
    
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  test('TC002 - Verify login failure with invalid username', async ({ page }) => {
    const credentials = testData.invalidUsername;
    
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.verifyLoginFailure();
    
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain(testData.expectedErrorMessages.invalidCredentials);
  });

  test('TC003 - Verify login failure with invalid password', async ({ page }) => {
    const credentials = testData.invalidPassword;
    
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.verifyLoginFailure();
    
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain(testData.expectedErrorMessages.invalidCredentials);
  });

  test('TC004 - Verify login failure with empty credentials', async ({ page }) => {
    await loginPage.login('', '');
    
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });

  test('TC005 - Verify login failure with empty username', async ({ page }) => {
    const credentials = testData.validCredentials;
    
    await loginPage.login('', credentials.password);
    
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });

  test('TC006 - Verify login failure with empty password', async ({ page }) => {
    const credentials = testData.validCredentials;
    
    await loginPage.login(credentials.username, '');
    
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });
});
