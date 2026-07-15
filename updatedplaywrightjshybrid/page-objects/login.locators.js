/**
 * Login Page Locators
 * Test Case: [2342] Verify that login fails with invalid password
 */

module.exports = {
  // TODO: Verify these selectors against actual ParaBank application
  usernameInput: 'input[name="username"]',
  passwordInput: 'input[name="password"]',
  loginButton: 'input[type="submit"][value="Log In"]',
  errorMessage: '.error', // TODO: Verify error message container selector
  loginPanel: '#loginPanel',
  pageTitle: '.title'
};