import { test as base } from '@playwright/test';
import BasePage from '../pages/basePage.js';
import SearchPage from '../pages/searchPage.js';
import SearchApiPage from '../pages/searchApiPage.js';

const test = base.extend({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  searchApiPage: async ({ page }, use) => {
    await use(new SearchApiPage(page));
  }
});

export default test;

