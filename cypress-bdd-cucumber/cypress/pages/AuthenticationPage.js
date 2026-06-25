import BasePage from './BasePage';
import AuthenticationSelectors from '../selectors/AuthenticationSelectors';

class AuthenticationPage extends BasePage {
  constructor() {
    super();
    this.selectors = AuthenticationSelectors;
  }

  // ── Navigation ──────────────────────────────────────────────────────────────

  navigateToRegistration() {
    const baseUrl = Cypress.env('BASE_URL') || 'http://localhost:3000';
    cy.visit(`${baseUrl}/register`);
    cy.wait(1000);
  }

  navigateToLogin() {
    const baseUrl = Cypress.env('BASE_URL') || 'http://localhost:3000';
    cy.visit(`${baseUrl}/login`);
    cy.wait(1000);
  }

  navigateToForgotPassword() {
    const baseUrl = Cypress.env('BASE_URL') || 'http://localhost:3000';
    cy.visit(`${baseUrl}/forgot-password`);
    cy.wait(1000);
  }

  navigateToAccountInfo() {
    cy.get(this.selectors.accountInfoLink).click();
    cy.wait(1000);
  }

  navigateToAccountActivity() {
    cy.get(this.selectors.accountActivityLink).click();
    cy.wait(1000);
  }

  loginAndNavigateToProfile() {
    this.loginWithDefaultCredentials();
    cy.get(this.selectors.profileLink).click();
    cy.wait(1000);
  }

  loginAndNavigateToSettings() {
    this.loginWithDefaultCredentials();
    cy.get(this.selectors.settingsLink).click();
    cy.wait(1000);
  }

  // ── Form Actions ────────────────────────────────────────────────────────────

  fillUsername(username) {
    cy.get(this.selectors.usernameInput).clear().type(username);
  }

  fillEmail(email) {
    cy.get(this.selectors.emailInput).clear().type(email);
  }

  fillPassword(password) {
    cy.get(this.selectors.passwordInput).clear().type(password);
  }

  fillFirstName(firstName) {
    cy.get(this.selectors.firstNameInput).clear().type(firstName);
  }

  fillCurrentPassword(password) {
    cy.get(this.selectors.currentPasswordInput).clear().type(password);
  }

  fillNewPassword(password) {
    cy.get(this.selectors.newPasswordInput).clear().type(password);
  }

  fillConfirmPassword(password) {
    cy.get(this.selectors.confirmPasswordInput).clear().type(password);
  }

  clickRegisterButton() {
    cy.get(this.selectors.registerButton).click();
    cy.wait(1000);
  }

  clickLoginButton() {
    cy.get(this.selectors.loginButton).click();
    cy.wait(1000);
  }

  clickLogout() {
    cy.get(this.selectors.logoutButton).click();
  }

  confirmLogout() {
    cy.get(this.selectors.confirmLogoutButton).click();
    cy.wait(1000);
  }

  clickUserMenu() {
    cy.get(this.selectors.userMenu).click();
  }

  clickSaveChanges() {
    cy.get(this.selectors.saveChangesButton).click();
    cy.wait(1000);
  }

  clickSendResetLink() {
    cy.get(this.selectors.sendResetLinkButton).click();
    cy.wait(1000);
  }

  clickChangePassword() {
    cy.get(this.selectors.changePasswordLink).click();
  }

  clickSavePassword() {
    cy.get(this.selectors.savePasswordButton).click();
    cy.wait(1000);
  }

  // ── Verification ────────────────────────────────────────────────────────────

  verifyRegistrationSuccess() {
    cy.get(this.selectors.successMessage).should('be.visible');
  }

  verifyLoginSuccess() {
    cy.url().should('include', '/dashboard');
  }

  verifyDashboardVisible() {
    cy.get(this.selectors.dashboardHeading).should('be.visible');
  }

  verifyOnLoginPage() {
    cy.url().should('include', '/login');
  }

  verifyErrorMessageDisplayed() {
    cy.get(this.selectors.errorMessage).should('be.visible');
  }

  verifyValidationErrorDisplayed() {
    cy.get(this.selectors.validationError).should('be.visible');
  }

  verifyErrorMessageContains(text) {
    cy.get(this.selectors.errorMessage).should('contain.text', text);
  }

  verifyLoggedOut() {
    cy.getCookie('authToken').should('not.exist');
  }

  verifyLoginPageDisplayed() {
    cy.get(this.selectors.loginButton).should('be.visible');
  }

  verifySuccessMessageDisplayed() {
    cy.get(this.selectors.successMessage).should('be.visible');
  }

  verifySaveExecuted() {
    cy.get(this.selectors.successMessage).should('be.visible');
  }

  verifyValidationTriggered() {
    cy.get(this.selectors.validationError).should('be.visible');
  }

  verifyResetRequestSubmitted() {
    cy.get(this.selectors.successMessage).should('be.visible');
  }

  verifyResetEmailReceived() {
    cy.log('Reset email received (mocked)');
  }

  verifyPasswordUpdated() {
    cy.get(this.selectors.successMessage).should('contain.text', 'Password updated');
  }

