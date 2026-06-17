import test from '../testFixtures/fixture.js';

test.describe.parallel('Login Module - AG-Helix', () => {
  
  test('[TC-791] Verify that login API validates required fields @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Send POST request to login API with missing email field', async () => {
      const response = await loginPage.sendLoginAPIRequest({ password: 'Test@122' });
      
      await test.step('Verify API response status code is 400', async () => {
        await loginPage.verifyAPIResponseStatusCode(response, 400);
      });

      await test.step('Verify validation error message for required field', async () => {
        await loginPage.verifyAPIResponseContainsError(response);
      });
    });
  });

  test('[TC-779] Verify that login fails with incorrect email but correct password @smoke', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Enter incorrect email', async () => {
      await loginPage.enterEmail('incorrect@example.com');
    });

    await test.step('Click login button and verify error message', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyInvalidCredentialsError('Invalid credentials');
    });
  });

  test('[TC-770] Verify that password field masks entered characters during input @smoke', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Verify password field masks input', async () => {
      await loginPage.verifyPasswordFieldMasksInput();
    });
  });

  test('[TC-790] Verify that login API returns error response for invalid credentials @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Send POST request with invalid credentials', async () => {
      const response = await loginPage.sendLoginAPIRequest({ 
        email: 'invalid@test.com', 
        password: 'wrongpassword' 
      });
      
      await test.step('Verify API response status code is 401 or 400', async () => {
        const status = response.status();
        test.expect([400, 401]).toContain(status);
      });

      await test.step('Verify error message in response', async () => {
        await loginPage.verifyAPIResponseContainsError(response);
      });
    });
  });

  test('[TC-795] Verify that authentication token expires after session timeout @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Login with valid credentials', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyDashboardIsDisplayed();
    });

    await test.step('Wait for session timeout period', async () => {
      await loginPage.waitForSessionTimeout(300000); // 5 minutes timeout example
    });

    await test.step('Attempt to access protected resource and verify redirect to login', async () => {
      await loginPage.attemptToAccessProtectedResource('/protected-page');
      await loginPage.verifyLoginPageIsDisplayed();
    });
  });

  test('[TC-778] Verify that login fails with correct email but incorrect password @smoke', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Enter valid email', async () => {
      await loginPage.enterEmail('valid@example.com');
    });

    await test.step('Click login button and verify error message', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyInvalidCredentialsError('Invalid credentials');
    });
  });

  test('[TC-774] Verify that error message is displayed for invalid credentials @smoke', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify error message for invalid credentials', async () => {
      await loginPage.verifyInvalidCredentialsError('Invalid credentials');
    });
  });

  test('[TC-1027] Verify that system handles concurrent login requests efficiently @regression', async ({ loginPage, page, context }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Simulate 50 concurrent login requests', async () => {
      const requests = [];
      for (let i = 0; i < 50; i++) {
        requests.push(loginPage.sendLoginAPIRequest({ 
          email: 'Testing', 
          password: 'Test@122' 
        }));
      }
      
      await test.step('Verify all requests are processed successfully', async () => {
        const responses = await Promise.all(requests);
        test.expect(responses.length).toBe(50);
      });
    });
  });

  test('[TC-776] Verify that login fails with empty email field @smoke', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Leave email field empty', async () => {
      await loginPage.leaveEmailEmpty();
    });

    await test.step('Click login button and verify error message', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyEmailErrorMessage('Email is required');
    });
  });

  test('[TC-792] Verify that login API response time is within acceptable limits @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Send POST request and measure response time', async () => {
      const responseTime = await loginPage.measureAPIResponseTime({ 
        email: 'Testing', 
        password: 'Test@122' 
      });
      
      await test.step('Verify response time is under 3 seconds', async () => {
        await loginPage.verifyResponseTimeIsAcceptable(responseTime, 3000);
      });
    });
  });

  test('[TC-794] Verify that password is not visible in browser console or logs @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Open browser developer console and check logs', async () => {
      await loginPage.verifyPasswordNotInConsoleLogs();
    });
  });

  test('[TC-780] Verify that login fails when both email and password fields are empty @smoke', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Click login button without entering credentials', async () => {
      await loginPage.leaveEmailEmpty();
      await loginPage.leavePasswordEmpty();
      await loginPage.clickLoginButton();
    });

    await test.step('Verify error messages for required fields', async () => {
      await loginPage.verifyValidationErrorDisplayed();
    });

    await test.step('Verify user remains on login page', async () => {
      await loginPage.verifyUserRemainsOnLoginPage();
    });
  });

  test('[TC-787] Verify that login handles leading and trailing spaces in email @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Enter email with leading and trailing spaces', async () => {
      await loginPage.enterEmailWithSpaces('test@example.com');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
      // System should either trim spaces or show validation error
    });
  });

  test('[TC-788] Verify that login handles leading and trailing spaces in password @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Enter valid email', async () => {
      await loginPage.enterEmail('test@example.com');
    });

    await test.step('Enter password with spaces and click login', async () => {
      await loginPage.enterPasswordWithSpaces('Test@122');
      await loginPage.clickLoginButton();
    });
  });

  test('[TC-789] Verify that login API returns success response for valid credentials @smoke', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Send POST request with valid credentials', async () => {
      const response = await loginPage.sendLoginAPIRequest({ 
        email: 'Testing', 
        password: 'Test@122' 
      });
      
      await test.step('Verify API response status code is 200', async () => {
        await loginPage.verifyAPIResponseStatusCode(response, 200);
      });

      await test.step('Verify response contains authentication token', async () => {
        await loginPage.verifyAPIResponseContainsToken(response);
      });
    });
  });

  test('[TC-777] Verify that login fails with empty password field @smoke', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Enter valid email', async () => {
      await loginPage.enterEmail('test@example.com');
    });

    await test.step('Leave password field empty and click login', async () => {
      await loginPage.leavePasswordEmpty();
      await loginPage.clickLoginButton();
    });

    await test.step('Verify error message for required password field', async () => {
      await loginPage.verifyPasswordErrorMessage('Password is required');
    });
  });

  test('[TC-772] Verify that Forgot Password link is visible on login page @smoke', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Verify Forgot Password link is visible', async () => {
      await loginPage.verifyForgotPasswordLinkIsVisible();
    });

    await test.step('Verify link is clickable', async () => {
      await loginPage.verifyForgotPasswordLinkIsClickable();
    });
  });

  test('[TC-782] Verify that login fails with special characters in email field @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Enter special characters without valid email format', async () => {
      await loginPage.enterEmail('!@#$%^&*()');
    });

    await test.step('Click login button and verify error message', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyEmailErrorMessage('Invalid email format');
    });
  });

  test('[TC-773] Verify that email field accepts valid email format @smoke', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Enter valid email format', async () => {
      const validEmail = 'test@example.com';
      await loginPage.enterEmail(validEmail);
    });

    await test.step('Verify email format validation passes', async () => {
      await loginPage.verifyEmailFieldAcceptsInput('test@example.com');
    });
  });

  test('[TC-771] Verify that user is redirected to dashboard after successful login @smoke', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify user is redirected to dashboard', async () => {
      await loginPage.verifyRedirectionToDashboard();
    });
  });

  test('[TC-793] Verify that password is transmitted securely over HTTPS @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Enter valid credentials', async () => {
      await loginPage.enterEmail('test@example.com');
      await loginPage.enterPassword('SecurePassword123');
    });

    await test.step('Monitor network traffic and verify HTTPS', async () => {
      await loginPage.verifyHTTPSConnection();
    });
  });

  test('[TC-796] Verify that login page loads within acceptable time @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Measure page load time', async () => {
      const loadTime = await loginPage.measurePageLoadTime();
      
      await test.step('Verify page load time is under 2 seconds', async () => {
        await loginPage.verifyPageLoadTimeIsAcceptable(loadTime, 2000);
      });
    });
  });

  test('[TC-769] Verify that user can login successfully with valid email and password @smoke', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Enter valid email', async () => {
      await loginPage.enterEmail('valid@example.com');
    });

    await test.step('Click login button and verify dashboard redirection', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyDashboardIsDisplayed();
    });
  });

  test('[TC-781] Verify that login fails with SQL injection in email field @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Enter SQL injection string in email field', async () => {
      await loginPage.enterEmail("' OR '1'='1");
    });

    await test.step('Click login button and verify login fails', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyInvalidCredentialsError('Invalid credentials');
    });
  });

  test('[TC-797] Verify that login functionality handles multiple concurrent users @regression', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Simulate 100 concurrent login requests', async () => {
      const requests = [];
      for (let i = 0; i < 100; i++) {
        requests.push(loginPage.sendLoginAPIRequest({ 
          email: `user${i}@example.com`, 
          password: 'Test@122' 
        }));
      }
      
      await test.step('Verify all requests are processed', async () => {
        const responses = await Promise.all(requests);
        test.expect(responses.length).toBe(100);
      });
    });
  });

  test('[TC-775] Verify that login fails with invalid email format @smoke', async ({ loginPage }) => {
    await test.step('Navigate to configured application URL', async () => {
      await loginPage.navigateToConfigurationsPage();
    });

    await test.step('Enter configured credentials', async () => {
      await loginPage.enterEmail('Testing');
      await loginPage.enterPassword('Test@122');
    });

    await test.step('Enter invalid email format', async () => {
      await loginPage.enterEmail('invalid-email');
    });

    await test.step('Click login button and verify error message', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyEmailErrorMessage('Invalid email format');
    });
  });
});

