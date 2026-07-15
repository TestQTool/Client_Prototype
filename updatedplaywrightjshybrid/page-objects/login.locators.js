/**
 * Login Page Locators
 * TestCase: [2341] Verify that login fails with invalid username
 */

module.exports = {
  // TODO: Verify selectors against actual application
  usernameInput: 'input[name="username"]',
  passwordInput: 'input[name="password"]',
  loginButton: 'input[type="submit"][value="Log In"]',
  errorMessage: '.error, [class*="error"], [id*="error"]',
  loginPanel: '.login, [class*="login"], #loginPanel'
};