/**
 * Playwright Test Fixture
 * Extends base Playwright test with custom fixtures and configuration
 */

const base = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

exports.test = base.test.extend({
  // Add custom fixtures here if needed
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  }
});

exports.expect = base.expect;