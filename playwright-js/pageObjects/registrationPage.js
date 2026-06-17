// Registration Page Object - Locators Only
// TODO: verify selectors against live app

export const registrationPageLocators = {
  // Form Fields
  emailInput: '#email',
  passwordInput: '#password',
  confirmPasswordInput: '#confirmPassword',
  submitButton: 'button[type="submit"]',
  
  // Alternative selectors if above are not stable
  emailInputAlt: 'input[name="email"]',
  passwordInputAlt: 'input[name="password"]',
  confirmPasswordInputAlt: 'input[name="confirmPassword"]',
  submitButtonAlt: '//button[contains(., "Register")]',
  
  // Validation Messages
  emailRequiredError: '//input[@id="email"]/following-sibling::span[contains(@class, "error")]',
  passwordRequiredError: '//input[@id="password"]/following-sibling::span[contains(@class, "error")]',
  emailFormatError: '//*[contains(text(), "valid email") or contains(text(), "email format")]',
  passwordMismatchError: '//*[contains(text(), "match") or contains(text(), "Password")]',
  duplicateEmailError: '//*[contains(text(), "already exists") or contains(text(), "already registered")]',
  
  // Success Messages
  successMessage: '[role="alert"]',
  successMessageAlt: '//*[contains(@class, "success") or contains(text(), "successfully")]',
  
  // Form Container
  registrationForm: 'form[id*="registration"]',
  registrationFormAlt: '//form[contains(@class, "registration")]',
  
  // Page Title/Heading
  pageHeading: 'h1, h2',
  pageHeadingAlt: '//*[contains(text(), "Register") or contains(text(), "Sign Up")]'
};

