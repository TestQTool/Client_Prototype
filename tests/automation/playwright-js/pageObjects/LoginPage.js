const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-testid="username"], #username, input[name="username"], input[type="email"]');
    this.passwordInput = page.locator('[data-testid="password"], #password, input[name="password"], input[type="password"]');
    this.loginButton = page.locator('[data-testid="login-button"], button[type="submit"], #login-btn, .login-button');
    this.errorMessage = page.locator('[data-testid="error-message"], .error-message, .alert-danger, #error');
    this.rememberMeCheckbox = page.locator('[data-testid="remember-me"], #remember-me, input[name="rememberMe"]');
    this.forgotPasswordLink = page.locator('[data-testid="forgot-password"], a[href*="forgot"], .forgot-password-link');
  }

  async navigate(baseUrl) {
    await this.page.goto(`${baseUrl}/login`);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithRememberMe(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.rememberMeCheckbox.check();
    await this.loginButton.click();
  }

  async verifyErrorMessage(expectedMessage) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  async verifyLoginPageLoaded() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }
}

module.exports = { LoginPage };
