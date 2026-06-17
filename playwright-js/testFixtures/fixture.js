import { test as base } from '@playwright/test';
import BasePage from '../pages/basePage.js';
import RegistrationPage from '../pages/registrationPage.js';

const test = base.extend({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  }
});

export default test;

