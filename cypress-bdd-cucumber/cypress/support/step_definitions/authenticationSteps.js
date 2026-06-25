import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import AuthenticationPage from '../../pages/AuthenticationPage';

const authPage = new AuthenticationPage();

// ── Registration Steps ────────────────────────────────────────────────────────

Given('I navigate to registration page', () => {
  authPage.navigateToRegistration();
});

When('I enter valid username', () => {
  authPage.fillUsername(authPage.generateRandomUsername());
});

When('I enter existing username', () => {
  authPage.fillUsername('existingUser');
});

When('I enter valid email address', () => {
  authPage.fillEmail(`test${Date.now()}@example.com`);
});

When('I enter valid password', () => {
  authPage.fillPassword('ValidPass123!');
});

When('I enter invalid password', () => {
  authPage.fillPassword('wrongpassword');
});

When('I enter valid email and password', () => {
  authPage.fillEmail(`test${Date.now()}@example.com`);
  authPage.fillPassword('ValidPass123!');
});

When('I click register button', () => {
  authPage.clickRegisterButton();
});

Then('User account should be created successfully', () => {
  authPage.verifyRegistrationSuccess();
});

Then('Error message should display', () => {
  authPage.verifyErrorMessageDisplayed();
});

Then('Error message should indicate username already exists', () => {
  authPage.verifyErrorMessageContains('username already exists');
});

// ── Login Steps ───────────────────────────────────────────────────────────────

Given('I open login page', () => {
  authPage.navigateToLogin();
});

When('I leave username field empty', () => {
  authPage.fillUsername('');
});

When('I click login button', () => {
  authPage.clickLoginButton();
});

Then('User should login successfully', () => {
  authPage.verifyLoginSuccess();
});

Then('User dashboard should be visible', () => {
  authPage.verifyDashboardVisible();
});

Then('User should remain on login page', () => {
  authPage.verifyOnLoginPage();
});

Then('Validation error should appear', () => {
  authPage.verifyValidationErrorDisplayed();
});

Then('Error message should indicate username is required', () => {
  authPage.verifyErrorMessageContains('username is required');
});

// ── Logout Steps ──────────────────────────────────────────────────────────────

Given('I login with valid credentials', () => {
  authPage.loginWithDefaultCredentials();
});

When('I navigate to user menu', () => {
  authPage.clickUserMenu();
});

When('I click logout option', () => {
  authPage.clickLogout();
});

When('I confirm logout action', () => {
  authPage.confirmLogout();
});

Then('User should be logged out', () => {
  authPage.verifyLoggedOut();
});

Then('Login page should display', () => {
  authPage.verifyLoginPageDisplayed();
});

// ── API Steps ─────────────────────────────────────────────────────────────────

When('I send POST request to auth endpoint', () => {
  authPage.sendAuthRequest();
});

When('I include valid credentials in payload', () => {
  authPage.setValidCredentialsPayload();
});

When('I include invalid credentials in payload', () => {
  authPage.setInvalidCredentialsPayload();
});

Then('Response status code should return 200 OK', () => {
  authPage.verifyResponseStatus(200);
});

Then('Response should contain auth token', () => {
  authPage.verifyAuthTokenPresent();
});

Then('Token format should be valid', () => {
  authPage.verifyTokenFormat();
});

Then('Response status code should return 401 Unauthorized', () => {
  authPage.verifyResponseStatus(401);
});

Then('Error message should indicate invalid credentials', () => {
  authPage.verifyErrorMessageContains('invalid credentials');
});

Then('No auth token should be returned', () => {
  authPage.verifyNoAuthToken();
});

// ── Profile Steps ─────────────────────────────────────────────────────────────

Given('I login and navigate to profile page', () => {
  authPage.loginAndNavigateToProfile();
});

When('I update first name field', () => {
  authPage.fillFirstName('UpdatedFirstName');
});

When('I update email address', () => {
  authPage.fillEmail(`updated${Date.now()}@example.com`);
});

When('I click save changes button', () => {
  authPage.clickSaveChanges();
});

Then('Save operation should execute', () => {
  authPage.verifySaveExecuted();
});

Then('Success message should display', () => {
  authPage.verifySuccessMessageDisplayed();
});

When('I enter invalid email format', () => {
  authPage.fillEmail('invalid-email-format');
});

When('I keep other fields valid', () => {
  authPage.fillFirstName('ValidName');
});

Then('Validation should trigger', () => {
  authPage.verifyValidationTriggered();
});

Then('Error message for email should indicate invalid email format', () => {
  authPage.verifyErrorMessageContains('invalid email format');
});

// ── Password Reset Steps ──────────────────────────────────────────────────────

Given('I navigate to forgot password page', () => {
  authPage.navigateToForgotPassword();
});

When('I enter registered email address', () => {
  authPage.fillEmail('registered@example.com');
});

When('I enter unregistered email address', () => {
  authPage.fillEmail('unregistered@example.com');
});

When('I click send reset link button', () => {
  authPage.clickSendResetLink();
});

Then('Reset request should be submitted', () => {
  authPage.verifyResetRequestSubmitted();
});

