// Registration Page Object - Locators Only
// Generated for OrangeHRM Registration Module

// Form Fields
export const emailInput = '#email';
export const passwordInput = '#password';
export const confirmPasswordInput = '#confirmPassword';
export const submitButton = "button[type='submit']";
export const registerButton = "//button[contains(., 'Register')]";

// Form Labels and Headers
export const registrationFormTitle = "h1:has-text('Register')";
export const emailLabel = "label:has-text('Email')";
export const passwordLabel = "label:has-text('Password')";
export const confirmPasswordLabel = "label:has-text('Confirm Password')";

// Validation Messages
export const emailRequiredError = "//span[contains(., 'Email is required')]";
export const passwordRequiredError = "//span[contains(., 'Password is required')]";
export const emailFormatError = "//span[contains(., 'Invalid email format')]";
export const duplicateEmailError = "//span[contains(., 'Email already exists')]";
export const passwordMismatchError = "//span[contains(., 'Passwords do not match')]";
export const passwordLengthError = "//span[contains(., 'Password must be at least')]";

// Success Messages
export const successMessage = ".success-message";
export const registrationSuccessText = "//div[contains(., 'Registration successful')]";

// API Endpoints - for reference in page methods
export const registrationApiEndpoint = '/api/register';

