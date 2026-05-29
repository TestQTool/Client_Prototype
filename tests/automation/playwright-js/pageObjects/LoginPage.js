const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-testid="username"], #username, input[name="username"], input[type="email"]');
    this.passwordInput = page.locator('[data-testid="password"], #password, input[name="password"], input[type="password"]');
    this.loginButton = page.locator('[data-testid="login-button"], button[type="submit"], #loginBtn, .login-btn');
    this.errorMessage = page.locator('[data-testid="error-message"], .error-message, .alert-danger, #errorMsg');
    this.otpInput = page.locator('[data-testid="otp-input"], #otp, input[name="otp"], .otp-input');
    this.verifyOtpButton = page.locator('[data-testid="verify-otp"], #verifyOtp, button:has-text("Verify")');
    this.resendOtpLink = page.locator('[data-testid="resend-otp"], .resend-otp, a:has-text("Resend")');
    this.otpSentMessage = page.locator('[data-testid="otp-sent"], .otp-sent-message, .success-message');
    this.dashboardIndicator = page.locator('[data-testid="dashboard"], .dashboard, #dashboard, .welcome-message');
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

  async enterOtp(otp) {
    await this.otpInput.fill(otp);
  }

  async clickVerifyOtpButton() {
    await this.verifyOtpButton.click();
  }

  async verifyOtp(otp) {
    await this.enterOtp(otp);
    await this.clickVerifyOtpButton();
  }

  async clickResendOtp() {
    await this.resendOtpLink.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isErrorMessageVisible() {
    return await this.errorMessage.isVisible();
  }

  async isOtpInputVisible() {
    return await this.otpInput.isVisible();
  }

  async isOtpSentMessageVisible() {
    return await this.otpSentMessage.isVisible();
  }

  async isDashboardVisible() {
    return await this.dashboardIndicator.isVisible();
  }

  async waitForOtpScreen() {
    await this.otpInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  async waitForDashboard() {
    await this.dashboardIndicator.waitFor({ state: 'visible', timeout: 10000 });
  }
}

module.exports = { LoginPage };
