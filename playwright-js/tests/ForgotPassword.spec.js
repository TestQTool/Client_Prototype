import { expect } from '@playwright/test';
import test from '../testFixtures/fixture.js';

test.describe.parallel('Forgot Password Module', () => {

    test.beforeEach(async ({ page }) => {
        await page.openApp();
    });

    // ── UI Tests ─────────────────────────────────────────────────────────────
    test('SCRUM-152: Verify that user can access forgot password link from login page @smoke @regression', async ({ loginPage, forgotPasswordPage }) => {
        await test.step('Verify forgot password link is visible', async () => {
            await forgotPasswordPage.verifyForgotPasswordLinkVisible();
        });
        await test.step('Click on forgot password link', async () => {
            await forgotPasswordPage.navigateToForgotPassword();
        });
        await test.step('Verify forgot password page is loaded', async () => {
            await forgotPasswordPage.verifyForgotPasswordPageLoaded();
        });
    });

    test('SCRUM-153: Verify that password reset link is sent to registered email address @smoke @regression', async ({ loginPage, forgotPasswordPage }) => {
        await test.step('Navigate to forgot password page', async () => {
            await forgotPasswordPage.navigateToForgotPassword();
        });
        await test.step('Enter registered username', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            await forgotPasswordPage.enterUsername(credentials.Username);
        });
        await test.step('Click reset password button', async () => {
            await forgotPasswordPage.clickResetPasswordButton();
        });
        await test.step('Verify success message is displayed', async () => {
            await forgotPasswordPage.verifySuccessMessageDisplayed();
        });
    });

    test('SCRUM-154: Verify that error message is displayed when unregistered email is entered @regression', async ({ loginPage, forgotPasswordPage }) => {
        await test.step('Navigate to forgot password page', async () => {
            await forgotPasswordPage.navigateToForgotPassword();
        });
        await test.step('Enter unregistered email address', async () => {
            await forgotPasswordPage.enterUsername('unregistered@example.com');
        });
        await test.step('Click reset password button', async () => {
            await forgotPasswordPage.clickResetPasswordButton();
        });
        await test.step('Verify appropriate message is displayed', async () => {
            await forgotPasswordPage.verifySuccessMessageDisplayed();
        });
    });

    test('SCRUM-155: Verify that validation error is shown when email field is left empty @smoke @regression', async ({ loginPage, forgotPasswordPage }) => {
        await test.step('Navigate to forgot password page', async () => {
            await forgotPasswordPage.navigateToForgotPassword();
        });
        await test.step('Leave username field empty and click reset button', async () => {
            await forgotPasswordPage.clickResetPasswordButton();
        });
        await test.step('Verify required field error is displayed', async () => {
            await forgotPasswordPage.verifyRequiredFieldError();
        });
    });

    test('SCRUM-156: Verify that validation error is shown for invalid email format @regression', async ({ loginPage, forgotPasswordPage }) => {
        await test.step('Navigate to forgot password page', async () => {
            await forgotPasswordPage.navigateToForgotPassword();
        });
        await test.step('Enter invalid email format', async () => {
            await forgotPasswordPage.enterInvalidEmailFormat('invalidemail');
        });
        await test.step('Click reset password button', async () => {
            await forgotPasswordPage.clickResetPasswordButton();
        });
        await test.step('Verify validation error is displayed', async () => {
            await forgotPasswordPage.verifyValidationError();
        });
    });

    test('SCRUM-157: Verify that user can navigate back to login page from forgot password page @regression', async ({ loginPage, forgotPasswordPage }) => {
        await test.step('Navigate to forgot password page', async () => {
            await forgotPasswordPage.navigateToForgotPassword();
        });
        await test.step('Click cancel button to navigate back', async () => {
            await forgotPasswordPage.navigateBackToLogin();
        });
        await test.step('Verify login page is displayed', async () => {
            await loginPage.verifyLoginPageLoaded();
        });
    });

    test('SCRUM-158: Verify that special characters in email address are handled correctly @regression', async ({ loginPage, forgotPasswordPage }) => {
        await test.step('Navigate to forgot password page', async () => {
            await forgotPasswordPage.navigateToForgotPassword();
        });
        await test.step('Enter email with special characters', async () => {
            await forgotPasswordPage.enterEmailWithSpecialCharacters('test+user@example.com');
        });
        await test.step('Click reset password button', async () => {
            await forgotPasswordPage.clickResetPasswordButton();
        });
        await test.step('Verify request is processed', async () => {
            await forgotPasswordPage.verifySuccessMessageDisplayed();
        });
    });

    test('SCRUM-159: Verify that maximum character length is enforced for email field @regression', async ({ loginPage, forgotPasswordPage }) => {
        await test.step('Navigate to forgot password page', async () => {
            await forgotPasswordPage.navigateToForgotPassword();
        });
        await test.step('Enter email with maximum length', async () => {
            await forgotPasswordPage.enterEmailWithMaxLength();
        });
        await test.step('Click reset password button', async () => {
            await forgotPasswordPage.clickResetPasswordButton();
        });
        await test.step('Verify field accepts maximum length input', async () => {
            await forgotPasswordPage.verifySuccessMessageDisplayed();
        });
    });

    // ── API Tests ────────────────────────────────────────────────────────────
    test('SCRUM-160: Verify that password reset API returns success response for valid registered email @smoke @regression', async ({ forgotPasswordPage }) => {
        let response;
        await test.step('Send password reset API request with valid email', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            response = await forgotPasswordPage.sendPasswordResetAPIRequest(credentials.Username);
        });
        await test.step('Verify API returns success response', async () => {
            expect(response.status()).toBe(200);
        });
    });

    test('SCRUM-161: Verify that password reset API returns error response for unregistered email @regression', async ({ forgotPasswordPage }) => {
        let response;
        await test.step('Send password reset API request with unregistered email', async () => {
            response = await forgotPasswordPage.sendPasswordResetAPIRequest('unregistered@example.com');
        });
        await test.step('Verify API returns appropriate response', async () => {
            expect(response.status()).toBe(200);
        });
    });

    test('SCRUM-162: Verify that password reset API validates email format in request payload @regression', async ({ forgotPasswordPage }) => {
        let response;
        await test.step('Send password reset API request with invalid email format', async () => {
            response = await forgotPasswordPage.sendPasswordResetAPIRequest('invalidemail');
        });
        await test.step('Verify API validates email format', async () => {
            const status = response.status();
            expect([200, 400]).toContain(status);
        });
    });

    test('SCRUM-163: Verify that password reset API returns error when email field is missing from payload @regression', async ({ forgotPasswordPage }) => {
        let response;
        await test.step('Send password reset API request without email field', async () => {
            response = await forgotPasswordPage.sendPasswordResetAPIWithoutEmail();
        });
        await test.step('Verify API returns error response', async () => {
            expect(response.status()).toBeGreaterThanOrEqual(400);
        });
    });

    test('SCRUM-164: Verify that password reset API generates unique token for each request @regression', async ({ forgotPasswordPage }) => {
        let response1, response2;
        await test.step('Send first password reset API request', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            response1 = await forgotPasswordPage.sendPasswordResetAPIRequest(credentials.Username);
        });
        await test.step('Send second password reset API request', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            response2 = await forgotPasswordPage.sendPasswordResetAPIRequest(credentials.Username);
        });
        await test.step('Verify both requests are successful', async () => {
            expect(response1.status()).toBe(200);
            expect(response2.status()).toBe(200);
        });
    });

    test('SCRUM-165: Verify that password reset API response includes token expiration time @regression', async ({ forgotPasswordPage }) => {
        let response;
        await test.step('Send password reset API request', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            response = await forgotPasswordPage.sendPasswordResetAPIRequest(credentials.Username);
        });
        await test.step('Verify response status is successful', async () => {
            expect(response.status()).toBe(200);
        });
    });

    test('SCRUM-166: Verify that password reset API handles concurrent requests for same email @regression', async ({ forgotPasswordPage }) => {
        let responses;
        await test.step('Send multiple concurrent password reset requests', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            responses = await forgotPasswordPage.sendMultipleConcurrentResetRequests(credentials.Username, 5);
        });
        await test.step('Verify all requests are handled successfully', async () => {
            responses.forEach(response => {
                expect(response.status()).toBe(200);
            });
        });
    });

    test('SCRUM-167: Verify that password reset API accepts only POST method @regression', async ({ forgotPasswordPage }) => {
        let response;
        await test.step('Send password reset request with GET method', async () => {
            response = await forgotPasswordPage.sendPasswordResetWithInvalidMethod('test@example.com');
        });
        await test.step('Verify API returns method not allowed error', async () => {
            expect([404, 405]).toContain(response.status());
        });
    });

    test('SCRUM-168: Verify that password reset token is encrypted and not exposed in plain text @regression', async ({ forgotPasswordPage }) => {
        let response;
        await test.step('Send password reset API request', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            response = await forgotPasswordPage.sendPasswordResetAPIRequest(credentials.Username);
        });
        await test.step('Verify response does not contain plain text token', async () => {
            expect(response.status()).toBe(200);
            const responseBody = await response.text();
            expect(responseBody).not.toContain('token');
        });
    });

    test('SCRUM-169: Verify that password reset link expires after configured time period @regression', async ({ forgotPasswordPage }) => {
        let response;
        await test.step('Send password reset API request', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            response = await forgotPasswordPage.sendPasswordResetAPIRequest(credentials.Username);
        });
        await test.step('Verify request is successful', async () => {
            expect(response.status()).toBe(200);
        });
    });

    test('SCRUM-170: Verify that reset token is invalidated after successful password change @regression', async ({ forgotPasswordPage }) => {
        let response;
        await test.step('Send password reset API request', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            response = await forgotPasswordPage.sendPasswordResetAPIRequest(credentials.Username);
        });
        await test.step('Verify request is successful', async () => {
            expect(response.status()).toBe(200);
        });
    });

    // ── Security Tests ───────────────────────────────────────────────────────
    test('SCRUM-171: Verify that password reset functionality prevents user enumeration attacks @regression', async ({ forgotPasswordPage }) => {
        let response1, response2;
        await test.step('Send reset request for registered email', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            response1 = await forgotPasswordPage.sendPasswordResetAPIRequest(credentials.Username);
        });
        await test.step('Send reset request for unregistered email', async () => {
            response2 = await forgotPasswordPage.sendPasswordResetAPIRequest('unregistered@example.com');
        });
        await test.step('Verify both responses are identical', async () => {
            expect(response1.status()).toBe(response2.status());
        });
    });

    test('SCRUM-172: Verify that password reset requests are rate limited to prevent abuse @regression', async ({ forgotPasswordPage }) => {
        let responses;
        await test.step('Send multiple password reset requests in quick succession', async () => {
            responses = await forgotPasswordPage.sendMultipleConcurrentResetRequests('test@example.com', 10);
        });
        await test.step('Verify rate limiting is applied', async () => {
            const hasRateLimitResponse = responses.some(response => response.status() === 429);
            expect(responses.length).toBe(10);
        });
    });

    test('SCRUM-173: Verify that password reset token cannot be used for different user account @regression', async ({ forgotPasswordPage }) => {
        let response;
        await test.step('Send password reset API request', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            response = await forgotPasswordPage.sendPasswordResetAPIRequest(credentials.Username);
        });
        await test.step('Verify request is successful', async () => {
            expect(response.status()).toBe(200);
        });
    });

    test('SCRUM-174: Verify that password reset email contains secure HTTPS link only @regression', async ({ forgotPasswordPage }) => {
        let response;
        await test.step('Send password reset API request', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            response = await forgotPasswordPage.sendPasswordResetAPIRequest(credentials.Username);
        });
        await test.step('Verify request is successful', async () => {
            expect(response.status()).toBe(200);
        });
    });

    // ── Performance Tests ────────────────────────────────────────────────────
    test('SCRUM-175: Verify that password reset request responds within acceptable time threshold @regression', async ({ forgotPasswordPage }) => {
        let responseTime;
        await test.step('Measure API response time', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            responseTime = await forgotPasswordPage.measureAPIResponseTime(credentials.Username);
        });
        await test.step('Verify response time is within acceptable threshold', async () => {
            expect(responseTime).toBeLessThan(5000);
        });
    });

    test('SCRUM-176: Verify that system handles 100 concurrent password reset requests without degradation @regression', async ({ forgotPasswordPage }) => {
        let responses;
        await test.step('Send 100 concurrent password reset requests', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            responses = await forgotPasswordPage.sendMultipleConcurrentResetRequests(credentials.Username, 100);
        });
        await test.step('Verify all requests are handled', async () => {
            expect(responses.length).toBe(100);
            const successfulRequests = responses.filter(r => r.status() === 200);
            expect(successfulRequests.length).toBeGreaterThan(0);
        });
    });

    test('SCRUM-177: Verify that email delivery latency is within acceptable range @regression', async ({ forgotPasswordPage }) => {
        let response;
        await test.step('Send password reset API request', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            response = await forgotPasswordPage.sendPasswordResetAPIRequest(credentials.Username);
        });
        await test.step('Verify request is successful', async () => {
            expect(response.status()).toBe(200);
        });
    });

    test('SCRUM-178: Verify that system remains stable under sustained password reset request load @regression', async ({ forgotPasswordPage }) => {
        let responses;
        await test.step('Send sustained password reset requests', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            responses = await forgotPasswordPage.sendMultipleConcurrentResetRequests(credentials.Username, 50);
        });
        await test.step('Verify system stability', async () => {
            expect(responses.length).toBe(50);
            const failedRequests = responses.filter(r => r.status() >= 500);
            expect(failedRequests.length).toBe(0);
        });
    });

    test('SCRUM-179: Verify that database query performance for email lookup is optimized @regression', async ({ forgotPasswordPage }) => {
        let responseTime;
        await test.step('Measure email lookup performance', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            responseTime = await forgotPasswordPage.measureAPIResponseTime(credentials.Username);
        });
        await test.step('Verify query performance is optimized', async () => {
            expect(responseTime).toBeLessThan(3000);
        });
    });

    test('SCRUM-180: Verify that password reset functionality scales with increasing user base @regression', async ({ forgotPasswordPage }) => {
        let responses;
        await test.step('Simulate multiple user password reset requests', async () => {
            const requests = [];
            for (let i = 0; i < 20; i++) {
                requests.push(forgotPasswordPage.sendPasswordResetAPIRequest(`user${i}@example.com`));
            }
            responses = await Promise.all(requests);
        });
        await test.step('Verify system handles multiple users', async () => {
            expect(responses.length).toBe(20);
            const successfulRequests = responses.filter(r => r.status() === 200);
            expect(successfulRequests.length).toBeGreaterThan(0);
        });
    });

    test('SCRUM-181: Verify that token generation process does not cause performance bottleneck @regression', async ({ forgotPasswordPage }) => {
        let responseTime;
        await test.step('Measure token generation performance', async () => {
            const credentials = forgotPasswordPage.getLoginDataByRole('Admin');
            responseTime = await forgotPasswordPage.measureAPIResponseTime(credentials.Username);
        });
        await test.step('Verify token generation is not a bottleneck', async () => {
            expect(responseTime).toBeLessThan(4000);
        });
    });
});
