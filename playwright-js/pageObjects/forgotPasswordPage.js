// pageObjects/forgotPasswordPage.js
// Selectors for Forgot Password — verified against https://www.example.com
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Navigation ──────────────────────────────────────────────────────────
export const forgotPasswordLink = '.orangehrm-login-forgot > .oxd-text';
export const backToLoginLink = '.orangehrm-login-forgot-header .oxd-button';

// ── Form Fields ─────────────────────────────────────────────────────────
export const usernameInput = 'input[name="username"]';
export const resetPasswordBtn = 'button[type="submit"]';

// ── Messages & Validation ───────────────────────────────────────────────
export const successMessage = '.orangehrm-forgot-password-container .oxd-text--h6';
export const errorMessage = '.oxd-alert-content-text';
export const validationError = '.oxd-input-group .oxd-text--span';
export const pageTitle = '.orangehrm-forgot-password-title';

// ── General Page Elements ───────────────────────────────────────────────
export const forgotPasswordContainer = '.orangehrm-forgot-password-container';
export const loginContainer = '.orangehrm-login-container';