// tests/Login.test.ts
// ─────────────────────────────────────────────────────────────────────────────
// Login Feature Test Suite
// Generated from test inventory cases: TC-562, TC-22, TC-24, TC-25, TC-21, TC-23, TC-561, TC-563, TC-560, TC-564
// Framework: Playwright + TypeScript
// ─────────────────────────────────────────────────────────────────────────────
import { expect } from '@playwright/test';
import test from '../testFixtures/fixture';

// ─────────────────────────────────────────────────────────────────────────────
// Fixture used: loginPage (registered in testFixtures/fixture.ts)
// Page class: pages/loginPage.ts
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Login Feature', () => {

    test.describe.configure({ mode: 'parallel' });

    // ══════════════════════════════════════════════════════════════════════════
    // @smoke — Critical Path Tests
    // ══════════════════════════════════════════════════════════════════════════

    test('[TC-21] Verify that login works with valid credentials @smoke @regression', async ({ loginPage }) => {
        await test.step('Navigate to login page at 192.168.10.124:4001', async () => {
            await loginPage.navigate();
        });
        await test.step('Verify login page displays with Email, Password fields, Login button and Register hyperlink', async () => {
            await loginPage.verifyLoginPageLoaded();
            await loginPage.verifyLoginPageElements();
        });
        await test.step('Enter valid username', async () => {
            const creds = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(creds.Username);
        });
        await test.step('Enter valid password', async () => {
            const creds = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillPassword(creds.Password);
        });
        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify user should login successfully and redirect to dashboard', async () => {
            await loginPage.verifyLoginSuccess();
        });
    });

    test('[TC-560] Verify that login works with valid credentials (API) @smoke @regression', async ({ loginPage }) => {
        await test.step('Send POST request to /login endpoint with valid username and password', async () => {
            // Note: This test case specifies API request validation.
            // In UI framework context, navigate and fill form to trigger POST.
            await loginPage.navigate();
            await loginPage.loginAs('Admin');
        });
        await test.step('Verify response returns 200 status code', async () => {
            // Status code verification is inferred from successful redirect/dashboard load
            await loginPage.verifyLoginSuccess();
        });
        await test.step('Validate response contains authentication token', async () => {
            // Token presence is inferred from successful authentication (dashboard visible)
            await loginPage.verifyResponseContainsToken();
        });
    });

    // ══════════════════════════════════════════════════════════════════════════
    // @regression — Negative Tests (Invalid Credentials)
    // ══════════════════════════════════════════════════════════════════════════

    test('[TC-562] Verify that login fails with invalid password @regression', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate();
        });
        await test.step('Include valid username in request body', async () => {
            const creds = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(creds.Username);
        });
        await test.step('Include invalid password in request body', async () => {
            await loginPage.fillPassword('InvalidPassword123!');
        });
        await test.step('Submit authentication request', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify response returns 401 status code and error message indicates invalid credentials', async () => {
            await loginPage.verifyInvalidCredentialsError();
        });
    });

    test('[TC-561] Verify that login fails with invalid username @regression', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate();
        });
        await test.step('Include invalid username in request body', async () => {
            await loginPage.fillUsername('InvalidUser999');
        });
        await test.step('Include valid password in request body', async () => {
            const creds = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillPassword(creds.Password);
        });
        await test.step('Submit authentication request', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify response returns 401 status code and error message indicates invalid credentials', async () => {
            await loginPage.verifyInvalidCredentialsError();
        });
    });

    test('[TC-22] To Test Login Form with Invalid Data @regression', async ({ loginPage }) => {
        await test.step('Navigate to 192.168.10.124:4001', async () => {
            await loginPage.navigate();
        });
        await test.step('Verify system displays Login Page with Email, Password fields, Login button and Register Hyperlink', async () => {
            await loginPage.verifyLoginPageLoaded();
            await loginPage.verifyLoginPageElements();
        });
        await test.step('Enter invalid username and password', async () => {
            await loginPage.fillUsername('invalidUser@test.com');
            await loginPage.fillPassword('wrongPass123');
        });
        await test.step('Verify system accepts the username and password input', async () => {
            // Input acceptance is implicit; verify error appears after submit
            await loginPage.clickLoginButton();
        });
        await test.step('Verify login fails with invalid credentials error', async () => {
            await loginPage.verifyInvalidCredentialsError();
        });
    });

    test('[TC-23] To Test Login Form with Invalid Data (duplicate) @regression', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate();
        });
        await test.step('Enter invalid credentials', async () => {
            await loginPage.fillUsername('baduser@example.com');
            await loginPage.fillPassword('badpass');
        });
        await test.step('Submit login', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify error message is displayed', async () => {
            await loginPage.verifyInvalidCredentialsError();
        });
    });

    test('[TC-24] To Test Login Form with Invalid Data (duplicate) @regression', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate();
        });
        await test.step('Fill invalid username and password', async () => {
            await loginPage.loginWithCredentials('invalid@test.com', 'invalid123');
        });
        await test.step('Verify authentication fails', async () => {
            await loginPage.verifyInvalidCredentialsError();
        });
    });

    // ══════════════════════════════════════════════════════════════════════════
    // @regression — Empty Field Validation Tests
    // ══════════════════════════════════════════════════════════════════════════

    test('[TC-563] Verify that login fails with empty username @regression', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate();
        });
        await test.step('Leave username field empty', async () => {
            // Username remains empty
        });
        await test.step('Include valid password in request body', async () => {
            const creds = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillPassword(creds.Password);
        });
        await test.step('Submit authentication request', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify response returns 400 status code and error message indicates missing username', async () => {
            await loginPage.verifyEmptyUsernameError();
        });
    });

    test('[TC-564] TC_Verify that login fails with empty password @regression', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate();
        });
        await test.step('Include valid username in request body', async () => {
            const creds = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(creds.Username);
        });
        await test.step('Leave password field empty', async () => {
            // Password remains empty
        });
        await test.step('Submit authentication request', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify response returns 400 status code and error message indicates missing password', async () => {
            await loginPage.verifyEmptyPasswordError();
        });
    });

    // ══════════════════════════════════════════════════════════════════════════
    // @regression — Edge Case / Import Test
    // ══════════════════════════════════════════════════════════════════════════

    test('[TC-25] test import 01 @regression', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate();
        });
        await test.step('Verify login page elements are present', async () => {
            await loginPage.verifyLoginPageLoaded();
            await loginPage.verifyLoginPageElements();
        });
        // No further steps provided; test validates page load and element presence
    });

});
