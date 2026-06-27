import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pages/LoginPage';

const loginPage = new LoginPage();

let requestPayload = {};
let apiResponse = null;

// Background
Given('I am on the login page', () => {
  loginPage.navigate();
});

// API Request Steps
When('I send a POST request to {string} endpoint', (endpoint) => {
  requestPayload = {};
  requestPayload.endpoint = endpoint;
});

When('I include valid username in request body', () => {
  requestPayload.username = Cypress.env('VALID_USERNAME') || 'admin';
});

When('I include invalid username in request body', () => {
  requestPayload.username = 'invalidUser123';
});

When('I include valid password in request body', () => {
  requestPayload.password = Cypress.env('VALID_PASSWORD') || 'admin123';
});

When('I include invalid password in request body', () => {
  requestPayload.password = 'wrongPassword123';
});

When('I include empty username field in request body', () => {
  requestPayload.username = '';
});

When('I include empty password field in request body', () => {
  requestPayload.password = '';
});

When('I submit the authentication request', () => {
  const baseUrl = Cypress.env('BASE_URL') || Cypress.config('baseUrl') || 'http://192.168.10.124:4001';
  cy.request({
    method: 'POST',
    url: `${baseUrl}${requestPayload.endpoint}`,
    body: {
      username: requestPayload.username,
      password: requestPayload.password
    },
    failOnStatusCode: false
  }).then((response) => {
    apiResponse = response;
  });
});

// API Response Assertions
Then('the response should return {int} status code', (statusCode) => {
  expect(apiResponse.status).to.equal(statusCode);
});

Then('the response should contain authentication token', () => {
  expect(apiResponse.body).to.have.property('token');
  expect(apiResponse.body.token).to.be.a('string');
  expect(apiResponse.body.token).to.not.be.empty;
});

Then('the response should indicate invalid credentials', () => {
  expect(apiResponse.body).to.have.property('error');
  expect(apiResponse.body.error).to.match(/invalid credentials|authentication failed/i);
});

Then('the error message should indicate missing username', () => {
  expect(apiResponse.body).to.have.property('error');
  expect(apiResponse.body.error).to.match(/username.*required|missing username/i);
});

Then('the error message should indicate missing password', () => {
  expect(apiResponse.body).to.have.property('error');
  expect(apiResponse.body.error).to.match(/password.*required|missing password/i);
});

// UI Steps
Given('the system displays a Login Page with Email, Password fields, Login button and Register Hyperlink', () => {
  loginPage.verifyLoginPageElements();
});

When('I enter valid username', () => {
  const username = Cypress.env('VALID_USERNAME') || 'admin';
  loginPage.enterUsername(username);
});

When('I enter valid password', () => {
  const password = Cypress.env('VALID_PASSWORD') || 'admin123';
  loginPage.enterPassword(password);
});

When('I enter username and password', () => {
  const username = Cypress.env('VALID_USERNAME') || 'admin';
  const password = Cypress.env('VALID_PASSWORD') || 'admin123';
  loginPage.enterUsername(username);
  loginPage.enterPassword(password);
});

When('I click the login button', () => {
  loginPage.clickLoginButton();
});

Then('I should be logged in successfully', () => {
  cy.url().should('not.include', '/login');
  cy.url().should('match', /dashboard|home/i);
});

Then('the system should accept the username and password', () => {
  cy.get(loginPage.selectors.usernameInput).should('have.value');
  cy.get(loginPage.selectors.passwordInput).should('have.value');
});

