import { test as base } from '@playwright/test';
import RegistrationPage from '../pages/registrationPage.js';

const test = base.extend({
    registrationPage: async ({ page }, use) => {
        await use(new RegistrationPage(page));
    }
});

export default test;

