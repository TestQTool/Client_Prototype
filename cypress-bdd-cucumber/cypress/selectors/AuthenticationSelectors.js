const AuthenticationSelectors = {
  // ── Registration ────────────────────────────────────────────────────────────
  usernameInput: 'input[name="username"]',
  emailInput: 'input[type="email"]',
  passwordInput: 'input[type="password"]',
  registerButton: 'button[type="submit"]',

  // ── Login ───────────────────────────────────────────────────────────────────
  loginButton: 'button[type="submit"]',
  userMenu: '[data-testid="user-menu"]',
  logoutButton: '[data-testid="logout-button"]',
  confirmLogoutButton: '[data-testid="confirm-logout"]',

  // ── Profile ─────────────────────────────────────────────────────────────────
  profileLink: 'a[href*="/profile"]',
  firstNameInput: 'input[name="firstName"]',
  saveChangesButton: 'button:contains("Save Changes")',

  // ── Settings ────────────────────────────────────────────────────────────────
  settingsLink: 'a[href*="/settings"]',
  changePasswordLink: 'a:contains("Change Password")',
  currentPasswordInput: 'input[name="currentPassword"]',
  newPasswordInput: 'input[name="newPassword"]',
  confirmPasswordInput: 'input[name="confirmPassword"]',
  savePasswordButton: 'button:contains("Save Password")',

  // ── Password Reset ──────────────────────────────────────────────────────────
  sendResetLinkButton: 'button:contains("Send Reset Link")',

  // ── Account Information ─────────────────────────────────────────────────────
  accountInfoLink: 'a[href*="/account"]',
  usernameDisplay: '[data-testid="username-display"]',
  emailDisplay: '[data-testid="email-display"]',
  creationDateDisplay: '[data-testid="creation-date"]',

  // ── Account Activity ────────────────────────────────────────────────────────
  accountActivityLink: 'a[href*="/activity"]',
  activityHeading: 'h1:contains("Account Activity")',
  activityRow: '[data-testid="activity-row"]',
  activityTimestamp: '[data-testid="activity-timestamp"]',

  // ── Messages ────────────────────────────────────────────────────────────────
  errorMessage: '[role="alert"]',
  successMessage: '.success-message',
  validationError: '.field-error',

  // ── Dashboard ───────────────────────────────────────────────────────────────
  dashboardHeading: 'h1:contains("Dashboard")',
  dashboardWidget: '[data-testid="dashboard-widget"]'
};

export default AuthenticationSelectors;

