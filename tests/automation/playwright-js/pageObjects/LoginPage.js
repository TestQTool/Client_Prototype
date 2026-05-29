const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginButton');
    this.mfaCodeInput = page.locator('#mfaCode');
    this.otpCodeInput = page.locator('#otpCode');
    this.verifyMfaButton = page.locator('#verifyMfaButton');
    this.verifyOtpButton = page.locator('#verifyOtpButton');
    this.resendOtpLink = page.locator('#resendOtp');
    this.errorMessage = page.locator('.error-message');
    this.successMessage = page.locator('.success-message');
    this.dashboardHeader = page.locator('#dashboardHeader');
    this.mfaSetupPrompt = page.locator('#mfaSetupPrompt');
    this.otpSentMessage = page.locator('#otpSentMessage');
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

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async enterMfaCode(mfaCode) {
    await this.mfaCodeInput.fill(mfaCode);
  }

  async clickVerifyMfaButton() {
    await this.verifyMfaButton.click();
  }

  async completeMfaVerification(mfaCode) {
    await this.enterMfaCode(mfaCode);
    await this.clickVerifyMfaButton();
  }

  async enterOtpCode(otpCode) {
    await this.otpCodeInput.fill(otpCode);
  }

  async clickVerifyOtpButton() {
    await this.verifyOtpButton.click();
  }

  async completeOtpVerification(otpCode) {
    await this.enterOtpCode(otpCode);
    await this.clickVerifyOtpButton();
  }

  async clickResendOtp() {
    await this.resendOtpLink.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async getSuccessMessage() {
    return await this.successMessage.textContent();
  }

  async verifyDashboardDisplayed() {
    await expect(this.dashboardHeader).toBeVisible();
  }

  async verifyMfaPromptDisplayed() {
    await expect(this.mfaCodeInput).toBeVisible();
  }

  async verifyOtpPromptDisplayed() {
    await expect(this.otpCodeInput).toBeVisible();
  }

  async verifyOtpSentMessageDisplayed() {
    await expect(this.otpSentMessage).toBeVisible();
  }

  async verifyErrorMessageDisplayed(expectedMessage) {
    await expect(this.errorMessage).toBeVisible();
    if (expectedMessage) {
      await expect(this.errorMessage).toContainText(expectedMessage);
    }
  }

  async verifyLoginPageDisplayed() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}

module.exports = { LoginPage };
