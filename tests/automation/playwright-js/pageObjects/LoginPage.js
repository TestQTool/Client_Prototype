const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"], input[type="email"], #email');
    this.phoneInput = page.locator('input[name="phone"], input[type="tel"], #phone');
    this.sendOtpButton = page.locator('button:has-text("Send OTP"), button:has-text("Get OTP"), #sendOtp');
    this.otpInput = page.locator('input[name="otp"], #otp, input[placeholder*="OTP"]');
    this.verifyOtpButton = page.locator('button:has-text("Verify"), button:has-text("Submit OTP"), #verifyOtp');
    this.loginSuccessIndicator = page.locator('[data-testid="dashboard"], .dashboard, .home-page, #welcome');
  }

  async navigate(baseUrl) {
    await this.page.goto(`${baseUrl}/login`);
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async enterPhone(phone) {
    await this.phoneInput.fill(phone);
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

  async loginWithOtp(credentials) {
    if (credentials.email) {
      await this.enterEmail(credentials.email);
    }
    if (credentials.phone) {
      await this.enterPhone(credentials.phone);
    }
    await this.clickSendOtp();
    await this.page.waitForTimeout(1000);
    await this.enterOtp(credentials.otp);
    await this.clickVerifyOtp();
  }

  async verifyLoginSuccess() {
    await expect(this.loginSuccessIndicator).toBeVisible({ timeout: 10000 });
  }
}

module.exports = { LoginPage };
