// Login Page Object - Selectors Only
// Generated for AG-Helix project

// Login Form Section
export const usernameInput = 'input[name="username"]'; // TODO: verify selector against live app
export const passwordInput = 'input[name="password"]'; // TODO: verify selector against live app
export const loginButton = 'button[type="submit"]'; // TODO: verify selector against live app

// Validation Messages
export const validationError = '.error-message'; // TODO: verify selector against live app
export const usernameRequiredError = '//*[contains(text(), "username") and contains(text(), "required")]'; // TODO: verify selector against live app
export const passwordRequiredError = '//*[contains(text(), "password") and contains(text(), "required")]'; // TODO: verify selector against live app
export const invalidCredentialsError = '//*[contains(text(), "invalid") or contains(text(), "Invalid")]'; // TODO: verify selector against live app

// Post-Login Elements
export const configurationsPageIndicator = '//h1[contains(text(), "Configurations")] | //*[contains(@class, "configurations")]'; // TODO: verify selector against live app
export const logoutButton = 'button:has-text("Logout")'; // TODO: verify selector against live app

// Security Elements
export const authTokenCookie = 'authToken'; // TODO: verify selector against live app
export const sessionStorage = 'sessionToken'; // TODO: verify selector against live app

