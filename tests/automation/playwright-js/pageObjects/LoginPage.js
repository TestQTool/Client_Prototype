const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"], #username, [data-testid="username"]');
    this.passwordInput = page.locator('input[name="password"], #password, [data-testid="password"]');
    this.loginButton = page.locator('button[type="submit"], input[type="submit"], [data-testid="login-button"]');
    this.errorMessage = page.locator('.error-message, [data-testid="error-message"], .oxd-alert-content-text');
    this.dashboardHeader = page.locator('.dashboard-header, [data-testid="dashboard"], .oxd-topbar-header-breadcrumb');
  }

  async navigate(baseUrl) {
    await this.page.goto(baseUrl);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    await expect(this.dashboardHeader).toBeVisible({ timeout: 10000 });
  }

  async verifyLoginFailure() {
    await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
  }

  async getErrorMessageText() {
    return await this.errorMessage.textContent();
  }

  async isLoggedIn() {
    try {
      await this.dashboardHeader.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { LoginPage };
