const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-testid="username"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.otpInput = page.locator('[data-testid="otp-input"]');
    this.verifyOtpButton = page.locator('[data-testid="verify-otp-button"]');
    this.resendOtpLink = page.locator('[data-testid="resend-otp"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
    this.successMessage = page.locator('[data-testid="success-message"]');
  }

  async navigate(baseUrl) {
    await this.page.goto(`${baseUrl}/login`);
  }

  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async enterOtp(otp) {
    await this.otpInput.fill(otp);
  }

  async clickVerifyOtpButton() {
    await this.verifyOtpButton.click();
  }

  async clickResendOtp() {
    await this.resendOtpLink.click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async verifyOtp(otp) {
    await this.enterOtp(otp);
    await this.clickVerifyOtpButton();
  }

  async loginWithOtpVerification(username, password, otp) {
    await this.login(username, password);
    await this.verifyOtp(otp);
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async getSuccessMessage() {
    return await this.successMessage.textContent();
  }

  async isOtpInputVisible() {
    return await this.otpInput.isVisible();
  }

  async verifyLoginSuccess() {
    await expect(this.successMessage).toBeVisible();
  }

  async verifyOtpScreenDisplayed() {
    await expect(this.otpInput).toBeVisible();
    await expect(this.verifyOtpButton).toBeVisible();
  }
}

module.exports = { LoginPage };
