/**
 * Test Fixtures
 * Extends Playwright test with custom page fixtures
 */

const base = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  }
});

module.exports = { test, expect: base.expect };