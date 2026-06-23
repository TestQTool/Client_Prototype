import test from '../testFixtures/fixture.js';

test.describe.parallel('Login Module - Smoke and Regression Tests', () => {

    // TC-640: Verify that login shows appropriate error for disabled account - @smoke @regression
    test('[TC-640] Verify that login shows appropriate error for disabled account @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter disabled account username', async () => {
            await loginPage.enterUsername('disabled_user@example.com');
            await loginPage.verifyUsernameFieldAcceptsInput();
        });

        await test.step('Enter correct password for disabled account', async () => {
            await loginPage.enterPassword('ValidPassword123');
            await loginPage.verifyPasswordFieldAcceptsInput();
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify error message', async () => {
            await loginPage.verifyAccountDisabledMessageDisplays();
        });
    });

    // TC-638: Verify that login handles unicode characters in credentials - @regression
    test('[TC-638] Verify that login handles unicode characters in credentials @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter username with unicode characters', async () => {
            await loginPage.enterUsernameWithUnicodeCharacters('user_テスト@example.com');
            await loginPage.verifyUsernameFieldAcceptsInput();
        });

        await test.step('Enter password with unicode characters', async () => {
            await loginPage.enterPasswordWithUnicodeCharacters('Pass_密码_123');
            await loginPage.verifyPasswordFieldAcceptsInput();
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify character encoding', async () => {
            await loginPage.verifyCharacterEncodingHandled();
        });
    });

    // TC-621: Verify that login handles special characters in username - @regression
    test('[TC-621] Verify that login handles special characters in username @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter username with special characters', async () => {
            await loginPage.enterUsernameWithSpecialCharacters('user+test@example.com');
            await loginPage.verifyUsernameFieldAcceptsInput();
        });

        await test.step('Enter valid password', async () => {
            await loginPage.enterPassword('ValidPassword123');
            await loginPage.verifyPasswordFieldAcceptsInput();
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify system behavior', async () => {
            await loginPage.verifySystemHandlesSpecialCharactersCorrectly();
        });
    });

    // TC-628: Verify that tab navigation works between form fields - @smoke @regression
    test('[TC-628] Verify that tab navigation works between form fields @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Click on username field', async () => {
            await loginPage.enterUsername('');
        });

        await test.step('Press tab key', async () => {
            await loginPage.pressTabKey();
            await loginPage.verifyFocusMovesToPasswordField();
        });

        await test.step('Press tab key again', async () => {
            await loginPage.pressTabKey();
            await loginPage.verifyFocusMovesToLoginButton();
        });

        await test.step('Press enter key', async () => {
            await loginPage.pressEnterKey();
            await loginPage.verifyLoginAttemptTriggered();
        });
    });

    // TC-635: Verify that login prevents multiple rapid submissions - @smoke @regression
    test('[TC-635] Verify that login prevents multiple rapid submissions @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter valid credentials', async () => {
            await loginPage.enterCredentials('validuser@example.com', 'ValidPassword123');
        });

        await test.step('Click login button rapidly multiple times', async () => {
            await loginPage.clickLoginButtonRapidly(5);
        });

        await test.step('Verify subsequent clicks are ignored', async () => {
            await loginPage.verifySubsequentClicksIgnored();
        });

        await test.step('Check for duplicate requests', async () => {
            await loginPage.verifyOnlyOneLoginRequestSent();
        });
    });

    // TC-637: Verify that login page uses HTTPS protocol - @smoke @regression
    test('[TC-637] Verify that login page uses HTTPS protocol @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Check browser address bar', async () => {
            await loginPage.verifyHTTPSProtocol();
        });

        await test.step('Verify SSL certificate', async () => {
            await loginPage.verifySSLCertificateValid();
        });

        await test.step('Check for security warnings', async () => {
            await loginPage.verifyNoSecurityWarnings();
        });

        await test.step('Confirm secure connection', async () => {
            await loginPage.verifySecureConnection();
        });
    });

    // TC-624: Verify that login fails with empty username field - @smoke @regression
    test('[TC-624] Verify that login fails with empty username field @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Leave username field empty', async () => {
            await loginPage.leaveUsernameEmpty();
        });

        await test.step('Enter valid password', async () => {
            await loginPage.enterPassword('ValidPassword123');
            await loginPage.verifyPasswordFieldAcceptsInput();
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify username required error displays', async () => {
            await loginPage.verifyUsernameRequiredErrorDisplays();
        });

        await test.step('Verify login attempt fails', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    // TC-641: Verify that login response time is acceptable - @regression
    test('[TC-641] Verify that login response time is acceptable @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter valid credentials', async () => {
            await loginPage.enterCredentials('validuser@example.com', 'ValidPassword123');
        });

        await test.step('Click login button and start timer', async () => {
            const startTime = Date.now();
            await loginPage.clickLoginButton();
            const endTime = Date.now();
            const responseTime = endTime - startTime;
        });

        await test.step('Measure response time', async () => {
            await loginPage.verifyResponseTimeAcceptable(2);
        });
    });

    // TC-630: Verify that login shows error for SQL injection attempts - @smoke @regression
    test('[TC-630] Verify that login shows error for SQL injection attempts @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter SQL injection string in username', async () => {
            await loginPage.enterSQLInjectionString("admin' OR '1'='1");
            await loginPage.verifyUsernameFieldAcceptsInput();
        });

        await test.step('Enter valid password', async () => {
            await loginPage.enterPassword('ValidPassword123');
            await loginPage.verifyPasswordFieldAcceptsInput();
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify error handling', async () => {
            await loginPage.verifySystemRejectsInvalidInput();
        });
    });

    // TC-626: Verify that login handles maximum length username - @regression
    test('[TC-626] Verify that login handles maximum length username @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter maximum allowed length username', async () => {
            const maxUsername = 'a'.repeat(255) + '@example.com';
            await loginPage.enterMaxLengthUsername(maxUsername);
            await loginPage.verifyUsernameFieldAcceptsInput();
        });

        await test.step('Enter valid password', async () => {
            await loginPage.enterPassword('ValidPassword123');
            await loginPage.verifyPasswordFieldAcceptsInput();
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
    });

    // TC-21: Verify that login works with valid credentials - @smoke
    test('[TC-21] Verify that login works with valid credentials @smoke', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter valid username', async () => {
            await loginPage.enterUsername('validuser@example.com');
            await loginPage.verifyUsernameFieldAcceptsInput();
        });

        await test.step('Enter valid password', async () => {
            await loginPage.enterPassword('ValidPassword123');
            await loginPage.verifyPasswordFieldAcceptsInput();
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
    });

    // TC-639: Verify that login form maintains state during session - @regression
    test('[TC-639] Verify that login form maintains state during session @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter username', async () => {
            await loginPage.enterUsername('testuser@example.com');
        });

        await test.step('Navigate away from page', async () => {
            await loginPage.navigateAwayFromPage();
        });

        await test.step('Return to login page', async () => {
            await loginPage.returnToLoginPage();
        });

        await test.step('Check username field', async () => {
            await loginPage.verifyUsernameFieldCleared();
        });
    });

    // TC-636: Verify that login form fields have proper placeholder text - @smoke @regression
    test('[TC-636] Verify that login form fields have proper placeholder text @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Check username field placeholder', async () => {
            await loginPage.verifyPlaceholderTextAppropriate();
        });

        await test.step('Click in username field', async () => {
            await loginPage.enterUsername('test');
            await loginPage.verifyPlaceholderDisappearsWhenFocused();
        });

        await test.step('Click out of field when empty', async () => {
            await loginPage.clearUsernameField();
            await loginPage.verifyPlaceholderReappearsWhenEmpty();
        });
    });

    // TC-644: Verify that login implements rate limiting for failed attempts - @smoke @regression
    test('[TC-644] Verify that login implements rate limiting for failed attempts @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Attempt login multiple times rapidly with invalid credentials', async () => {
            for (let i = 0; i < 5; i++) {
                await loginPage.performLogin('testuser@example.com', 'WrongPassword');
                await loginPage.page.waitForTimeout(500);
            }
        });

        await test.step('Verify rate limiting', async () => {
            await loginPage.verifyRateLimitingImplemented();
        });
    });

    // TC-631: Verify that login button is clickable and responsive - @smoke @regression
    test('[TC-631] Verify that login button is clickable and responsive @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Hover over login button', async () => {
            await loginPage.hoverOverLoginButton();
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify button responsiveness', async () => {
            await loginPage.verifyLoginButtonResponsive();
        });
    });

    // TC-646: Verify that login sends correct API request format - @regression
    test('[TC-646] Verify that login sends correct API request format @regression', async ({ loginPage }) => {
        await test.step('Open login page with network monitoring', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Enter valid credentials', async () => {
            await loginPage.enterCredentials('validuser@example.com', 'ValidPassword123');
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify request payload', async () => {
            await loginPage.verifyRequestPayloadFormat();
        });
    });

    // TC-633: Verify that login page loads within acceptable time - @smoke @regression
    test('[TC-633] Verify that login page loads within acceptable time @smoke @regression', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            const startTime = Date.now();
            await loginPage.navigateToLoginPage();
            const endTime = Date.now();
            const loadTime = endTime - startTime;
        });

        await test.step('Verify performance criteria', async () => {
            await loginPage.verifyPageLoadsWithinTime(3);
        });
    });

    // TC-27/28/29: Test Login Form with Invalid Data - @smoke @regression
    test('[TC-27-28-29] Test Login Form with Invalid Data @smoke @regression', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigateToLoginPage('http://192.168.10.124:4001');
            await loginPage.verifyLoginPageDisplays();
            await loginPage.verifyRegisterLinkIsVisible();
        });

        await test.step('Enter invalid username and password', async () => {
            await loginPage.enterUsername('invaliduser@example.com');
            await loginPage.enterPassword('InvalidPassword');
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify error message displays', async () => {
            await loginPage.verifyErrorMessageDisplays();
        });
    });

    // TC-634: Verify that login form accepts keyboard input properly - @smoke @regression
    test('[TC-634] Verify that login form accepts keyboard input properly @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Use keyboard to navigate to username field', async () => {
            await loginPage.navigateToUsernameFieldWithKeyboard();
        });

        await test.step('Type username using keyboard', async () => {
            await loginPage.typeUsernameUsingKeyboard('testuser@example.com');
        });

        await test.step('Navigate to password field using keyboard', async () => {
            await loginPage.pressTabKey();
        });

        await test.step('Type password using keyboard', async () => {
            await loginPage.typePasswordUsingKeyboard('TestPassword123');
        });
    });

    // TC-622: Verify that password field masks input characters - @smoke @regression
    test('[TC-622] Verify that password field masks input characters @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Type password characters', async () => {
            await loginPage.enterPassword('SecurePassword123');
        });

        await test.step('Verify masking throughout typing', async () => {
            await loginPage.verifyPasswordIsMasked();
        });
    });

    // TC-625: Verify that login fails with empty password field - @smoke @regression
    test('[TC-625] Verify that login fails with empty password field @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter valid username', async () => {
            await loginPage.enterUsername('validuser@example.com');
            await loginPage.verifyUsernameFieldAcceptsInput();
        });

        await test.step('Leave password field empty', async () => {
            await loginPage.leavePasswordEmpty();
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify password required error displays', async () => {
            await loginPage.verifyPasswordRequiredErrorDisplays();
        });

        await test.step('Verify login attempt fails', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    // TC-629: Verify that password field prevents copy functionality - @smoke @regression
    test('[TC-629] Verify that password field prevents copy functionality @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter password in password field', async () => {
            await loginPage.enterPassword('SecurePassword123');
        });

        await test.step('Attempt to copy password', async () => {
            await loginPage.attemptToCopyPassword();
        });

        await test.step('Verify security measure', async () => {
            await loginPage.verifyPasswordCopyingPrevented();
        });
    });

    // TC-643: Verify that login handles case sensitivity correctly - @regression
    test('[TC-643] Verify that login handles case sensitivity correctly @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter username in different case', async () => {
            await loginPage.enterUsernameInDifferentCase('VALIDUSER@EXAMPLE.COM');
            await loginPage.verifyUsernameFieldAcceptsInput();
        });

        await test.step('Enter valid password', async () => {
            await loginPage.enterPassword('ValidPassword123');
            await loginPage.verifyPasswordFieldAcceptsInput();
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify case handling', async () => {
            await loginPage.verifyCaseHandlingAccordingToRequirements();
        });
    });

    // TC-619: Verify that login fails with invalid username - @smoke @regression
    test('[TC-619] Verify that login fails with invalid username @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter invalid username', async () => {
            await loginPage.enterUsername('invaliduser@example.com');
            await loginPage.verifyUsernameFieldAcceptsInput();
        });

        await test.step('Enter valid password', async () => {
            await loginPage.enterPassword('ValidPassword123');
            await loginPage.verifyPasswordFieldAcceptsInput();
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify error message displays', async () => {
            await loginPage.verifyErrorMessageDisplays();
        });

        await test.step('Verify user remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    // TC-627: Verify that login handles maximum length password - @regression
    test('[TC-627] Verify that login handles maximum length password @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter valid username', async () => {
            await loginPage.enterUsername('validuser@example.com');
            await loginPage.verifyUsernameFieldAcceptsInput();
        });

        await test.step('Enter maximum allowed length password', async () => {
            const maxPassword = 'P' + 'a'.repeat(127);
            await loginPage.enterMaxLengthPassword(maxPassword);
            await loginPage.verifyPasswordFieldAcceptsInput();
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
    });

    // TC-642: Verify that login page is responsive on different screen sizes - @smoke @regression
    test('[TC-642] Verify that login page is responsive on different screen sizes @smoke @regression', async ({ loginPage, page }) => {
        await test.step('Open login page on desktop', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Resize browser window to tablet size', async () => {
            await page.setViewportSize({ width: 768, height: 1024 });
            await loginPage.verifyLayoutAdjustsAppropriately();
        });

        await test.step('Resize to mobile size', async () => {
            await page.setViewportSize({ width: 375, height: 667 });
            await loginPage.verifyElementsRemainAccessible();
        });

        await test.step('Test form functionality on mobile', async () => {
            await loginPage.verifyAllInputsWorkProperly();
        });

        await test.step('Verify responsive design', async () => {
            await loginPage.verifyPageUsableOnAllSizes();
        });
    });

    // TC-620: Verify that login fails with empty credentials - @smoke @regression
    test('[TC-620] Verify that login fails with empty credentials @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Leave username field empty', async () => {
            await loginPage.leaveUsernameEmpty();
        });

        await test.step('Leave password field empty', async () => {
            await loginPage.leavePasswordEmpty();
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify validation error displays', async () => {
            await loginPage.verifyValidationErrorDisplays();
        });

        await test.step('Verify user remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    // TC-623: Verify that login page displays all required elements - @smoke
    test('[TC-623] Verify that login page displays all required elements @smoke', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify all required elements display', async () => {
            await loginPage.verifyAllRequiredElementsDisplay();
        });
    });

    // TC-645: Verify that login form has proper field validation styling - @regression
    test('[TC-645] Verify that login form has proper field validation styling @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter invalid data in username field', async () => {
            await loginPage.enterUsername('invalid');
        });

        await test.step('Move focus away from field', async () => {
            await loginPage.pressTabKey();
        });

        await test.step('Check visual feedback', async () => {
            await loginPage.verifyErrorStylingShown();
        });

        await test.step('Enter valid data', async () => {
            await loginPage.clearUsernameField();
            await loginPage.enterUsername('validuser@example.com');
            await loginPage.verifyErrorStylingRemoved();
        });
    });

    // TC-618: Verify that login fails with invalid password - @smoke @regression
    test('[TC-618] Verify that login fails with invalid password @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter valid username', async () => {
            await loginPage.enterUsername('validuser@example.com');
        });

        await test.step('Enter invalid password', async () => {
            await loginPage.enterPassword('InvalidPassword');
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify user remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    // TC-26: Test Login Form with Valid Data - @smoke
    test('[TC-26] Test Login Form with Valid Data @smoke', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigateToLoginPage('http://192.168.10.124:4001');
            await loginPage.verifyLoginPageDisplays();
            await loginPage.verifyRegisterLinkIsVisible();
        });

        await test.step('Enter username and password', async () => {
            await loginPage.enterUsername('validuser@example.com');
            await loginPage.enterPassword('ValidPassword123');
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });
    });

    // TC-632: Verify that login handles whitespace in credentials - @regression
    test('[TC-632] Verify that login handles whitespace in credentials @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.verifyLoginPageDisplays();
        });

        await test.step('Enter username with leading/trailing spaces', async () => {
            await loginPage.enterUsernameWithWhitespace('  validuser@example.com  ');
            await loginPage.verifyUsernameFieldAcceptsInput();
        });

        await test.step('Enter password with spaces', async () => {
            await loginPage.enterPasswordWithWhitespace(' ValidPassword123 ');
            await loginPage.verifyPasswordFieldAcceptsInput();
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify whitespace handling', async () => {
            await loginPage.verifyWhitespaceHandledAppropriately();
        });
    });

});

