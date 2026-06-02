// pageObjects/loginPage.js
// Selectors for Login — verified against https://opensource-demo.orangehrmlive.com
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Login Form ──────────────────────────────────────────────────────────
export const usernameInput = 'input[name="username"]';
export const passwordInput = 'input[name="password"]';
export const loginButton = 'button[type="submit"]';

// ── Error Messages ──────────────────────────────────────────────────────
export const invalidCredentialsAlert = '.oxd-alert-content';
export const requiredFieldError = '.oxd-input-field-error-message';
export const usernameFieldContainer = '.oxd-input-group:has(input[name="username"])';
export const passwordFieldContainer = '.oxd-input-group:has(input[name="password"])';

// ── Page Elements ───────────────────────────────────────────────────────
export const loginForm = '.orangehrm-login-form';
export const loginTitle = '.orangehrm-login-title';
export const brandingLogo = '.orangehrm-login-branding img';

// ── Dashboard (post-login) ─────────────────────────────────────────────
export const dashboardHeader = '.oxd-topbar-header';
export const userDropdown = '.oxd-userdropdown';
