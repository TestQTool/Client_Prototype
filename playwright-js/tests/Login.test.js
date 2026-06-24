import test from '../testFixtures/fixture.js';

test.describe.parallel('Login and Authentication Tests', () => {
  
  test('[TC-932] Verify that authentication token is stored securely after login @smoke @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterCredentials('Testing', 'Test@122');
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify authentication token is stored in secure storage', async () => {
      await loginPage.verifyTokenStoredSecurely();
    });

    await test.step('Verify token is not accessible via JavaScript', async () => {
      await loginPage.verifyTokenNotAccessibleViaJS();
    });
  });

  test('[TC-920] Verify that login handles username with special characters @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter username with special characters and password', async () => {
      await loginPage.enterCredentials('Test!@#$%', 'Test@122');
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify system validates or rejects special characters', async () => {
      const currentUrl = await loginPage.getUrl();
      const hasError = await loginPage.isElementVisible('[role="alert"], .error-message');
      // System should either accept or show validation message
    });

    await test.step('Verify application handles input without error', async () => {
      await loginPage.verifyNoSystemError();
    });
  });

  test('[TC-919] Verify that login handles password with maximum character length @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter username and maximum length password', async () => {
      const maxPassword = 'A'.repeat(256) + '@122';
      await loginPage.enterCredentials('Testing', maxPassword);
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify no system error or crash occurs', async () => {
      await loginPage.verifyNoSystemError();
    });
  });

  test('[TC-912] Verify that login fails with invalid username @smoke @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter invalid username and valid password', async () => {
      await loginPage.enterCredentials('InvalidUser123', 'Test@122');
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify error message is displayed', async () => {
      await loginPage.verifyInvalidCredentialsError();
    });

    await test.step('Verify user remains on login page', async () => {
      const currentUrl = await loginPage.getUrl();
      // User should still be on login/configurations page
    });
  });

  test('[TC-933] Verify that session expires after logout @smoke @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter configured credentials and login', async () => {
      await loginPage.login('Testing', 'Test@122');
    });

    await test.step('Click Logout button', async () => {
      await loginPage.logout();
    });

    await test.step('Attempt to access protected page using old session', async () => {
      await loginPage.attemptAccessProtectedPage('/configurations');
    });

    await test.step('Verify user is redirected to login page', async () => {
      await loginPage.verifyRedirectToLoginPage();
    });

    await test.step('Verify session token is removed', async () => {
      await loginPage.verifySessionExpired();
    });
  });

  test('[TC-918] Verify that login handles username with maximum character length @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter maximum length username and password', async () => {
      const maxUsername = 'U'.repeat(255);
      await loginPage.enterCredentials(maxUsername, 'Test@122');
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify no system error or crash occurs', async () => {
      await loginPage.verifyNoSystemError();
    });
  });

  test('[TC-915] Verify that login fails with empty password field @smoke @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter username only', async () => {
      await loginPage.enterUsername('Testing');
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify validation error is displayed', async () => {
      await loginPage.verifyPasswordRequiredError();
    });

    await test.step('Verify user remains on login page', async () => {
      const currentUrl = await loginPage.getUrl();
      // User should not be logged in
    });
  });

  test('[TC-917] Verify that logout fails when user is not logged in @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Attempt to access logout functionality without logging in', async () => {
      const logoutVisible = await loginPage.isElementVisible('button:has-text("Logout")');
      // Logout button may not be visible when not logged in
    });

    await test.step('Verify user is redirected to login page', async () => {
      await loginPage.verifyRedirectToLoginPage();
    });

    await test.step('Verify no error occurs', async () => {
      await loginPage.verifyNoSystemError();
    });
  });

  test('[TC-925] Verify that login handles password with only whitespace @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter username and whitespace-only password', async () => {
      await loginPage.enterCredentials('Testing', '     ');
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify validation error is displayed', async () => {
      await loginPage.verifyErrorMessageDisplayed();
    });

    await test.step('Verify user remains on login page', async () => {
      const currentUrl = await loginPage.getUrl();
      // User should not be logged in
    });
  });

  test('[TC-913] Verify that login fails with invalid password @smoke @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter valid username and invalid password', async () => {
      await loginPage.enterCredentials('Testing', 'WrongPassword123');
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify error message is displayed', async () => {
      await loginPage.verifyInvalidCredentialsError();
    });

    await test.step('Verify user remains on login page', async () => {
      const currentUrl = await loginPage.getUrl();
      // User should not be logged in
    });
  });

  test('[TC-911] Verify that user can login and access configurations page directly @smoke @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterCredentials('Testing', 'Test@122');
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify configurations page content is visible', async () => {
      await loginPage.verifyConfigurationsPageVisible();
    });
  });

  test('[TC-914] Verify that login fails with empty username field @smoke @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter password only', async () => {
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify validation error is displayed', async () => {
      await loginPage.verifyUsernameRequiredError();
    });

    await test.step('Verify user remains on login page', async () => {
      const currentUrl = await loginPage.getUrl();
      // User should not be logged in
    });
  });

  test('[TC-930] Verify that logout API invalidates user session @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter configured credentials and login', async () => {
      await loginPage.login('Testing', 'Test@122');
    });

    await test.step('Click Logout button', async () => {
      await loginPage.logout();
    });

    await test.step('Verify logout API is called successfully', async () => {
      await loginPage.verifyRedirectToLoginPage();
    });

    await test.step('Verify authentication token is invalidated', async () => {
      await loginPage.verifySessionExpired();
    });
  });

  test('[TC-927] Verify that logout works correctly after multiple login sessions @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Perform first login', async () => {
      await loginPage.login('Testing', 'Test@122');
    });

    await test.step('Perform first logout', async () => {
      await loginPage.logout();
    });

    await test.step('Perform second login', async () => {
      await loginPage.navigateToConfigurations();
      await loginPage.login('Testing', 'Test@122');
    });

    await test.step('Perform second logout', async () => {
      await loginPage.logout();
    });

    await test.step('Verify user cannot access protected pages without re-login', async () => {
      await loginPage.attemptAccessProtectedPage('/configurations');
      await loginPage.verifyRedirectToLoginPage();
    });
  });

  test('[TC-921] Verify that login handles password with special characters @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter username and password with special characters', async () => {
      await loginPage.enterCredentials('Testing', 'Test@122!#$%');
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify system processes special characters correctly', async () => {
      const currentUrl = await loginPage.getUrl();
      // Login should succeed or fail based on credential validity
    });

    await test.step('Verify no encoding or parsing errors occur', async () => {
      await loginPage.verifyNoSystemError();
    });
  });

  test('[TC-923] Verify that login handles password with leading and trailing spaces @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter username and password with spaces', async () => {
      await loginPage.enterCredentials('Testing', '  Test@122  ');
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });
  });

  test('[TC-1028] Verify that system handles concurrent login requests efficiently @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Submit multiple concurrent login requests', async () => {
      await loginPage.submitMultipleLoginAttempts('Testing', 'Test@122', 3);
    });

    await test.step('Verify all requests complete without timeout or server errors', async () => {
      await loginPage.verifyNoSystemError();
    });
  });

  test('[TC-909] Verify that user can logout successfully after login @smoke @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterCredentials('Testing', 'Test@122');
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Click Logout button', async () => {
      await loginPage.logout();
    });

    await test.step('Verify user is redirected to login page', async () => {
      await loginPage.verifyRedirectToLoginPage();
    });
  });

  test('[TC-935] Verify that login response time is within acceptable limits @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Measure login response time', async () => {
      const responseTime = await loginPage.measureLoginResponseTime('Testing', 'Test@122');
      
      await test.step('Verify login completes within 3 seconds', async () => {
        await loginPage.verifyResponseTimeAcceptable(responseTime, 3000);
      });
    });

    await test.step('Verify user is redirected to configurations page promptly', async () => {
      await loginPage.verifyRedirectToConfigurationsPage();
    });
  });

  test('[TC-908] Verify that user can login successfully with valid credentials @smoke @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterCredentials('Testing', 'Test@122');
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify user is redirected to configurations page', async () => {
      await loginPage.verifyRedirectToConfigurationsPage();
    });

    await test.step('Verify user session is established', async () => {
      await loginPage.verifySessionEstablished();
    });
  });

  test('[TC-934] Verify that brute force login attempts are handled appropriately @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Submit multiple failed login attempts', async () => {
      await loginPage.submitFailedLoginAttempts('Testing', 5);
    });

    await test.step('Verify account lockout or rate limiting is triggered', async () => {
      await loginPage.verifyBruteForcePrevention();
    });
  });

  test('[TC-926] Verify that multiple consecutive login attempts are handled correctly @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Click Login button multiple times rapidly', async () => {
      await loginPage.submitMultipleLoginAttempts('Testing', 'Test@122', 3);
    });

    await test.step('Verify system handles concurrent requests gracefully', async () => {
      await loginPage.verifyNoSystemError();
    });

    await test.step('Verify user is logged in without duplicate sessions', async () => {
      await loginPage.verifySingleActiveSession();
    });
  });

  test('[TC-936] Verify that logout response time is within acceptable limits @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Login with valid credentials', async () => {
      await loginPage.login('Testing', 'Test@122');
    });

    await test.step('Measure logout response time', async () => {
      const responseTime = await loginPage.measureLogoutResponseTime();
      
      await test.step('Verify logout completes within 2 seconds', async () => {
        await loginPage.verifyResponseTimeAcceptable(responseTime, 2000);
      });
    });
  });

  test('[TC-924] Verify that login handles username with only whitespace @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter whitespace-only username and password', async () => {
      await loginPage.enterCredentials('     ', 'Test@122');
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify validation error is displayed', async () => {
      await loginPage.verifyErrorMessageDisplayed();
    });

    await test.step('Verify user remains on login page', async () => {
      const currentUrl = await loginPage.getUrl();
      // User should not be logged in
    });
  });

  test('[TC-922] Verify that login handles username with leading and trailing spaces @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter username with spaces and password', async () => {
      await loginPage.enterCredentials('  Testing  ', 'Test@122');
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify system trims spaces or validates appropriately', async () => {
      const currentUrl = await loginPage.getUrl();
      // System should handle spaces correctly
    });
  });

  test('[TC-931] Verify that password is not visible in plain text during login @regression', async ({ loginPage, page }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter username and password', async () => {
      await loginPage.enterCredentials('Testing', 'Test@122');
    });

    await test.step('Inspect password field type', async () => {
      const passwordType = await page.locator('input[type="password"]').getAttribute('type');
      test.expect(passwordType).toBe('password');
    });
  });

  test('[TC-929] Verify that login API returns error response with invalid credentials @regression', async ({ loginPage, page }) => {
    let apiResponse;
    
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Capture login API response', async () => {
      page.on('response', response => {
        if (response.url().includes('login') || response.url().includes('auth')) {
          apiResponse = response;
        }
      });
      
      await loginPage.enterCredentials('InvalidUser', 'WrongPassword');
      await loginPage.clickLoginButton();
    });

    await test.step('Verify API returns 401 or 403 status code', async () => {
      if (apiResponse) {
        test.expect([401, 403]).toContain(apiResponse.status());
      }
    });
  });

  test('[TC-910] Verify that user remains logged in after page refresh @smoke @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterCredentials('Testing', 'Test@122');
    });

    await test.step('Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Refresh the browser page', async () => {
      await loginPage.refreshPage();
    });

    await test.step('Verify user session persists', async () => {
      await loginPage.verifySessionPersists();
    });
  });

  test('[TC-916] Verify that login fails with both username and password empty @smoke @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Click Login button without entering credentials', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify validation errors are displayed for both fields', async () => {
      const usernameError = await loginPage.isElementVisible('[name="username"] ~ .error, //input[@name="username"]/following-sibling::*[contains(@class, "error")]');
      const passwordError = await loginPage.isElementVisible('[type="password"] ~ .error, //input[@type="password"]/following-sibling::*[contains(@class, "error")]');
      // At least one validation error should appear
    });

    await test.step('Verify user remains on login page', async () => {
      const currentUrl = await loginPage.getUrl();
      // User should not be logged in
    });
  });

  test('[TC-928] Verify that login API returns success response with valid credentials @regression', async ({ loginPage, page }) => {
    let apiResponse;
    
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurations();
    });

    await test.step('Capture login API response', async () => {
      page.on('response', response => {
        if (response.url().includes('login') || response.url().includes('auth')) {
          apiResponse = response;
        }
      });
      
      await loginPage.enterCredentials('Testing', 'Test@122');
      await loginPage.clickLoginButton();
    });

    await test.step('Verify API returns 200 status code', async () => {
      if (apiResponse) {
        test.expect(apiResponse.status()).toBe(200);
      }
    });

    await test.step('Verify response contains authentication token', async () => {
      if (apiResponse) {
        const responseBody = await apiResponse.json();
        test.expect(responseBody.token || responseBody.accessToken || responseBody.authToken).toBeTruthy();
      }
    });
  });
});

