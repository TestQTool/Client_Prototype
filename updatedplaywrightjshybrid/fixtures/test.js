import { test as base } from '@playwright/test';
import RegistrationPage from '../pageObjects/RegistrationPage.js';

// Extend base test with page object fixtures
export const test = base.extend({
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await use(registrationPage);
  }
});

export { expect } from '@playwright/test';

