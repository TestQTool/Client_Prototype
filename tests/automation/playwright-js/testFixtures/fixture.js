const { test: base } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { MyInformationPage } = require('../pageObjects/MyInformationPage');
const loginData = require('../test-data/loginData.json');

const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  myInformationPage: async ({ page }, use) => {
    const myInformationPage = new MyInformationPage(page);
    await use(myInformationPage);
  },
  
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(process.env.BASE_URL || loginData.baseUrl);
    await loginPage.login(loginData.validCredentials.username, loginData.validCredentials.password);
    await loginPage.verifyLoginSuccess();
    await use(page);
  }
});

module.exports = { test };
