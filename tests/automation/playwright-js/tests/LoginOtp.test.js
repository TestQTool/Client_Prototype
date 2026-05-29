const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const testData = require('../test-data/loginData.json');

test.describe('Login using OTP Verification', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate(process.env.BASE_URL || testData.baseUrl);
  });

  test('Should successfully login with valid OTP', async ({ page }) => {
    await loginPage.loginWithOtp(testData.validUser.email, testData.validUser.otp);
    await loginPage.verifyLoginSuccess();
  });

  test('Should display error for invalid OTP', async ({ page }) => {
    await loginPage.enterEmail(testData.validUser.email);
    await loginPage.clickSendOtp();
    await loginPage.enterOtp(testData.invalidOtp);
    await loginPage.clickVerifyOtp();
    await loginPage.verifyErrorMessage(testData.errorMessages.invalidOtp);
  });

  test('Should display error for invalid email format', async ({ page }) => {
    await loginPage.enterEmail(testData.invalidEmail);
    await loginPage.clickSendOtp();
    await loginPage.verifyErrorMessage(testData.errorMessages.invalidEmail);
  });

  test('Should display error for expired OTP', async ({ page }) => {
    await loginPage.enterEmail(testData.validUser.email);
    await loginPage.clickSendOtp();
    await loginPage.enterOtp(testData.expiredOtp);
    await loginPage.clickVerifyOtp();
    await loginPage.verifyErrorMessage(testData.errorMessages.expiredOtp);
  });
});
