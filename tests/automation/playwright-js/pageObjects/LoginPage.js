const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginButton');
    this.errorMessage = page.locator('.error-message');
    this.mfaCodeInput = page.locator('#mfaCode');
    this.mfaVerifyButton = page.locator('#verifyMfaButton');
    this.mfaResendLink = page.locator('#resendMfaCode');
    this.mfaErrorMessage = page.locator('.mfa-error-message');
    this.rememberDeviceCheckbox = page.locator('#rememberDevice');
    this.dashboardHeader = page.locator('.dashboard-header');
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
    await this.mfaVerifyButton.click();
  }

  async verifyMfa(mfaCode) {
    await this.enterMfaCode(mfaCode);
    await this.clickVerifyMfaButton();
  }

  async clickResendMfaCode() {
    await this.mfaResendLink.click();
  }

  async checkRememberDevice() {
    await this.rememberDeviceCheckbox.check();
  }

  async uncheckRememberDevice() {
    await this.rememberDeviceCheckbox.uncheck();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async getMfaErrorMessage() {
    return await this.mfaErrorMessage.textContent();
  }

  async isLoginButtonVisible() {
    return await this.loginButton.isVisible();
  }

  async isMfaCodeInputVisible() {
    return await this.mfaCodeInput.isVisible();
  }

  async isDashboardVisible() {
    return await this.dashboardHeader.isVisible();
  }

  async waitForMfaScreen() {
    await this.mfaCodeInput.waitFor({ state: 'visible' });
  }

  async waitForDashboard() {
    await this.dashboardHeader.waitFor({ state: 'visible' });
  }

  async loginWithMfa(username, password, mfaCode) {
    await this.login(username, password);
    await this.waitForMfaScreen();
    await this.verifyMfa(mfaCode);
    await this.waitForDashboard();
  }
}

module.exports = { LoginPage };
