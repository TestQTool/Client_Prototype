const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const testData = require('../test-data/loginData.json');

test.describe('User Login with OTP Verification', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    const baseUrl = process.env.BASE_URL || testData.baseUrl;
    await loginPage.navigate(baseUrl);
  });

  test('TC007 - OTP screen is displayed after valid credentials', async ({ page }) => {
    const { username, password } = testData.otpEnabledCredentials;
    
    await loginPage.login(username, password);
    await loginPage.waitForOtpScreen();
    
    const isOtpInputVisible = await loginPage.isOtpInputVisible();
    expect(isOtpInputVisible).toBeTruthy();
  });

  test('TC008 - Successful login with valid OTP', async ({ page }) => {
    const { username, password } = testData.otpEnabledCredentials;
    const { validOtp } = testData.otpData;
    
    await loginPage.login(username, password);
    await loginPage.waitForOtpScreen();
    await loginPage.verifyOtp(validOtp);
    await loginPage.waitForDashboard();
    
    const isDashboardVisible = await loginPage.isDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();
  });

  test('TC009 - Login fails with invalid OTP', async ({ page }) => {
    const { username, password } = testData.otpEnabledCredentials;
    const { invalidOtp } = testData.otpData;
    
    await loginPage.login(username, password);
    await loginPage.waitForOtpScreen();
    await loginPage.verifyOtp(invalidOtp);
    
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(testData.errorMessages.invalidOtp);
  });

  test('TC010 - Login fails with expired OTP', async ({ page }) => {
    const { username, password } = testData.otpEnabledCredentials;
    const { expiredOtp } = testData.otpData;
    
    await loginPage.login(username, password);
    await loginPage.waitForOtpScreen();
    await loginPage.verifyOtp(expiredOtp);
    
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(testData.errorMessages.expiredOtp);
  });

  test('TC011 - Resend OTP functionality', async ({ page }) => {
    const { username, password } = testData.otpEnabledCredentials;
    
    await loginPage.login(username, password);
    await loginPage.waitForOtpScreen();
    await loginPage.clickResendOtp();
    
    const isOtpSentMessageVisible = await loginPage.isOtpSentMessageVisible();
    expect(isOtpSentMessageVisible).toBeTruthy();
  });

  test('TC012 - Login fails with empty OTP', async ({ page }) => {
    const { username, password } = testData.otpEnabledCredentials;
    
    await loginPage.login(username, password);
    await loginPage.waitForOtpScreen();
    await loginPage.clickVerifyOtpButton();
    
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
  });
});
