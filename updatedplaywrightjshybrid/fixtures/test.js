import { test as base, expect } from '@playwright/test';
import LoginPage from '../pageObjects/LoginPage.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  }
});

export { expect };

