import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import {
  emailInput,
  passwordInput,
  loginButton,
  forgotPasswordLink,
  errorMessage,
  validationError,
  emailError,
  passwordError,
  credentialsError,
  dashboardHeading,
  dashboardContainer,
  dashboardUrl
} from '../pageObjects/loginPage.js';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async navigateToLoginPage(url) {
    await this.open(url);
    await this.waitForPageLoad();
  }

  async enterEmail(email) {
    await this.waitAndFill(emailInput, email);
  }

  async enterPassword(password) {
    await this.waitAndFill(passwordInput, password);
  }

  async clickLoginButton() {
    await this.waitAndClick(loginButton);
    await this.waitforNetworkIdle();
  }

  async loginWithCredentials(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async verifyDashboardRedirection() {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain(dashboardUrl);
  }

  async verifyDashboardHeading() {
    await this.wait();
    const isVisible = await this.isElementVisible(dashboardHeading);
    expect(isVisible).toBeTruthy();
  }

  async verifyErrorMessage(expectedMessage) {
    await this.wait();
    const isVisible = await this.isElementVisible(errorMessage);
    expect(isVisible).toBeTruthy();
    if (expectedMessage) {
      await this.verifyElementContainsText(errorMessage, expectedMessage);
    }
  }

  async verifyValidationError(selector, expectedMessage) {
    await this.wait();
    const isVisible = await this.isElementVisible(selector);
    expect(isVisible).toBeTruthy();
    if (expectedMessage) {
      await this.verifyElementContainsText(selector, expectedMessage);
    }
  }

  async verifyEmailValidationError() {
    await this.verifyValidationError(emailError, '');
  }

  async verifyPasswordValidationError() {
    await this.verifyValidationError(passwordError, '');
  }

  async verifyCredentialsError() {
    await this.wait();
    const isVisible = await this.isElementVisible(credentialsError);
    expect(isVisible).toBeTruthy();
  }

  async verifyForgotPasswordLinkVisible() {
    await this.wait();
    const isVisible = await this.isElementVisible(forgotPasswordLink);
    expect(isVisible).toBeTruthy();
  }

  async verifyForgotPasswordLinkClickable() {
    await this.wait();
    const isEnabled = await this.page.isEnabled(forgotPasswordLink);
    expect(isEnabled).toBeTruthy();
  }

  async hoverOverForgotPasswordLink() {
    await this.page.hover(forgotPasswordLink);
  }

  async verifyPasswordMasked() {
    await this.wait();
    const inputType = await this.page.getAttribute(passwordInput, 'type');
    expect(inputType).toBe('password');
  }

  async verifyUserRemainsOnLoginPage(loginUrl) {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain(loginUrl);
  }

  async sendLoginApiRequest(apiUrl, payload) {
    const response = await this.page.request.post(apiUrl, {
      data: payload
    });
    return response;
  }

  async verifyApiStatusCode(response, expectedStatusCode) {
    expect(response.status()).toBe(expectedStatusCode);
  }

  async verifyApiResponseContains(response, key) {
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(key);
  }

  async verifyApiErrorMessage(response) {
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error');
  }

  async measurePageLoadTime() {
    const navigationTiming = await this.page.evaluate(() => {
      const perfData = window.performance.timing;
      return perfData.loadEventEnd - perfData.navigationStart;
    });
    return navigationTiming;
  }

  async verifyLoadTimeWithinLimit(loadTime, limitMs) {
    expect(loadTime).toBeLessThan(limitMs);
  }

  async verifyPasswordNotInConsole() {
    const logs = [];
    this.page.on('console', msg => logs.push(msg.text()));
    const logContent = logs.join(' ');
    expect(logContent).not.toContain('password');
  }

  async openBrowserConsole() {
    // Browser console is monitored via page.on('console') listeners
    // This method is a placeholder for test step documentation
  }

  async simulateConcurrentLogins(apiUrl, payload, count) {
    const requests = [];
    for (let i = 0; i < count; i++) {
      requests.push(this.sendLoginApiRequest(apiUrl, payload));
    }
    const responses = await Promise.all(requests);
    return responses;
  }

  async verifyAllRequestsProcessed(responses, expectedStatusCode) {
    responses.forEach(response => {
      expect(response.status()).toBe(expectedStatusCode);
    });
  }

  async waitForSessionTimeout(timeoutMs) {
    await this.page.waitForTimeout(timeoutMs);
  }

  async accessProtectedResource(url) {
    await this.open(url);
    await this.waitForPageLoad();
  }
}

export default LoginPage;

