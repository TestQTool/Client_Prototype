const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"], input[id="username"], #username');
    this.passwordInput = page.locator('input[name="password"], input[id="password"], input[type="password"]');
    this.loginButton = page.locator('button[type="submit"], input[type="submit"], #login-button, .login-btn');
    this.errorMessage = page.locator('.error-message, .alert-error, .validation-error, #error-message');
    this.emailRequiredError = page.locator('[data-error="email"], .email-error, #email-error');
    this.passwordRequiredError = page.locator('[data-error="password"], .password-error, #password-error');
    this.userAccountName = page.locator('.user-name, .account-name, #user-display-name');
    this.personalizedContent = page.locator('.personalized-content, .user-dashboard, #personalized-section');
    this.accountLockoutMessage = page.locator('.lockout-message, .account-locked, #lockout-error');
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async enterCredentials(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async pressEnterKey() {
    await this.page.keyboard.press('Enter');
  }

  async clearEmailField() {
    await this.usernameInput.clear();
  }

  async clearPasswordField() {
    await this.passwordInput.clear();
  }

  async clearEmailAndEnter(email) {
    await this.clearEmailField();
    await this.usernameInput.fill(email);
  }

  async clearPasswordAndEnter(password) {
    await this.clearPasswordField();
    await this.passwordInput.fill(password);
  }

  async verifyErrorMessageDisplayed() {
    await expect(this.errorMessage).toBeVisible();
  }

  async verifyEmailRequiredError() {
    await expect(this.emailRequiredError).toBeVisible();
  }

  async verifyPasswordRequiredError() {
    await expect(this.passwordRequiredError).toBeVisible();
  }

  async verifyBothFieldErrors() {
    await expect(this.emailRequiredError).toBeVisible();
    await expect(this.passwordRequiredError).toBeVisible();
  }

  async verifyUserLoggedIn() {
    await expect(this.userAccountName).toBeVisible();
  }

  async verifyPersonalizedContentDisplayed() {
    await expect(this.personalizedContent).toBeVisible();
  }

  async verifyAccountLockoutMessage() {
    await expect(this.accountLockoutMessage).toBeVisible();
  }

  async verifyNoValidationError() {
    await expect(this.errorMessage).not.toBeVisible();
  }

  async verifyPasswordFieldIsMasked() {
    const inputType = await this.passwordInput.getAttribute('type');
    expect(inputType).toBe('password');
  }

  async verifyPageIsSecure() {
    const url = this.page.url();
    expect(url.startsWith('https://')).toBeTruthy();
  }

  async refreshPage() {
    await this.page.reload();
  }

  async waitForDashboard() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForAuthentication() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getPasswordInputType() {
    return await this.passwordInput.getAttribute('type');
  }

  async login(username, password) {
    await this.enterCredentials(username, password);
    await this.clickLoginButton();
    await this.waitForAuthentication();
  }
}

module.exports = { LoginPage };
