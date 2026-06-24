// Authentication Page Objects
// Locators for login, registration, password reset, and user profile

// Login Section
export const loginPageUrl = '/login';
export const usernameInput = '#username'; // TODO: verify selector against live app
export const passwordInput = '#password'; // TODO: verify selector against live app
export const loginButton = 'button[type="submit"]'; // TODO: verify selector against live app
export const loginErrorMessage = '.error-message'; // TODO: verify selector against live app
export const dashboardHeader = 'h1:has-text("Dashboard")'; // TODO: verify selector against live app

// Registration Section
export const registrationPageUrl = '/register';
export const registrationUsernameInput = '#registration-username'; // TODO: verify selector against live app
export const registrationEmailInput = '#registration-email'; // TODO: verify selector against live app
export const registrationPasswordInput = '#registration-password'; // TODO: verify selector against live app
export const registerButton = 'button:has-text("Register")'; // TODO: verify selector against live app
export const registrationSuccessMessage = '.success-message'; // TODO: verify selector against live app
export const registrationErrorMessage = '.error-message'; // TODO: verify selector against live app
export const passwordMinLengthError = '.error-message:has-text("password too short")'; // TODO: verify selector against live app

// Forgot Password Section
export const forgotPasswordPageUrl = '/forgot-password';
export const forgotPasswordEmailInput = '#forgot-password-email'; // TODO: verify selector against live app
export const sendResetLinkButton = 'button:has-text("Send Reset Link")'; // TODO: verify selector against live app
export const resetLinkSuccessMessage = '.success-message'; // TODO: verify selector against live app
export const resetLinkErrorMessage = '.error-message'; // TODO: verify selector against live app

// Profile Section
export const profilePageUrl = '/profile';
export const firstNameInput = '#first-name'; // TODO: verify selector against live app
export const profileEmailInput = '#profile-email'; // TODO: verify selector against live app
export const saveChangesButton = 'button:has-text("Save Changes")'; // TODO: verify selector against live app
export const profileSuccessMessage = '.success-message'; // TODO: verify selector against live app
export const profileEmailValidationError = '.error-message:has-text("invalid email")'; // TODO: verify selector against live app

// Password Change Section
export const changePasswordOption = 'a:has-text("Change Password")'; // TODO: verify selector against live app
export const currentPasswordInput = '#current-password'; // TODO: verify selector against live app
export const newPasswordInput = '#new-password'; // TODO: verify selector against live app
export const confirmPasswordInput = '#confirm-password'; // TODO: verify selector against live app
export const savePasswordButton = 'button:has-text("Save Password")'; // TODO: verify selector against live app
export const passwordChangeSuccessMessage = '.success-message'; // TODO: verify selector against live app
export const passwordChangeErrorMessage = '.error-message'; // TODO: verify selector against live app

// Account Information Section
export const accountInfoPageUrl = '/account';
export const displayedUsername = '.account-username'; // TODO: verify selector against live app
export const displayedEmail = '.account-email'; // TODO: verify selector against live app
export const accountCreationDate = '.account-creation-date'; // TODO: verify selector against live app

// Account Activity Section
export const accountActivityPageUrl = '/account/activity';
export const activityHistoryTable = '.activity-history'; // TODO: verify selector against live app
export const activityTimestamps = '.activity-timestamp'; // TODO: verify selector against live app

// User Menu and Logout
export const userMenu = '.user-menu'; // TODO: verify selector against live app
export const logoutOption = 'a:has-text("Logout")'; // TODO: verify selector against live app
export const logoutConfirmButton = 'button:has-text("Confirm")'; // TODO: verify selector against live app

