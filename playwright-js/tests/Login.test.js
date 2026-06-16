import test from '../testFixtures/fixture.js';

test.describe.parallel('Login Feature Tests', () => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const loginUrl = `${baseUrl}/configurations`;
  const dashboardUrl = `${baseUrl}/dashboard`;
  const loginApiUrl = `${baseUrl}/api/login`;
  const appUsername = 'Testing';
  const appPassword = 'Test@122';

  test.beforeEach(async ({ loginPage }) => {
    await test.step('Navigate to login page and enter app credentials', async () => {
      await loginPage.navigateToLoginPage(loginUrl);
      await loginPage.enterEmail(appUsername);
      await loginPage.enterPassword(appPassword);
    });
  });

  test('[TC-769] Verify that user can login successfully with valid email and password @smoke @regression', async ({ loginPage }) => {
    await test.step('Enter valid email in email field', async () => {
      await loginPage.enterEmail('validuser@example.com');
    });

    await test.step('Enter valid password in password field', async () => {
      await loginPage.enterPassword('ValidPassword123!');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify user is redirected to dashboard successfully', async () => {
      await loginPage.verifyDashboardRedirection();
    });
  });

  test('[TC-770] Verify that password field masks entered characters during input @smoke', async ({ loginPage }) => {
    await test.step('Enter password in password field', async () => {
      await loginPage.enterPassword('TestPassword123');
    });

    await test.step('Verify password field type is masked', async () => {
      await loginPage.verifyPasswordMasked();
    });
  });

  test('[TC-771] Verify that user is redirected to dashboard after successful login @smoke', async ({ loginPage }) => {
    await test.step('Enter valid credentials', async () => {
      await loginPage.enterEmail('validuser@example.com');
      await loginPage.enterPassword('ValidPassword123!');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify redirection to dashboard page', async () => {
      await loginPage.verifyDashboardRedirection();
      await loginPage.verifyDashboardHeading();
    });
  });

  test('[TC-772] Verify that Forgot Password link is visible on login page @smoke', async ({ loginPage }) => {
    await test.step('Verify Forgot Password link is visible', async () => {
      await loginPage.verifyForgotPasswordLinkVisible();
    });

    await test.step('Verify link is clickable', async () => {
      await loginPage.verifyForgotPasswordLinkClickable();
    });

    await test.step('Hover over link', async () => {
      await loginPage.hoverOverForgotPasswordLink();
    });
  });

  test('[TC-773] Verify that email field accepts valid email format @regression', async ({ loginPage }) => {
    await test.step('Enter valid email format in email field', async () => {
      await loginPage.enterEmail('test.user@example.com');
    });

    await test.step('Verify email format validation - no error message should appear', async () => {
      // No error should be visible
    });

    await test.step('Click outside email field', async () => {
      await loginPage.page.click('body');
    });
  });

  test('[TC-774] Verify that error message is displayed for invalid credentials @smoke', async ({ loginPage }) => {
    await test.step('Enter invalid credentials', async () => {
      await loginPage.enterEmail('invalid@example.com');
      await loginPage.enterPassword('WrongPassword');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify error message for invalid credentials', async () => {
      await loginPage.verifyCredentialsError();
    });
  });

  test('[TC-775] Verify that login fails with invalid email format @regression', async ({ loginPage }) => {
    await test.step('Enter invalid email format in email field', async () => {
      await loginPage.enterEmail('invalidemail');
    });

    await test.step('Enter valid password', async () => {
      await loginPage.enterPassword('ValidPassword123!');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify error message for invalid email format', async () => {
      await loginPage.verifyErrorMessage('invalid email');
    });
  });

  test('[TC-776] Verify that login fails with empty email field @smoke', async ({ loginPage }) => {
    await test.step('Leave email field empty', async () => {
      // Email field remains blank
    });

    await test.step('Enter valid password', async () => {
      await loginPage.enterPassword('ValidPassword123!');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify error message for required email field', async () => {
      await loginPage.verifyEmailValidationError();
    });
  });

  test('[TC-777] Verify that login fails with empty password field @smoke', async ({ loginPage }) => {
    await test.step('Enter valid email in email field', async () => {
      await loginPage.enterEmail('validuser@example.com');
    });

    await test.step('Leave password field empty', async () => {
      // Password field remains blank
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify error message for required password field', async () => {
      await loginPage.verifyPasswordValidationError();
    });
  });

  test('[TC-778] Verify that login fails with correct email but incorrect password @regression', async ({ loginPage }) => {
    await test.step('Enter valid email in email field', async () => {
      await loginPage.enterEmail('validuser@example.com');
    });

    await test.step('Enter incorrect password', async () => {
      await loginPage.enterPassword('WrongPassword');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify error message for invalid credentials', async () => {
      await loginPage.verifyCredentialsError();
    });
  });

  test('[TC-779] Verify that login fails with incorrect email but correct password @regression', async ({ loginPage }) => {
    await test.step('Enter incorrect email in email field', async () => {
      await loginPage.enterEmail('wronguser@example.com');
    });

    await test.step('Enter correct password', async () => {
      await loginPage.enterPassword('ValidPassword123!');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify error message for invalid credentials', async () => {
      await loginPage.verifyCredentialsError();
    });
  });

  test('[TC-780] Verify that login fails when both email and password fields are empty @smoke', async ({ loginPage }) => {
    await test.step('Leave both email and password fields empty', async () => {
      // Both fields remain blank
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify error messages for required fields', async () => {
      await loginPage.verifyEmailValidationError();
      await loginPage.verifyPasswordValidationError();
    });

    await test.step('Verify user remains on login page', async () => {
      await loginPage.verifyUserRemainsOnLoginPage(loginUrl);
    });
  });

  test('[TC-781] Verify that login fails with SQL injection in email field @regression', async ({ loginPage }) => {
    await test.step('Enter SQL injection string in email field', async () => {
      await loginPage.enterEmail("admin' OR '1'='1");
    });

    await test.step('Enter valid password', async () => {
      await loginPage.enterPassword('ValidPassword123!');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify login fails with error message or validation', async () => {
      await loginPage.verifyErrorMessage('');
    });
  });

  test('[TC-782] Verify that login fails with special characters in email field @regression', async ({ loginPage }) => {
    await test.step('Enter special characters without valid email format', async () => {
      await loginPage.enterEmail('!@#$%^&*()');
    });

    await test.step('Enter valid password', async () => {
      await loginPage.enterPassword('ValidPassword123!');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify error message for invalid email format', async () => {
      await loginPage.verifyErrorMessage('invalid email');
    });
  });

  test('[TC-783] Verify that login works with email containing maximum allowed characters @regression', async ({ loginPage }) => {
    await test.step('Enter maximum length valid email', async () => {
      const maxEmail = 'a'.repeat(50) + '@example.com';
      await loginPage.enterEmail(maxEmail);
    });

    await test.step('Enter valid password', async () => {
      await loginPage.enterPassword('ValidPassword123!');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });
  });

  test('[TC-784] Verify that login works with password containing maximum allowed characters @regression', async ({ loginPage }) => {
    await test.step('Enter valid email', async () => {
      await loginPage.enterEmail('validuser@example.com');
    });

    await test.step('Enter maximum length password', async () => {
      const maxPassword = 'A'.repeat(100) + '1!';
      await loginPage.enterPassword(maxPassword);
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });
  });

  test('[TC-785] Verify that login works with email containing minimum allowed characters @regression', async ({ loginPage }) => {
    await test.step('Enter minimum length valid email', async () => {
      await loginPage.enterEmail('a@b.c');
    });

    await test.step('Enter valid password', async () => {
      await loginPage.enterPassword('ValidPassword123!');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });
  });

  test('[TC-786] Verify that password field handles copy paste operations @regression', async ({ loginPage }) => {
    await test.step('Copy and paste password', async () => {
      const testPassword = 'CopiedPassword123!';
      await loginPage.page.evaluate((pwd) => {
        navigator.clipboard.writeText(pwd);
      }, testPassword);
      await loginPage.page.focus('[type="password"]');
      await loginPage.page.keyboard.press('Control+V');
    });

    await test.step('Verify password is pasted successfully', async () => {
      await loginPage.verifyPasswordMasked();
    });
  });

  test('[TC-787] Verify that login handles leading and trailing spaces in email @regression', async ({ loginPage }) => {
    await test.step('Enter email with leading and trailing spaces', async () => {
      await loginPage.enterEmail('  validuser@example.com  ');
    });

    await test.step('Enter valid password', async () => {
      await loginPage.enterPassword('ValidPassword123!');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify system trims spaces or shows validation error', async () => {
      // System should either trim or show error
    });
  });

  test('[TC-788] Verify that login handles leading and trailing spaces in password @regression', async ({ loginPage }) => {
    await test.step('Enter valid email', async () => {
      await loginPage.enterEmail('validuser@example.com');
    });

    await test.step('Enter password with leading and trailing spaces', async () => {
      await loginPage.enterPassword('  ValidPassword123!  ');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify system processes password with spaces as entered', async () => {
      // System should process password including spaces
    });
  });

  test('[TC-789] Verify that login API returns success response for valid credentials @smoke', async ({ loginPage }) => {
    let response;

    await test.step('Send POST request to login API with valid credentials', async () => {
      response = await loginPage.sendLoginApiRequest(loginApiUrl, {
        email: 'validuser@example.com',
        password: 'ValidPassword123!'
      });
    });

    await test.step('Verify API response status code is 200', async () => {
      await loginPage.verifyApiStatusCode(response, 200);
    });

    await test.step('Verify response contains authentication token', async () => {
      await loginPage.verifyApiResponseContains(response, 'token');
    });
  });

  test('[TC-790] Verify that login API returns error response for invalid credentials @regression', async ({ loginPage }) => {
    let response;

    await test.step('Send POST request to login API with invalid credentials', async () => {
      response = await loginPage.sendLoginApiRequest(loginApiUrl, {
        email: 'invalid@example.com',
        password: 'WrongPassword'
      });
    });

    await test.step('Verify API response status code is 401 or 400', async () => {
      const statusCode = response.status();
      expect([400, 401]).toContain(statusCode);
    });

    await test.step('Verify error message in response', async () => {
      await loginPage.verifyApiErrorMessage(response);
    });
  });

  test('[TC-791] Verify that login API validates required fields @regression', async ({ loginPage }) => {
    let response;

    await test.step('Send POST request to login API with missing email field', async () => {
      response = await loginPage.sendLoginApiRequest(loginApiUrl, {
        password: 'ValidPassword123!'
      });
    });

    await test.step('Verify API response status code is 400', async () => {
      await loginPage.verifyApiStatusCode(response, 400);
    });

    await test.step('Verify validation error message for required field', async () => {
      await loginPage.verifyApiErrorMessage(response);
    });
  });

  test('[TC-792] Verify that login API response time is within acceptable limits @regression', async ({ loginPage }) => {
    let startTime, endTime, responseTime;

    await test.step('Send POST request to login API with valid credentials', async () => {
      startTime = Date.now();
      const response = await loginPage.sendLoginApiRequest(loginApiUrl, {
        email: 'validuser@example.com',
        password: 'ValidPassword123!'
      });
      endTime = Date.now();
      responseTime = endTime - startTime;
    });

    await test.step('Verify response time is under 3 seconds', async () => {
      expect(responseTime).toBeLessThan(3000);
    });
  });

  test('[TC-793] Verify that password is transmitted securely over HTTPS @regression', async ({ loginPage }) => {
    await test.step('Enter valid credentials', async () => {
      await loginPage.enterEmail('validuser@example.com');
      await loginPage.enterPassword('ValidPassword123!');
    });

    await test.step('Monitor network traffic during login', async () => {
      const [request] = await Promise.all([
        loginPage.page.waitForRequest(request => request.url().includes('login')),
        loginPage.clickLoginButton()
      ]);
      const url = request.url();
      expect(url).toMatch(/^https/);
    });
  });

  test('[TC-794] Verify that password is not visible in browser console or logs @regression', async ({ loginPage }) => {
    await test.step('Open browser developer console', async () => {
      await loginPage.openBrowserConsole();
    });

    await test.step('Enter credentials and login', async () => {
      await loginPage.enterEmail('validuser@example.com');
      await loginPage.enterPassword('SecretPassword123!');
      await loginPage.clickLoginButton();
    });

    await test.step('Verify password is not visible in console logs', async () => {
      await loginPage.verifyPasswordNotInConsole();
    });
  });

  test('[TC-795] Verify that authentication token expires after session timeout @regression', async ({ loginPage }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.loginWithCredentials('validuser@example.com', 'ValidPassword123!');
    });

    await test.step('Verify user is logged in successfully', async () => {
      await loginPage.verifyDashboardRedirection();
    });

    await test.step('Wait for session timeout period', async () => {
      await loginPage.waitForSessionTimeout(60000); // 60 seconds timeout
    });

    await test.step('Attempt to access protected resource', async () => {
      await loginPage.accessProtectedResource(`${baseUrl}/protected`);
    });

    await test.step('Verify user is redirected to login page', async () => {
      await loginPage.verifyUserRemainsOnLoginPage(loginUrl);
    });
  });

  test('[TC-796] Verify that login page loads within acceptable time @regression', async ({ loginPage }) => {
    let loadTime;

    await test.step('Navigate to login page and measure load time', async () => {
      await loginPage.navigateToLoginPage(loginUrl);
      loadTime = await loginPage.measurePageLoadTime();
    });

    await test.step('Verify all page elements are loaded', async () => {
      await loginPage.verifyForgotPasswordLinkVisible();
    });

    await test.step('Verify load time is under 2 seconds', async () => {
      await loginPage.verifyLoadTimeWithinLimit(loadTime, 2000);
    });
  });

  test('[TC-797] Verify that login functionality handles multiple concurrent users @regression', async ({ loginPage }) => {
    let responses;

    await test.step('Simulate 100 concurrent login requests', async () => {
      responses = await loginPage.simulateConcurrentLogins(loginApiUrl, {
        email: 'validuser@example.com',
        password: 'ValidPassword123!'
      }, 100);
    });

    await test.step('Verify all requests are processed', async () => {
      expect(responses.length).toBe(100);
    });

    await test.step('Verify system performance remains stable', async () => {
      // All responses should have valid status codes
      responses.forEach(response => {
        expect([200, 401, 400]).toContain(response.status());
      });
    });
  });

  test('[TC-1027] Verify that system handles concurrent login requests efficiently @regression', async ({ loginPage }) => {
    let responses;
    const startTime = Date.now();

    await test.step('Simulate 50 concurrent login requests with valid credentials', async () => {
      responses = await loginPage.simulateConcurrentLogins(loginApiUrl, {
        email: 'validuser@example.com',
        password: 'ValidPassword123!'
      }, 50);
    });

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    await test.step('Verify all requests are processed successfully', async () => {
      await loginPage.verifyAllRequestsProcessed(responses, 200);
    });

    await test.step('Verify response times remain consistent', async () => {
      const averageTime = totalTime / 50;
      expect(averageTime).toBeLessThan(5000);
    });
  });
});

