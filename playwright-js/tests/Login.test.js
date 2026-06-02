import { expect } from '@playwright/test';
import test from '../testFixtures/fixture.js';

test.describe('Login Module', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
    });

    // ── @smoke tests ─────────────────────────────────────────────────────────
    test('TC-992: Verify that session token is generated after successful login @smoke @regression', async ({ loginPage }) => {
        await test.step('Verify login page is loaded', async () => {
            await loginPage.verifyLoginPageLoaded();
        });

        await test.step('Enter valid admin credentials', async () => {
            await loginPage.loginAsAdmin();
        });

        await test.step('Verify login is successful', async () => {
            await loginPage.verifyLoginSuccess();
        });

        await test.step('Verify session token exists in cookies', async () => {
            await loginPage.verifySessionTokenExists();
        });

        await test.step('Verify session token has secure flags', async () => {
            await loginPage.verifySessionTokenIsSecure();
        });
    });

    test('TC-987: Verify that password is transmitted securely over HTTPS @smoke @regression', async ({ loginPage }) => {
        await test.step('Verify login page URL uses HTTPS protocol', async () => {
            await loginPage.verifyHttpsProtocol();
        });

        await test.step('Enter valid admin credentials', async () => {
            await loginPage.loginAsAdmin();
        });

        await test.step('Verify login is successful', async () => {
            await loginPage.verifyLoginSuccess();
        });

        await test.step('Verify current URL still uses HTTPS after login', async () => {
            await loginPage.verifyHttpsProtocol();
        });
    });

    // ── @regression tests ────────────────────────────────────────────────────
    test('TC-968: Verify that login fails with invalid email address @regression', async ({ loginPage }) => {
        await test.step('Verify login page is loaded', async () => {
            await loginPage.verifyLoginPageLoaded();
        });

        await test.step('Enter invalid username and valid password', async () => {
            await loginPage.enterUsername('InvalidUser123');
            await loginPage.enterPassword('admin123');
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify invalid credentials error message is displayed', async () => {
            await loginPage.verifyInvalidCredentialsError();
        });
    });

    test('TC-970: Verify that login fails when email field is empty @regression', async ({ loginPage }) => {
        await test.step('Verify login page is loaded', async () => {
            await loginPage.verifyLoginPageLoaded();
        });

        await test.step('Clear username field and enter password only', async () => {
            await loginPage.clearUsernameField();
            await loginPage.enterPassword('admin123');
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify Required error message is displayed for username field', async () => {
            await loginPage.verifyRequiredErrorForUsername();
        });
    });

    test('TC-972: Verify that login fails when both email and password fields are empty @regression', async ({ loginPage }) => {
        await test.step('Verify login page is loaded', async () => {
            await loginPage.verifyLoginPageLoaded();
        });

        await test.step('Clear both username and password fields', async () => {
            await loginPage.clearAllFields();
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify Required error message is displayed for both fields', async () => {
            await loginPage.verifyRequiredErrorForBothFields();
        });
    });
});
