const config = require('../config/config');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"], input[name="email"], input[type="email"]');
    this.passwordInput = page.locator('input[name="password"], input[type="password"]');
    this.loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign in")');
    this.registerLink = page.locator('a:has-text("Register")');
    this.errorMessage = page.locator('.error, .alert-danger, [role="alert"]');
  }

  async navigate() {
    await this.page.goto(config.baseURL || '/');
  }

  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async loginViaAPI(username, password) {
    const response = await this.page.request.post(`${config.baseURL || ''}/login`, {
      data: {
        username: username,
        password: password
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isErrorVisible() {
    return await this.errorMessage.isVisible();
  }
}

module.exports = { LoginPage };

