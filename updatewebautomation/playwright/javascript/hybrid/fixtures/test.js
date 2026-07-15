/**
 * Playwright Test Fixtures
 * Extend base test with page fixtures for login functionality
 */

const base = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

exports.test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  }
});

exports.expect = base.expect;

