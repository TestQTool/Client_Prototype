const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const testData = require('../test-data/loginTestData.json');

test.describe('User Login with OTP Verification', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate(process.env.BASE_URL || testData.baseUrl);
  });

  test('TC001 - Successful login with valid credentials and OTP', async () => {
    const userData = testData.otpLogin.validUser;
    
    await loginPage.login(userData.username, userData.password);
    await loginPage.verifyOtpPromptDisplayed();
    await loginPage.verifyOtpSentMessageDisplayed();
    await loginPage.completeOtpVerification(userData.otpCode);
    await loginPage.verifyDashboardDisplayed();
  });

  test('TC002 - Login fails with invalid OTP code', async () => {
    const userData = testData.otpLogin.validUser;
    const invalidOtpData = testData.otpLogin.invalidOtpCode;
    
    await loginPage.login(userData.username, userData.password);
    await loginPage.verifyOtpPromptDisplayed();
    await loginPage.completeOtpVerification(invalidOtpData.otpCode);
    await loginPage.verifyErrorMessageDisplayed(invalidOtpData.expectedError);
  });

  test('TC003 - Login fails with expired OTP code', async () => {
    const userData = testData.otpLogin.validUser;
    const expiredOtpData = testData.otpLogin.expiredOtpCode;
    
    await loginPage.login(userData.username, userData.password);
    await loginPage.verifyOtpPromptDisplayed();
    await loginPage.completeOtpVerification(expiredOtpData.otpCode);
    await loginPage.verifyErrorMessageDisplayed(expiredOtpData.expectedError);
  });

  test('TC004 - OTP prompt appears after valid credentials', async () => {
    const userData = testData.otpLogin.validUser;
    
    await loginPage.login(userData.username, userData.password);
    await loginPage.verifyOtpPromptDisplayed();
    await loginPage.verifyOtpSentMessageDisplayed();
  });

  test('TC005 - Resend OTP functionality works correctly', async () => {
    const userData = testData.otpLogin.validUser;
    
    await loginPage.login(userData.username, userData.password);
    await loginPage.verifyOtpPromptDisplayed();
    await loginPage.clickResendOtp();
    await loginPage.verifyOtpSentMessageDisplayed();
  });

  test('TC006 - Login fails with invalid credentials before OTP', async () => {
    const invalidUser = testData.otpLogin.invalidUser;
    
    await loginPage.login(invalidUser.username, invalidUser.password);
    await loginPage.verifyErrorMessageDisplayed(invalidUser.expectedError);
  });
});
