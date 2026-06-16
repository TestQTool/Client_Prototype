// Login Page Object - Locators Only

// Email Field
export const emailInput = '#email';
export const emailInputByPlaceholder = 'input[placeholder*="Email"]';
export const emailInputByName = 'input[name="email"]';

// Password Field
export const passwordInput = '#password';
export const passwordInputByType = 'input[type="password"]';
export const passwordInputByName = 'input[name="password"]';

// Login Button
export const loginButton = '#login-button';
export const loginButtonByText = 'button:has-text("Login")';
export const loginButtonByType = 'button[type="submit"]';

// Forgot Password Link
export const forgotPasswordLink = 'a:has-text("Forgot Password")';
export const forgotPasswordLinkByHref = 'a[href*="forgot"]';

// Error Messages
export const errorMessage = '.error-message';
export const validationError = '.validation-error';
export const emailError = '#email-error';
export const passwordError = '#password-error';
export const credentialsError = '.credentials-error';

// Dashboard Elements
export const dashboardHeading = 'h1:has-text("Dashboard")';
export const dashboardContainer = '#dashboard';
export const dashboardUrl = '/dashboard';

// Login Form
export const loginForm = 'form#login-form';
export const loginFormByRole = 'form[role="form"]';

