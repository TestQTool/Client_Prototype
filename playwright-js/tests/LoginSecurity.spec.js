const { test, expect } = require('@playwright/test');
const LoginSecurityPage = require('../pageObjects/LoginSecurityPage');

test.describe('Login Security Module', () => {
    let loginSecurityPage;

    test.beforeEach(async ({ page }) => {
        loginSecurityPage = new LoginSecurityPage(page);
        await loginSecurityPage.navigate();
    });

    // ── @smoke tests ─────────────────────────────────────────────────────────
    test('[992] Verify that session token is generated after successful login @smoke @regression', async ({ page }) => {
        await test.step('Navigate to login URL', async () => {
            await expect(page).toHaveURL(/auth\/login/);
        });

        await test.step('Enter username and password', async () => {
            await loginSecurityPage.enterUsername('Admin');
            await loginSecurityPage.enterPassword('admin123');
        });

        await test.step('Click login button', async () => {
            await loginSecurityPage.clickLoginButton();
        });

        await test.step('Verify dashboard is loaded after successful login', async () => {
            await loginSecurityPage.verifyDashboardLoaded();
        });

        await test.step('Check browser cookies for session data', async () => {
            const cookies = await page.context().cookies();
            expect(cookies.length).toBeGreaterThan(0);
        });

        await test.step('Verify session token is present', async () => {
            await loginSecurityPage.verifySessionTokenExists();
        });
    });

    test('[987] Verify that password is transmitted securely over HTTPS @smoke @regression', async ({ page }) => {
        await test.step('Navigate to login URL and verify HTTPS', async () => {
            const currentUrl = page.url();
            expect(currentUrl).toMatch(/^https:\/\//);
        });

        await test.step('Enter username and password', async () => {
            await loginSecurityPage.enterUsername('Admin');
            await loginSecurityPage.enterPassword('admin123');
        });

        await test.step('Click login button and verify request uses HTTPS', async () => {
            await loginSecurityPage.clickLoginButton();
            await loginSecurityPage.verifyDashboardLoaded();
        });

        await test.step('Verify current URL uses HTTPS protocol', async () => {
            await loginSecurityPage.verifyHttpsProtocol();
        });
    });

    // ── @regression tests ────────────────────────────────────────────────────
    test('[968] Verify that login fails with invalid email address @regression', async ({ page }) => {
        await test.step('Navigate to login URL', async () => {
            await expect(page).toHaveURL(/auth\/login/);
        });

        await test.step('Enter invalid username and password', async () => {
            await loginSecurityPage.enterUsername('InvalidUser');
            await loginSecurityPage.enterPassword('wrongpassword');
        });

        await test.step('Click login button', async () => {
            await loginSecurityPage.clickLoginButton();
        });

        await test.step('Verify invalid credentials error message is displayed', async () => {
            await loginSecurityPage.verifyInvalidCredentialsError();
        });
    });

    test('[970] Verify that login fails when email field is empty @regression', async ({ page }) => {
        await test.step('Navigate to login URL', async () => {
            await expect(page).toHaveURL(/auth\/login/);
        });

        await test.step('Leave username empty and enter password', async () => {
            await loginSecurityPage.enterPassword('admin123');
        });

        await test.step('Click login button', async () => {
            await loginSecurityPage.clickLoginButton();
        });

        await test.step('Verify Required error message is displayed for username field', async () => {
            await loginSecurityPage.verifyUsernameRequiredError();
        });
    });

    test('[972] Verify that login fails when both email and password fields are empty @regression', async ({ page }) => {
        await test.step('Navigate to login URL', async () => {
            await expect(page).toHaveURL(/auth\/login/);
        });

        await test.step('Leave both username and password fields empty', async () => {
            // Fields are already empty, just verify page is loaded
            await loginSecurityPage.verifyLoginPageLoaded();
        });

        await test.step('Click login button', async () => {
            await loginSecurityPage.clickLoginButton();
        });

        await test.step('Verify Required error messages are displayed for both fields', async () => {
            await loginSecurityPage.verifyBothFieldsRequiredError();
        });
    });
});
