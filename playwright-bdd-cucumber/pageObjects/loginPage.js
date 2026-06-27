// pageObjects/loginPage.js
// ─────────────────────────────────────────────────────────────────────────────
// Feature: Login
// Generated: Qentrix ScriptGenerationAgent
// Selector Priority: id > role/accessibility > dynamic XPath > stable attributes > stable CSS > text
// ─────────────────────────────────────────────────────────────────────────────

// ── Page header / title ───────────────────────────────────────────────────────
export const pageHeading        = 'h1';
export const loginFormTitle     = 'h2:has-text("Login")';

// ── Form inputs ───────────────────────────────────────────────────────────────
export const emailInput         = 'input[name="email"]'; // TODO: verify selector against live app
export const usernameInput      = 'input[name="username"]'; // TODO: verify selector against live app
export const passwordInput      = 'input[type="password"]';

// ── Buttons ───────────────────────────────────────────────────────────────────
export const loginBtn           = 'button[type="submit"]';
export const registerLink       = 'a:has-text("Register")';

// ── Validation / error messages ───────────────────────────────────────────────
export const errorMessage       = '[role="alert"]'; // TODO: verify selector against live app
export const invalidCredentialsMsg = 'text="Invalid credentials"'; // TODO: verify selector against live app
export const requiredFieldError = 'span:has-text("Required")';
export const missingUsernameMsg = 'text="missing username"'; // TODO: verify selector against live app
export const missingPasswordMsg = 'text="missing password"'; // TODO: verify selector against live app

// ── Success indicators ────────────────────────────────────────────────────────
export const authToken          = '[data-testid="auth-token"]'; // TODO: verify selector against live app
export const dashboardUrl       = '/dashboard'; // TODO: verify selector against live app

