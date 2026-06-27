// pageObjects/loginPage.js
// ─────────────────────────────────────────────────────────────────────────────
// Login Page Locators
// RULES: Named exports ONLY | Zero logic | Zero imports | Zero methods
// ─────────────────────────────────────────────────────────────────────────────

// ── Login form inputs ─────────────────────────────────────────────────────────
export const emailInput         = 'input[name="email"], input[type="email"], input[placeholder*="Email"], input[id*="email"]';
export const usernameInput      = 'input[name="username"], input[placeholder*="Username"], input[id*="username"]';
export const passwordInput      = 'input[name="password"], input[type="password"], input[placeholder*="Password"], input[id*="password"]';

// ── Buttons ───────────────────────────────────────────────────────────────────
export const loginButton        = 'button[type="submit"], button:has-text("Login"), button:has-text("Sign In")';
export const registerLink       = 'a:has-text("Register"), a:has-text("Sign Up")';

// ── Page elements ─────────────────────────────────────────────────────────────
export const pageHeading        = 'h1, h2';
export const loginForm          = 'form';

// ── Validation / error messages ───────────────────────────────────────────────
export const errorMessage       = '[role="alert"], .error-message, .alert-danger, .invalid-feedback';
export const successMessage     = '.success-message, .alert-success';
export const requiredError      = 'span:has-text("Required"), .field-error';

// ── Post-login verification ───────────────────────────────────────────────────
export const dashboardIndicator = '[data-testid="dashboard"], h1:has-text("Dashboard"), .dashboard-header';

