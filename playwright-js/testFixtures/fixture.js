const base = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { IntegrationsPage } = require('../pageObjects/IntegrationsPage');

exports.test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  integrationsPage: async ({ page }, use) => {
    const integrationsPage = new IntegrationsPage(page);
    await use(integrationsPage);
  },

  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const loginData = require('../test-data/loginData.json');
    const baseUrl = process.env.BASE_URL || loginData.baseUrl;
    
    await loginPage.navigate(baseUrl);
    await loginPage.login(
      process.env.QENTRIX_USERNAME || loginData.validUser.username,
      process.env.QENTRIX_PASSWORD || loginData.validUser.password
    );
    await loginPage.verifyLoginSuccess();
    
    await use(page);
  }
});

exports.expect = base.expect;
