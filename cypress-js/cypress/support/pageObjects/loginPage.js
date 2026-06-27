// cypress/support/pageObjects/loginPage.js
// ─────────────────────────────────────────────────────────────────────────────
// Login page locators — Named exports ONLY | Zero logic | Zero imports
// ─────────────────────────────────────────────────────────────────────────────

// ── Login form elements ───────────────────────────────────────────────────────
export const usernameInput = 'input[name="username"]'; // TODO: verify selector against live app
export const emailInput = 'input[type="email"]'; // TODO: verify selector against live app
export const passwordInput = 'input[type="password"]';
export const loginButton = 'button[type="submit"]';
export const registerLink = 'a:contains("Register")';

// ── Page elements ─────────────────────────────────────────────────────────────
export const pageHeading = 'h1';
export const loginFormContainer = 'form';

// ── Validation messages ───────────────────────────────────────────────────────
export const errorMessage = '[role="alert"]';
export const successMessage = '.success-message';
export const invalidCredentialsError = '*:contains("Invalid credentials")';
export const missingUsernameError = '*:contains("missing username")';
export const missingPasswordError = '*:contains("missing password")';

// ── Post-login elements ───────────────────────────────────────────────────────
export const dashboardIndicator = '*:contains("Dashboard")';
export const authTokenElement = '[data-token]'; // TODO: verify selector against live app

