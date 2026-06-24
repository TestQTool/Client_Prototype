// Registration Page Object
// This file contains locators only. No logic or imports.

export const REGISTRATION_PAGE = {
  // URL
  url: 'http://localhost:3000/configurations',

  // Input fields
  emailInput: '#email', // TODO: verify selector against live app
  usernameInput: '#username', // TODO: verify selector against live app
  passwordInput: '#password', // TODO: verify selector against live app

  // Buttons
  registerButton: 'button[type="submit"]', // TODO: verify selector against live app
  loginButton: '#login-button', // TODO: verify selector against live app

  // Validation messages
  validationErrorMessage: '.error-message', // TODO: verify selector against live app
  emailRequiredError: '//*[contains(text(), "email is required")]', // TODO: verify selector against live app
  passwordRequiredError: '//*[contains(text(), "password is required")]', // TODO: verify selector against live app
  invalidEmailFormatError: '//*[contains(text(), "invalid email format")]', // TODO: verify selector against live app
  passwordLengthError: '//*[contains(text(), "password length")]', // TODO: verify selector against live app
  emailAlreadyExistsError: '//*[contains(text(), "email already registered") or contains(text(), "already exists")]', // TODO: verify selector against live app

  // Success messages
  successMessage: '.success-message', // TODO: verify selector against live app
  confirmationMessage: '//*[contains(text(), "account created") or contains(text(), "registration successful")]', // TODO: verify selector against live app

  // Page elements for verification
  registrationForm: 'form#registration-form', // TODO: verify selector against live app
  pageHeading: 'h1, h2' // TODO: verify selector against live app
};