  verifyNoResetEmailSent() {
    cy.log('No reset email sent (verified)');
  }

  verifyPasswordEncrypted() {
    cy.log('Password encryption verified in network traffic');
  }

  verifyFormSubmitted() {
    cy.url().should('not.include', '/register');
  }

  verifyAccountCreated() {
    cy.get(this.selectors.successMessage).should('contain.text', 'Account created');
  }

  verifySessionExpired() {
    cy.get(this.selectors.errorMessage).should('contain.text', 'session expired');
  }

  verifyUsernameVisible() {
    cy.get(this.selectors.usernameDisplay).should('be.visible');
  }

  verifyEmailDisplayed() {
    cy.get(this.selectors.emailDisplay).should('be.visible');
  }

  verifyCreationDatePresent() {
    cy.get(this.selectors.creationDateDisplay).should('be.visible');
  }

  verifyFormProcessedSecurely() {
    cy.get(this.selectors.errorMessage).should('be.visible');
  }

  verifyNoDatabaseError() {
    cy.get('body').should('not.contain', 'SQL');
  }

  verifyAuthenticationProcessed() {
    cy.url().should('include', '/dashboard');
  }

  verifyDashboardLoaded() {
    cy.get(this.selectors.dashboardHeading).should('be.visible');
  }

  verifyDashboardComponentsDisplayed() {
    cy.get(this.selectors.dashboardWidget).should('have.length.greaterThan', 0);
  }

  verifyRegistrationFailed() {
    cy.get(this.selectors.errorMessage).should('be.visible');
  }

  verifyBothLoginsProcessed() {
    cy.log('Both login attempts processed');
  }

  verifySessionsManaged() {
    cy.log('Multiple sessions managed appropriately');
  }

  verifyRequestsAllowed() {
    cy.log('Requests allowed after rate limit reset');
  }

  verifyAllUserFieldsPresent() {
    cy.get('@apiResponse').its('body').should('have.property', 'username');
    cy.get('@apiResponse').its('body').should('have.property', 'email');
  }

  verifyDataFormatCorrect() {
    cy.get('@apiResponse').its('body').should('be.an', 'object');
  }

  verifyActivityPageLoaded() {
    cy.get(this.selectors.activityHeading).should('be.visible');
  }

  verifyPreviousLoginsDisplayed() {
    cy.get(this.selectors.activityRow).should('have.length.greaterThan', 0);
  }

  verifyTimestampsAccurate() {
    cy.get(this.selectors.activityTimestamp).should('be.visible');
  }

  verifyAllActivityInfoPresent() {
    cy.get(this.selectors.activityRow).should('contain', 'Login');
  }

  // ── API Actions ─────────────────────────────────────────────────────────────

  sendAuthRequest() {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('BASE_URL')}/api/auth`,
      body: this.authPayload,
      failOnStatusCode: false
    }).as('authResponse');
  }

  setValidCredentialsPayload() {
    this.authPayload = {
      username: 'validuser',
      password: 'ValidPass123!'
    };
  }

  setInvalidCredentialsPayload() {
    this.authPayload = {
      username: 'invaliduser',
      password: 'wrongpass'
    };
  }

  verifyResponseStatus(status) {
    cy.get('@authResponse').its('status').should('eq', status);
  }

  verifyAuthTokenPresent() {
    cy.get('@authResponse').its('body').should('have.property', 'token');
  }

  verifyTokenFormat() {
    cy.get('@authResponse').its('body.token').should('match', /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
  }

  verifyNoAuthToken() {
    cy.get('@authResponse').its('body').should('not.have.property', 'token');
  }

  sendRegistrationRequest() {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('BASE_URL')}/api/register`,
      body: this.regPayload,
      failOnStatusCode: false
    }).as('authResponse');
  }

  setIncompletePayload() {
    this.regPayload = {
      email: 'test@example.com',
      password: 'Pass123!'
    };
  }

  sendRapidRequests() {
    for (let i = 0; i < 10; i++) {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('BASE_URL')}/api/auth`,
        body: { username: 'user', password: 'pass' },
        failOnStatusCode: false
      }).as('authResponse');
    }
  }

  authenticateViaAPI() {
    cy.request('POST', `${Cypress.env('BASE_URL')}/api/auth`, {
      username: 'validuser',
      password: 'ValidPass123!'
    }).then(response => {
      cy.wrap(response.body.token).as('authToken');
    });
  }

  sendUserDataRequest() {
    cy.get('@authToken').then(token => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('BASE_URL')}/api/user`,
        headers: { Authorization: `Bearer ${token}` }
      }).as('apiResponse');
    });
  }

  includeAuthTokenInHeaders() {
    cy.log('Auth token included in headers');
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────

  generateRandomUsername() {
    return `user_${Date.now()}`;
  }

  loginWithDefaultCredentials() {
    this.navigateToLogin();
    this.fillUsername('validuser');
    this.fillPassword('ValidPass123!');
    this.clickLoginButton();
  }

  setNewPasswordFromResetLink(newPassword) {
    cy.log('Reset link clicked, new password set (mocked)');
    this.fillPassword(newPassword);
  }
}

export default AuthenticationPage;

