const base = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');

exports.test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const loginData = require('../test-data/loginData.json');
    const baseUrl = process.env.BASE_URL || loginData.baseUrl;
    
    await loginPage.navigate(baseUrl);
    await loginPage.loginWithOtp(loginData.validUser.email, loginData.validUser.otp);
    await loginPage.verifyLoginSuccess();
    
    await use(page);
  }
});

exports.expect = base.expect;
