// pageObjects/forgotPasswordPage.js
// Selectors for Forgot Password — verified against https://www.example.com
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Navigation ──────────────────────────────────────────────────────────────
export const forgotPasswordLink = '.orangehrm-login-forgot a';
export const backToLoginLink = '.orangehrm-login-forgot a';

// ── Form Elements ───────────────────────────────────────────────────────────
export const usernameInput = 'input[name="username"]';
export const resetPasswordButton = 'button[type="submit"]';
export const cancelButton = 'button.oxd-button--ghost';

// ── Messages & Alerts ───────────────────────────────────────────────────────
export const successMessage = '.oxd-text--toast-message';
export const errorAlert = '.oxd-alert-content-text';
export const validationError = 'span.oxd-input-field-error-message';
export const requiredFieldError = 'span:has-text("Required")';

// ── Page Elements ───────────────────────────────────────────────────────────
export const pageTitle = 'h6.orangehrm-forgot-password-title';
export const resetInstructions = '.orangehrm-forgot-password-wrapper p';

// ── API Endpoints ───────────────────────────────────────────────────────────
// Note: API endpoints will be constructed in page methods using base URL