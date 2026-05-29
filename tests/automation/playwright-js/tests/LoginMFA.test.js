const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');
const testData = require('../test-data/loginMfaTestData.json');

test.describe('User Login with Multi-Factor Authentication (MFA)', () => {
  let loginPage;
  let dashboardPage;
  const baseUrl = process.env.BASE_URL || testData.baseUrl;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigateToLogin(baseUrl);
  });

  test('TC001 - Successful login with valid credentials and valid MFA code', async ({ page }) => {
    const userData = testData.validUser;
    
    await loginPage.performMfaLogin(
      userData.username,
      userData.password,
      userData.mfaCode
    );
    
    await dashboardPage.waitForDashboard();
    expect(await dashboardPage.isDashboardVisible()).toBeTruthy();
  });

  test('TC002 - Login fails with valid credentials but invalid MFA code', async ({ page }) => {
    const userData = testData.validUser;
    const invalidMfaCode = testData.invalidMfaCode;
    
    await loginPage.performInitialLogin(userData.username, userData.password);
    await loginPage.waitForMfaScreen();
    await loginPage.verifyMfaCode(invalidMfaCode);
    
    expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain(testData.errorMessages.invalidMfaCode);
  });

  test('TC003 - Login fails with invalid credentials', async ({ page }) => {
    const invalidUser = testData.invalidUser;
    
    await loginPage.performInitialLogin(invalidUser.username, invalidUser.password);
    
    expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain(testData.errorMessages.invalidCredentials);
  });

  test('TC004 - MFA code resend functionality', async ({ page }) => {
    const userData = testData.validUser;
    
    await loginPage.performInitialLogin(userData.username, userData.password);
    await loginPage.waitForMfaScreen();
    await loginPage.clickResendMfaCode();
    
    // Verify MFA screen is still visible after resend
    expect(await loginPage.mfaCodeInput.isVisible()).toBeTruthy();
  });

  test('TC005 - Login with MFA using different authentication methods', async ({ page }) => {
    const userData = testData.validUser;
    const mfaMethod = testData.mfaMethods.sms;
    
    await loginPage.performMfaLoginWithMethod(
      userData.username,
      userData.password,
      userData.mfaCode,
      mfaMethod
    );
    
    await dashboardPage.waitForDashboard();
    expect(await dashboardPage.isDashboardVisible()).toBeTruthy();
  });

  test('TC006 - Login with Remember Device option enabled', async ({ page }) => {
    const userData = testData.validUser;
    
    await loginPage.performInitialLogin(userData.username, userData.password);
    await loginPage.waitForMfaScreen();
    await loginPage.checkRememberDevice();
    await loginPage.verifyMfaCode(userData.mfaCode);
    
    await dashboardPage.waitForDashboard();
    expect(await dashboardPage.isDashboardVisible()).toBeTruthy();
  });

  test('TC007 - Expired MFA code should show error', async ({ page }) => {
    const userData = testData.validUser;
    const expiredMfaCode = testData.expiredMfaCode;
    
    await loginPage.performInitialLogin(userData.username, userData.password);
    await loginPage.waitForMfaScreen();
    await loginPage.verifyMfaCode(expiredMfaCode);
    
    expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain(testData.errorMessages.expiredMfaCode);
  });

  test('TC008 - Empty MFA code validation', async ({ page }) => {
    const userData = testData.validUser;
    
    await loginPage.performInitialLogin(userData.username, userData.password);
    await loginPage.waitForMfaScreen();
    await loginPage.clickMfaVerifyButton();
    
    expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain(testData.errorMessages.emptyMfaCode);
  });

  test.afterEach(async ({ page }) => {
    // Cleanup: Logout if logged in
    if (await dashboardPage.isDashboardVisible()) {
      await dashboardPage.logout();
    }
  });
});
