class LoginPage {
  constructor() {
    this.selectors = {
      // TODO: verify selectors against live app at 192.168.10.124:4001
      usernameInput: 'input[name="username"], input[type="email"], input[placeholder*="Email" i], input[placeholder*="Username" i], #username, #email',
      passwordInput: 'input[name="password"], input[type="password"], input[placeholder*="Password" i], #password',
      loginButton: 'button[type="submit"], button:contains("Login"), button:contains("Sign In"), input[type="submit"]',
      registerLink: 'a:contains("Register"), a:contains("Sign Up"), a[href*="register"]',
      errorMessage: '[role="alert"], .error-message, .alert-danger, .validation-error',
      pageHeading: 'h1, h2'
    };
  }

  navigate() {
    const baseUrl = Cypress.env('BASE_URL') || Cypress.config('baseUrl') || 'http://192.168.10.124:4001';
    cy.visit(baseUrl);
    cy.url().should('include', baseUrl);
  }

  verifyLoginPageElements() {
    cy.get(this.selectors.usernameInput).should('be.visible');
    cy.get(this.selectors.passwordInput).should('be.visible');
    cy.get(this.selectors.loginButton).should('be.visible');
    cy.get(this.selectors.registerLink).should('be.visible');
  }

  enterUsername(username) {
    cy.get(this.selectors.usernameInput).clear().type(username);
  }

  enterPassword(password) {
    cy.get(this.selectors.passwordInput).clear().type(password);
  }

  clickLoginButton() {
    cy.get(this.selectors.loginButton).click();
  }

  verifyErrorMessage(expectedMessage) {
    cy.get(this.selectors.errorMessage).should('be.visible');
    if (expectedMessage) {
      cy.get(this.selectors.errorMessage).should('contain.text', expectedMessage);
    }
  }

  verifySuccessfulLogin() {
    cy.url().should('not.include', '/login');
  }
}

export default LoginPage;

