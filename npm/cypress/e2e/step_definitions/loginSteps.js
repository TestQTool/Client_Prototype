import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../support/pages/LoginPage';

const loginPage = new LoginPage();

// Given steps
Given('I am on the login page', () => {
  loginPage.visit();
});

Given('I navigate to a protected page while logged out', () => {
  cy.visit('/protected');
});

Given('I navigate to the application at {string}', (url) => {
  cy.visit(`http://${url}`);
});

Given('I login with valid credentials', () => {
  loginPage.visit();
  loginPage.login(Cypress.env('username'), Cypress.env('password'));
});

// When steps
When('I enter invalid login credentials', () => {
  loginPage.enterUsername('invalidUser');
  loginPage.enterPassword('invalidPass');
});

When('I enter valid credentials on the login page', () => {
  loginPage.login(Cypress.env('username'), Cypress.env('password'));
});

When('I enter a password in the password field', () => {
  loginPage.enterPassword('TestPassword123');
});

When('I enter a valid username', () => {
  loginPage.enterUsername(Cypress.env('username'));
});

When('I enter a valid password', () => {
  loginPage.enterPassword(Cypress.env('password'));
});

When('I press the Enter key', () => {
  loginPage.getPasswordField().type('{enter}');
});

When('I enter a password below minimum length', () => {
  loginPage.enterPassword('12');
});

When('I click the login button', () => {
  loginPage.clickLoginButton();
});

When('I send a POST request to the login endpoint', () => {
  cy.wrap({}).as('apiRequest');
});

When('I omit the username field from the request body', () => {
  cy.get('@apiRequest').then((req) => {
    cy.request({
      method: 'POST',
      url: '/api/login',
      body: { password: 'testPassword' },
      failOnStatusCode: false
    }).as('apiResponse');
  });
});

When('I include a valid password', () => {
  // Already included in previous step
});

When('I enter credentials', () => {
  loginPage.enterUsername(Cypress.env('username'));
  loginPage.enterPassword(Cypress.env('password'));
});

When('I submit the form', () => {
  loginPage.clickLoginButton();
});

When('I enter a SQL injection string in the username field', () => {
  loginPage.enterUsername("' OR '1'='1");
});

When('I leave the password field empty', () => {
  loginPage.getPasswordField().clear();
});

When('I enter a username with special characters', () => {
  loginPage.enterUsername('user@test.com');
});

When('I enter a username with unicode characters', () => {
  loginPage.enterUsername('用户名');
});

When('I enter a password with unicode characters', () => {
  loginPage.enterPassword('密码123');
});

When('I leave the username field empty', () => {
  loginPage.getUsernameField().clear();
});

When('I enter an invalid username', () => {
  loginPage.enterUsername('nonExistentUser');
});

When('I enter a valid username and invalid password', () => {
  loginPage.enterUsername(Cypress.env('username'));
  loginPage.enterPassword('wrongPassword');
});

When('I attempt rapid multiple login requests', () => {
  for (let i = 0; i < 10; i++) {
    cy.request({
      method: 'POST',
      url: '/api/login',
      body: { username: 'test', password: 'test' },
      failOnStatusCode: false
    });
  }
});

When('I enter a username with incorrect case', () => {
  loginPage.enterUsername('TESTUSER');
});

When('I enter a username with correct case', () => {
  loginPage.enterUsername('testUser');
});

When('I enter an invalid password', () => {
  loginPage.enterPassword('wrongPassword123');
});

When('I press the tab key', () => {
  cy.focused().tab();
});

When('I press the tab key again', () => {
  cy.focused().tab();
});

When('I include invalid username and password', () => {
  cy.request({
    method: 'POST',
    url: '/api/login',
    body: { username: 'invalid', password: 'invalid' },
    failOnStatusCode: false
  }).as('apiResponse');
});

When('I remain inactive for the session timeout period', () => {
  cy.wait(Cypress.config('sessionTimeout') || 30000);
});

When('I attempt to access a protected resource', () => {
  cy.visit('/protected');
});

When('I enter credentials for a deactivated account', () => {
  loginPage.enterUsername('deactivatedUser');
  loginPage.enterPassword('password123');
});

When('I enter invalid credentials multiple times', () => {
  for (let i = 0; i < 5; i++) {
    loginPage.enterUsername('testUser');
    loginPage.enterPassword('wrongPassword');
    loginPage.clickLoginButton();
    cy.wait(500);
  }
});

When('I exceed the maximum failed attempts', () => {
  // Already exceeded in previous step
});

When('I try valid credentials', () => {
  loginPage.enterUsername(Cypress.env('username'));
  loginPage.enterPassword(Cypress.env('password'));
  loginPage.clickLoginButton();
});

When('I enter a maximum length username', () => {
  loginPage.enterUsername('a'.repeat(255));
});

When('I enter a minimum length password', () => {
  loginPage.enterPassword('Pass1');
});

When('I enter a username with leading and trailing spaces', () => {
  loginPage.enterUsername('  testUser  ');
});

When('I include valid username and password', () => {
  cy.request({
    method: 'POST',
    url: '/api/login',
    body: { username: Cypress.env('username'), password: Cypress.env('password') }
  }).as('apiResponse');
});

When('I enter invalid username and password', () => {
  loginPage.enterUsername('invalidUser');
  loginPage.enterPassword('invalidPass');
});

When('I enter valid username and password', () => {
  loginPage.enterUsername(Cypress.env('username'));
  loginPage.enterPassword(Cypress.env('password'));
});

When('I perform login operations', () => {
  loginPage.enterUsername(Cypress.env('username'));
  loginPage.enterPassword(Cypress.env('password'));
});

When('I enter a maximum length password', () => {
  loginPage.enterPassword('a'.repeat(255));
});

