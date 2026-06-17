import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import {
  emailInput,
  passwordInput,
  loginButton,
  forgotPasswordLink,
  emailErrorMessage,
  passwordErrorMessage,
  invalidCredentialsError,
  validationErrorMessage,
  dashboardHeader,
  dashboardContainer,
  loginPageContainer
} from '../pageObjects/loginPage.js';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Navigation Methods
  async navigateToLoginPage(url) {
    await this.open(url);
    await this.waitForPageLoad();
  }

  async navigateToConfigurationsPage() {
    await this.open('http://localhost:3000/configurations');
    await this.waitForPageLoad();
  }

  // Login Actions
  async enterEmail(email) {
    await this.waitAndFill(emailInput, email);
  }

  async enterPassword(password) {
    await this.waitAndFill(passwordInput, password);
  }

  async enterEmailWithSpaces(email) {
    await this.waitAndFill(emailInput, `  ${email}  `);
  }

  async enterPasswordWithSpaces(password) {
    await this.waitAndFill(passwordInput, `  ${password}  `);
  }

  async clickLoginButton() {
    await this.waitAndClick(loginButton);
    await this.waitforNetworkIdle();
  }

  async leaveEmailEmpty() {
    await this.waitAndFill(emailInput, '');
  }

  async leavePasswordEmpty() {
    await this.waitAndFill(passwordInput, '');
  }

  async loginWithCredentials(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async loginWithRoleCredentials(roleName) {
    const credentials = this.getLoginDataByRole(roleName);
    await this.enterEmail(credentials.username);
    await this.enterPassword(credentials.password);
    await this.clickLoginButton();
  }

  // Verification Methods
  async verifyLoginPageIsDisplayed() {
    await this.wait();
    const isVisible = await this.isElementVisible(loginPageContainer);
    expect(isVisible).toBeTruthy();
  }

  async verifyEmailErrorMessage(expectedMessage) {
    await this.wait();
    await this.verifyElementContainsText(emailErrorMessage, expectedMessage);
  }

  async verifyPasswordErrorMessage(expectedMessage) {
    await this.wait();
    await this.verifyElementContainsText(passwordErrorMessage, expectedMessage);
  }

  async verifyInvalidCredentialsError(expectedMessage) {
    await this.wait();
    await this.verifyElementContainsText(invalidCredentialsError, expectedMessage);
  }

  async verifyValidationErrorDisplayed() {
    await this.wait();
    const isVisible = await this.isElementVisible(validationErrorMessage);
    expect(isVisible).toBeTruthy();
  }

  async verifyDashboardIsDisplayed() {
    await this.wait();
    const isVisible = await this.isElementVisible(dashboardHeader);
    expect(isVisible).toBeTruthy();
  }

  async verifyRedirectionToDashboard() {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain('dashboard');
  }

  async verifyForgotPasswordLinkIsVisible() {
    await this.wait();
    const isVisible = await this.isElementVisible(forgotPasswordLink);
    expect(isVisible).toBeTruthy();
  }

  async verifyForgotPasswordLinkIsClickable() {
    await this.wait();
    const isEnabled = await this.page.isEnabled(forgotPasswordLink);
    expect(isEnabled).toBeTruthy();
  }

  async verifyPasswordFieldMasksInput() {
    await this.wait();
    const inputType = await this.page.getAttribute(passwordInput, 'type');
    expect(inputType).toBe('password');
  }

  async verifyEmailFieldAcceptsInput(email) {
    await this.wait();
    const value = await this.page.inputValue(emailInput);
    expect(value).toBe(email);
  }

  async verifyUserRemainsOnLoginPage() {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain('login');
  }

  // API Methods
  async sendLoginAPIRequest(payload) {
    const response = await this.page.request.post('/api/login', {
      data: payload
    });
    return response;
  }

  async verifyAPIResponseStatusCode(response, expectedStatusCode) {
    expect(response.status()).toBe(expectedStatusCode);
  }

  async verifyAPIResponseContainsToken(response) {
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
    expect(responseBody.token).toBeTruthy();
  }

  async verifyAPIResponseContainsError(response) {
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  }

  async measureAPIResponseTime(payload) {
    const startTime = Date.now();
    await this.sendLoginAPIRequest(payload);
    const endTime = Date.now();
    return endTime - startTime;
  }

  async verifyResponseTimeIsAcceptable(responseTime, maxTime) {
    expect(responseTime).toBeLessThan(maxTime);
  }

  // Performance Methods
  async measurePageLoadTime() {
    const startTime = Date.now();
    await this.page.waitForLoadState('domcontentloaded');
    const endTime = Date.now();
    return endTime - startTime;
  }

  async verifyPageLoadTimeIsAcceptable(loadTime, maxTime) {
    expect(loadTime).toBeLessThan(maxTime);
  }

  // Security Methods
  async verifyPasswordNotInConsoleLogs() {
    const logs = [];
    this.page.on('console', msg => logs.push(msg.text()));
    const logText = logs.join(' ');
    expect(logText).not.toContain('password');
  }

  async verifyHTTPSConnection() {
    const currentUrl = await this.getUrl();
    expect(currentUrl).toMatch(/^https:/);
  }

  // Session Methods
  async waitForSessionTimeout(timeoutMs) {
    await this.page.waitForTimeout(timeoutMs);
  }

  async attemptToAccessProtectedResource(url) {
    await this.open(url);
    await this.waitForPageLoad();
  }
}

