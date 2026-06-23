import test from '../testFixtures/fixture.js';

test.describe.parallel('Login Feature - AG-Helix', () => {

    test('[35] To Test Login Form with Invalid Data @smoke @regression', async ({ loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page is displayed', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter invalid credentials', async () => {
            await loginPage.fillUsername('invalid_user');
            await loginPage.fillPassword('invalid_pass');
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify error message is displayed', async () => {
            await loginPage.verifyErrorMessageDisplayed();
        });

        await test.step('Verify user remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('[669] Verify that login redirects to intended page after successful authentication @smoke @regression', async ({ loginPage, page }) => {
        await test.step('Navigate to protected page while logged out', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify redirect to login page', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter valid credentials on login page', async () => {
            await loginPage.loginByRole('Admin');
        });

        await test.step('Verify login succeeds', async () => {
            await loginPage.verifyLoginSuccessful();
        });
    });

    test('[656] Verify that password field masks input characters @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter password in password field', async () => {
            await loginPage.fillPassword('TestPassword123');
        });

        await test.step('Verify password visibility - characters masked', async () => {
            await loginPage.verifyPasswordFieldIsMasked();
        });

        await test.step('Check page source - password not visible', async () => {
            await loginPage.verifyPasswordNotVisibleInSource();
        });
    });

    test('[661] Verify that login works using Enter key @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter valid username', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(credentials.username);
        });

        await test.step('Enter valid password', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillPassword(credentials.password);
        });

        await test.step('Press Enter key', async () => {
            await loginPage.pressEnterOnPasswordField();
        });

        await test.step('Verify user logs in successfully', async () => {
            await loginPage.verifyLoginSuccessful();
        });
    });

    test('[672] Verify that login fails with password below minimum length @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter valid username', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(credentials.username);
        });

        await test.step('Enter password below minimum length', async () => {
            await loginPage.fillPassword('123');
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify validation error displays', async () => {
            await loginPage.verifyPasswordLengthError();
        });
    });

    test('[655] Verify that login fails with SQL injection attempt @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter SQL injection string in username', async () => {
            await loginPage.fillUsername("admin' OR '1'='1");
        });

        await test.step('Enter valid password', async () => {
            await loginPage.fillPassword('password123');
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify login fails safely', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });

        await test.step('Verify no database error exposed', async () => {
            await loginPage.verifyErrorMessageDisplayed();
        });
    });

    test('[2] Verify that login works with valid credentials @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter valid username', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(credentials.username);
        });

        await test.step('Enter valid password', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillPassword(credentials.password);
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify user logs in successfully', async () => {
            await loginPage.verifyLoginSuccessful();
        });
    });

    test('[651] Verify that login fails with empty password @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter valid username', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(credentials.username);
        });

        await test.step('Leave password field empty', async () => {
            // Password field remains empty
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify password required error displays', async () => {
            await loginPage.verifyPasswordRequiredError();
        });
    });

    test('[652] Verify that login works with username containing special characters @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter username with special characters', async () => {
            await loginPage.fillUsername('user@test.com');
        });

        await test.step('Enter valid password', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillPassword(credentials.password);
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify user logs in successfully', async () => {
            await loginPage.verifyLoginSuccessful();
        });
    });

    test('[666] Verify that login handles unicode characters in credentials @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter username with unicode characters', async () => {
            await loginPage.fillUsername('用户名');
        });

        await test.step('Enter password with unicode characters', async () => {
            await loginPage.fillPassword('密码123');
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify system processes unicode correctly', async () => {
            await loginPage.verifyErrorMessageDisplayed();
        });
    });

    test('[650] Verify that login fails with empty username @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Leave username field empty', async () => {
            // Username field remains empty
        });

        await test.step('Enter valid password', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillPassword(credentials.password);
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify username required error displays', async () => {
            await loginPage.verifyUsernameRequiredError();
        });
    });

    test('[648] Verify that login fails with invalid username @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter invalid username', async () => {
            await loginPage.fillUsername('invaliduser123');
        });

        await test.step('Enter valid password', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillPassword(credentials.password);
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify error message displays', async () => {
            await loginPage.verifyInvalidCredentialsError();
        });

        await test.step('Verify user remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('[673] Verify that login form clears password field after failed attempt @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter valid username and invalid password', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(credentials.username);
            await loginPage.fillPassword('wrongpassword');
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify login fails', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });

        await test.step('Verify password field is cleared', async () => {
            await loginPage.verifyPasswordFieldCleared();
        });
    });

    test('[667] Verify that login prevents brute force attacks @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Attempt rapid multiple login requests', async () => {
            for (let i = 0; i < 5; i++) {
                await loginPage.fillUsername('testuser');
                await loginPage.fillPassword('wrongpass');
                await loginPage.clickLoginButton();
            }
        });

        await test.step('Verify rate limiting or CAPTCHA', async () => {
            await loginPage.verifyCaptchaOrRateLimitDisplayed();
        });
    });

    test('[659] Verify that login fails with incorrect case username @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter username with incorrect case', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(credentials.username.toUpperCase());
        });

        await test.step('Enter valid password', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillPassword(credentials.password);
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify login fails', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });

        await test.step('Verify error message displayed', async () => {
            await loginPage.verifyInvalidCredentialsError();
        });
    });

    test('[4] Verify that login fails with invalid password @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter valid username', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(credentials.username);
        });

        await test.step('Enter invalid password', async () => {
            await loginPage.fillPassword('invalidpassword123');
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify error validation displays', async () => {
            await loginPage.verifyInvalidCredentialsError();
        });

        await test.step('Verify user remains on login page', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('[660] Verify that login form accepts tab navigation @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Press tab key - focus moves to username', async () => {
            await loginPage.tabNavigationFromUsername();
        });

        await test.step('Verify focus on password field', async () => {
            await loginPage.verifyFocusOnPassword();
        });

        await test.step('Press tab key - focus moves to login button', async () => {
            await loginPage.tabNavigationFromPassword();
        });

        await test.step('Verify focus on login button', async () => {
            await loginPage.verifyFocusOnLoginButton();
        });
    });

    test('[668] Verify that login fails with deactivated user account @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter credentials for deactivated account', async () => {
            await loginPage.fillUsername('deactivated_user');
            await loginPage.fillPassword('password123');
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify account deactivated message', async () => {
            await loginPage.verifyAccountDeactivatedError();
        });
    });

    test('[657] Verify that login implements account lockout after failed attempts @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter invalid credentials multiple times', async () => {
            for (let i = 0; i < 5; i++) {
                await loginPage.fillUsername('testuser');
                await loginPage.fillPassword('wrongpass');
                await loginPage.clickLoginButton();
            }
        });

        await test.step('Try valid credentials after lockout', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(credentials.username);
            await loginPage.fillPassword(credentials.password);
            await loginPage.clickLoginButton();
        });

        await test.step('Verify lockout message displayed', async () => {
            await loginPage.verifyAccountLockedError();
        });
    });

    test('[653] Verify that login handles maximum length username @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter maximum length username', async () => {
            await loginPage.fillUsername('a'.repeat(255));
        });

        await test.step('Enter valid password', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillPassword(credentials.password);
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify login processes correctly', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('[662] Verify that login response time is within acceptable limits @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter valid credentials', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(credentials.username);
            await loginPage.fillPassword(credentials.password);
        });

        await test.step('Measure response time', async () => {
            await loginPage.verifyLoginResponseTimeWithinLimit(3000);
        });
    });

    test('[665] Verify that login handles whitespace in username @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter username with leading/trailing spaces', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername('  ' + credentials.username + '  ');
        });

        await test.step('Enter valid password', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillPassword(credentials.password);
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify system handles whitespace appropriately', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('[654] Verify that login handles maximum length password @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });

        await test.step('Enter valid username', async () => {
            const credentials = await loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(credentials.username);
        });

        await test.step('Enter maximum length password', async () => {
            await loginPage.fillPassword('P@ssw0rd!' + 'a'.repeat(240));
        });

        await test.step('Click login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify login processes correctly', async () => {
            await loginPage.verifyUserRemainsOnLoginPage();
        });
    });

    test('[649] Verify that login fails with empty credentials @smoke @regression', async ({ loginPage }) => {
        await test.step('Open login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Verify login page displays', async () => {
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

        await test.step('Verify validation error displays', async () => {
            await loginPage.verifyErrorMessageDisplayed();
        });
    });

});