// pageObjects/LoginSecurityPage.js
// Selectors for Login Security — verified against https://opensource-demo.orangehrmlive.com
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Login Form ──────────────────────────────────────────────────────────────
export const usernameInput = 'input[name="username"]';
export const passwordInput = 'input[name="password"]';
export const loginButton = 'button[type="submit"]';

// ── Error Messages ──────────────────────────────────────────────────────────
export const invalidCredentialsAlert = '.oxd-alert-content';
export const requiredFieldError = '.oxd-input-field-error-message';
export const usernameFieldGroup = '.oxd-input-group:has(input[name="username"])';
export const passwordFieldGroup = '.oxd-input-group:has(input[name="password"])';

// ── Dashboard ───────────────────────────────────────────────────────────────
export const dashboardHeader = '.oxd-topbar-header-breadcrumb';
export const userDropdown = '.oxd-userdropdown';
