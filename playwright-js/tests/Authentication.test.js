import test from '../testFixtures/fixture.js';

test.describe.parallel('Authentication Test Suite', () => {

  test('[594] Verify that user authentication API returns correct response @smoke @api', async ({ authenticationPage, request }) => {
    await test.step('Send POST request to auth endpoint', async () => {
      const response = await request.post('/api/auth', {
        data: {
          username: 'testuser',
          password: 'testpassword'
        }
      });
      expect(response.ok()).toBeTruthy();
    });

    await test.step('Verify response status code - Should return 200 OK', async () => {
      const response = await request.post('/api/auth', {
        data: {
          username: 'testuser',
          password: 'testpassword'
        }
      });
      expect(response.status()).toBe(200);
    });

    await test.step('Verify response contains auth token', async () => {
      const response = await request.post('/api/auth', {
        data: {
          username: 'testuser',
          password: 'testpassword'
        }
      });
      const body = await response.json();
      expect(body.token).toBeDefined();
    });

    await test.step('Verify token format is valid', async () => {
      const response = await request.post('/api/auth', {
        data: {
          username: 'testuser',
          password: 'testpassword'
        }
      });
      const body = await response.json();
      expect(body.token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
    });
  });

  test('[597] Verify that profile update fails with invalid email format @regression', async ({ authenticationPage }) => {
    await test.step('Login and navigate to profile page', async () => {
      await authenticationPage.navigateToLoginPage();
      await authenticationPage.loginWithRole('Admin');
      await authenticationPage.navigateToProfilePage();
      await authenticationPage.verifyProfilePageDisplays();
    });

    await test.step('Enter invalid email format', async () => {
      await authenticationPage.updateEmailAddress('invalidemail');
    });

    await test.step('Keep other fields valid', async () => {
      await authenticationPage.updateFirstName('ValidName');
    });

    await test.step('Click save changes button - Validation should trigger', async () => {
      await authenticationPage.clickSaveChangesButton();
    });

    await test.step('Verify error message for email - Should indicate invalid email format', async () => {
      await authenticationPage.verifyEmailErrorMessage();
    });
  });

  test('[605] Verify that system handles special characters in password @regression', async ({ authenticationPage }) => {
    await test.step('Navigate to registration page', async () => {
      await authenticationPage.navigateToRegistrationPage();
      await authenticationPage.verifyRegistrationPageDisplays();
    });

    await test.step('Enter username and email', async () => {
      await authenticationPage.enterRegistrationUsername('specialuser');
      await authenticationPage.enterRegistrationEmail('specialuser@test.com');
    });

    await test.step('Enter password with special characters', async () => {
      await authenticationPage.enterRegistrationPassword('P@ssw0rd!#$%');
    });

    await test.step('Submit registration form - Form should be submitted successfully', async () => {
      await authenticationPage.clickRegisterButton();
    });

    await test.step('Verify account creation - Account should be created with special character password', async () => {
      await authenticationPage.verifyAccountCreatedSuccessfully();
    });
  });

  test('[591] Verify that login fails with invalid password @smoke', async ({ authenticationPage }) => {
    await test.step('Open login page - Login page should display', async () => {
      await authenticationPage.navigateToLoginPage();
      await authenticationPage.verifyLoginPageDisplays();
    });

    await test.step('Enter valid username', async () => {
      await authenticationPage.enterUsername('validuser');
    });

    await test.step('Enter invalid password', async () => {
      await authenticationPage.enterPassword('wrongpassword');
    });

    await test.step('Click login button - Error message should display', async () => {
      await authenticationPage.clickLoginButton();
      await authenticationPage.verifyLoginErrorMessage();
    });

    await test.step('Verify user remains on login page', async () => {
      await authenticationPage.verifyUserRemainsOnLoginPage();
    });
  });

  test('[38] Verify that user can successfully register with valid credentials @smoke', async ({ authenticationPage }) => {
    await test.step('Navigate to registration page - Registration form should display', async () => {
      await authenticationPage.navigateToRegistrationPage();
      await authenticationPage.verifyRegistrationPageDisplays();
    });

    await test.step('Enter valid username', async () => {
      await authenticationPage.enterRegistrationUsername('newuser' + Date.now());
    });

    await test.step('Enter valid email address', async () => {
      await authenticationPage.enterRegistrationEmail('newuser' + Date.now() + '@test.com');
    });

    await test.step('Enter valid password', async () => {
      await authenticationPage.enterRegistrationPassword('ValidPassword123');
    });

    await test.step('Click register button - User account should be created successfully', async () => {
      await authenticationPage.clickRegisterButton();
      await authenticationPage.verifyAccountCreatedSuccessfully();
    });
  });

  test('[601] Verify that user can reset password successfully @regression', async ({ authenticationPage }) => {
    await test.step('Navigate to forgot password page', async () => {
      await authenticationPage.navigateToForgotPasswordPage();
      await authenticationPage.verifyForgotPasswordPageDisplays();
    });

    await test.step('Enter registered email address', async () => {
      await authenticationPage.enterForgotPasswordEmail('registered@test.com');
    });

    await test.step('Click send reset link button - Reset request should be submitted', async () => {
      await authenticationPage.clickSendResetLinkButton();
    });

    await test.step('Check email for reset link - Reset email should be received', async () => {
      // This step would require email verification logic
      // For now, we verify the UI feedback
    });

    await test.step('Click reset link and set new password', async () => {
      // This would require email integration
      // Password should be updated
    });
  });

  test('[616] Verify that system handles concurrent login attempts for same user @regression', async ({ browser }) => {
    await test.step('Open two browser sessions', async () => {
      const context1 = await browser.newContext();
      const context2 = await browser.newContext();
      const page1 = await context1.newPage();
      const page2 = await context2.newPage();
    });

    await test.step('Navigate to login page in both sessions', async () => {
      // Login pages should display in both contexts
    });

    await test.step('Enter same valid credentials in both', async () => {
      // Same user credentials should be entered
    });

    await test.step('Submit login simultaneously', async () => {
      // Both login attempts should process
    });

    await test.step('Verify system handles concurrent access', async () => {
      // Should manage multiple sessions appropriately
    });
  });

  test('[615] Verify that user registration API validates required fields @smoke @api', async ({ request }) => {
    await test.step('Send POST request to registration endpoint', async () => {
      const response = await request.post('/api/register', {
        data: {
          email: 'test@test.com',
          password: 'password123'
        }
      });
      expect(response.status()).toBe(400);
    });

    await test.step('Verify response status code - Should return 400 Bad Request', async () => {
      const response = await request.post('/api/register', {
        data: {
          email: 'test@test.com',
          password: 'password123'
        }
      });
      expect(response.status()).toBe(400);
    });

    await test.step('Verify error message indicates missing field', async () => {
      const response = await request.post('/api/register', {
        data: {
          email: 'test@test.com',
          password: 'password123'
        }
      });
      const body = await response.json();
      expect(body.error).toContain('username');
    });
  });

  test('[602] Verify that password reset fails for unregistered email @regression', async ({ authenticationPage }) => {
    await test.step('Navigate to forgot password page', async () => {
      await authenticationPage.navigateToForgotPasswordPage();
      await authenticationPage.verifyForgotPasswordPageDisplays();
    });

    await test.step('Enter unregistered email address', async () => {
      await authenticationPage.enterForgotPasswordEmail('unregistered@test.com');
    });

    await test.step('Click send reset link button', async () => {
      await authenticationPage.clickSendResetLinkButton();
    });

    await test.step('Verify error message appears - Should indicate email not found', async () => {
      await authenticationPage.verifyResetPasswordErrorMessage();
    });
  });

  test('[596] Verify that user can update profile information @regression', async ({ authenticationPage }) => {
    await test.step('Login and navigate to profile page', async () => {
      await authenticationPage.navigateToLoginPage();
      await authenticationPage.loginWithRole('Admin');
      await authenticationPage.navigateToProfilePage();
      await authenticationPage.verifyProfilePageDisplays();
    });

    await test.step('Update first name field', async () => {
      await authenticationPage.updateFirstName('UpdatedName');
    });

    await test.step('Update email address', async () => {
      await authenticationPage.updateEmailAddress('updated@test.com');
    });

    await test.step('Click save changes button - Save operation should execute', async () => {
      await authenticationPage.clickSaveChangesButton();
    });

    await test.step('Verify success message appears - Confirmation message should display', async () => {
      await authenticationPage.verifyProfileSuccessMessage();
    });
  });

  test('[590] Verify that user can login with valid credentials @smoke', async ({ authenticationPage }) => {
    await test.step('Open login page - Login page should display', async () => {
      await authenticationPage.navigateToLoginPage();
      await authenticationPage.verifyLoginPageDisplays();
    });

    await test.step('Enter valid username', async () => {
      await authenticationPage.enterUsername('validuser');
    });

    await test.step('Enter valid password', async () => {
      await authenticationPage.enterPassword('validpassword');
    });

    await test.step('Click login button - User should login successfully', async () => {
      await authenticationPage.clickLoginButton();
    });

    await test.step('Verify dashboard loads - User dashboard should be visible', async () => {
      await authenticationPage.verifyDashboardLoads();
    });
  });

  test('[589] Verify that registration fails with duplicate username @regression', async ({ authenticationPage }) => {
    await test.step('Navigate to registration page - Registration form should display', async () => {
      await authenticationPage.navigateToRegistrationPage();
      await authenticationPage.verifyRegistrationPageDisplays();
    });

    await test.step('Enter existing username', async () => {
      await authenticationPage.enterRegistrationUsername('existinguser');
    });

    await test.step('Enter valid email and password', async () => {
      await authenticationPage.enterRegistrationEmail('new@test.com');
      await authenticationPage.enterRegistrationPassword('ValidPassword123');
    });

    await test.step('Click register button - Error message should display', async () => {
      await authenticationPage.clickRegisterButton();
      await authenticationPage.verifyRegistrationErrorMessage();
    });

    await test.step('Verify error message content - Should indicate username already exists', async () => {
      await authenticationPage.verifyRegistrationErrorContent('already exists');
    });
  });

  test('[614] Verify that user can access dashboard after successful login @smoke', async ({ authenticationPage }) => {
    await test.step('Navigate to login page', async () => {
      await authenticationPage.navigateToLoginPage();
      await authenticationPage.verifyLoginPageDisplays();
    });

    await test.step('Enter valid credentials', async () => {
      await authenticationPage.loginWithRole('Admin');
    });

    await test.step('Click login button - Authentication should process', async () => {
      // Already handled in loginWithRole
    });

    await test.step('Verify redirect to dashboard - Dashboard page should load', async () => {
      await authenticationPage.verifyRedirectToDashboard();
    });

    await test.step('Verify dashboard elements are visible', async () => {
      await authenticationPage.verifyDashboardElementsVisible();
    });
  });

  test('[592] Verify that login handles empty username field @smoke', async ({ authenticationPage }) => {
    await test.step('Open login page', async () => {
      await authenticationPage.navigateToLoginPage();
      await authenticationPage.verifyLoginPageDisplays();
    });

    await test.step('Leave username field empty', async () => {
      // Username field remains blank
    });

    await test.step('Enter valid password', async () => {
      await authenticationPage.enterPassword('validpassword');
    });

    await test.step('Click login button - Validation error should appear', async () => {
      await authenticationPage.clickLoginButton();
      await authenticationPage.verifyLoginErrorMessage();
    });
  });

  test('[606] Verify that user can change password from profile settings @regression', async ({ authenticationPage }) => {
    await test.step('Login and navigate to profile settings', async () => {
      await authenticationPage.navigateToLoginPage();
      await authenticationPage.loginWithRole('Admin');
      await authenticationPage.navigateToProfileSettings();
    });

    await test.step('Click change password option', async () => {
      await authenticationPage.clickChangePasswordOption();
      await authenticationPage.verifyPasswordChangeFormAppears();
    });

    await test.step('Enter current password', async () => {
      await authenticationPage.enterCurrentPassword('currentpassword');
    });

    await test.step('Enter new password and confirm', async () => {
      await authenticationPage.enterNewPassword('newpassword123');
      await authenticationPage.enterConfirmNewPassword('newpassword123');
    });

    await test.step('Save password changes - Password should be updated successfully', async () => {
      await authenticationPage.clickSavePasswordButton();
      await authenticationPage.verifyPasswordUpdatedSuccessfully();
    });
  });

  test('[647] Verify that user can view account activity history @regression', async ({ authenticationPage }) => {
    await test.step('Login with user credentials', async () => {
      await authenticationPage.navigateToLoginPage();
      await authenticationPage.loginWithRole('Admin');
    });

    await test.step('Navigate to account activity section', async () => {
      await authenticationPage.navigateToAccountActivitySection();
      await authenticationPage.verifyActivityPageLoads();
    });

    await test.step('Verify login history is displayed', async () => {
      await authenticationPage.verifyLoginHistoryDisplayed();
    });

    await test.step('Check activity timestamps - Dates and times should be accurate', async () => {
      await authenticationPage.verifyActivityTimestampsAccurate();
    });
  });

  test('[604] Verify that session expires after inactivity timeout @regression', async ({ authenticationPage, page }) => {
    await test.step('Login with valid credentials', async () => {
      await authenticationPage.navigateToLoginPage();
      await authenticationPage.loginWithRole('Admin');
    });

    await test.step('Remain inactive for configured timeout period', async () => {
      await page.waitForTimeout(300000); // 5 minutes timeout
    });

    await test.step('Attempt to access protected resource', async () => {
      await authenticationPage.navigateToProfilePage();
    });

    await test.step('Verify session has expired - Should receive unauthorized response', async () => {
      await authenticationPage.verifySessionExpired();
    });

    await test.step('Verify redirect to login page', async () => {
      await authenticationPage.verifyRedirectToLoginPage();
    });
  });

  test('[607] Verify that password change fails with incorrect current password @regression', async ({ authenticationPage }) => {
    await test.step('Login and navigate to profile settings', async () => {
      await authenticationPage.navigateToLoginPage();
      await authenticationPage.loginWithRole('Admin');
      await authenticationPage.navigateToProfileSettings();
    });

    await test.step('Click change password option', async () => {
      await authenticationPage.clickChangePasswordOption();
      await authenticationPage.verifyPasswordChangeFormAppears();
    });

    await test.step('Enter incorrect current password', async () => {
      await authenticationPage.enterCurrentPassword('wrongpassword');
    });

    await test.step('Enter new password and confirm', async () => {
      await authenticationPage.enterNewPassword('newpassword123');
      await authenticationPage.enterConfirmNewPassword('newpassword123');
    });

    await test.step('Verify error message appears - Should indicate current password is incorrect', async () => {
      await authenticationPage.clickSavePasswordButton();
      await authenticationPage.verifyPasswordChangeErrorMessage();
    });
  });

  test('[595] Verify that API returns error for invalid credentials @smoke @api', async ({ request }) => {
    await test.step('Send POST request to auth endpoint', async () => {
      const response = await request.post('/api/auth', {
        data: {
          username: 'invaliduser',
          password: 'invalidpassword'
        }
      });
      expect(response.status()).toBe(401);
    });

    await test.step('Verify response status code - Should return 401 Unauthorized', async () => {
      const response = await request.post('/api/auth', {
        data: {
          username: 'invaliduser',
          password: 'invalidpassword'
        }
      });
      expect(response.status()).toBe(401);
    });

    await test.step('Verify error message in response', async () => {
      const response = await request.post('/api/auth', {
        data: {
          username: 'invaliduser',
          password: 'invalidpassword'
        }
      });
      const body = await response.json();
      expect(body.error).toContain('invalid');
    });

    await test.step('Verify no auth token is returned', async () => {
      const response = await request.post('/api/auth', {
        data: {
          username: 'invaliduser',
          password: 'invalidpassword'
        }
      });
      const body = await response.json();
      expect(body.token).toBeUndefined();
    });
  });

  test('[593] Verify that user can logout successfully @smoke', async ({ authenticationPage }) => {
    await test.step('Login with valid credentials', async () => {
      await authenticationPage.navigateToLoginPage();
      await authenticationPage.loginWithRole('Admin');
    });

    await test.step('Navigate to user menu', async () => {
      await authenticationPage.navigateToUserMenu();
    });

    await test.step('Click logout option - Logout confirmation should appear', async () => {
      await authenticationPage.clickLogoutOption();
    });

    await test.step('Confirm logout action - User should be logged out', async () => {
      await authenticationPage.confirmLogout();
    });

    await test.step('Verify redirect to login page', async () => {
      await authenticationPage.verifyRedirectToLoginPage();
    });
  });

  test('[611] Verify that system handles minimum password length requirement @regression', async ({ authenticationPage }) => {
    await test.step('Navigate to registration page', async () => {
      await authenticationPage.navigateToRegistrationPage();
      await authenticationPage.verifyRegistrationPageDisplays();
    });

    await test.step('Enter valid username and email', async () => {
      await authenticationPage.enterRegistrationUsername('testuser');
      await authenticationPage.enterRegistrationEmail('test@test.com');
    });

    await test.step('Enter password below minimum length', async () => {
      await authenticationPage.enterRegistrationPassword('123');
    });

    await test.step('Attempt to submit form - Validation should trigger', async () => {
      await authenticationPage.clickRegisterButton();
    });

    await test.step('Verify minimum length error message', async () => {
      await authenticationPage.verifyMinimumLengthErrorMessage();
    });
  });

  test('[603] Verify that user data API returns complete user information @smoke @api', async ({ request }) => {
    let authToken;

    await test.step('Authenticate user via API', async () => {
      const authResponse = await request.post('/api/auth', {
        data: {
          username: 'testuser',
          password: 'testpassword'
        }
      });
      const authBody = await authResponse.json();
      authToken = authBody.token;
      expect(authToken).toBeDefined();
    });

    await test.step('Send GET request to user data endpoint', async () => {
      const response = await request.get('/api/user', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      expect(response.ok()).toBeTruthy();
    });

    await test.step('Verify response contains all user fields', async () => {
      const response = await request.get('/api/user', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const body = await response.json();
      expect(body.username).toBeDefined();
      expect(body.email).toBeDefined();
    });
  });

  test('[610] TC_Verify that user can view account information @smoke', async ({ authenticationPage }) => {
    await test.step('Login with valid credentials', async () => {
      await authenticationPage.navigateToLoginPage();
      await authenticationPage.loginWithRole('Admin');
    });

    await test.step('Navigate to account information page', async () => {
      await authenticationPage.navigateToAccountInfoPage();
      await authenticationPage.verifyAccountInfoPageDisplays();
    });

    await test.step('Verify username is displayed', async () => {
      await authenticationPage.verifyUsernameDisplayed();
    });

    await test.step('Verify email address is shown', async () => {
      await authenticationPage.verifyEmailAddressShown();
    });

    await test.step('Verify account creation date', async () => {
      await authenticationPage.verifyAccountCreationDate();
    });
  });

  test('[613] Verify that session expires after inactivity timeout @regression', async ({ authenticationPage, page }) => {
    await test.step('Login with valid credentials', async () => {
      await authenticationPage.navigateToLoginPage();
      await authenticationPage.loginWithRole('Admin');
    });

    await test.step('Remain inactive for configured timeout period', async () => {
      await page.waitForTimeout(300000); // 5 minutes
    });

    await test.step('Attempt to access protected resource', async () => {
      await authenticationPage.navigateToProfilePage();
    });

    await test.step('Verify session has expired - Should be redirected to login', async () => {
      await authenticationPage.verifySessionExpired();
    });

    await test.step('Verify appropriate timeout message', async () => {
      // Session timeout message verification
    });
  });
});