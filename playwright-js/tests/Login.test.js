import test from '../testFixtures/fixture.js';

test.describe.parallel('Login Module Tests @smoke @regression', () => {

    test('[TC-560] Verify that login works with valid credentials @smoke @api', async ({ loginPage }) => {
        await test.step('Send POST request to /login endpoint', async () => {
            const credentials = loginPage.getCredentialsByRole('Admin');
            const response = await loginPage.sendLoginRequest(credentials.username, credentials.password);
            await loginPage.verifyResponseStatus(response, 200);
        });

        await test.step('Include valid username in request body', async () => {
            // Username is processed in the request
        });

        await test.step('Include valid password in request body', async () => {
            // Password is processed in the request
        });

        await test.step('Submit authentication request and validate response returns 200 status code', async () => {
            const credentials = loginPage.getCredentialsByRole('Admin');
            const response = await loginPage.sendLoginRequest(credentials.username, credentials.password);
            await loginPage.verifyResponseStatus(response, 200);
        });

        await test.step('Validate response contains authentication token', async () => {
            const credentials = loginPage.getCredentialsByRole('Admin');
            const response = await loginPage.sendLoginRequest(credentials.username, credentials.password);
            await loginPage.verifyResponseContainsToken(response);
        });
    });

    test('[TC-21] Verify that login works with valid credentials @smoke @ui', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLogin();
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter valid username', async () => {
            const credentials = loginPage.getCredentialsByRole('Admin');
            await loginPage.enterUsername(credentials.username);
        });

        await test.step('Enter valid password', async () => {
            const credentials = loginPage.getCredentialsByRole('Admin');
            await loginPage.enterPassword(credentials.password);
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLogin();
        });

        await test.step('User should login successfully', async () => {
            await loginPage.verifyLoginSuccess();
        });
    });

    test('[TC-561] Verify that login fails with invalid username @regression @api', async ({ loginPage }) => {
        await test.step('Send POST request to /login endpoint', async () => {
            const response = await loginPage.sendLoginRequest('invaliduser@test.com', 'ValidPass123');
            await loginPage.verifyResponseStatus(response, 401);
        });

        await test.step('Include invalid username in request body', async () => {
            // Invalid username is processed
        });

        await test.step('Include valid password in request body', async () => {
            // Valid password is processed
        });

        await test.step('Submit authentication request and validate response returns 401 status code', async () => {
            const response = await loginPage.sendLoginRequest('invaliduser@test.com', 'ValidPass123');
            await loginPage.verifyResponseStatus(response, 401);
        });

        await test.step('Validate error message in response', async () => {
            const response = await loginPage.sendLoginRequest('invaliduser@test.com', 'ValidPass123');
            await loginPage.verifyResponseContainsError(response, 'invalid credentials');
        });
    });

    test('[TC-562] Verify that login fails with invalid password @regression @api', async ({ loginPage }) => {
        await test.step('Send POST request to /login endpoint', async () => {
            const credentials = loginPage.getCredentialsByRole('Admin');
            const response = await loginPage.sendLoginRequest(credentials.username, 'WrongPassword123');
            await loginPage.verifyResponseStatus(response, 401);
        });

        await test.step('Include valid username in request body', async () => {
            // Valid username is processed
        });

        await test.step('Include invalid password in request body', async () => {
            // Invalid password is processed
        });

        await test.step('Submit authentication request and validate response returns 401 status code', async () => {
            const credentials = loginPage.getCredentialsByRole('Admin');
            const response = await loginPage.sendLoginRequest(credentials.username, 'WrongPassword123');
            await loginPage.verifyResponseStatus(response, 401);
        });

        await test.step('Validate error message indicates invalid credentials', async () => {
            const credentials = loginPage.getCredentialsByRole('Admin');
            const response = await loginPage.sendLoginRequest(credentials.username, 'WrongPassword123');
            await loginPage.verifyResponseContainsError(response, 'invalid credentials');
        });
    });

    test('[TC-563] Verify that login fails with empty username @regression @api', async ({ loginPage }) => {
        await test.step('Send POST request to /login endpoint', async () => {
            const response = await loginPage.sendLoginRequest('', 'ValidPass123');
            await loginPage.verifyResponseStatus(response, 400);
        });

        await test.step('Include empty username field in request body', async () => {
            // Empty username is processed
        });

        await test.step('Include valid password in request body', async () => {
            // Valid password is processed
        });

        await test.step('Submit authentication request and validate response returns 400 status code', async () => {
            const response = await loginPage.sendLoginRequest('', 'ValidPass123');
            await loginPage.verifyResponseStatus(response, 400);
        });

        await test.step('Validate error message indicates missing username', async () => {
            const response = await loginPage.sendLoginRequest('', 'ValidPass123');
            await loginPage.verifyResponseContainsError(response, 'username');
        });
    });

    test('[TC-564] Verify that login fails with empty password @regression @api', async ({ loginPage }) => {
        await test.step('Send POST request to /login endpoint', async () => {
            const credentials = loginPage.getCredentialsByRole('Admin');
            const response = await loginPage.sendLoginRequest(credentials.username, '');
            await loginPage.verifyResponseStatus(response, 400);
        });

        await test.step('Include valid username in request body', async () => {
            // Valid username is processed
        });

        await test.step('Include empty password field in request body', async () => {
            // Empty password is processed
        });

        await test.step('Submit authentication request and validate response returns 400 status code', async () => {
            const credentials = loginPage.getCredentialsByRole('Admin');
            const response = await loginPage.sendLoginRequest(credentials.username, '');
            await loginPage.verifyResponseStatus(response, 400);
        });

        await test.step('Validate error message indicates missing password', async () => {
            const credentials = loginPage.getCredentialsByRole('Admin');
            const response = await loginPage.sendLoginRequest(credentials.username, '');
            await loginPage.verifyResponseContainsError(response, 'password');
        });
    });

    test('[TC-22] To Test Login Form with Invalid Data @regression @ui', async ({ loginPage }) => {
        await test.step('Navigate to 192.168.10.124:4001', async () => {
            await loginPage.navigateToLogin();
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter username and password', async () => {
            await loginPage.enterUsername('invaliduser@test.com');
            await loginPage.enterPassword('wrongpassword');
        });

        await test.step('System should accept the username and password', async () => {
            await loginPage.clickLogin();
            await loginPage.verifyLoginErrorDisplayed();
        });
    });

});

