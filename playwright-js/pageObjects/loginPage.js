// Login Page Object - Locators Only
// TODO: verify selectors against live app

// Login Form Elements
export const usernameInput = 'input[name="username"], input[placeholder*="Username"], input[type="text"][id*="user"], #username';
export const passwordInput = 'input[name="password"], input[type="password"], #password';
export const loginButton = 'button[type="submit"], button:has-text("Login"), #login-button, //button[contains(., "Login")]';

// Post-Login Elements
export const dashboardHeading = 'h1:has-text("Dashboard"), [role="heading"]:has-text("Home"), //h1[contains(., "Dashboard")]';
export const homePageIndicator = '[data-testid="home-page"], .dashboard-container, #main-content';

// Error Messages
export const errorMessage = '.error-message, [role="alert"], .alert-danger, //div[contains(@class, "error")]';
export const invalidCredentialsError = '//div[contains(text(), "Invalid credentials")], .error:has-text("Invalid"), [role="alert"]:has-text("Invalid")';
export const usernameRequiredError = '//label[contains(., "Username")]/following::*[contains(@class, "error")][1], .username-error, [data-error="username"]';
export const passwordRequiredError = '//label[contains(., "Password")]/following::*[contains(@class, "error")][1], .password-error, [data-error="password"]';

// Security Elements
export const accountLockedMessage = '.account-locked, [role="alert"]:has-text("locked"), //div[contains(text(), "locked")]';
export const tokenExpiredMessage = '[data-error="token-expired"], .session-expired, //div[contains(text(), "expired")]';

