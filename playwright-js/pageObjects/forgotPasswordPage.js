// Forgot Password Page Object
// Contains selectors for forgot password functionality

export const forgotPasswordSelectors = {
  // Page Elements
  emailInput: '#email', // TODO: verify selector against live app
  submitButton: 'button[type="submit"]', // TODO: verify selector against live app
  
  // Validation Messages
  validationError: '.error-message', // TODO: verify selector against live app
  successMessage: '.success-message', // TODO: verify selector against live app
  requiredFieldError: '.required-error', // TODO: verify selector against live app
  
  // Page Identifiers
  forgotPasswordHeading: 'h1:has-text("Forgot Password")', // TODO: verify selector against live app
  resetPasswordPage: '#reset-password-page' // TODO: verify selector against live app
};

