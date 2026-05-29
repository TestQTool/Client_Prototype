const { test: base } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { PaymentPage } = require('../pageObjects/PaymentPage');

exports.test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  paymentPage: async ({ page }, use) => {
    const paymentPage = new PaymentPage(page);
    await use(paymentPage);
  },
  
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const loginData = require('../test-data/loginData.json');
    const baseUrl = process.env.BASE_URL || loginData.baseUrl;
    
    await loginPage.navigate(baseUrl);
    await loginPage.loginWithOtp(loginData.validCredentials);
    await loginPage.verifyLoginSuccess();
    
    await use(page);
  }
});

exports.expect = base.expect;
