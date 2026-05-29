const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-testid="username"], #username, input[name="username"], input[type="email"]');
    this.passwordInput = page.locator('[data-testid="password"], #password, input[name="password"], input[type="password"]');
    this.loginButton = page.locator('[data-testid="login-button"], button[type="submit"], #login-btn, button:has-text("Login"), button:has-text("Sign In")');
    this.errorMessage = page.locator('[data-testid="error-message"], .error-message, .alert-danger, #error');
    this.successMessage = page.locator('[data-testid="success-message"], .success-message, .alert-success');
    this.logoutButton = page.locator('[data-testid="logout"], button:has-text("Logout"), a:has-text("Logout")');
    this.dashboardHeader = page.locator('[data-testid="dashboard"], .dashboard, #dashboard, h1:has-text("Dashboard")');
  }

  async navigate(baseUrl) {
    const loginUrl = baseUrl ? `${baseUrl}/login` : '/login';
    await this.page.goto(loginUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async enterUsername(username) {
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.waitFor({ state: 'visible' });
    await this.loginButton.click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLoginSuccess() {
    await expect(this.dashboardHeader.or(this.logoutButton)).toBeVisible({ timeout: 10000 });
  }

  async verifyLoginFailure(expectedErrorMessage) {
    await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
    if (expectedErrorMessage) {
      await expect(this.errorMessage).toContainText(expectedErrorMessage);
    }
  }

  async isLoggedIn() {
    try {
      await this.logoutButton.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async logout() {
    if (await this.isLoggedIn()) {
      await this.logoutButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }
}

module.exports = { LoginPage };
