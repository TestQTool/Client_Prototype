import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import { loginPageLocators, configurationsPageLocators } from '../pageObjects/loginPage.js';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  /**
   * Navigate to the configurations page (which triggers login)
   */
  async navigateToConfigurations() {
    await this.open('/configurations');
    await this.waitForPageLoad();
  }

  /**
   * Fill username field
   * @param {string} username - The username to enter
   */
  async enterUsername(username) {
    await this.waitAndFill(loginPageLocators.usernameInput, username);
  }

  /**
   * Fill password field
   * @param {string} password - The password to enter
   */
  async enterPassword(password) {
    await this.waitAndFill(loginPageLocators.passwordInput, password);
  }

  /**
   * Enter login credentials
   * @param {string} username - The username
   * @param {string} password - The password
   */
  async enterCredentials(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
  }

  /**
   * Click the login button
   */
  async clickLoginButton() {
    await this.waitAndClick(loginPageLocators.loginButton);
    await this.waitforNetworkIdle();
  }

  /**
   * Click the logout button
   */
  async clickLogoutButton() {
    await this.waitAndClick(loginPageLocators.logoutButton);
    await this.waitforNetworkIdle();
  }

  /**
   * Perform complete login flow
   * @param {string} username - The username
   * @param {string} password - The password
   */
  async login(username, password) {
    await this.enterCredentials(username, password);
    await this.clickLoginButton();
  }

  /**
   * Perform complete logout flow
   */
  async logout() {
    await this.clickLogoutButton();
  }

  /**
   * Refresh the current page
   */
  async refreshPage() {
    await this.page.reload();
    await this.waitForPageLoad();
  }

  /**
   * Attempt to access a protected page without authentication
   * @param {string} url - The protected page URL
   */
  async attemptAccessProtectedPage(url) {
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  /**
   * Get authentication token from storage or cookies
   * @returns {Promise<string|null>} - The authentication token or null
   */
  async getAuthToken() {
    const token = await this.page.evaluate(() => {
      return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    });
    return token;
  }

  /**
   * Check if token is accessible via JavaScript
   * @returns {Promise<boolean>} - True if token is accessible
   */
  async isTokenAccessibleViaJS() {
    const token = await this.getAuthToken();
    return token !== null && token !== undefined;
  }

  /**
   * Get cookies including httpOnly cookies
   * @returns {Promise<Array>} - Array of cookies
   */
  async getCookies() {
    const cookies = await this.page.context().cookies();
    return cookies;
  }

  /**
   * Check if authentication token is in httpOnly cookie
   * @returns {Promise<boolean>} - True if token is in httpOnly cookie
   */
  async isTokenInHttpOnlyCookie() {
    const cookies = await this.getCookies();
    const authCookie = cookies.find(c => 
      c.name.toLowerCase().includes('auth') || 
      c.name.toLowerCase().includes('token') ||
      c.name.toLowerCase().includes('session')
    );
    return authCookie ? authCookie.httpOnly : false;
  }

  /**
   * Measure login response time
   * @param {string} username - The username
   * @param {string} password - The password
   * @returns {Promise<number>} - Response time in milliseconds
   */
  async measureLoginResponseTime(username, password) {
    const startTime = Date.now();
    await this.login(username, password);
    const endTime = Date.now();
    return endTime - startTime;
  }

  /**
   * Measure logout response time
   * @returns {Promise<number>} - Response time in milliseconds
   */
  async measureLogoutResponseTime() {
    const startTime = Date.now();
    await this.logout();
    const endTime = Date.now();
    return endTime - startTime;
  }

  /**
   * Submit multiple rapid login attempts
   * @param {string} username - The username
   * @param {string} password - The password
   * @param {number} count - Number of attempts
   */
  async submitMultipleLoginAttempts(username, password, count = 3) {
    await this.enterCredentials(username, password);
    for (let i = 0; i < count; i++) {
      await this.page.locator(loginPageLocators.loginButton).click({ force: true });
    }
    await this.waitforNetworkIdle();
  }

  /**
   * Submit failed login attempts (for brute force testing)
   * @param {string} username - The username
   * @param {number} count - Number of attempts
   */
  async submitFailedLoginAttempts(username, count = 5) {
    for (let i = 0; i < count; i++) {
      await this.enterCredentials(username, `wrongpassword${i}`);
      await this.clickLoginButton();
      await this.wait(500);
    }
  }

  /**
   * Verify user is redirected to configurations page
   */
  async verifyRedirectToConfigurationsPage() {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain('/configurations');
  }

  /**
   * Verify user is redirected to login page
   */
  async verifyRedirectToLoginPage() {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toMatch(/(login|auth|configurations)/);
  }

  /**
   * Verify error message is displayed
   * @param {string} expectedMessage - Optional expected message text
   */
  async verifyErrorMessageDisplayed(expectedMessage = null) {
    await this.wait();
    const isVisible = await this.isElementVisible(loginPageLocators.errorMessage);
    expect(isVisible).toBeTruthy();
    
    if (expectedMessage) {
      await this.verifyElementContainsText(loginPageLocators.errorMessage, expectedMessage);
    }
  }

  /**
   * Verify validation error for required username
   */
  async verifyUsernameRequiredError() {
    await this.wait();
    const isVisible = await this.isElementVisible(loginPageLocators.usernameRequiredError);
    expect(isVisible).toBeTruthy();
  }

  /**
   * Verify validation error for required password
   */
  async verifyPasswordRequiredError() {
    await this.wait();
    const isVisible = await this.isElementVisible(loginPageLocators.passwordRequiredError);
    expect(isVisible).toBeTruthy();
  }

  /**
   * Verify invalid credentials error
   */
  async verifyInvalidCredentialsError() {
    await this.wait();
    const isVisible = await this.isElementVisible(loginPageLocators.invalidCredentialsError);
    expect(isVisible).toBeTruthy();
  }

  /**
   * Verify user session is established
   */
  async verifySessionEstablished() {
    await this.wait();
    const hasToken = await this.getAuthToken();
    const hasCookie = await this.isTokenInHttpOnlyCookie();
    expect(hasToken || hasCookie).toBeTruthy();
  }

  /**
   * Verify user session persists after page refresh
   */
  async verifySessionPersists() {
    await this.wait();
    await this.refreshPage();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain('/configurations');
  }

  /**
   * Verify configurations page content is visible
   */
  async verifyConfigurationsPageVisible() {
    await this.wait();
    const isVisible = await this.isElementVisible(configurationsPageLocators.pageContent);
    expect(isVisible).toBeTruthy();
  }

  /**
   * Verify authentication token is stored securely
   */
  async verifyTokenStoredSecurely() {
    await this.wait();
    const isHttpOnly = await this.isTokenInHttpOnlyCookie();
    expect(isHttpOnly).toBeTruthy();
  }

  /**
   * Verify token is not accessible via JavaScript (XSS protection)
   */
  async verifyTokenNotAccessibleViaJS() {
    await this.wait();
    const isAccessible = await this.isTokenAccessibleViaJS();
    const isHttpOnly = await this.isTokenInHttpOnlyCookie();
    expect(isAccessible && !isHttpOnly).toBeFalsy();
  }

  /**
   * Verify session expires after logout
   */
  async verifySessionExpired() {
    await this.wait();
    const token = await this.getAuthToken();
    expect(token).toBeNull();
  }

  /**
   * Verify response time is within acceptable limit
   * @param {number} responseTime - Measured response time in ms
   * @param {number} maxTime - Maximum acceptable time in ms
   */
  async verifyResponseTimeAcceptable(responseTime, maxTime) {
    await this.wait();
    expect(responseTime).toBeLessThanOrEqual(maxTime);
  }

  /**
   * Verify application handles input without error
   */
  async verifyNoSystemError() {
    await this.wait();
    const hasError = await this.page.locator('body').evaluate(node => {
      return node.textContent.toLowerCase().includes('error') || 
             node.textContent.toLowerCase().includes('exception') ||
             node.textContent.toLowerCase().includes('crash');
    });
    expect(hasError).toBeFalsy();
  }

  /**
   * Verify account lockout or rate limiting is triggered
   */
  async verifyBruteForcePrevention() {
    await this.wait();
    const errorText = await this.page.locator(loginPageLocators.errorMessage).textContent();
    const isLocked = errorText.toLowerCase().includes('locked') || 
                     errorText.toLowerCase().includes('too many') ||
                     errorText.toLowerCase().includes('rate limit');
    expect(isLocked).toBeTruthy();
  }

  /**
   * Verify only one successful login session exists
   */
  async verifySingleActiveSession() {
    await this.wait();
    const sessionCount = await this.getCount(loginPageLocators.sessionIndicator);
    expect(sessionCount).toBeLessThanOrEqual(1);
  }
}

export default LoginPage;

