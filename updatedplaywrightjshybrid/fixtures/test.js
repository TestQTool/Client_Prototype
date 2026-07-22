import { test as base, expect } from '@playwright/test';
import RegistrationPage from '../pageObjects/RegistrationPage.js';

export const test = base.extend({
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  }
});

export { expect };

