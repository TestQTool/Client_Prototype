const { test: base } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');

const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  baseUrl: async ({}, use) => {
    const url = process.env.BASE_URL || 'https://app.qentrix.com';
    await use(url);
  },
  testData: async ({}, use) => {
    const data = require('../test-data/loginData.json');
    const resolvedData = JSON.parse(
      JSON.stringify(data)
        .replace(/\$\{VALID_USERNAME\}/g, process.env.VALID_USERNAME || '')
        .replace(/\$\{VALID_PASSWORD\}/g, process.env.VALID_PASSWORD || '')
        .replace(/\$\{VALID_MFA_CODE\}/g, process.env.VALID_MFA_CODE || '')
        .replace(/\$\{MFA_TEST_USERNAME\}/g, process.env.MFA_TEST_USERNAME || '')
        .replace(/\$\{MFA_TEST_PASSWORD\}/g, process.env.MFA_TEST_PASSWORD || '')
    );
    await use(resolvedData);
  }
});

module.exports = { test };
