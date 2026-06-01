const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"], #username, [data-testid="username"]');
    this.passwordInput = page.locator('input[name="password"], #password, [data-testid="password"]');
    this.loginButton = page.locator('button[type="submit"], input[type="submit"], [data-testid="login-button"]');
  }

  async navigateToUrl(url) {
    await this.page.goto(url);
  }

  async enterCredentials(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(username, password) {
    await this.enterCredentials(username, password);
    await this.clickLogin();
  }
}

module.exports = { LoginPage };
