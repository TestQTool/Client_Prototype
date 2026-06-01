const base = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { MyInfoPage } = require('../pageObjects/MyInfoPage');

exports.test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  myInfoPage: async ({ page }, use) => {
    const myInfoPage = new MyInfoPage(page);
    await use(myInfoPage);
  },
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const testData = require('../test-data/myInfoTestData.json');
    await loginPage.navigate(process.env.BASE_URL || testData.baseUrl);
    await loginPage.login(
      process.env.USERNAME || testData.credentials.username,
      process.env.PASSWORD || testData.credentials.password
    );
    await use(page);
  }
});

exports.expect = base.expect;