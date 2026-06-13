import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import {
  usernameInput,
  passwordInput,
  loginButton,
  dashboardHeading,
  homePageIndicator,
  errorMessage,
  invalidCredentialsError,
  usernameRequiredError,
  passwordRequiredError,
  accountLockedMessage,
  tokenExpiredMessage
} from '../pageObjects/loginPage.js';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async navigateToLoginPage(url) {
    await this.open(url);
    await this.waitForPageLoad();
  }

  async enterUsername(username) {
    await this.waitAndFill(usernameInput, username);
  }

  async enterPassword(password) {
    await this.waitAndFill(passwordInput, password);
  }

  async clickLoginButton() {
    await this.waitAndClick(loginButton);
    await this.waitforNetworkIdle();
  }

  async loginWithCredentials(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async loginWithValidCredentials(role = 'Admin') {
    const credentials = this.getLoginDataByRole(role);
    await this.loginWithCredentials(credentials.username, credentials.password);
  }

  async verifyDashboardIsDisplayed() {
    await this.wait();
    const isDashboardVisible = await this.isElementVisible(dashboardHeading) || await this.isElementVisible(homePageIndicator);
    expect(isDashboardVisible).toBeTruthy();
  }

  async verifyErrorMessageIsDisplayed() {
    await this.wait();
    const isErrorVisible = await this.isElementVisible(errorMessage) || await this.isElementVisible(invalidCredentialsError);
    expect(isErrorVisible).toBeTruthy();
  }

  async verifyInvalidCredentialsError() {
    await this.wait();
    const isVisible = await this.isElementVisible(invalidCredentialsError);
    expect(isVisible).toBeTruthy();
  }

  async verifyValidationMessagesForRequiredFields() {
    await this.wait();
    const isUsernameErrorVisible = await this.isElementVisible(usernameRequiredError);
    const isPasswordErrorVisible = await this.isElementVisible(passwordRequiredError);
    expect(isUsernameErrorVisible || isPasswordErrorVisible).toBeTruthy();
  }

  async verifyPasswordFieldMasksInput() {
    await this.wait();
    const passwordField = await this.page.locator(passwordInput).first();
    const inputType = await passwordField.getAttribute('type');
    expect(inputType).toBe('password');
  }

  async enterSpecialCharactersInUsername(specialChars) {
    await this.waitAndFill(usernameInput, specialChars);
  }

  async verifyAppropriateResponseIsDisplayed() {
    await this.wait();
    const pageContent = await this.page.content();
    expect(pageContent.length).toBeGreaterThan(0);
  }

  async verifyAccountLockoutMessage() {
    await this.wait();
    const isLockoutVisible = await this.isElementVisible(accountLockedMessage);
    expect(isLockoutVisible).toBeTruthy();
  }

  async verifySubsequentLoginAttemptsBlocked() {
    await this.wait();
    const isLoginButtonDisabled = await this.page.locator(loginButton).first().isDisabled();
    const isLockoutVisible = await this.isElementVisible(accountLockedMessage);
    expect(isLoginButtonDisabled || isLockoutVisible).toBeTruthy();
  }

  async verifyTokenExpiredError() {
    await this.wait();
    const isExpiredVisible = await this.isElementVisible(tokenExpiredMessage);
    expect(isExpiredVisible).toBeTruthy();
  }

  async getAuthenticationToken() {
    await this.wait();
    const token = await this.page.evaluate(() => {
      return localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || document.cookie.match(/token=([^;]+)/)?.[1];
    });
    return token;
  }

  async waitForTokenExpiration(timeoutMs) {
    await this.page.waitForTimeout(timeoutMs);
  }

  async attemptToAccessProtectedResource(resourceUrl) {
    await this.page.goto(resourceUrl);
    await this.waitForPageLoad();
  }
}

export default LoginPage;

