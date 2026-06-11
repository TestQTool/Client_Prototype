// pageObjects/loginPage.js
// Selectors for Login — verified against https://www.example.com
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Form Fields ──────────────────────────────────────────────────────────────
export const usernameInput = 'input[name="username"]';
export const passwordInput = 'input[name="password"]';

// ── Buttons ──────────────────────────────────────────────────────────────────
export const loginButton = 'button[type="submit"]';

// ── Validation Messages ──────────────────────────────────────────────────────
export const errorAlert = '.oxd-alert-content-text';
export const requiredFieldError = 'span:has-text("Required")';
export const usernamePlaceholder = 'input[name="username"][placeholder]';
export const passwordPlaceholder = 'input[name="password"][placeholder]';

// ── Post-Login Elements ──────────────────────────────────────────────────────
export const sidePanel = 'nav[aria-label="Sidepanel"]';
export const userDropdown = '.oxd-userdropdown-tab';
export const logoutMenuItem = 'li[role="menuitem"]:has-text("Logout")';

// ── Page Elements ────────────────────────────────────────────────────────────
export const pageTitle = '.oxd-text--h5';
export const loginFormContainer = '.oxd-sheet';

// ── Security Elements ────────────────────────────────────────────────────────
// TODO: verify selector against live app for rate limiting message
export const rateLimitMessage = '.oxd-alert-content-text:has-text("too many")';
export const accountLockedMessage = '.oxd-alert-content-text:has-text("locked")';
export const accountDisabledMessage = '.oxd-alert-content-text:has-text("disabled")';
