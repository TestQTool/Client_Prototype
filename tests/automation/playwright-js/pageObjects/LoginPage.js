const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('[data-testid="email-input"]');
    this.sendOtpButton = page.locator('[data-testid="send-otp-btn"]');
    this.otpInput = page.locator('[data-testid="otp-input"]');
    this.verifyOtpButton = page.locator('[data-testid="verify-otp-btn"]');
    this.loginSuccessMessage = page.locator('[data-testid="login-success"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
  }

  async navigate(baseUrl) {
    await this.page.goto(`${baseUrl}/login`);
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async clickSendOtp() {
    await this.sendOtpButton.click();
  }

  async enterOtp(otp) {
    await this.otpInput.fill(otp);
  }

  async clickVerifyOtp() {
    await this.verifyOtpButton.click();
  }

  async loginWithOtp(email, otp) {
    await this.enterEmail(email);
    await this.clickSendOtp();
    await this.enterOtp(otp);
    await this.clickVerifyOtp();
  }

  async verifyLoginSuccess() {
    await expect(this.loginSuccessMessage).toBeVisible();
  }

  async verifyErrorMessage(expectedMessage) {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}

module.exports = { LoginPage };
