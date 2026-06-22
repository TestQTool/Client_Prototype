// Authentication Page Object
// Contains locators for authentication-related elements

export const AuthenticationPageLocators = {
  // Login elements
  loginPage: "[data-testid='login-page']",
  usernameInput: "#username",
  passwordInput: "#password",
  loginButton: "button[type='submit']",
  loginErrorMessage: "[data-testid='error-message']",
  
  // Registration elements
  registrationPage: "[data-testid='registration-page']",
  registrationUsernameInput: "#reg-username",
  registrationEmailInput: "#reg-email",
  registrationPasswordInput: "#reg-password",
  registrationConfirmPasswordInput: "#confirm-password",
  registerButton: "button[type='submit']",
  registrationErrorMessage: "[data-testid='registration-error']",
  registrationSuccessMessage: "[data-testid='registration-success']",
  
  // Dashboard elements
  dashboard: "[data-testid='dashboard']",
  dashboardTitle: "h1[data-testid='dashboard-title']",
  userMenu: "[data-testid='user-menu']",
  logoutOption: "[data-testid='logout-option']",
  
  // Profile elements
  profilePage: "[data-testid='profile-page']",
  profileFirstNameInput: "#first-name",
  profileEmailInput: "#profile-email",
  profileSaveButton: "button[data-testid='save-profile']",
  profileSuccessMessage: "[data-testid='profile-success']",
  profileEmailErrorMessage: "[data-testid='email-error']",
  
  // Password reset elements
  forgotPasswordPage: "[data-testid='forgot-password-page']",
  forgotPasswordEmailInput: "#forgot-password-email",
  sendResetLinkButton: "button[data-testid='send-reset-link']",
  resetPasswordErrorMessage: "[data-testid='reset-error']",
  resetPasswordSuccessMessage: "[data-testid='reset-success']",
  
  // Password change elements
  changePasswordOption: "[data-testid='change-password']",
  currentPasswordInput: "#current-password",
  newPasswordInput: "#new-password",
  confirmNewPasswordInput: "#confirm-new-password",
  savePasswordButton: "button[data-testid='save-password']",
  passwordChangeErrorMessage: "[data-testid='password-change-error']",
  passwordChangeSuccessMessage: "[data-testid='password-change-success']",
  
  // Account information elements
  accountInfoPage: "[data-testid='account-info']",
  accountUsername: "[data-testid='account-username']",
  accountEmail: "[data-testid='account-email']",
  accountCreationDate: "[data-testid='account-creation-date']",
  accountActivitySection: "[data-testid='account-activity']",
  loginHistoryList: "[data-testid='login-history']",
  activityTimestamps: "[data-testid='activity-timestamp']"
};