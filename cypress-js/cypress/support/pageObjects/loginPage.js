// cypress/support/pageObjects/loginPage.js
// ─────────────────────────────────────────────────────────────────────────────
// Login Page Object — Locator constants only
// RULES: Named exports ONLY | Zero logic | Zero imports | Zero methods
// ─────────────────────────────────────────────────────────────────────────────

// ── Page identification ───────────────────────────────────────────────────────
export const loginPageHeading = 'h1:contains("Login")';
export const loginFormContainer = 'form';

// ── Form inputs ───────────────────────────────────────────────────────────────
export const emailInput = 'input[name="email"]';
export const usernameInput = 'input[name="username"]';
export const passwordInput = 'input[name="password"]';

// ── Buttons ───────────────────────────────────────────────────────────────────
export const loginButton = 'button[type="submit"]';
export const loginButtonAlt = 'button:contains("Login")';

// ── Links ─────────────────────────────────────────────────────────────────────
export const registerLink = 'a:contains("Register")';
export const forgotPasswordLink = 'a:contains("Forgot")';

// ── Validation / error messages ───────────────────────────────────────────────
export const errorMessage = '[role="alert"]';
export const errorMessageAlt = '.error-message';
export const successMessage = '.success-message';
export const validationError = '.field-error';
export const authErrorMessage = 'div:contains("Invalid credentials")';
export const missingUsernameError = 'span:contains("username")';
export const missingPasswordError = 'span:contains("password")';

// ── Post-login verification ───────────────────────────────────────────────────
export const dashboardIndicator = 'h1:contains("Dashboard")';
export const userProfileIcon = '[data-testid="user-profile"]';

