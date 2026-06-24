import { test as base } from '@playwright/test';
import LoginPage from '../pages/loginPage.js';
import ExportPage from '../pages/exportPage.js';

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  exportPage: async ({ page }, use) => {
    await use(new ExportPage(page));
  }
});

export default test;

