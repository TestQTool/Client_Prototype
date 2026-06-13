import { test as base } from '@playwright/test';
import LoginPage from '../pages/loginPage.js';
import LeavePage from '../pages/leavePage.js';

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  leavePage: async ({ page }, use) => {
    await use(new LeavePage(page));
  }
});

export default test;