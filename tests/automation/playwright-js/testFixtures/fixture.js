const { test: base } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const loginTestData = require('../test-data/loginTestData.json');

const resolveEnvVariables = (data) => {
  const resolved = JSON.parse(JSON.stringify(data));
  for (const key in resolved) {
    if (typeof resolved[key] === 'string' && resolved[key].startsWith('${') && resolved[key].endsWith('}')) {
      const envVar = resolved[key].slice(2, -1);
      resolved[key] = process.env[envVar] || resolved[key];
    } else if (typeof resolved[key] === 'object') {
      resolved[key] = resolveEnvVariables(resolved[key]);
    }
  }
  return resolved;
};

const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  loginTestData: async ({}, use) => {
    const resolvedData = resolveEnvVariables(loginTestData);
    await use(resolvedData);
  },
  baseUrl: async ({}, use) => {
    const url = process.env.BASE_URL || 'https://app.qentrix.com';
    await use(url);
  },
  authenticatedPage: async ({ page, loginPage, loginTestData, baseUrl }, use) => {
    await loginPage.navigate(baseUrl);
    await loginPage.login(loginTestData.validUser.username, loginTestData.validUser.password);
    await loginPage.verifyLoginSuccess();
    await use(page);
  }
});

module.exports = { test };
