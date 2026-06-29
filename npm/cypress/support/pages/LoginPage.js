class LoginPage {
  constructor() {
    this.usernameFieldSelector = '[data-testid="username"], #username, input[name="username"], input[type="text"]';
    this.passwordFieldSelector = '[data-testid="password"], #password, input[name="password"], input[type="password"]';
    this.loginButtonSelector = '[data-testid="login-button"], button[type="submit"], .login-button';
    this.errorMessageSelector = '.error-message, .alert-danger, [data-testid="error-message"]';
    this.successMessageSelector = '.success-message, .alert-success, [data-testid="success-message"]';
  }

  enterUsername(username) {
    cy.get(this.usernameFieldSelector).clear().type(username);
  }

  enterPassword(password) {
    cy.get(this.passwordFieldSelector).clear().type(password);
  }

  clickLoginButton() {
    cy.get(this.loginButtonSelector).click();
  }

  clearUsername() {
    cy.get(this.usernameFieldSelector).clear();
  }

  clearPassword() {
    cy.get(this.passwordFieldSelector).clear();
  }

  focusUsernameField() {
    cy.get(this.usernameFieldSelector).focus();
  }

  focusPasswordField() {
    cy.get(this.passwordFieldSelector).focus();
  }

  selectPasswordField() {
    cy.get(this.passwordFieldSelector).select();
  }

  hoverLoginButton() {
    cy.get(this.loginButtonSelector).trigger('mouseover');
  }

  verifyErrorMessage(expectedMessage) {
    cy.get(this.errorMessageSelector).should('be.visible').and('contain.text', expectedMessage);
  }

  verifyErrorMessageExists() {
    cy.get(this.errorMessageSelector).should('be.visible');
  }

  verifyOnLoginPage() {
    cy.url().should('include', '/login');
  }

  verifySuccessfulLogin() {
    cy.url().should('not.include', '/login');
  }

  verifyPasswordFieldFocused() {
    cy.get(this.passwordFieldSelector).should('have.focus');
  }

  verifyLoginButtonFocused() {
    cy.get(this.loginButtonSelector).should('have.focus');
  }

  verifyLoginButtonDisabled() {
    cy.get(this.loginButtonSelector).should('be.disabled');
  }

  verifyUsernameFieldEmpty() {
    cy.get(this.usernameFieldSelector).should('have.value', '');
  }

  verifyPasswordFieldEmpty() {
    cy.get(this.passwordFieldSelector).should('have.value', '');
  }

  verifyUsernamePlaceholder() {
    cy.get(this.usernameFieldSelector).should('have.attr', 'placeholder');
  }

  verifyPasswordPlaceholder() {
    cy.get(this.passwordFieldSelector).should('have.attr', 'placeholder');
  }

  verifyLoginButtonHoverState() {
    cy.get(this.loginButtonSelector).should('have.css', 'cursor', 'pointer');
  }

  verifyPasswordMasked() {
    cy.get(this.passwordFieldSelector).should('have.attr', 'type', 'password');
  }

  verifyResponsiveLayout() {
    cy.get(this.usernameFieldSelector).should('be.visible');
    cy.get(this.passwordFieldSelector).should('be.visible');
    cy.get(this.loginButtonSelector).should('be.visible');
  }

  verifyAllElementsVisible() {
    cy.get(this.usernameFieldSelector).should('be.visible');
    cy.get(this.passwordFieldSelector).should('be.visible');
    cy.get(this.loginButtonSelector).should('be.visible');
  }

  verifyUsernameFieldVisible() {
    cy.get(this.usernameFieldSelector).should('be.visible');
  }

  verifyPasswordFieldVisible() {
    cy.get(this.passwordFieldSelector).should('be.visible');
  }

  verifyLoginButtonVisible() {
    cy.get(this.loginButtonSelector).should('be.visible');
  }

  verifyPageTitle() {
    cy.title().should('not.be.empty');
  }

  verifyFieldErrorStyling() {
    cy.get(this.usernameFieldSelector).should('have.class', 'error').or('have.class', 'is-invalid');
  }

  verifyFieldValidStyling() {
    cy.get(this.usernameFieldSelector).should('not.have.class', 'error').and('not.have.class', 'is-invalid');
  }
}

export default LoginPage;

