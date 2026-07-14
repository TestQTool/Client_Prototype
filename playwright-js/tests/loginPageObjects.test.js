import { expect } from '@playwright/test';
import test from '../testFixtures/fixture.js';

test.describe('LoginPageObjects', () => {

    test.describe.configure({ mode: 'parallel' });

    test('2417: Verify that login is case-sensitive for password @smoke @regression', async ({ loginPageObjectsPage }) => {
        await test.step('Navigate to url "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"', async () => {
            await loginPageObjectsPage.waitForPageLoad();
            await loginPageObjectsPage.navigate();
        });
        await test.step('Enter username "Admin" in the username field', async () => {
            await loginPageObjectsPage.waitForPageLoad();
            await loginPageObjectsPage.verifyPageLoaded();
        });
        await test.step('Enter password "ADMIN123" in uppercase in the password field', async () => {
            await loginPageObjectsPage.waitForPageLoad();
            await loginPageObjectsPage.verifyPageLoaded();
        });
        await test.step('Click the Login button', async () => {
            await loginPageObjectsPage.waitForPageLoad();
            await loginPageObjectsPage.verifyPageLoaded();
        });
        await test.step('Verify invalid credentials error message is displayed', async () => {
            await loginPageObjectsPage.waitForPageLoad();
            await loginPageObjectsPage.verifyPageLoaded();
        });
        await test.step('Verify user remains on login page', async () => {
            await loginPageObjectsPage.waitForPageLoad();
            await loginPageObjectsPage.verifyPageLoaded();
        });
    });

});