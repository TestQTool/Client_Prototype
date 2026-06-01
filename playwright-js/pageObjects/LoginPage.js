const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"], #username, [data-testid="username"]');
    this.passwordInput = page.locator('input[name="password"], #password, [data-testid="password"], input[type="password"]');
    this.loginButton = page.locator('button[type="submit"], #login-button, [data-testid="login-button"]');
    this.emailInput = page.locator('input[name="email"], #email, [data-testid="email"], input[type="email"]');
    this.errorMessage = page.locator('.error-message, [data-testid="error-message"], .validation-error, .alert-danger');
    this.emailError = page.locator('[data-testid="email-error"], .email-error, .field-error');
    this.passwordError = page.locator('[data-testid="password-error"], .password-error, .field-error');
    this.userAccountName = page.locator('[data-testid="user-name"], .user-name, .account-name, .logged-user');
    this.accountLockoutMessage = page.locator('[data-testid="lockout-message"], .lockout-message, .account-locked');
  }

  async navigateToUrl(url) {
    await this.page.goto(url);
  }

  async enterCredentials(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clearEmailField() {
    await this.emailInput.clear();
  }

  async clearPasswordField() {
    await this.passwordInput.clear();
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async pressEnterKey() {
    await this.page.keyboard.press('Enter');
  }

  async verifyErrorMessage(expectedMessage) {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  async verifyEmailError(expectedMessage) {
    await expect(this.emailError).toContainText(expectedMessage);
  }

  async verifyPasswordError(expectedMessage) {
    await expect(this.passwordError).toContainText(expectedMessage);
  }

  async verifyUserLoggedIn() {
    await expect(this.userAccountName).toBeVisible();
  }

  async verifyAccountLockout() {
    await expect(this.accountLockoutMessage).toBeVisible();
  }

  async verifyPasswordFieldIsMasked() {
    const inputType = await this.passwordInput.getAttribute('type');
    expect(inputType).toBe('password');
  }

  async verifyNoValidationError() {
    await expect(this.errorMessage).not.toBeVisible();
  }

  async refreshPage() {
    await this.page.reload();
  }

  async login(username, password) {
    await this.enterCredentials(username, password);
    await this.clickLoginButton();
  }
}

module.exports = { LoginPage };
