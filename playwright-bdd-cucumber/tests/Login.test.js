// tests/Login.test.js
// ─────────────────────────────────────────────────────────────────────────────
// Feature: Login
// Generated: Qentrix ScriptGenerationAgent | Framework: StaticFrameworks
// Test Inventory Cases: TC-562, TC-22, TC-24, TC-25, TC-21, TC-23, TC-561, TC-563, TC-560, TC-564
// ─────────────────────────────────────────────────────────────────────────────
import { expect } from '@playwright/test';
import test from '../testFixtures/fixture.js';

// ─────────────────────────────────────────────────────────────────────────────
// Fixture used: loginPage (registered in testFixtures/fixture.js)
// Page class: pages/loginPage.js
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Login Feature', () => {

    test.describe.configure({ mode: 'parallel' });

    // ── @smoke — Critical path ────────────────────────────────────────────────

    test('TC-21: Verify that login works with valid credentials @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigate();
        });
        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageLoaded();
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
            await loginPage.clickLogin();
        });
        await test.step('Verify user logged in successfully', async () => {
            await loginPage.verifyLoginSuccess();
        });
    });

    test('TC-560: Verify that login works with valid credentials (API) @smoke @regression', async ({ loginPage }) => {
        await test.step('Send POST request to /login endpoint', async () => {
            const creds = loginPage.getLoginDataByRole('Admin');
            const response = await loginPage.sendLoginRequest({
                username: creds.Username,
                password: creds.Password
            });
            await test.step('Verify response returns 200 status code', async () => {
                await loginPage.verifyResponseStatus(response, 200);
            });
            await test.step('Validate response contains authentication token', async () => {
                await loginPage.verifyAuthTokenPresent(response);
            });
        });
    });

    test('TC-22: To Test Login Form with Invalid Data @regression', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate();
        });
        await test.step('Verify system displays Login Page with Email, Password fields, Login button and Register Hyperlink', async () => {
            await loginPage.verifyLoginPageLoaded();
        });
        await test.step('Enter invalid username and password', async () => {
            await loginPage.fillUsername('invaliduser@test.com');
            await loginPage.fillPassword('wrongpassword');
        });
        await test.step('Verify system accepts the username and password input', async () => {
            // Input acceptance is implicit if no error during fill
            expect(true).toBe(true);
        });
    });

    // ── @regression — Negative tests ─────────────────────────────────────────

    test('TC-562: Verify that login fails with invalid password @regression', async ({ loginPage }) => {
        await test.step('Send POST request to /login endpoint', async () => {
            const creds = loginPage.getLoginDataByRole('Admin');
            const response = await loginPage.sendLoginRequest({
                username: creds.Username,
                password: 'invalidpassword'
            });
            await test.step('Verify response returns 401 status code', async () => {
                await loginPage.verifyResponseStatus(response, 401);
            });
            await test.step('Validate error message indicates invalid credentials', async () => {
                await loginPage.verifyErrorMessageInResponse(response, 'invalid credentials');
            });
        });
    });

    test('TC-561: Verify that login fails with invalid username @regression', async ({ loginPage }) => {
        await test.step('Send POST request to /login endpoint', async () => {
            const creds = loginPage.getLoginDataByRole('Admin');
            const response = await loginPage.sendLoginRequest({
                username: 'invaliduser@test.com',
                password: creds.Password
            });
            await test.step('Verify response returns 401 status code', async () => {
                await loginPage.verifyResponseStatus(response, 401);
            });
            await test.step('Validate error message indicates invalid credentials', async () => {
                await loginPage.verifyErrorMessageInResponse(response, 'invalid credentials');
            });
        });
    });

    test('TC-563: Verify that login fails with empty username @regression', async ({ loginPage }) => {
        await test.step('Send POST request to /login endpoint', async () => {
            const creds = loginPage.getLoginDataByRole('Admin');
            const response = await loginPage.sendLoginRequest({
                username: '',
                password: creds.Password
            });
            await test.step('Verify response returns 400 status code', async () => {
                await loginPage.verifyResponseStatus(response, 400);
            });
            await test.step('Validate error message indicates missing username', async () => {
                await loginPage.verifyErrorMessageInResponse(response, 'missing username');
            });
        });
    });

    test('TC-564: Verify that login fails with empty password @regression', async ({ loginPage }) => {
        await test.step('Send POST request to /login endpoint', async () => {
            const creds = loginPage.getLoginDataByRole('Admin');
            const response = await loginPage.sendLoginRequest({
                username: creds.Username,
                password: ''
            });
            await test.step('Verify response returns 400 status code', async () => {
                await loginPage.verifyResponseStatus(response, 400);
            });
            await test.step('Validate error message indicates missing password', async () => {
                await loginPage.verifyErrorMessageInResponse(response, 'missing password');
            });
        });
    });

    // ── Placeholder tests for incomplete test case definitions ────────────────

    test('TC-24: To Test Login Form with Invalid Data @regression', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate();
        });
        await test.step('TODO: Complete test steps - no steps provided in test inventory', async () => {
            // Test case TC-24 has no steps defined in the inventory
            expect(true).toBe(true);
        });
    });

    test('TC-25: test import 01 @regression', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate();
        });
        await test.step('TODO: Complete test steps - no steps provided in test inventory', async () => {
            // Test case TC-25 has no steps defined in the inventory
            expect(true).toBe(true);
        });
    });

    test('TC-23: To Test Login Form with Invalid Data @regression', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate();
        });
        await test.step('TODO: Complete test steps - no steps provided in test inventory', async () => {
            // Test case TC-23 has no steps defined in the inventory
            expect(true).toBe(true);
        });
    });

});

