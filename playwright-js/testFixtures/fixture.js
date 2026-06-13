import { test as base } from '@playwright/test';
import LeavePage from '../pages/leavePage.js';

const test = base.extend({
  leavePage: async ({ page }, use) => {
    await use(new LeavePage(page));
  }
});

export default test;

