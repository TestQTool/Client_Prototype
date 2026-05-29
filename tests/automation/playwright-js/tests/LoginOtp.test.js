const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const testData = require('../test-data/loginData.json');

test.describe('Login using OTP Verification', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('should login successfully with valid OTP', async ({ page }) => {
    const baseUrl = process.env.BASE_URL || testData.baseUrl;
    const credentials = testData.validCredentials;

    await loginPage.navigate(baseUrl);
    await loginPage.loginWithOtp(credentials);
    await loginPage.verifyLoginSuccess();
  });

  test('should show error with invalid OTP', async ({ page }) => {
    const baseUrl = process.env.BASE_URL || testData.baseUrl;
    const credentials = testData.invalidOtpCredentials;

    await loginPage.navigate(baseUrl);
    await loginPage.loginWithOtp(credentials);
    
    const errorMessage = page.locator('.error-message, [data-testid="error"], .otp-error');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
  });
});
