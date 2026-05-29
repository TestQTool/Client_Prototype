const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const testData = require('../test-data/loginData.json');

test.describe('User Login Functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    const baseUrl = process.env.BASE_URL || testData.baseUrl;
    await loginPage.navigate(baseUrl);
  });

  test('TC001 - Successful login with valid credentials', async ({ page }) => {
    const { username, password } = testData.validCredentials;
    
    await loginPage.login(username, password);
    await loginPage.waitForDashboard();
    
    const isDashboardVisible = await loginPage.isDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();
  });

  test('TC002 - Login fails with invalid username', async ({ page }) => {
    const { username, password } = testData.invalidUsername;
    
    await loginPage.login(username, password);
    
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(testData.errorMessages.invalidCredentials);
  });

  test('TC003 - Login fails with invalid password', async ({ page }) => {
    const { username, password } = testData.invalidPassword;
    
    await loginPage.login(username, password);
    
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(testData.errorMessages.invalidCredentials);
  });

  test('TC004 - Login fails with empty credentials', async ({ page }) => {
    await loginPage.clickLoginButton();
    
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
  });

  test('TC005 - Login fails with empty username', async ({ page }) => {
    const { password } = testData.validCredentials;
    
    await loginPage.enterPassword(password);
    await loginPage.clickLoginButton();
    
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
  });

  test('TC006 - Login fails with empty password', async ({ page }) => {
    const { username } = testData.validCredentials;
    
    await loginPage.enterUsername(username);
    await loginPage.clickLoginButton();
    
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
  });
});
