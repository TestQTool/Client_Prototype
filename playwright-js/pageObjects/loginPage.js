// Login Page Object - Locators Only
// Generated for AG-Helix project

// Login Form Elements
export const emailInput = 'input[type="email"], input[name="email"], input[placeholder*="Email"], #email';
export const passwordInput = 'input[type="password"], input[name="password"], input[placeholder*="Password"], #password';
export const loginButton = 'button[type="submit"], button:has-text("Login"), #login-button, //button[contains(., "Login")]';
export const registerLink = 'a:has-text("Register"), a[href*="register"], //a[contains(., "Register")]';

// Error Messages
export const errorMessage = '.error-message, .alert-danger, [role="alert"], .invalid-feedback, //div[contains(@class, "error")]';
export const usernameErrorMessage = '.username-error, .email-error, //label[contains(., "Email")]/following::*[contains(@class, "error")][1]';
export const passwordErrorMessage = '.password-error, //label[contains(., "Password")]/following::*[contains(@class, "error")][1]';

// Success Indicators
export const dashboardHeading = 'h1, .dashboard-title, [role="heading"]';
export const logoutButton = 'button:has-text("Logout"), a:has-text("Logout"), #logout';

// API Response Elements (for validation)
export const responseStatusCode = 'status';
export const authToken = 'token, access_token, authToken';
export const responseErrorMessage = 'error, message, errorMessage';

