import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPageObjects from '../../pageObjects/LoginPageObjects';

const loginPage = new LoginPageObjects();

// TestCase ID: 5 - Test Login Form with Valid Data
// Priority: 2-Medium
// Type: Functional

Given('I navigate to the login page', () => {
  cy.visit('/');
});

Then('the login page should display email field', () => {
  loginPage.getEmailField().should('be.visible');
});

Then('the login page should display password field', () => {
  loginPage.getPasswordField().should('be.visible');
});

Then('the login page should display login button', () => {
  loginPage.getLoginButton().should('be.visible');
});

Then('the login page should display register hyperlink', () => {
  loginPage.getRegisterLink().should('be.visible');
});

