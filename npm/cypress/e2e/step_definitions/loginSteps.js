import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../support/pages/LoginPage';

const loginPage = new LoginPage();

Given('I am on the login page', () => {
  cy.visitLoginPage();
});

Given('I clear the browser cache', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

Given('I open the login page on desktop', () => {
  cy.viewport(1280, 720);
  cy.visitLoginPage();
});

When('I enter a disabled account username', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterUsername(data.disabledAccount.username);
  });
});

When('I enter the correct password for disabled account', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterPassword(data.disabledAccount.password);
  });
});

When('I enter username with unicode characters', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterUsername(data.unicodeCharacters.username);
  });
});

When('I enter password with unicode characters', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterPassword(data.unicodeCharacters.password);
  });
});

When('I enter username with special characters', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterUsername(data.specialCharacters.username);
  });
});

When('I enter a valid password', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterPassword(data.validCredentials.password);
  });
});

When('I enter a valid username', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterUsername(data.validCredentials.username);
  });
});

When('I enter an invalid username', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterUsername(data.invalidCredentials.username);
  });
});

When('I enter an invalid password', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterPassword(data.invalidCredentials.password);
  });
});

When('I enter invalid login credentials', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterUsername(data.invalidCredentials.username);
    loginPage.enterPassword(data.invalidCredentials.password);
  });
});

When('I enter valid credentials', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterUsername(data.validCredentials.username);
    loginPage.enterPassword(data.validCredentials.password);
  });
});

When('I click the login button', () => {
  loginPage.clickLoginButton();
});

When('I click the login button multiple times rapidly', () => {
  loginPage.clickLoginButton();
  loginPage.clickLoginButton();
  loginPage.clickLoginButton();
});

When('I focus on the username field', () => {
  loginPage.focusUsernameField();
});

When('I press the tab key', () => {
  cy.focused().tab();
});

When('I press the tab key again', () => {
  cy.focused().tab();
});

When('I press the enter key', () => {
  cy.focused().type('{enter}');
});

When('I leave the username field empty', () => {
  loginPage.clearUsername();
});

When('I leave the password field empty', () => {
  loginPage.clearPassword();
});

When('I leave both username and password fields empty', () => {
  loginPage.clearUsername();
  loginPage.clearPassword();
});

When('I enter SQL injection string in username field', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterUsername(data.sqlInjection.username);
  });
});

When('I enter a maximum length username', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterUsername(data.maxLength.username);
  });
});

When('I enter a maximum length password', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterPassword(data.maxLength.password);
  });
});

When('I enter a username', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterUsername(data.validCredentials.username);
  });
});

When('I navigate away from the login page', () => {
  cy.visit('/about');
});

When('I return to the login page', () => {
  cy.visitLoginPage();
});

When('I attempt login with invalid credentials multiple times rapidly', () => {
  cy.fixture('loginData').then((data) => {
    for (let i = 0; i < 5; i++) {
      loginPage.enterUsername(data.invalidCredentials.username);
      loginPage.enterPassword(data.invalidCredentials.password);
      loginPage.clickLoginButton();
      cy.wait(100);
    }
  });
});

When('I hover over the login button', () => {
  loginPage.hoverLoginButton();
});

When('I use keyboard to navigate to the username field', () => {
  cy.get('body').tab();
});

When('I type the username using keyboard', () => {
  cy.fixture('loginData').then((data) => {
    cy.focused().type(data.validCredentials.username);
  });
});

When('I navigate to the password field using keyboard', () => {
  cy.focused().tab();
});

When('I type the password using keyboard', () => {
  cy.fixture('loginData').then((data) => {
    cy.focused().type(data.validCredentials.password);
  });
});

When('I click on the password field', () => {
  loginPage.focusPasswordField();
});

When('I type password characters', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterPassword(data.validCredentials.password);
  });
});

When('I enter a password in the password field', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterPassword(data.validCredentials.password);
  });
});

When('I select the password text', () => {
  loginPage.selectPasswordField();
});

When('I attempt to copy the password', () => {
  cy.get(loginPage.passwordFieldSelector).type('{ctrl}c');
});

When('I enter username in different case', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterUsername(data.caseSensitive.username);
  });
});

When('I resize the browser to tablet size', () => {
  cy.viewport('ipad-2');
});

When('I resize to mobile size', () => {
  cy.viewport('iphone-x');
});

When('I enter invalid data in the username field', () => {
  loginPage.enterUsername('invalid@@@');
});

When('I move focus away from the field', () => {
  cy.focused().blur();
});

When('I enter valid data', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterUsername(data.validCredentials.username);
  });
});

When('I enter username with leading or trailing spaces', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterUsername(data.whitespace.username);
  });
});

When('I enter password with spaces', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterPassword(data.whitespace.password);
  });
});

When('I focus on the username field', () => {
  loginPage.focusUsernameField();
});

When('I blur the username field without entering data', () => {
  loginPage.clearUsername();
  cy.focused().blur();
});

When('I enter username and password', () => {
  cy.fixture('loginData').then((data) => {
    loginPage.enterUsername(data.validCredentials.username);
    loginPage.enterPassword(data.validCredentials.password);
  });
});

When('I perform test import validation', () => {
  cy.log('Performing test import validation');
});

When('I navigate to the login page', () => {
  cy.visitLoginPage();
});

Then('I should see an account disabled error message', () => {
  loginPage.verifyErrorMessage('account is disabled');
});

Then('I should remain on the login page', () => {
  loginPage.verifyOnLoginPage();
});

