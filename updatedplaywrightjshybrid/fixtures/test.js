/**
 * Playwright Test Fixture
 * Extends base test with custom fixtures for page objects
 */

const base = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

// Extend base test with custom fixtures
exports.test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  }
});

exports.expect = base.expect;

