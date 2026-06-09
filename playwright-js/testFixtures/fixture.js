// testFixtures/fixture.js
// NOTE: Add this import and fixture to your existing fixture.js file

import { test as base } from '@playwright/test';
import LoginPage from '../pages/loginPage.js';
import LeavePage from '../pages/leavePage.js';
// ... other existing imports ...

const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    leavePage: async ({ page }, use) => {
        await use(new LeavePage(page));
    },
    // ... other existing fixtures ...
});

export default test;