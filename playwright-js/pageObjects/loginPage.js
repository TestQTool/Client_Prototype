// Login Page Object - Locators Only
// Generated for AG-Helix project

// Login Form Elements
export const emailInput = 'input[type="email"], input[name="email"], input[placeholder*="Email" i], #email';
export const usernameInput = 'input[name="username"], input[placeholder*="Username" i], #username';
export const passwordInput = 'input[type="password"], input[name="password"], input[placeholder*="Password" i], #password';
export const loginButton = 'button[type="submit"], button:has-text("Login"), button:has-text("Sign In"), #login-button';
export const registerLink = 'a:has-text("Register"), a[href*="register"]';

// Error Messages
export const errorMessage = '.error-message, .alert-danger, [role="alert"], .validation-error';
export const usernameRequiredError = '.error-message:has-text("username"), .error-message:has-text("required")';
export const passwordRequiredError = '.error-message:has-text("password"), .error-message:has-text("required")';
export const invalidCredentialsError = '.error-message:has-text("Invalid"), .error-message:has-text("incorrect")';
export const accountLockedError = '.error-message:has-text("locked"), .error-message:has-text("blocked")';
export const accountDeactivatedError = '.error-message:has-text("deactivated"), .error-message:has-text("disabled")';
export const passwordLengthError = '.error-message:has-text("length"), .error-message:has-text("characters")';

// Post-Login Elements
export const dashboardHeader = 'h1, .dashboard-title, [data-testid="dashboard"]';
export const userProfileMenu = '.user-profile, .user-menu, [data-testid="user-profile"]';
export const logoutButton = 'button:has-text("Logout"), a:has-text("Logout")';

// Session and Security
export const sessionExpiredMessage = '.session-expired, .timeout-message';
export const captchaElement = '.captcha, [data-testid="captcha"], iframe[src*="captcha"]';

// TODO: verify all selectors against live app at http://192.168.10.124:4001