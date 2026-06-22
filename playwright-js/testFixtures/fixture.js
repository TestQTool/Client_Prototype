import { test as base } from '@playwright/test';
import AuthenticationPage from '../pages/AuthenticationPage.js';

const test = base.extend({
  authenticationPage: async ({ page }, use) => {
    await use(new AuthenticationPage(page));
  },
});

export default test;
export { expect } from '@playwright/test';