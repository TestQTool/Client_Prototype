// Login Page Locators

export const LOGIN_PAGE = {
  // Input fields
  emailInput: '#email',
  usernameInput: '#username',
  passwordInput: '#password',
  
  // Buttons
  loginButton: 'button[type="submit"]',
  registerLink: 'a[href*="register"]',
  
  // Error messages
  errorMessage: '.error-message',
  validationError: '.validation-error',
  usernameRequiredError: '.username-error',
  passwordRequiredError: '.password-error',
  invalidCredentialsError: '.invalid-credentials',
  accountLockedMessage: '.account-locked',
  accountDeactivatedMessage: '.account-deactivated',
  passwordLengthError: '.password-length-error',
  
  // Page elements
  loginForm: 'form#login-form',
  pageTitle: 'h1',
  loginPageContainer: '.login-container',
  
  // Security elements
  captcha: '#captcha',
  sessionExpiredMessage: '.session-expired'
};