const { test: base } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');

exports.test = base.extend({
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
    const dashboardPage = new DashboardPage(page);
    const baseUrl = process.env.BASE_URL;
    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;
    const mfaCode = process.env.TEST_MFA_CODE;
    
    await loginPage.navigateToLogin(baseUrl);
    await loginPage.performMfaLogin(username, password, mfaCode);
    await dashboardPage.waitForDashboard();
    
    await use(page);
  }
});

exports.expect = base.expect;
