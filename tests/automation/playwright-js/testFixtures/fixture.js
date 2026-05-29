const { test: base } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');

const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const baseUrl = process.env.BASE_URL || 'https://qentrix.example.com';
    const username = process.env.QENTRIX_USERNAME;
    const password = process.env.QENTRIX_PASSWORD;
    
    await loginPage.navigate(baseUrl);
    await loginPage.login(username, password);
    await loginPage.waitForDashboard();
    
    await use(page);
  },
  
  authenticatedWithOtpPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const baseUrl = process.env.BASE_URL || 'https://qentrix.example.com';
    const username = process.env.QENTRIX_OTP_USERNAME;
    const password = process.env.QENTRIX_OTP_PASSWORD;
    const otp = process.env.QENTRIX_VALID_OTP;
    
    await loginPage.navigate(baseUrl);
    await loginPage.login(username, password);
    await loginPage.waitForOtpScreen();
    await loginPage.verifyOtp(otp);
    await loginPage.waitForDashboard();
    
    await use(page);
  }
});

module.exports = { test };
