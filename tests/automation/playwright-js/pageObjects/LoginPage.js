const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    
    // Locators
    this.usernameInput = page.locator('[data-testid="username"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.mfaCodeInput = page.locator('[data-testid="mfa-code"]');
    this.mfaVerifyButton = page.locator('[data-testid="mfa-verify-button"]');
    this.mfaResendLink = page.locator('[data-testid="mfa-resend"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
    this.mfaMethodDropdown = page.locator('[data-testid="mfa-method"]');
    this.rememberDeviceCheckbox = page.locator('[data-testid="remember-device"]');
  }

  async navigateToLogin(baseUrl) {
    await this.page.goto(`${baseUrl}/login`);
    await this.page.waitForLoadState('networkidle');
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

  async performInitialLogin(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async waitForMfaScreen() {
    await this.mfaCodeInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  async enterMfaCode(mfaCode) {
    await this.mfaCodeInput.fill(mfaCode);
  }

  async clickMfaVerifyButton() {
    await this.mfaVerifyButton.click();
  }

  async verifyMfaCode(mfaCode) {
    await this.enterMfaCode(mfaCode);
    await this.clickMfaVerifyButton();
  }

  async selectMfaMethod(method) {
    await this.mfaMethodDropdown.selectOption(method);
  }

  async checkRememberDevice() {
    await this.rememberDeviceCheckbox.check();
  }

  async uncheckRememberDevice() {
    await this.rememberDeviceCheckbox.uncheck();
  }

  async clickResendMfaCode() {
    await this.mfaResendLink.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isErrorMessageVisible() {
    return await this.errorMessage.isVisible();
  }

  async performMfaLogin(username, password, mfaCode) {
    await this.performInitialLogin(username, password);
    await this.waitForMfaScreen();
    await this.verifyMfaCode(mfaCode);
  }

  async performMfaLoginWithMethod(username, password, mfaCode, mfaMethod) {
    await this.performInitialLogin(username, password);
    await this.waitForMfaScreen();
    await this.selectMfaMethod(mfaMethod);
    await this.verifyMfaCode(mfaCode);
  }
}

module.exports = { LoginPage };
