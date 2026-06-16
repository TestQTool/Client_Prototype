import { test as base } from '@playwright/test';
import AuthPage from '../pages/authPage.js';
import ProfilePage from '../pages/profilePage.js';

const test = base.extend({
    authPage: async ({ page }, use) => {
        await use(new AuthPage(page));
    },
    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page));
    },
});

export default test;

