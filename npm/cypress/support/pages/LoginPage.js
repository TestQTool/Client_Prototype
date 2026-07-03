class LoginPage {
  constructor() {
    this.url = '/login';
    this.usernameInput = '[data-testid="username"], #username, input[name="username"], input[type="email"]';
    this.passwordInput = '[data-testid="password"], #password, input[name="password"], input[type="password"]';
    this.loginButton = '[data-testid="login-button"], button[type="submit"], .login-button';
    this.errorMessage = '[data-testid="error-message"], .error, .alert-error, .error-message';
  }

  visit() {
    cy.visit(this.url);
  }

  getUsernameField() {
    return cy.get(this.usernameInput).first();
  }

  getPasswordField() {
    return cy.get(this.passwordInput).first();
  }

  getLoginButton() {
    return cy.get(this.loginButton).first();
  }

  getErrorMessage() {
    return cy.get(this.errorMessage).first();
  }

  enterUsername(username) {
    this.getUsernameField().clear().type(username);
  }

  enterPassword(password) {
    this.getPasswordField().clear().type(password);
  }

  clickLoginButton() {
    this.getLoginButton().click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLoginButton();
  }
}

export default LoginPage;