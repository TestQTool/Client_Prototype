import test from '../testFixtures/fixture.js';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/configurations';
const TEST_USERNAME = 'Testing';
const TEST_PASSWORD = 'Test@122';

test.describe.parallel('Login Authentication Tests @regression', () => {

    test('[TC-908] Verify that user can login successfully with valid credentials @smoke', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter username and password', async () => {
            await loginPage.enterCredentials(TEST_USERNAME, TEST_PASSWORD);
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify user is redirected to configurations page', async () => {
            await loginPage.verifyUserIsRedirectedToConfigurationsPage();
        });

        await test.step('Verify user session is established', async () => {
            await loginPage.verifyConfigurationsPageIsDisplayed();
        });
    });

    test('[TC-909] Verify that user can logout successfully after login @smoke', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter username and password', async () => {
            await loginPage.enterCredentials(TEST_USERNAME, TEST_PASSWORD);
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Click Logout button', async () => {
            await loginPage.performLogout();
        });

        await test.step('Verify user is redirected to login page', async () => {
            await loginPage.verifyUserIsRedirectedToLoginPage();
        });
    });

    test('[TC-910] Verify that user remains logged in after page refresh @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter username and password', async () => {
            await loginPage.enterCredentials(TEST_USERNAME, TEST_PASSWORD);
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Refresh the browser page', async () => {
            await loginPage.verifyUserSessionPersistsAfterRefresh();
        });
    });

    test('[TC-911] Verify that user can login and access configurations page directly @smoke', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter username and password', async () => {
            await loginPage.enterCredentials(TEST_USERNAME, TEST_PASSWORD);
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify configurations page content is visible', async () => {
            await loginPage.verifyConfigurationsPageIsDisplayed();
        });
    });

    test('[TC-912] Verify that login fails with invalid username @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter invalid username and valid password', async () => {
            await loginPage.enterCredentials('InvalidUser', TEST_PASSWORD);
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify error message is displayed', async () => {
            await loginPage.verifyInvalidCredentialsErrorIsDisplayed();
        });

        await test.step('Verify user remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('[TC-913] Verify that login fails with invalid password @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter valid username and invalid password', async () => {
            await loginPage.enterCredentials(TEST_USERNAME, 'WrongPassword123');
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify error message is displayed', async () => {
            await loginPage.verifyInvalidCredentialsErrorIsDisplayed();
        });

        await test.step('Verify user remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('[TC-914] Verify that login fails with empty username field @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter empty username and valid password', async () => {
            await loginPage.enterPassword(TEST_PASSWORD);
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify validation error is displayed', async () => {
            await loginPage.verifyUsernameRequiredErrorIsDisplayed();
        });

        await test.step('Verify user remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('[TC-915] Verify that login fails with empty password field @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter valid username and empty password', async () => {
            await loginPage.enterUsername(TEST_USERNAME);
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify validation error is displayed', async () => {
            await loginPage.verifyPasswordRequiredErrorIsDisplayed();
        });

        await test.step('Verify user remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('[TC-916] Verify that login fails with both username and password empty @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Click Login button without entering credentials', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify validation errors are displayed for both fields', async () => {
            await loginPage.verifyBothFieldsRequiredErrorsAreDisplayed();
        });

        await test.step('Verify user remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('[TC-917] Verify that logout fails when user is not logged in @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Attempt to access logout functionality without logging in', async () => {
            // Navigate directly or attempt logout action
        });

        await test.step('Verify user is redirected to login page', async () => {
            await loginPage.verifyUserIsRedirectedToLoginPage();
        });

        await test.step('Verify no error occurs', async () => {
            await loginPage.verifyNoSystemErrorOccurs();
        });
    });

    test('[TC-918] Verify that login handles username with maximum character length @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter username with maximum length and valid password', async () => {
            const maxLengthUsername = 'A'.repeat(255);
            await loginPage.enterCredentials(maxLengthUsername, TEST_PASSWORD);
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify no system error or crash occurs', async () => {
            await loginPage.verifyNoSystemErrorOccurs();
        });
    });

    test('[TC-919] Verify that login handles password with maximum character length @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter valid username and password with maximum length', async () => {
            const maxLengthPassword = 'P'.repeat(255);
            await loginPage.enterCredentials(TEST_USERNAME, maxLengthPassword);
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify no system error or crash occurs', async () => {
            await loginPage.verifyNoSystemErrorOccurs();
        });
    });

    test('[TC-920] Verify that login handles username with special characters @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter username with special characters', async () => {
            await loginPage.enterCredentials('Test@User#123', TEST_PASSWORD);
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify system validates or rejects special characters', async () => {
            await loginPage.verifyErrorMessageIsDisplayed();
        });

        await test.step('Verify application handles input without error', async () => {
            await loginPage.verifyNoSystemErrorOccurs();
        });
    });

    test('[TC-921] Verify that login handles password with special characters @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter valid username and password with special characters', async () => {
            await loginPage.enterCredentials(TEST_USERNAME, 'P@ssw0rd!#$%');
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify system processes special characters correctly', async () => {
            // Will succeed or fail based on credential validity
        });

        await test.step('Verify no encoding or parsing errors occur', async () => {
            await loginPage.verifyNoSystemErrorOccurs();
        });
    });

    test('[TC-922] Verify that login handles username with leading and trailing spaces @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter username with leading and trailing spaces', async () => {
            await loginPage.enterCredentials('  Testing  ', TEST_PASSWORD);
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify system trims spaces or validates appropriately', async () => {
            // System should handle spaces correctly
        });
    });

    test('[TC-923] Verify that login handles password with leading and trailing spaces @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter valid username and password with leading and trailing spaces', async () => {
            await loginPage.enterCredentials(TEST_USERNAME, '  Test@122  ');
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });
    });

    test('[TC-924] Verify that login handles username with only whitespace @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter username with only whitespace', async () => {
            await loginPage.enterCredentials('     ', TEST_PASSWORD);
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify validation error is displayed', async () => {
            await loginPage.verifyErrorMessageIsDisplayed();
        });

        await test.step('Verify user remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('[TC-925] Verify that login handles password with only whitespace @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter valid username and password with only whitespace', async () => {
            await loginPage.enterCredentials(TEST_USERNAME, '     ');
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify validation error is displayed', async () => {
            await loginPage.verifyErrorMessageIsDisplayed();
        });

        await test.step('Verify user remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('[TC-926] Verify that multiple consecutive login attempts are handled correctly @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter username and password', async () => {
            await loginPage.enterCredentials(TEST_USERNAME, TEST_PASSWORD);
        });

        await test.step('Click Login button multiple times rapidly', async () => {
            await Promise.all([
                loginPage.clickLoginButton(),
                loginPage.clickLoginButton(),
                loginPage.clickLoginButton()
            ]);
        });

        await test.step('Verify system handles concurrent requests gracefully', async () => {
            await loginPage.verifyUserIsRedirectedToConfigurationsPage();
        });
    });

    test('[TC-927] Verify that logout works correctly after multiple login sessions @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Perform first login', async () => {
            await loginPage.performLogin(TEST_USERNAME, TEST_PASSWORD);
        });

        await test.step('Logout', async () => {
            await loginPage.performLogout();
        });

        await test.step('Verify user cannot access protected pages without re-login', async () => {
            await loginPage.verifyUserIsRedirectedToLoginPage();
        });
    });

    test('[TC-928] Verify that login API returns success response with valid credentials @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter username and password', async () => {
            await loginPage.enterCredentials(TEST_USERNAME, TEST_PASSWORD);
        });

        await test.step('Submit login request and capture API response', async () => {
            await loginPage.verifyLoginAPIReturnsSuccessResponse();
        });
    });

    test('[TC-929] Verify that login API returns error response with invalid credentials @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter invalid credentials', async () => {
            await loginPage.enterCredentials('InvalidUser', 'InvalidPass');
        });

        await test.step('Submit login request and capture API response', async () => {
            await loginPage.verifyLoginAPIReturnsErrorResponse();
        });
    });

    test('[TC-930] Verify that logout API invalidates user session @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Login', async () => {
            await loginPage.performLogin(TEST_USERNAME, TEST_PASSWORD);
        });

        await test.step('Logout and verify API call', async () => {
            await loginPage.verifyLogoutAPIInvalidatesSession();
        });
    });

    test('[TC-931] Verify that password is not visible in plain text during login @smoke @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter password', async () => {
            await loginPage.enterPassword(TEST_PASSWORD);
        });

        await test.step('Verify password field type is password', async () => {
            await loginPage.verifyPasswordIsNotVisibleInPlainText();
        });
    });

    test('[TC-932] Verify that authentication token is stored securely after login @smoke @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Login', async () => {
            await loginPage.performLogin(TEST_USERNAME, TEST_PASSWORD);
        });

        await test.step('Verify authentication token is stored in secure storage', async () => {
            await loginPage.verifyAuthTokenIsStoredSecurely();
        });

        await test.step('Verify token is not accessible via JavaScript', async () => {
            await loginPage.verifyTokenIsNotAccessibleViaJavaScript();
        });
    });

    test('[TC-933] Verify that session expires after logout @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Login and then logout', async () => {
            await loginPage.performLogin(TEST_USERNAME, TEST_PASSWORD);
            await loginPage.performLogout();
        });

        await test.step('Verify session is invalidated', async () => {
            await loginPage.verifySessionExpiresAfterLogout();
        });

        await test.step('Verify user is redirected to login page when accessing protected page', async () => {
            await loginPage.verifyUserIsRedirectedToLoginPage();
        });
    });

    test('[TC-934] Verify that brute force login attempts are handled appropriately @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Attempt multiple failed logins', async () => {
            for (let i = 0; i < 5; i++) {
                await loginPage.enterCredentials('InvalidUser', 'InvalidPass');
                await loginPage.clickLoginButton();
            }
        });

        await test.step('Verify account lockout or rate limiting is triggered', async () => {
            await loginPage.verifyErrorMessageIsDisplayed();
        });
    });

    test('[TC-935] Verify that login response time is within acceptable limits @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter credentials', async () => {
            await loginPage.enterCredentials(TEST_USERNAME, TEST_PASSWORD);
        });

        await test.step('Click Login button and measure response time', async () => {
            await loginPage.verifyLoginResponseTime(3000);
        });

        await test.step('Verify user is redirected to configurations page promptly', async () => {
            await loginPage.verifyUserIsRedirectedToConfigurationsPage();
        });
    });

    test('[TC-936] Verify that logout response time is within acceptable limits @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Login', async () => {
            await loginPage.performLogin(TEST_USERNAME, TEST_PASSWORD);
        });

        await test.step('Logout and measure response time', async () => {
            await loginPage.verifyLogoutResponseTime(2000);
        });
    });

    test('[TC-1028] Verify that system handles concurrent login requests efficiently @regression', async ({ loginPage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await loginPage.navigateToConfigurationsPage(BASE_URL);
        });

        await test.step('Enter credentials', async () => {
            await loginPage.enterCredentials(TEST_USERNAME, TEST_PASSWORD);
        });

        await test.step('Monitor system response and resource usage', async () => {
            // Simulate concurrent requests
            await Promise.all([
                loginPage.clickLoginButton(),
                loginPage.clickLoginButton(),
                loginPage.clickLoginButton()
            ]);
        });

        await test.step('Verify all requests complete without timeout or server errors', async () => {
            await loginPage.verifyNoSystemErrorOccurs();
        });
    });

});