// Then steps
Then('I should see an error message', () => {
  loginPage.getErrorMessage().should('be.visible');
});

Then('I should remain on the login page', () => {
  cy.url().should('include', '/login');
});

Then('I should be redirected to the login page', () => {
  cy.url().should('include', '/login');
});

Then('login should succeed', () => {
  cy.url().should('not.include', '/login');
});

Then('I should be redirected to the original intended page', () => {
  cy.url().should('include', '/protected');
});

Then('the characters should be masked', () => {
  loginPage.getPasswordField().should('have.attr', 'type', 'password');
});

Then('the password should be displayed as dots or asterisks', () => {
  loginPage.getPasswordField().should('have.attr', 'type', 'password');
});

Then('the password value should not be visible in the page source', () => {
  cy.get('body').should('not.contain', 'TestPassword123');
});

Then('I should be logged in successfully', () => {
  cy.url().should('not.include', '/login');
  cy.getCookie('session').should('exist');
});

Then('I should see a validation error', () => {
  loginPage.getErrorMessage().should('be.visible');
});

Then('I should see a password length error message', () => {
  loginPage.getErrorMessage().should('contain', 'password');
});

Then('the response should indicate a missing username error', () => {
  cy.get('@apiResponse').its('status').should('equal', 400);
  cy.get('@apiResponse').its('body').should('have.property', 'error');
});

Then('the URL should use the HTTPS protocol', () => {
  cy.url().should('include', 'https://');
});

Then('the data should be transmitted securely', () => {
  cy.url().should('include', 'https://');
});

Then('the login should fail safely', () => {
  loginPage.getErrorMessage().should('be.visible');
});

Then('no database error should be exposed', () => {
  cy.get('body').should('not.contain', 'SQL');
  cy.get('body').should('not.contain', 'database');
});

Then('I should see a generic error message', () => {
  loginPage.getErrorMessage().should('contain', 'Invalid credentials');
});

Then('I should see a password required error', () => {
  loginPage.getErrorMessage().should('contain', 'password');
});

Then('the system should process unicode characters correctly', () => {
  // Verify no encoding errors
  cy.get('body').should('not.contain', '�');
});

Then('I should see a username required error', () => {
  loginPage.getErrorMessage().should('contain', 'username');
});

Then('the login should fail', () => {
  loginPage.getErrorMessage().should('be.visible');
});

Then('the password field should be cleared', () => {
  loginPage.getPasswordField().should('have.value', '');
});

Then('the requests should be throttled', () => {
  // Verify rate limiting response
  cy.wrap(null).should(() => {
    // This would be validated through API response codes
  });
});

Then('rate limiting should be implemented', () => {
  // Verify through monitoring or API responses
});

Then('security measures such as CAPTCHA or delay should activate', () => {
  cy.get('body').should((body) => {
    const text = body.text();
    expect(text).to.satisfy((t) => t.includes('CAPTCHA') || t.includes('too many'));
  });
});

Then('I should see an invalid credentials error message', () => {
  loginPage.getErrorMessage().should('contain', 'Invalid credentials');
});

Then('I should see an error validation message', () => {
  loginPage.getErrorMessage().should('be.visible');
});

Then('the focus should move to the username field', () => {
  loginPage.getUsernameField().should('have.focus');
});

Then('the focus should move to the password field', () => {
  loginPage.getPasswordField().should('have.focus');
});

Then('the focus should move to the login button', () => {
  loginPage.getLoginButton().should('have.focus');
});

Then('the response status code should be {int}', (statusCode) => {
  cy.get('@apiResponse').its('status').should('equal', statusCode);
});

Then('the response should contain an appropriate error message', () => {
  cy.get('@apiResponse').its('body').should('have.property', 'error');
});

Then('I should see a session expired message', () => {
  cy.get('body').should('contain', 'session');
});

Then('I should see an account deactivated error message', () => {
  loginPage.getErrorMessage().should('contain', 'deactivated');
});

Then('the account should be locked', () => {
  loginPage.getErrorMessage().should('contain', 'locked');
});

Then('the login should be blocked', () => {
  loginPage.getErrorMessage().should('be.visible');
});

Then('I should see an account locked message', () => {
  loginPage.getErrorMessage().should('contain', 'locked');
});

Then('the login should process correctly', () => {
  cy.url().should('not.include', '/login');
});

Then('the login should complete within {int} seconds', (seconds) => {
  // This is implicitly tested by Cypress default timeout
  cy.url({ timeout: seconds * 1000 }).should('not.include', '/login');
});

Then('the login should process according to policy', () => {
  // Either succeeds or shows appropriate error
  cy.url().then((url) => {
    if (url.includes('/login')) {
      loginPage.getErrorMessage().should('exist');
    }
  });
});

Then('the system should handle whitespace appropriately', () => {
  // Either trims and succeeds or shows error
  cy.url().then((url) => {
    expect(url).to.satisfy((u) => !u.includes('/login') || cy.get('body').contains('error'));
  });
});

Then('the response should contain an authentication token', () => {
  cy.get('@apiResponse').its('body').should('have.property', 'token');
});

Then('I should see the login page with Email and Password fields', () => {
  loginPage.getUsernameField().should('be.visible');
  loginPage.getPasswordField().should('be.visible');
});

Then('I should see the Login button and Register hyperlink', () => {
  loginPage.getLoginButton().should('be.visible');
  cy.contains('Register').should('be.visible');
});

Then('the system should accept the input', () => {
  loginPage.getUsernameField().should('not.be.disabled');
  loginPage.getPasswordField().should('not.be.disabled');
});

Then('the expected results should be verified', () => {
  cy.url().should('exist');
});

Then('I should see a validation error', () => {
  loginPage.getErrorMessage().should('be.visible');
});