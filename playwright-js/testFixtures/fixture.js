import { test as base } from '@playwright/test';
import LoginPage from '../pages/loginPage.js';

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export default test;
export { expect } from '@playwright/test';

