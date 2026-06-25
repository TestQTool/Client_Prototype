// Login Page Object - Locators Only
// Generated for AG-Helix project

// Login Form Elements
export const usernameInput = '#username'; // TODO: verify selector against live app
export const emailInput = '#email'; // TODO: verify selector against live app
export const passwordInput = '#password'; // TODO: verify selector against live app
export const loginButton = 'button[type="submit"]'; // TODO: verify selector against live app
export const registerLink = 'a[href*="register"]'; // TODO: verify selector against live app

// Error Messages
export const errorMessage = '.error-message'; // TODO: verify selector against live app
export const validationError = '[role="alert"]'; // TODO: verify selector against live app
export const invalidCredentialsError = '//*[contains(text(), "invalid credentials")]'; // TODO: verify selector against live app
export const missingUsernameError = '//*[contains(text(), "missing username") or contains(text(), "username is required")]'; // TODO: verify selector against live app
export const missingPasswordError = '//*[contains(text(), "missing password") or contains(text(), "password is required")]'; // TODO: verify selector against live app

// Success Indicators
export const authToken = '[data-testid="auth-token"]'; // TODO: verify selector against live app
export const dashboardHeading = 'h1'; // TODO: verify selector against live app
export const userProfileIcon = '[data-testid="user-profile"]'; // TODO: verify selector against live app