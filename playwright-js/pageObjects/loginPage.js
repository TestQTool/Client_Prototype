// pageObjects/loginPage.js
// Selectors for Login — verified against application URL
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Login Form ──────────────────────────────────────────────────────────
export const usernameInput = 'input[name="username"]';
export const passwordInput = 'input[name="password"]';
export const loginButton = 'button[type="submit"]';
export const loginForm = 'form[action*="login"]';

// ── Validation Messages ─────────────────────────────────────────────────
export const emailRequiredError = '.oxd-input-field-error-message:has-text("Required")';
export const passwordRequiredError = '.oxd-input-field-error-message:has-text("Required")';
export const invalidCredentialsError = '.oxd-alert-content:has-text("Invalid credentials")';
export const accountLockedError = '.oxd-alert-content:has-text("Account locked")';

// ── Dashboard Elements ──────────────────────────────────────────────────
export const dashboardHeader = '.oxd-topbar-header';
export const userDropdown = '.oxd-userdropdown';
export const userAccountName = '.oxd-userdropdown-name';

// ── UNVERIFIED — update after exploration ───────────────────────────────
// TODO: verify selector against live app
export const personalizedContent = '[data-testid="user-content"]';
