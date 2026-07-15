/**
 * Login Page Locators
 * Test Case: [2338] Verify that login fails when username field is empty
 */

module.exports = {
  // TODO: Verify selectors against actual application
  usernameInput: 'input[name="username"]',
  passwordInput: 'input[name="password"]',
  loginButton: 'input[type="submit"][value="Log In"]',
  errorMessage: '.error',
  usernameRequiredError: 'text=Please enter a username and password',
  loginPanel: '#loginPanel',
  loginForm: 'form[name="login"]'
};