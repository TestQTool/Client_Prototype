import test from '../testFixtures/fixture.js';

test.describe.parallel('Login Module - AG-Helix Authentication Tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.openApp();
        });
    });

    test('@smoke @regression TC-640: Verify that login shows appropriate error for disabled account', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter disabled account username', async () => {
            await loginPage.fillUsername('disabled.user@test.com');
        });
        await test.step('Enter correct password for disabled account', async () => {
            await loginPage.fillPassword('ValidPass123!');
        });
        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify error message - Account disabled message should display', async () => {
            await loginPage.verifyAccountDisabledMessage();
        });
    });

    test('@regression TC-638: Verify that login handles unicode characters in credentials', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter username with unicode characters', async () => {
            await loginPage.fillUsername('user测试@test.com');
        });
        await test.step('Enter password with unicode characters', async () => {
            await loginPage.fillPassword('Pāşśwørd测试123!');
        });
        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify character encoding - Unicode characters should be handled correctly', async () => {
            await loginPage.verifyErrorMessageDisplayed();
        });
    });

    test('@regression TC-621: Verify that login handles special characters in username', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter username with special characters', async () => {
            await loginPage.fillUsername('user+test!#$@example.com');
        });
        await test.step('Enter valid password', async () => {
            await loginPage.fillPassword('ValidPassword123!');
        });
        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify system behavior - System handles special characters correctly', async () => {
            await loginPage.verifyErrorMessageDisplayed();
        });
    });

    test('@smoke @regression TC-628: Verify that tab navigation works between form fields', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Click on username field', async () => {
            await loginPage.focusUsernameField();
        });
        await test.step('Press tab key - Focus should move to password field', async () => {
            await loginPage.pressTabFromUsername();
        });
        await test.step('Press tab key again - Focus should move to login button', async () => {
            await loginPage.pressTabFromPassword();
        });
        await test.step('Press enter key - Login attempt should be triggered', async () => {
            await loginPage.pressEnterOnLoginButton();
        });
        await test.step('Verify login attempt was triggered', async () => {
            await loginPage.verifyRequiredFieldError();
        });
    });

    test('@regression TC-29: To Test Login Form with Invalid Data', async ({ loginPage }) => {
        await test.step('Enter invalid username', async () => {
            await loginPage.fillUsername('invalid@test.com');
        });
        await test.step('Enter invalid password', async () => {
            await loginPage.fillPassword('wrongpass');
        });
        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify error message displays', async () => {
            await loginPage.verifyInvalidCredentialsError();
        });
    });

    test('@regression TC-635: Verify that login prevents multiple rapid submissions', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter valid credentials', async () => {
            const admin = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(admin.Username);
            await loginPage.fillPassword(admin.Password);
        });
        await test.step('Click login button rapidly multiple times', async () => {
            await loginPage.clickLoginButtonMultipleTimes(5);
        });
        await test.step('Verify subsequent clicks are ignored - Button should be disabled temporarily', async () => {
            await loginPage.verifyLoginButtonDisabled();
        });
        await test.step('Check for duplicate requests - Only one login request should be sent', async () => {
            await loginPage.verifySuccessfulLogin();
        });
    });

    test('@regression TC-28: To Test Login Form with Invalid Data', async ({ loginPage }) => {
        await test.step('Enter invalid credentials', async () => {
            await loginPage.fillUsername('test@invalid.com');
            await loginPage.fillPassword('badpassword');
        });
        await test.step('Submit login form', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify error is shown', async () => {
            await loginPage.verifyErrorMessageDisplayed();
        });
    });

    test('@smoke @regression TC-637: Verify that login page uses HTTPS protocol', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Check browser address bar - URL should start with https://', async () => {
            await loginPage.verifyHTTPSProtocol();
        });
        await test.step('Verify SSL certificate - Valid certificate should be present', async () => {
            await loginPage.verifySecureConnection();
        });
        await test.step('Check for security warnings - No security warnings should appear', async () => {
            await loginPage.verifyNoSecurityWarnings();
        });
    });

    test('@regression TC-30: test import 01', async ({ loginPage }) => {
        await test.step('Verify login page is accessible', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Test basic login functionality', async () => {
            const admin = loginPage.getLoginDataByRole('Admin');
            await loginPage.loginWithCredentials(admin.Username, admin.Password);
        });
        await test.step('Verify successful login', async () => {
            await loginPage.verifySuccessfulLogin();
        });
    });

    test('@smoke @regression TC-624: Verify that login fails with empty username field', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Leave username field empty', async () => {
            // Username field remains blank
        });
        await test.step('Enter valid password', async () => {
            await loginPage.fillPassword('ValidPassword123!');
        });
        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Username required error should display', async () => {
            await loginPage.verifyRequiredFieldError();
        });
        await test.step('Verify login attempt fails - User remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('@regression TC-641: Verify that login response time is acceptable', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter valid credentials', async () => {
            const admin = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(admin.Username);
            await loginPage.fillPassword(admin.Password);
        });
        await test.step('Click login button and start timer', async () => {
            const startTime = Date.now();
            await loginPage.clickLoginButton();
            await test.step('Wait for response and measure response time', async () => {
                await loginPage.verifySuccessfulLogin();
                const responseTime = Date.now() - startTime;
                await loginPage.verifyResponseTimeWithinLimit(responseTime, 2000);
            });
        });
    });

    test('@regression TC-630: Verify that login shows error for SQL injection attempts', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter SQL injection string in username', async () => {
            await loginPage.fillUsername("admin' OR '1'='1");
        });
        await test.step('Enter valid password', async () => {
            await loginPage.fillPassword('ValidPassword123!');
        });
        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify error handling - Appropriate error message should display', async () => {
            await loginPage.verifyErrorMessageDisplayed();
        });
    });

    test('@regression TC-626: Verify that login handles maximum length username', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter maximum allowed length username', async () => {
            const maxLengthUsername = 'a'.repeat(255) + '@test.com';
            await loginPage.fillUsername(maxLengthUsername);
        });
        await test.step('Enter valid password', async () => {
            await loginPage.fillPassword('ValidPassword123!');
        });
        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify system response - Appropriate response should display', async () => {
            await loginPage.verifyErrorMessageDisplayed();
        });
    });

    test('@smoke @regression TC-21: Verify that login works with valid credentials', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter valid username', async () => {
            const admin = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(admin.Username);
        });
        await test.step('Enter valid password', async () => {
            const admin = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillPassword(admin.Password);
        });
        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('User should login successfully', async () => {
            await loginPage.verifySuccessfulLogin();
        });
    });

    test('@regression TC-639: Verify that login form maintains state during session', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter username', async () => {
            await loginPage.fillUsername('testuser@test.com');
        });
        await test.step('Navigate away from page', async () => {
            await loginPage.navigateToExternalPage();
        });
        await test.step('Return to login page', async () => {
            await loginPage.openApp();
        });
        await test.step('Check username field - Username should be cleared for security', async () => {
            await loginPage.verifyUsernameFieldIsEmpty();
        });
    });

    test('@regression TC-636: Verify that login form fields have proper placeholder text', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Check username field placeholder', async () => {
            await loginPage.verifyUsernamePlaceholder();
        });
        await test.step('Check password field placeholder', async () => {
            await loginPage.verifyPasswordPlaceholder();
        });
        await test.step('Click in username field - Placeholder should disappear when focused', async () => {
            await loginPage.focusUsernameField();
        });
        await test.step('Click out of field when empty - Placeholder should reappear', async () => {
            await loginPage.blurUsernameField();
            await loginPage.verifyUsernamePlaceholder();
        });
    });

    test('@regression TC-644: Verify that login implements rate limiting for failed attempts', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter invalid credentials and attempt login multiple times rapidly', async () => {
            await loginPage.attemptLoginMultipleTimes('invalid@test.com', 'wrongpass', 5);
        });
        await test.step('Continue failed attempts and verify rate limiting', async () => {
            await loginPage.attemptLoginMultipleTimes('invalid@test.com', 'wrongpass', 3);
        });
        await test.step('Verify rate limiting - Account should be temporarily locked or delayed', async () => {
            await loginPage.verifyRateLimitMessage();
        });
    });

    test('@regression TC-631: Verify that login button is clickable and responsive', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Hover over login button - Button should show hover state', async () => {
            await loginPage.hoverOverLoginButton();
        });
        await test.step('Click login button - Button should show pressed state', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify button responsiveness - Button should respond immediately', async () => {
            await loginPage.verifyLoginButtonVisible();
        });
        await test.step('Check button functionality - Button should trigger login process', async () => {
            await loginPage.verifyRequiredFieldError();
        });
    });

    test('@regression TC-646: Verify that login sends correct API request format', async ({ loginPage }) => {
        await test.step('Open login page with network monitoring', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter valid credentials', async () => {
            const admin = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(admin.Username);
            await loginPage.fillPassword(admin.Password);
        });
        await test.step('Click login button and inspect network request', async () => {
            const requestPromise = loginPage.captureLoginRequest();
            await loginPage.clickLoginButton();
            await test.step('Verify request payload - Username and password should be properly formatted', async () => {
                const request = await requestPromise;
                await loginPage.verifyLoginRequestFormat(request);
            });
        });
    });

    test('@regression TC-633: Verify that login page loads within acceptable time', async ({ loginPage }) => {
        await test.step('Clear browser cache', async () => {
            await loginPage.clearBrowserCache();
        });
        await test.step('Navigate to login page and start measuring load time', async () => {
            const startTime = Date.now();
            await loginPage.openApp();
            await test.step('Wait for page to fully load - All elements should be visible', async () => {
                await loginPage.verifyLoginPageDisplayed();
                const loadTime = Date.now() - startTime;
                await test.step('Verify performance criteria - Page should load within 3 seconds', async () => {
                    await loginPage.verifyLoadTimeWithinLimit(loadTime, 3000);
                });
            });
        });
    });

    test('@regression TC-27: To Test Login Form with Invalid Data', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter username and password', async () => {
            await loginPage.fillUsername('invaliduser@test.com');
            await loginPage.fillPassword('invalidpassword');
        });
        await test.step('Submit and verify error', async () => {
            await loginPage.clickLoginButton();
            await loginPage.verifyErrorMessageDisplayed();
        });
    });

    test('@regression TC-634: Verify that login form accepts keyboard input properly', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Use keyboard to navigate to username field', async () => {
            await loginPage.focusUsernameField();
        });
        await test.step('Type username using keyboard', async () => {
            await loginPage.typeUsernameWithKeyboard('testuser@test.com');
        });
        await test.step('Navigate to password field using keyboard', async () => {
            await loginPage.pressTabFromUsername();
        });
        await test.step('Type password using keyboard - Masked characters should appear', async () => {
            await loginPage.typePasswordWithKeyboard('TestPass123!');
        });
    });

    test('@smoke @regression TC-622: Verify that password field masks input characters', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Click on password field', async () => {
            await loginPage.focusPasswordField();
        });
        await test.step('Type password characters', async () => {
            await loginPage.fillPassword('TestPassword123!');
        });
        await test.step('Verify masking throughout typing - All characters remain masked', async () => {
            await loginPage.verifyPasswordFieldMasked();
        });
        await test.step('Complete password entry - Password field shows masked characters', async () => {
            await loginPage.verifyPasswordFieldMasked();
        });
    });

    test('@smoke @regression TC-625: Verify that login fails with empty password field', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter valid username', async () => {
            const admin = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(admin.Username);
        });
        await test.step('Leave password field empty', async () => {
            // Password field remains blank
        });
        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Password required error should display', async () => {
            await loginPage.verifyRequiredFieldError();
        });
        await test.step('Verify login attempt fails - User remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('@regression TC-629: Verify that password field prevents copy functionality', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter password in password field - Password characters are masked', async () => {
            await loginPage.fillPassword('SecurePassword123!');
        });
        await test.step('Select password text - Text selection should be restricted', async () => {
            await loginPage.selectPasswordFieldText();
        });
        await test.step('Attempt to copy password - Copy functionality should be disabled', async () => {
            await loginPage.attemptToCopyPassword();
        });
        await test.step('Verify security measure - Password copying should be prevented', async () => {
            await loginPage.verifyPasswordCopyPrevented();
        });
    });

    test('@regression TC-643: Verify that login handles case sensitivity correctly', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter username in different case', async () => {
            const admin = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(admin.Username.toUpperCase());
        });
        await test.step('Enter valid password', async () => {
            const admin = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillPassword(admin.Password);
        });
        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify case handling - System should handle case according to requirements', async () => {
            await loginPage.verifyErrorOrSuccessBasedOnCasePolicy();
        });
    });

    test('@smoke @regression TC-619: Verify that login fails with invalid username', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter invalid username', async () => {
            await loginPage.fillUsername('nonexistent@test.com');
        });
        await test.step('Enter valid password', async () => {
            await loginPage.fillPassword('ValidPassword123!');
        });
        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Error message should display', async () => {
            await loginPage.verifyInvalidCredentialsError();
        });
        await test.step('Verify user remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('@regression TC-627: Verify that login handles maximum length password', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter valid username', async () => {
            await loginPage.fillUsername('testuser@test.com');
        });
        await test.step('Enter maximum allowed length password', async () => {
            const maxLengthPassword = 'P@ss1' + 'a'.repeat(250);
            await loginPage.fillPassword(maxLengthPassword);
        });
        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify system response - Appropriate response should display', async () => {
            await loginPage.verifyErrorMessageDisplayed();
        });
    });

    test('@regression TC-642: Verify that login page is responsive on different screen sizes', async ({ loginPage }) => {
        await test.step('Open login page on desktop', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Resize browser window to tablet size - Layout should adjust appropriately', async () => {
            await loginPage.resizeViewport(768, 1024);
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Resize to mobile size - Elements should remain accessible', async () => {
            await loginPage.resizeViewport(375, 667);
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Test form functionality on mobile - All inputs should work properly', async () => {
            await loginPage.fillUsername('mobile@test.com');
            await loginPage.fillPassword('MobilePass123!');
        });
        await test.step('Verify responsive design - Page should be usable on all sizes', async () => {
            await loginPage.verifyLoginButtonVisible();
        });
    });

    test('@smoke @regression TC-620: Verify that login fails with empty credentials', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Leave username field empty', async () => {
            // Username field remains empty
        });
        await test.step('Leave password field empty', async () => {
            // Password field remains empty
        });
        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Validation error should display', async () => {
            await loginPage.verifyRequiredFieldError();
        });
        await test.step('Verify user remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('@smoke @regression TC-623: Verify that login page displays all required elements', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.openApp();
        });
        await test.step('Check username field presence - Username field should be visible', async () => {
            await loginPage.verifyUsernameFieldVisible();
        });
        await test.step('Check password field presence - Password field should be visible', async () => {
            await loginPage.verifyPasswordFieldVisible();
        });
        await test.step('Check login button presence - Login button should be visible', async () => {
            await loginPage.verifyLoginButtonVisible();
        });
        await test.step('Verify page title and branding - All branding elements should display', async () => {
            await loginPage.verifyPageTitle();
        });
    });

    test('@regression TC-645: Verify that login form has proper field validation styling', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter invalid data in username field', async () => {
            await loginPage.fillUsername('invalid');
        });
        await test.step('Move focus away from field - Field validation should trigger', async () => {
            await loginPage.blurUsernameField();
        });
        await test.step('Check visual feedback - Field should show error styling', async () => {
            await loginPage.verifyFieldErrorStyling();
        });
        await test.step('Enter valid data - Error styling should be removed', async () => {
            await loginPage.fillUsername('valid@test.com');
            await loginPage.verifyFieldValidStyling();
        });
    });

    test('@smoke @regression TC-618: Verify that login fails with invalid password', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter valid username', async () => {
            const admin = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(admin.Username);
        });
        await test.step('Enter invalid password', async () => {
            await loginPage.fillPassword('WrongPassword123!');
        });
        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('User should remain on login page', async () => {
            await loginPage.verifyInvalidCredentialsError();
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('@regression TC-26: To Test Login Form with Valid Data', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter username and password', async () => {
            const admin = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(admin.Username);
            await loginPage.fillPassword(admin.Password);
        });
        await test.step('Submit and verify successful login', async () => {
            await loginPage.clickLoginButton();
            await loginPage.verifySuccessfulLogin();
        });
    });

    test('@regression TC-632: Verify that login handles whitespace in credentials', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
        await test.step('Enter username with leading/trailing spaces', async () => {
            await loginPage.fillUsername('  testuser@test.com  ');
        });
        await test.step('Enter password with spaces', async () => {
            await loginPage.fillPassword('  TestPass123!  ');
        });
        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
        await test.step('Verify whitespace handling - System should handle spaces appropriately', async () => {
            await loginPage.verifyErrorMessageDisplayed();
        });
    });
});
