// pageObjects/loginPage.ts
// ─────────────────────────────────────────────────────────────────────────────
// Login Page Object — Locator constants only
// Generated from test inventory cases: TC-562, TC-22, TC-24, TC-25, TC-21, TC-23, TC-561, TC-563, TC-560, TC-564
// ─────────────────────────────────────────────────────────────────────────────

// ── Page header / title ───────────────────────────────────────────────────────
export const pageHeading = 'h1:has-text("Login")';
export const loginFormContainer = 'form[name="login"], form#login-form, [role="form"]';

// ── Form inputs ───────────────────────────────────────────────────────────────
export const emailInput = 'input[type="email"], input[name="email"], input[placeholder*="Email"], #email';
export const usernameInput = 'input[name="username"], input[placeholder*="Username"], #username';
export const passwordInput = 'input[type="password"], input[name="password"], #password';

// ── Buttons ───────────────────────────────────────────────────────────────────
export const loginButton = 'button[type="submit"], button:has-text("Login"), input[type="submit"][value*="Login"]';
export const registerLink = 'a:has-text("Register"), a[href*="register"]';

// ── Validation / error messages ───────────────────────────────────────────────
export const errorMessage = '[role="alert"], .error-message, .alert-danger, span.error';
export const requiredFieldError = 'span:has-text("Required"), .field-error';
export const invalidCredentialsMessage = '[role="alert"]:has-text("Invalid credentials"), .error:has-text("Invalid credentials")';
export const emptyUsernameError = '[role="alert"]:has-text("username"), .error:has-text("Username is required")';
export const emptyPasswordError = '[role="alert"]:has-text("password"), .error:has-text("Password is required")';

// ── Navigation / Post-login verification ──────────────────────────────────────
export const dashboardHeading = 'h1:has-text("Dashboard"), h2:has-text("Welcome")';
export const logoutButton = 'button:has-text("Logout"), a:has-text("Logout")';

// ── UNVERIFIED — update after exploration ─────────────────────────────────────
// These selectors are inferred from test case steps and may need refinement:
// - Actual form container selector
// - Exact error message selector and text
// - Success redirect URL or element
// TODO: verify selectors against live app at 192.168.10.124:4001
