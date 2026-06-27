// pageObjects/loginPage.js
// ─────────────────────────────────────────────────────────────────────────────
// Login page locators
// RULES: Named exports ONLY | Zero logic | Zero imports | Zero methods
// ─────────────────────────────────────────────────────────────────────────────

// ── Login form inputs ─────────────────────────────────────────────────────────
export const usernameInput      = 'input[name="username"]'; // TODO: verify selector against live app
export const emailInput         = 'input[type="email"]';
export const passwordInput      = 'input[type="password"]';

// ── Buttons ───────────────────────────────────────────────────────────────────
export const loginButton        = 'button[type="submit"]';
export const registerLink       = 'a:has-text("Register")';

// ── Validation / error messages ───────────────────────────────────────────────
export const errorMessage       = '[role="alert"]';
export const invalidCredsMsg    = 'text=Invalid credentials';
export const missingUsernameMsg = 'text=missing username';
export const missingPasswordMsg = 'text=missing password';
export const requiredFieldMsg   = 'text=Required';

// ── Page elements ─────────────────────────────────────────────────────────────
export const loginPageHeading   = 'h1:has-text("Login")';
export const emailLabel         = 'label:has-text("Email")';
export const passwordLabel      = 'label:has-text("Password")';

// ── Post-login verification ───────────────────────────────────────────────────
export const dashboardIndicator = '[data-testid="dashboard"]'; // TODO: verify selector against live app
export const authToken          = 'meta[name="auth-token"]'; // TODO: verify selector against live app

