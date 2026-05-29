const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-testid="username"], #username, input[name="username"], input[type="email"]');
    this.passwordInput = page.locator('[data-testid="password"], #password, input[name="password"], input[type="password"]');
    this.loginButton = page.locator('[data-testid="login-button"], button[type="submit"], #login-btn, .login-button');
    this.errorMessage = page.locator('[data-testid="error-message"], .error-message, .alert-error, #error-msg');
    this.forgotPasswordLink = page.locator('a[href*="forgot"], .forgot-password, [data-testid="forgot-password"]');
    this.rememberMeCheckbox = page.locator('[data-testid="remember-me"], #remember-me, input[name="rememberMe"]');
  }

  async navigate(baseUrl) {
    await this.page.goto(`${baseUrl}/login`);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithRememberMe(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.rememberMeCheckbox.check();
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getErrorMessage() {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    return await this.errorMessage.textContent();
  }

  async isLoginFormVisible() {
    return await this.usernameInput.isVisible() && await this.passwordInput.isVisible();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifySuccessfulLogin() {
    await expect(this.page).not.toHaveURL(/.*login.*/);
  }

  async verifyLoginPageLoaded() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}

module.exports = { LoginPage };
