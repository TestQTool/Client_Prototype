import { test as base } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import LeaveRequestPage from '../pages/LeaveRequestPage.js';

const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    leaveRequestPage: async ({ page }, use) => {
        await use(new LeaveRequestPage(page));
    }
});

export default test;

