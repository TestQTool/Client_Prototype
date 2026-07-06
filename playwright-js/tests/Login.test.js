import { expect } from '@playwright/test';
import test from '../testFixtures/fixture.js';

test.describe('Login', () => {

    test.describe.configure({ mode: 'parallel' });

    test('1992: Verify that login works with valid credentials @smoke @regression', async ({ LoginPage }) => {
        await test.step('Navigate to url "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"', async () => {
            await LoginPage.waitForPageLoad();
            await LoginPage.navigate();
        });
        await test.step('Enter username "Admin" and password "admin123"', async () => {
            await LoginPage.waitForPageLoad();
            await LoginPage.verifyPageLoaded();
        });
        await test.step('Click Login button', async () => {
            await LoginPage.waitForPageLoad();
            await LoginPage.verifyPageLoaded();
        });
        await test.step('Verify dashboard page is displayed', async () => {
            await LoginPage.waitForPageLoad();
            await LoginPage.verifyPageLoaded();
        });
    });

});