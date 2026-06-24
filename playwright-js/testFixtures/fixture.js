import { test as base } from '@playwright/test';
import ForgotPasswordPage from '../pages/forgotPasswordPage.js';

const test = base.extend({
  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  }
});

export default test;

