const { test } = require('../testFixtures/fixture');
const { expect } = require('@playwright/test');

test.describe('User Login Functionality', () => {
  test.beforeEach(async ({ loginPage, baseUrl }) => {
    await loginPage.navigate(baseUrl);
  });

  test('should display login page elements', async ({ loginPage }) => {
    expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
  });

  test('should show error message for invalid credentials', async ({ loginPage, testData }) => {
    await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid');
  });

  test('should successfully login with valid credentials', async ({ loginPage, testData }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await loginPage.waitForMfaScreen();
    expect(await loginPage.isMfaCodeInputVisible()).toBeTruthy();
  });

  test('should not allow empty username submission', async ({ loginPage }) => {
    await loginPage.enterPassword('somepassword');
    await loginPage.clickLoginButton();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
  });

  test('should not allow empty password submission', async ({ loginPage }) => {
    await loginPage.enterUsername('someuser@test.com');
    await loginPage.clickLoginButton();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
  });
});

test.describe('User Login with Multi-Factor Authentication (MFA)', () => {
  test.beforeEach(async ({ loginPage, baseUrl }) => {
    await loginPage.navigate(baseUrl);
  });

  test('should navigate to MFA screen after valid credentials', async ({ loginPage, testData }) => {
    await loginPage.login(testData.mfaTestUser.username, testData.mfaTestUser.password);
    await loginPage.waitForMfaScreen();
    expect(await loginPage.isMfaCodeInputVisible()).toBeTruthy();
  });

  test('should show error for invalid MFA code', async ({ loginPage, testData }) => {
    await loginPage.login(testData.mfaTestUser.username, testData.mfaTestUser.password);
    await loginPage.waitForMfaScreen();
    await loginPage.verifyMfa(testData.mfaTestUser.invalidMfaCode);
    const mfaError = await loginPage.getMfaErrorMessage();
    expect(mfaError).toContain('Invalid');
  });

  test('should successfully complete MFA verification', async ({ loginPage, testData }) => {
    await loginPage.loginWithMfa(
      testData.mfaTestUser.username,
      testData.mfaTestUser.password,
      testData.mfaTestUser.validMfaCode
    );
    expect(await loginPage.isDashboardVisible()).toBeTruthy();
  });

  test('should allow resending MFA code', async ({ loginPage, testData }) => {
    await loginPage.login(testData.mfaTestUser.username, testData.mfaTestUser.password);
    await loginPage.waitForMfaScreen();
    await loginPage.clickResendMfaCode();
    expect(await loginPage.isMfaCodeInputVisible()).toBeTruthy();
  });

  test('should allow remember device option during MFA', async ({ loginPage, testData }) => {
    await loginPage.login(testData.mfaTestUser.username, testData.mfaTestUser.password);
    await loginPage.waitForMfaScreen();
    await loginPage.checkRememberDevice();
    await loginPage.verifyMfa(testData.mfaTestUser.validMfaCode);
    await loginPage.waitForDashboard();
    expect(await loginPage.isDashboardVisible()).toBeTruthy();
  });

  test('should handle expired MFA code', async ({ loginPage, testData }) => {
    await loginPage.login(testData.mfaTestUser.username, testData.mfaTestUser.password);
    await loginPage.waitForMfaScreen();
    await loginPage.verifyMfa(testData.mfaTestUser.expiredMfaCode);
    const mfaError = await loginPage.getMfaErrorMessage();
    expect(mfaError).toBeTruthy();
  });
});
