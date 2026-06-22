import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import { loginPageLocators } from '../pageObjects/loginPage.js';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Navigation
  async navigateToLoginPage() {
    await this.open(process.env.BASE_URL || 'http://192.168.10.124:4001');
    await super.waitForPageLoad();
    return this;
  }

  // Form Actions
  async enterUsername(username) {
    await this.waitAndFill(loginPageLocators.usernameInput, username);
  }

  async enterEmail(email) {
    await this.waitAndFill(loginPageLocators.emailInput, email);
  }

  async enterPassword(password) {
    await this.waitAndFill(loginPageLocators.passwordInput, password);
  }

  async clickLoginButton() {
    await this.waitAndClick(loginPageLocators.loginButton);
    await super.waitforNetworkIdle();
  }

  async clickRegisterLink() {
    await this.waitAndClick(loginPageLocators.registerLink);
    await super.waitForPageLoad();
  }

  // Combined Actions
  async loginWithCredentials(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async loginWithEmailCredentials(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async loginWithRole(roleName) {
    const credentials = this.getLoginDataByRole(roleName);
    await this.enterUsername(credentials.username);
    await this.enterPassword(credentials.password);
    await this.clickLoginButton();
  }

  // Keyboard Actions
  async tabFromUsernameToPassword() {
    await this.page.locator(loginPageLocators.usernameInput).press('Tab');
  }

  async tabFromPasswordToLoginButton() {
    await this.page.locator(loginPageLocators.passwordInput).press('Tab');
  }

  async pressEnterOnLoginButton() {
    await this.page.locator(loginPageLocators.loginButton).press('Enter');
  }

  async rapidClickLoginButton(times = 5) {
    for (let i = 0; i < times; i++) {
      await this.page.locator(loginPageLocators.loginButton).click({ force: true, delay: 50 });
    }
  }

  // Assertions
  async verifyLoginPageDisplayed() {
    await this.wait();
    await expect(this.page.locator(loginPageLocators.loginForm)).toBeVisible();
    await expect(this.page.locator(loginPageLocators.usernameInput)).toBeVisible();
    await expect(this.page.locator(loginPageLocators.passwordInput)).toBeVisible();
    await expect(this.page.locator(loginPageLocators.loginButton)).toBeVisible();
  }

  async verifyErrorMessageDisplayed() {
    await this.wait();
    await expect(this.page.locator(loginPageLocators.errorMessage)).toBeVisible();
  }

  async verifyValidationErrorDisplayed() {
    await this.wait();
    await expect(this.page.locator(loginPageLocators.validationError)).toBeVisible();
  }

  async verifyAccountDisabledMessage() {
    await this.wait();
    await expect(this.page.locator(loginPageLocators.accountDisabledMessage)).toBeVisible();
  }

  async verifyUsernameRequiredError() {
    await this.wait();
    await expect(this.page.locator(loginPageLocators.usernameRequiredError)).toBeVisible();
  }

  async verifyPasswordRequiredError() {
    await this.wait();
    await expect(this.page.locator(loginPageLocators.passwordRequiredError)).toBeVisible();
  }

  async verifyUserRemainsOnLoginPage() {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain('login');
    await expect(this.page.locator(loginPageLocators.loginForm)).toBeVisible();
  }

  async verifyPasswordMasked() {
    await this.wait();
    const passwordType = await this.page.locator(loginPageLocators.passwordInput).getAttribute('type');
    expect(passwordType).toBe('password');
  }

  async verifyPlaceholderText() {
    await this.wait();
    const usernamePlaceholder = await this.page.locator(loginPageLocators.usernameInput).getAttribute('placeholder');
    const passwordPlaceholder = await this.page.locator(loginPageLocators.passwordInput).getAttribute('placeholder');
    expect(usernamePlaceholder).toBeTruthy();
    expect(passwordPlaceholder).toBeTruthy();
  }

  async verifyHTTPSProtocol() {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toMatch(/^https:\/\//);
  }

  async verifyLoginButtonClickable() {
    await this.wait();
    await expect(this.page.locator(loginPageLocators.loginButton)).toBeEnabled();
    await expect(this.page.locator(loginPageLocators.loginButton)).toBeVisible();
  }

  async verifyAllRequiredElementsPresent() {
    await this.wait();
    await expect(this.page.locator(loginPageLocators.usernameInput)).toBeVisible();
    await expect(this.page.locator(loginPageLocators.passwordInput)).toBeVisible();
    await expect(this.page.locator(loginPageLocators.loginButton)).toBeVisible();
    await expect(this.page.locator(loginPageLocators.pageTitle)).toBeVisible();
  }

  async verifyLoginSuccessful() {
    await this.wait();
    await super.waitforNetworkIdle();
    const currentUrl = await this.getUrl();
    expect(currentUrl).not.toContain('login');
  }

  async verifyResponseTime(maxTimeMs = 2000) {
    await this.wait();
    const startTime = Date.now();
    await super.waitforNetworkIdle();
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    expect(responseTime).toBeLessThan(maxTimeMs);
  }

  async verifyPageLoadTime(maxTimeMs = 3000) {
    const startTime = Date.now();
    await super.waitForPageLoad();
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    expect(loadTime).toBeLessThan(maxTimeMs);
  }

  async verifyFieldHasFocus(fieldLocator) {
    await this.wait();
    const isFocused = await this.page.locator(fieldLocator).evaluate(el => el === document.activeElement);
    expect(isFocused).toBeTruthy();
  }

  async verifyLoginButtonDisabled() {
    await this.wait();
    await expect(this.page.locator(loginPageLocators.loginButton)).toBeDisabled();
  }

  async verifyErrorStyling(fieldLocator) {
    await this.wait();
    const hasErrorClass = await this.page.locator(fieldLocator).evaluate(el => {
      return el.classList.contains('error') || el.classList.contains('invalid') || el.getAttribute('aria-invalid') === 'true';
    });
    expect(hasErrorClass).toBeTruthy();
  }

  // Utility Methods
  async clearBrowserCache() {
    await this.page.context().clearCookies();
  }

  async attemptSQLInjection(sqlString) {
    await this.enterUsername(sqlString);
    await this.enterPassword('password123');
    await this.clickLoginButton();
  }

  async enterMaxLengthUsername(length = 255) {
    const maxUsername = 'a'.repeat(length);
    await this.enterUsername(maxUsername);
  }

  async enterMaxLengthPassword(length = 255) {
    const maxPassword = 'p'.repeat(length);
    await this.enterPassword(maxPassword);
  }

  async enterUnicodeUsername(unicodeString) {
    await this.enterUsername(unicodeString);
  }

  async enterUnicodePassword(unicodeString) {
    await this.enterPassword(unicodeString);
  }

  async enterSpecialCharactersUsername(specialChars) {
    await this.enterUsername(specialChars);
  }

  async enterUsernameWithWhitespace(username) {
    await this.enterUsername(`  ${username}  `);
  }

  async enterPasswordWithWhitespace(password) {
    await this.enterPassword(`  ${password}  `);
  }

  async resizeViewport(width, height) {
    await this.page.setViewportSize({ width, height });
  }

  async hoverOverLoginButton() {
    await this.page.locator(loginPageLocators.loginButton).hover();
  }

  async attemptPasswordCopy() {
    await this.page.locator(loginPageLocators.passwordInput).selectText();
    const isCopyDisabled = await this.page.locator(loginPageLocators.passwordInput).evaluate(el => {
      return el.oncopy !== null || window.getComputedStyle(el).userSelect === 'none';
    });
    return isCopyDisabled;
  }
}

export default LoginPage;

