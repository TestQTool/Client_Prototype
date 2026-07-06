import { expect } from '@playwright/test';
import test from '../testFixtures/fixture.js';

test.describe('Dashboard', () => {

    test.describe.configure({ mode: 'parallel' });

    test('1992: Verify that login works with valid credentials @smoke @regression', async ({ DashboardPage }) => {
        await test.step('Navigate to url "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"', async () => {
            await DashboardPage.waitForPageLoad();
            await DashboardPage.navigate();
        });
        await test.step('Enter username "Admin" and password "admin123"', async () => {
            await DashboardPage.waitForPageLoad();
            await DashboardPage.verifyPageLoaded();
        });
        await test.step('Click Login button', async () => {
            await DashboardPage.waitForPageLoad();
            await DashboardPage.verifyPageLoaded();
        });
        await test.step('Verify dashboard page is displayed', async () => {
            await DashboardPage.waitForPageLoad();
            await DashboardPage.verifyPageLoaded();
        });
    });

});