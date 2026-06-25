import test from '../testFixtures/fixture.js';

test.describe.parallel('Login Authentication Tests - AG-Helix @smoke @regression', () => {

    test('[TC-21] Verify that login works with valid credentials @smoke', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLogin();
        });

        await test.step('Login page should display', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter valid username', async () => {
            const loginData = loginPage.getLoginDataByRole('Admin');
            await loginPage.enterUsername(loginData.username);
        });

        await test.step('Username accepted - Enter valid password', async () => {
            const loginData = loginPage.getLoginDataByRole('Admin');
            await loginPage.enterPassword(loginData.password);
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('User should login successfully', async () => {
            await loginPage.verifyLoginSuccess();
        });
    });

    test('[TC-560] Verify that login works with valid credentials (API) @smoke', async ({ loginPage }) => {
        await test.step('Navigate to login page and prepare authentication', async () => {
            await loginPage.navigateToLogin();
        });

        await test.step('Include valid username in request body', async () => {
            const loginData = loginPage.getLoginDataByRole('Admin');
            await loginPage.enterUsername(loginData.username);
        });

        await test.step('Include valid password in request body', async () => {
            const loginData = loginPage.getLoginDataByRole('Admin');
            await loginPage.enterPassword(loginData.password);
        });

        await test.step('Submit authentication request', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Response should return 200 status code - Validate response contains authentication token', async () => {
            await loginPage.verifyLoginSuccess();
            await loginPage.verifyAuthTokenPresent();
        });
    });

    test('[TC-561] Verify that login fails with invalid username @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLogin();
        });

        await test.step('Include invalid username in request body', async () => {
            await loginPage.enterUsername('invaliduser@test.com');
        });

        await test.step('Include valid password in request body', async () => {
            const loginData = loginPage.getLoginDataByRole('Admin');
            await loginPage.enterPassword(loginData.password);
        });

        await test.step('Submit authentication request', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Response should return 401 status code - Validate error message indicates invalid credentials', async () => {
            await loginPage.verifyLoginFailure('invalid credentials');
        });
    });

    test('[TC-562] Verify that login fails with invalid password @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLogin();
        });

        await test.step('Include valid username in request body', async () => {
            const loginData = loginPage.getLoginDataByRole('Admin');
            await loginPage.enterUsername(loginData.username);
        });

        await test.step('Include invalid password in request body', async () => {
            await loginPage.enterPassword('WrongPassword123!');
        });

        await test.step('Submit authentication request', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Response should return 401 status code - Validate error message indicates invalid credentials', async () => {
            await loginPage.verifyLoginFailure('invalid credentials');
        });
    });

    test('[TC-563] Verify that login fails with empty username @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLogin();
        });

        await test.step('Include empty username field in request body', async () => {
            await loginPage.enterUsername('');
        });

        await test.step('Include valid password in request body', async () => {
            const loginData = loginPage.getLoginDataByRole('Admin');
            await loginPage.enterPassword(loginData.password);
        });

        await test.step('Submit authentication request', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Response should return 400 status code - Validate error message indicates missing username', async () => {
            await loginPage.verifyMissingUsernameError();
        });
    });

    test('[TC-564] Verify that login fails with empty password @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLogin();
        });

        await test.step('Include valid username in request body', async () => {
            const loginData = loginPage.getLoginDataByRole('Admin');
            await loginPage.enterUsername(loginData.username);
        });

        await test.step('Include empty password field in request body', async () => {
            await loginPage.enterPassword('');
        });

        await test.step('Submit authentication request', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Response should return 400 status code - Validate error message indicates missing password', async () => {
            await loginPage.verifyMissingPasswordError();
        });
    });

    test('[TC-22] To Test Login Form with Invalid Data @regression', async ({ loginPage }) => {
        await test.step('Navigate to 192.168.10.124:4001', async () => {
            await loginPage.navigateToLogin('http://192.168.10.124:4001');
        });

        await test.step('System should display a Login Page with the Email, Password fields, Login button and Register Hyperlink', async () => {
            await loginPage.verifyLoginPageDisplayed();
            await loginPage.verifyRegisterLinkVisible();
        });

        await test.step('Enter username and password', async () => {
            await loginPage.enterUsername('invaliduser@test.com');
            await loginPage.enterPassword('invalidpass');
        });

        await test.step('System should accept the username and password', async () => {
            await loginPage.clickLoginButton();
        });
    });

});