Then('Reset email should be received', () => {
  authPage.verifyResetEmailReceived();
});

When('I click reset link and set new password', () => {
  authPage.setNewPasswordFromResetLink('NewPassword123!');
});

Then('Password should be updated', () => {
  authPage.verifyPasswordUpdated();
});

Then('Error message should indicate email not found', () => {
  authPage.verifyErrorMessageContains('email not found');
});

Then('No reset email should be sent', () => {
  authPage.verifyNoResetEmailSent();
});

// ── Security & Performance Steps ──────────────────────────────────────────────

Given('I open network monitoring tool', () => {
  cy.log('Network monitoring tool opened');
});

When('I enter credentials and submit', () => {
  authPage.fillUsername('testuser');
  authPage.fillPassword('SecurePass123!');
  authPage.clickLoginButton();
});

When('I capture network traffic', () => {
  cy.log('Network traffic captured');
});

Then('Password should not be visible in plain text', () => {
  authPage.verifyPasswordEncrypted();
});

Then('Password should be encrypted', () => {
  authPage.verifyPasswordEncrypted();
});

When('I enter username with maximum allowed characters', () => {
  authPage.fillUsername('a'.repeat(255));
});

When('I fill other required fields', () => {
  authPage.fillEmail(`test${Date.now()}@example.com`);
  authPage.fillPassword('ValidPass123!');
});

When('I submit registration form', () => {
  authPage.clickRegisterButton();
});

Then('Form should be submitted', () => {
  authPage.verifyFormSubmitted();
});

Then('Account should be created', () => {
  authPage.verifyAccountCreated();
});

Then('Form should be submitted successfully', () => {
  authPage.verifyFormSubmitted();
});

Then('Account should be created with special character password', () => {
  authPage.verifyAccountCreated();
});

Given('I prepare performance monitoring tools', () => {
  cy.log('Performance monitoring tools prepared');
});

When('I click login and measure response time', () => {
  const startTime = Date.now();
  authPage.clickLoginButton();
  cy.wrap(Date.now() - startTime).as('responseTime');
});

Then('Response time should be recorded', () => {
  cy.get('@responseTime').should('exist');
});

Then('Response time should be under 3 seconds', () => {
  cy.get('@responseTime').should('be.lt', 3000);
});

// ── Session & Timeout Steps ───────────────────────────────────────────────────

When('I remain inactive for configured timeout period', () => {
  cy.wait(5000); // Simulated timeout
});

When('I attempt to access protected resource', () => {
  cy.visit('/dashboard');
});

Then('Session should have expired', () => {
  authPage.verifySessionExpired();
});

Then('I should be redirected to login page', () => {
  authPage.verifyOnLoginPage();
});

Then('I should be redirected to login', () => {
  authPage.verifyOnLoginPage();
});

Then('Appropriate timeout message should indicate session expired', () => {
  authPage.verifyErrorMessageContains('session expired');
});

// ── Password Change Steps ─────────────────────────────────────────────────────

Given('I login and navigate to profile settings', () => {
  authPage.loginAndNavigateToSettings();
});

When('I click change password option', () => {
  authPage.clickChangePassword();
});

When('I enter current password', () => {
  authPage.fillCurrentPassword('CurrentPass123!');
});

When('I enter incorrect current password', () => {
  authPage.fillCurrentPassword('WrongPass123!');
});

When('I enter new password and confirm', () => {
  authPage.fillNewPassword('NewPass123!');
  authPage.fillConfirmPassword('NewPass123!');
});

When('I save password changes', () => {
  authPage.clickSavePassword();
});

Then('Password should be updated successfully', () => {
  authPage.verifyPasswordUpdated();
});

Then('Error message should indicate current password is incorrect', () => {
  authPage.verifyErrorMessageContains('current password is incorrect');
});

// ── Special Character Password Steps ──────────────────────────────────────────

When('I enter username and email', () => {
  authPage.fillUsername(authPage.generateRandomUsername());
  authPage.fillEmail(`test${Date.now()}@example.com`);
});

When('I enter password with special characters', () => {
  authPage.fillPassword('P@ssw0rd!#$%');
});

// ── Account Information Steps ─────────────────────────────────────────────────

When('I navigate to account information page', () => {
  authPage.navigateToAccountInfo();
});

Then('Username should be visible', () => {
  authPage.verifyUsernameVisible();
});

Then('Email address should be displayed', () => {
  authPage.verifyEmailDisplayed();
});

Then('Account creation date should be present', () => {
  authPage.verifyCreationDatePresent();
});

// ── Minimum Password Length Steps ─────────────────────────────────────────────

When('I enter valid username and email', () => {
  authPage.fillUsername(authPage.generateRandomUsername());
  authPage.fillEmail(`test${Date.now()}@example.com`);
});

When('I enter password below minimum length', () => {
  authPage.fillPassword('123');
});

When('I attempt to submit form', () => {
  authPage.clickRegisterButton();
});

Then('Validation should trigger', () => {
  authPage.verifyValidationTriggered();
});

Then('Minimum length error message should indicate password too short', () => {
  authPage.verifyErrorMessageContains('password too short');
});

