import test from '../testFixtures/fixture.js';

test.describe.parallel('Login Module - Test Suite', () => {
  
  test('[TC-2] Verify that login works with valid credentials @smoke @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter valid username', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterUsername(credentials.username);
    });

    await test.step('Enter valid password', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterPassword(credentials.password);
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyLoginSuccessful();
    });
  });

  test('[TC-4] Verify that login fails with invalid password @smoke @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter valid username', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterUsername(credentials.username);
    });

    await test.step('Enter invalid password', async () => {
      await loginPage.enterPassword('InvalidPassword123!');
      await loginPage.verifyErrorMessageDisplayed();
    });

    await test.step('Click login button and verify user remains on login page', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyRemainsOnLoginPage();
    });
  });

  test('[TC-33] To Test Login Form with Valid Data @smoke', async ({ loginPage }) => {
    await test.step('Navigate to 192.168.10.124:4001', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter username and password', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterUsername(credentials.username);
      await loginPage.enterPassword(credentials.password);
      await loginPage.clickLoginButton();
    });
  });

  test('[TC-34] To Test Login Form with Invalid Data @regression', async ({ loginPage }) => {
    await test.step('Navigate to 192.168.10.124:4001', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter username and password', async () => {
      await loginPage.enterUsername('invaliduser@test.com');
      await loginPage.enterPassword('wrongpassword');
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessageDisplayed();
    });
  });

  test('[TC-35] To Test Login Form with Invalid Data @regression', async ({ loginPage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter invalid credentials', async () => {
      await loginPage.loginWithCredentials('invaliduser', 'invalidpass');
      await loginPage.verifyErrorMessageDisplayed();
    });
  });

  test('[TC-648] Verify that login fails with invalid username @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter invalid username', async () => {
      await loginPage.enterUsername('invalidusername123');
    });

    await test.step('Enter valid password', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterPassword(credentials.password);
    });

    await test.step('Click login button and verify error', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessageDisplayed();
      await loginPage.verifyRemainsOnLoginPage();
    });
  });

  test('[TC-649] Verify that login fails with empty credentials @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Leave username field empty', async () => {
      // Username field remains empty
    });

    await test.step('Leave password field empty', async () => {
      // Password field remains empty
    });

    await test.step('Click login button and verify validation error', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyValidationErrorDisplayed();
    });
  });

  test('[TC-650] Verify that login fails with empty username @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Leave username field empty', async () => {
      // Username field remains empty
    });

    await test.step('Enter valid password', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterPassword(credentials.password);
    });

    await test.step('Click login button and verify username required error', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyUsernameRequiredError();
    });
  });

  test('[TC-651] Verify that login fails with empty password @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter valid username', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterUsername(credentials.username);
    });

    await test.step('Leave password field empty', async () => {
      // Password field remains empty
    });

    await test.step('Click login button and verify password required error', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyPasswordRequiredError();
    });
  });

  test('[TC-652] Verify that login works with username containing special characters @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter username with special characters', async () => {
      await loginPage.enterUsername('user+test@example.com');
    });

    await test.step('Enter valid password', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterPassword(credentials.password);
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyLoginSuccessful();
    });
  });

  test('[TC-653] Verify that login handles maximum length username @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter maximum length username', async () => {
      const maxUsername = 'a'.repeat(255) + '@example.com';
      await loginPage.enterUsername(maxUsername);
    });

    await test.step('Enter valid password', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterPassword(credentials.password);
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });
  });

  test('[TC-654] Verify that login handles maximum length password @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter valid username', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterUsername(credentials.username);
    });

    await test.step('Enter maximum length password', async () => {
      const maxPassword = 'P@ssw0rd' + 'a'.repeat(120);
      await loginPage.enterPassword(maxPassword);
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });
  });

  test('[TC-655] Verify that login fails with SQL injection attempt @smoke @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter SQL injection string in username', async () => {
      await loginPage.enterUsername("admin' OR '1'='1");
    });

    await test.step('Enter valid password', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterPassword(credentials.password);
    });

    await test.step('Click login button and verify login fails safely', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessageDisplayed();
    });
  });

  test('[TC-656] Verify that password field masks input characters @smoke @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter password in password field', async () => {
      await loginPage.enterPassword('TestPassword123!');
    });

    await test.step('Verify password visibility - characters hidden as dots or asterisks', async () => {
      await loginPage.verifyPasswordFieldMasked();
    });
  });

  test('[TC-657] Verify that login implements account lockout after failed attempts @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter invalid credentials multiple times', async () => {
      await loginPage.attemptMultipleLogins(5);
    });

    await test.step('Verify account lockout message displayed', async () => {
      await loginPage.verifyAccountLockedMessage();
    });
  });

  test('[TC-658] Verify that login works with case sensitive username @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter username with correct case', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterUsername(credentials.username);
    });

    await test.step('Enter valid password', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterPassword(credentials.password);
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyLoginSuccessful();
    });
  });

  test('[TC-659] Verify that login fails with incorrect case username @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter username with incorrect case', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterUsername(credentials.username.toUpperCase());
    });

    await test.step('Enter valid password', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterPassword(credentials.password);
    });

    await test.step('Click login button and verify error', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessageDisplayed();
    });
  });

  test('[TC-660] Verify that login form accepts tab navigation @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Press tab key - focus should move to username field', async () => {
      await loginPage.tabNavigateFields();
    });

    await test.step('Press tab key again - focus should move to password field', async () => {
      await loginPage.tabNavigateFields();
    });

    await test.step('Press tab key again - focus should move to login button', async () => {
      await loginPage.tabNavigateFields();
    });
  });

  test('[TC-661] Verify that login works using Enter key @smoke @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter valid username', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterUsername(credentials.username);
    });

    await test.step('Enter valid password', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterPassword(credentials.password);
    });

    await test.step('Press Enter key', async () => {
      await loginPage.pressEnterKey();
      await loginPage.verifyLoginSuccessful();
    });
  });

  test('[TC-665] Verify that login handles whitespace in username @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter username with leading/trailing spaces', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterUsername('  ' + credentials.username + '  ');
    });

    await test.step('Enter valid password', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterPassword(credentials.password);
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });
  });

  test('[TC-666] Verify that login handles unicode characters in credentials @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter username with unicode characters', async () => {
      await loginPage.enterUsername('user测试@example.com');
    });

    await test.step('Enter password with unicode characters', async () => {
      await loginPage.enterPassword('P@ssw0rd测试');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });
  });

  test('[TC-668] Verify that login fails with deactivated user account @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter credentials for deactivated account', async () => {
      await loginPage.enterUsername('deactivated@example.com');
      await loginPage.enterPassword('Password123!');
    });

    await test.step('Click login button and verify account deactivated message', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyAccountDeactivatedMessage();
    });
  });

  test('[TC-669] Verify that login redirects to intended page after successful authentication @smoke @regression', async ({ loginPage }) => {
    await test.step('Navigate to protected page while logged out - should redirect to login', async () => {
      await loginPage.navigateToProtectedPage('/dashboard');
      await loginPage.verifyRedirectToLogin();
    });

    await test.step('Enter valid credentials on login page', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterUsername(credentials.username);
      await loginPage.enterPassword(credentials.password);
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify redirect to original intended page', async () => {
      await loginPage.verifyRedirectToIntendedPage('dashboard');
    });
  });

  test('[TC-671] Verify that login handles minimum length password @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter valid username', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterUsername(credentials.username);
    });

    await test.step('Enter minimum length password', async () => {
      await loginPage.enterPassword('Pass1!');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });
  });

  test('[TC-672] Verify that login fails with password below minimum length @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter valid username', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterUsername(credentials.username);
    });

    await test.step('Enter password below minimum length', async () => {
      await loginPage.enterPassword('P1!');
    });

    await test.step('Click login button and verify validation error', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyPasswordLengthError();
    });
  });

  test('[TC-673] Verify that login form clears password field after failed attempt @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter valid username and invalid password', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterUsername(credentials.username);
      await loginPage.enterPassword('WrongPassword123!');
    });

    await test.step('Click login button - login should fail', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessageDisplayed();
    });

    await test.step('Verify password field is cleared', async () => {
      await loginPage.verifyPasswordFieldCleared();
    });
  });

  test('[TC-674] Verify that login implements HTTPS encryption @smoke @regression', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Verify URL uses HTTPS protocol', async () => {
      await loginPage.verifyUrlUsesHttps();
    });

    await test.step('Enter credentials', async () => {
      const credentials = loginPage.getLoginDataByRole('Admin');
      await loginPage.enterUsername(credentials.username);
      await loginPage.enterPassword(credentials.password);
    });

    await test.step('Submit form and verify encrypted transmission', async () => {
      await loginPage.clickLoginButton();
    });
  });
});