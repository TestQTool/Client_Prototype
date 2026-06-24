// Login Page Locators

export const loginPageLocators = {
  // Form fields
  usernameInput: 'input[name="username"]',
  passwordInput: 'input[type="password"]',
  loginButton: 'button[type="submit"]',
  
  // Error messages and validation
  errorMessage: '[role="alert"], .error-message, .validation-error',
  usernameRequiredError: '//input[@name="username"]/following-sibling::*[contains(@class, "error") or contains(text(), "required")]',
  passwordRequiredError: '//input[@type="password"]/following-sibling::*[contains(@class, "error") or contains(text(), "required")]',
  invalidCredentialsError: '//*[contains(text(), "invalid") or contains(text(), "Invalid") or contains(text(), "incorrect")]',
  
  // Post-login elements
  configurationsPageHeading: 'h1, h2, [role="heading"]',
  logoutButton: 'button:has-text("Logout"), a:has-text("Logout"), [aria-label="Logout"]',
  
  // Session and security
  sessionIndicator: '[data-testid="user-session"], .user-info, .session-active',
  protectedPageContent: '[data-testid="protected-content"], .dashboard, .configurations-content'
};

export const configurationsPageLocators = {
  pageTitle: 'h1:has-text("Configurations"), [data-testid="page-title"]',
  pageContent: '[data-testid="configurations-content"], .configurations-page, main',
  navigationMenu: 'nav, [role="navigation"]',
  userMenu: '[data-testid="user-menu"], .user-dropdown'
};