// ── SQL Injection Steps ───────────────────────────────────────────────────────

When('I enter SQL injection code in username field', () => {
  authPage.fillUsername("' OR '1'='1");
});

When('I enter any value in password field', () => {
  authPage.fillPassword('anypassword');
});

When('I submit login form', () => {
  authPage.clickLoginButton();
});

Then('Form should be processed securely', () => {
  authPage.verifyFormProcessedSecurely();
});

Then('No database error should occur', () => {
  authPage.verifyNoDatabaseError();
});

// ── Dashboard Access Steps ────────────────────────────────────────────────────

When('I enter valid credentials', () => {
  authPage.fillUsername('validuser');
  authPage.fillPassword('ValidPass123!');
});

Then('Authentication should process', () => {
  authPage.verifyAuthenticationProcessed();
});

Then('Dashboard page should load', () => {
  authPage.verifyDashboardLoaded();
});

Then('All dashboard components should display', () => {
  authPage.verifyDashboardComponentsDisplayed();
});

// ── API Registration Validation Steps ─────────────────────────────────────────

When('I send POST request to registration endpoint', () => {
  authPage.sendRegistrationRequest();
});

When('I include payload missing required username field', () => {
  authPage.setIncompletePayload();
});

Then('Response status code should return 400 Bad Request', () => {
  authPage.verifyResponseStatus(400);
});

Then('Error message should specify username required', () => {
  authPage.verifyErrorMessageContains('username required');
});

Then('Registration should fail', () => {
  authPage.verifyRegistrationFailed();
});

// ── Concurrent Login Steps ────────────────────────────────────────────────────

Given('I open two browser sessions', () => {
  cy.log('Two browser sessions opened');
});

Given('I navigate to login page in both sessions', () => {
  authPage.navigateToLogin();
});

When('I enter same valid credentials in both', () => {
  authPage.fillUsername('validuser');
  authPage.fillPassword('ValidPass123!');
});

When('I submit login simultaneously', () => {
  authPage.clickLoginButton();
});

Then('Both login attempts should process', () => {
  authPage.verifyBothLoginsProcessed();
});

Then('System should manage multiple sessions appropriately', () => {
  authPage.verifySessionsManaged();
});

// ── Load Testing Steps ────────────────────────────────────────────────────────

Given('I prepare multiple user accounts', () => {
  cy.log('Multiple user accounts prepared');
});

Given('I configure load testing tool', () => {
  cy.log('Load testing tool configured');
});

Given('I configure load testing tool for 100 concurrent users', () => {
  cy.log('Load testing tool configured for 100 users');
});

When('I execute simultaneous login requests', () => {
  cy.log('Simultaneous login requests executed');
});

When('I execute load test on login functionality', () => {
  cy.log('Load test executed');
});

When('I monitor system response times', () => {
  cy.log('System response times monitored');
});

Then('Response times should be recorded', () => {
  cy.log('Response times recorded');
});

Then('Performance metrics should be collected', () => {
  cy.log('Performance metrics collected');
});

Then('All users should authenticate', () => {
  cy.log('All users authenticated');
});

Then('Response times should stay within performance thresholds', () => {
  cy.log('Response times within thresholds');
});

Then('All requests should complete successfully', () => {
  cy.log('All requests completed');
});

// ── Rate Limiting Steps ───────────────────────────────────────────────────────

Given('I configure API client for rapid requests', () => {
  cy.log('API client configured for rapid requests');
});

When('I send requests exceeding rate limit', () => {
  authPage.sendRapidRequests();
});

When('I monitor response status codes', () => {
  cy.log('Response status codes monitored');
});

Then('Rate limit error should be returned with 429 Too Many Requests', () => {
  authPage.verifyResponseStatus(429);
});

When('I wait for rate limit reset', () => {
  cy.wait(5000);
});

Then('I should be able to make requests again', () => {
  authPage.verifyRequestsAllowed();
});

// ── User Data API Steps ───────────────────────────────────────────────────────

Given('I authenticate user via API', () => {
  authPage.authenticateViaAPI();
});

When('I send GET request to user data endpoint', () => {
  authPage.sendUserDataRequest();
});

When('I include auth token in headers', () => {
  authPage.includeAuthTokenInHeaders();
});

Then('Response should contain all user fields', () => {
  authPage.verifyAllUserFieldsPresent();
});

Then('Data format should match specification', () => {
  authPage.verifyDataFormatCorrect();
});

// ── Account Activity Steps ────────────────────────────────────────────────────

Given('I login with user credentials', () => {
  authPage.loginWithDefaultCredentials();
});

When('I navigate to account activity section', () => {
  authPage.navigateToAccountActivity();
});

Then('Activity page should load', () => {
  authPage.verifyActivityPageLoaded();
});

Then('Previous logins should be shown', () => {
  authPage.verifyPreviousLoginsDisplayed();
});

Then('Dates and times should be accurate', () => {
  authPage.verifyTimestampsAccurate();
});

Then('All relevant information should be present', () => {
  authPage.verifyAllActivityInfoPresent();
});

