import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import { LOGIN_PAGE } from '../pageObjects/loginPage.js';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async navigateToLoginPage() {
    await this.open(process.env.BASE_URL || 'http://192.168.10.124:4001');
    await super.waitForPageLoad();
  }

  async verifyLoginPageDisplayed() {
    await this.wait();
    await expect(this.page.locator(LOGIN_PAGE.loginForm)).toBeVisible();
    await expect(this.page.locator(LOGIN_PAGE.loginButton)).toBeVisible();
  }

  async enterUsername(username) {
    const usernameField = this.page.locator(LOGIN_PAGE.usernameInput).or(this.page.locator(LOGIN_PAGE.emailInput));
    await this.waitAndFill(usernameField, username);
  }

  async enterPassword(password) {
    await this.waitAndFill(LOGIN_PAGE.passwordInput, password);
  }

  async clickLoginButton() {
    await this.waitAndClick(LOGIN_PAGE.loginButton);
    await super.waitforNetworkIdle();
  }

  async pressEnterKey() {
    await this.page.keyboard.press('Enter');
    await super.waitforNetworkIdle();
  }

  async loginWithCredentials(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async loginWithEnterKey(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.pressEnterKey();
  }

  async verifyLoginSuccessful() {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).not.toContain('login');
  }

  async verifyErrorMessageDisplayed() {
    await this.wait();
    await expect(this.page.locator(LOGIN_PAGE.errorMessage).or(this.page.locator(LOGIN_PAGE.invalidCredentialsError))).toBeVisible();
  }

  async verifyUsernameRequiredError() {
    await this.wait();
    await expect(this.page.locator(LOGIN_PAGE.usernameRequiredError).or(this.page.locator(LOGIN_PAGE.validationError))).toBeVisible();
  }

  async verifyPasswordRequiredError() {
    await this.wait();
    await expect(this.page.locator(LOGIN_PAGE.passwordRequiredError).or(this.page.locator(LOGIN_PAGE.validationError))).toBeVisible();
  }

  async verifyValidationErrorDisplayed() {
    await this.wait();
    await expect(this.page.locator(LOGIN_PAGE.validationError)).toBeVisible();
  }

  async verifyRemainsOnLoginPage() {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain('login');
    await expect(this.page.locator(LOGIN_PAGE.loginForm)).toBeVisible();
  }

  async verifyPasswordFieldMasked() {
    await this.wait();
    const passwordField = this.page.locator(LOGIN_PAGE.passwordInput);
    const inputType = await passwordField.getAttribute('type');
    expect(inputType).toBe('password');
  }

  async verifyAccountLockedMessage() {
    await this.wait();
    await expect(this.page.locator(LOGIN_PAGE.accountLockedMessage)).toBeVisible();
  }

  async verifyAccountDeactivatedMessage() {
    await this.wait();
    await expect(this.page.locator(LOGIN_PAGE.accountDeactivatedMessage)).toBeVisible();
  }

  async verifyPasswordLengthError() {
    await this.wait();
    await expect(this.page.locator(LOGIN_PAGE.passwordLengthError)).toBeVisible();
  }

  async verifyPasswordFieldCleared() {
    await this.wait();
    const passwordValue = await this.page.locator(LOGIN_PAGE.passwordInput).inputValue();
    expect(passwordValue).toBe('');
  }

  async verifySessionExpiredMessage() {
    await this.wait();
    await expect(this.page.locator(LOGIN_PAGE.sessionExpiredMessage)).toBeVisible();
  }

  async tabNavigateFields() {
    await this.page.keyboard.press('Tab');
  }

  async verifyUrlUsesHttps() {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toMatch(/^https:\/\//);
  }

  async attemptMultipleLogins(attempts) {
    for (let i = 0; i < attempts; i++) {
      await this.enterUsername('testuser');
      await this.enterPassword('wrongpassword');
      await this.clickLoginButton();
    }
  }

  async measureLoginResponseTime() {
    const startTime = Date.now();
    await this.clickLoginButton();
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    expect(responseTime).toBeLessThan(3000);
  }

  async navigateToProtectedPage(protectedUrl) {
    await this.open(protectedUrl);
    await super.waitForPageLoad();
  }

  async verifyRedirectToLogin() {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain('login');
  }

  async verifyRedirectToIntendedPage(expectedUrl) {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain(expectedUrl);
  }

  async waitForInactivity(milliseconds) {
    await this.page.waitForTimeout(milliseconds);
  }

  async attemptAccessProtectedResource(resourceUrl) {
    await this.open(resourceUrl);
    await super.waitForPageLoad();
  }
}

export default LoginPage;