import { test as base } from '@playwright/test';
import BasePage from '../pages/basePage.js';
import LoginPage from '../pages/loginPage.js';

const test = base.extend({
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
});

export default test;