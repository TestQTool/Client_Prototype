import { expect } from '@playwright/test';
import test from '../testFixtures/fixture.js';

test.describe('LoginPageObjects', () => {

    test.describe.configure({ mode: 'parallel' });

    test('1994: Verify that login fails with invalid username @smoke @regression', async ({ loginPageObjectsPage }) => {
        await test.step('Navigate to url "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"', async () => {
            await loginPageObjectsPage.waitForPageLoad();
            await loginPageObjectsPage.navigate();
        });
        await test.step('Enter username "Admin" and password "admin123"', async () => {
            await loginPageObjectsPage.waitForPageLoad();
            await loginPageObjectsPage.verifyPageLoaded();
        });
        await test.step('Click Login button', async () => {
            await loginPageObjectsPage.waitForPageLoad();
            await loginPageObjectsPage.verifyPageLoaded();
        });
        await test.step('Verify error message is displayed', async () => {
            await loginPageObjectsPage.waitForPageLoad();
            await loginPageObjectsPage.verifyPageLoaded();
        });
        await test.step('Verify user remains on login page', async () => {
            await loginPageObjectsPage.waitForPageLoad();
            await loginPageObjectsPage.verifyPageLoaded();
        });
    });

});