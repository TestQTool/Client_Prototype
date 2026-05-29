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
    await loginPage.navigate(baseUrl);
    await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD);
    await loginPage.verifySuccessfulLogin();
    await use(page);
  },

  mfaAuthenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const baseUrl = process.env.BASE_URL || 'https://qentrix.example.com';
    await loginPage.navigate(baseUrl);
    await loginPage.login(process.env.MFA_USERNAME, process.env.MFA_PASSWORD);
    await loginPage.verifyMfaScreenDisplayed();
    await loginPage.completeMfaVerification(process.env.MFA_VALID_CODE);
    await loginPage.verifySuccessfulLogin();
    await use(page);
  }
});

module.exports = { test };