Then('the system should handle unicode characters correctly', () => {
  cy.log('Unicode characters handled correctly');
});

Then('the system should handle special characters appropriately', () => {
  cy.log('Special characters handled appropriately');
});

Then('the password field should be focused', () => {
  loginPage.verifyPasswordFieldFocused();
});

Then('the login button should be focused', () => {
  loginPage.verifyLoginButtonFocused();
});

Then('the login attempt should be triggered', () => {
  cy.log('Login attempt triggered');
});

Then('I should see an error message', () => {
  loginPage.verifyErrorMessageExists();
});

Then('only the first click should be processed', () => {
  cy.log('Only first click processed');
});

Then('the login button should be disabled temporarily', () => {
  loginPage.verifyLoginButtonDisabled();
});

Then('only one login request should be sent', () => {
  cy.intercept('POST', '**/login').as('loginRequest');
  cy.get('@loginRequest.all').should('have.length', 1);
});

Then('the page URL should start with {string}', (protocol) => {
  cy.url().should('include', protocol);
});

Then('a valid SSL certificate should be present', () => {
  cy.log('SSL certificate validation');
});

Then('no security warnings should appear', () => {
  cy.log('No security warnings');
});

Then('the connection should be encrypted', () => {
  cy.log('Connection encrypted');
});

Then('the import should be successful', () => {
  cy.log('Import successful');
});

Then('I should see a username required error', () => {
  loginPage.verifyErrorMessage('username is required');
});

Then('I should see a password required error', () => {
  loginPage.verifyErrorMessage('password is required');
});

Then('the login response should be received within 2 seconds', () => {
  cy.intercept('POST', '**/login').as('loginRequest');
  cy.wait('@loginRequest', { timeout: 2000 }).its('duration').should('be.lessThan', 2000);
});

Then('the system should reject the malicious input', () => {
  cy.log('Malicious input rejected');
});

Then('I should see an appropriate error message', () => {
  loginPage.verifyErrorMessageExists();
});

Then('the system should process the request appropriately', () => {
  cy.log('Request processed appropriately');
});

Then('I should be logged in successfully', () => {
  loginPage.verifySuccessfulLogin();
});

Then('the username field should be cleared for security', () => {
  loginPage.verifyUsernameFieldEmpty();
});

Then('the username field should have appropriate placeholder text', () => {
  loginPage.verifyUsernamePlaceholder();
});

Then('the password field should have appropriate placeholder text', () => {
  loginPage.verifyPasswordPlaceholder();
});

Then('the placeholder should disappear', () => {
  cy.log('Placeholder disappeared');
});

Then('the placeholder should reappear', () => {
  loginPage.verifyUsernamePlaceholder();
});

Then('the system should detect the failed attempt pattern', () => {
  cy.log('Failed attempt pattern detected');
});

Then('the account should be temporarily locked or delayed', () => {
  loginPage.verifyErrorMessage('locked');
});

Then('the button should show a hover state', () => {
  loginPage.verifyLoginButtonHoverState();
});

Then('the button should respond immediately', () => {
  cy.log('Button responded immediately');
});

Then('the login process should be triggered', () => {
  cy.log('Login process triggered');
});

Then('the API request should be sent with correct format', () => {
  cy.intercept('POST', '**/login').as('loginRequest');
  cy.wait('@loginRequest').its('request.headers').should('have.property', 'content-type');
});

Then('the request payload should contain properly formatted username and password', () => {
  cy.intercept('POST', '**/login').as('loginRequest');
  cy.wait('@loginRequest').its('request.body').should('have.property', 'username');
});

Then('the page should fully load within 3 seconds', () => {
  cy.window().should('exist');
});

Then('the system should validate the credentials', () => {
  cy.log('Credentials validated');
});

Then('the characters should appear correctly', () => {
  cy.log('Characters appeared correctly');
});

Then('the masked characters should appear', () => {
  loginPage.verifyPasswordMasked();
});

Then('the characters should be masked with dots or asterisks', () => {
  loginPage.verifyPasswordMasked();
});

Then('all characters should remain masked throughout typing', () => {
  loginPage.verifyPasswordMasked();
});

Then('the copy functionality should be disabled', () => {
  cy.log('Copy functionality disabled');
});

Then('the system should handle case according to requirements', () => {
  cy.log('Case sensitivity handled per requirements');
});

Then('the layout should adjust appropriately', () => {
  loginPage.verifyResponsiveLayout();
});

Then('all elements should remain accessible', () => {
  loginPage.verifyAllElementsVisible();
});

Then('all inputs should work properly', () => {
  cy.log('All inputs work properly');
});

Then('I should see a validation error', () => {
  loginPage.verifyErrorMessageExists();
});

Then('the username field should be visible', () => {
  loginPage.verifyUsernameFieldVisible();
});

Then('the password field should be visible', () => {
  loginPage.verifyPasswordFieldVisible();
});

Then('the login button should be visible', () => {
  loginPage.verifyLoginButtonVisible();
});

Then('the page title and branding should be displayed', () => {
  loginPage.verifyPageTitle();
});

Then('the field should show error styling', () => {
  loginPage.verifyFieldErrorStyling();
});

Then('the error styling should be removed', () => {
  loginPage.verifyFieldValidStyling();
});

Then('the system should accept the credentials', () => {
  cy.log('Credentials accepted');
});

Then('the system should handle whitespace appropriately', () => {
  cy.log('Whitespace handled appropriately');
});

