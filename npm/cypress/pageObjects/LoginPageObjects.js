class LoginPageObjects {
  // Selectors for Login Page elements
  selectors = {
    emailField: 'input[type="email"], input[name="email"], #email',
    passwordField: 'input[type="password"], input[name="password"], #password',
    loginButton: 'button[type="submit"], button:contains("Login"), input[type="submit"]',
    registerLink: 'a:contains("Register"), a[href*="register"]'
  };

  // Get email field element
  getEmailField() {
    return cy.get(this.selectors.emailField).first();
  }

  // Get password field element
  getPasswordField() {
    return cy.get(this.selectors.passwordField).first();
  }

  // Get login button element
  getLoginButton() {
    return cy.get(this.selectors.loginButton).first();
  }

  // Get register hyperlink element
  getRegisterLink() {
    return cy.get(this.selectors.registerLink).first();
  }

  // Enter email
  enterEmail(email) {
    this.getEmailField().clear().type(email);
  }

  // Enter password
  enterPassword(password) {
    this.getPasswordField().clear().type(password);
  }

  // Click login button
  clickLogin() {
    this.getLoginButton().click();
  }

  // Click register link
  clickRegisterLink() {
    this.getRegisterLink().click();
  }
}

export default LoginPageObjects;

