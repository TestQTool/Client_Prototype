/**
 * Login Page Objects
 * Contains selectors and actions for the login page
 */

class LoginPageObjects {
  constructor(page) {
    this.page = page;
    
    // Selectors
    this.selectors = {
      usernameInput: 'input[name="username"]',
      passwordInput: 'input[name="password"]',
      loginButton: 'button[type="submit"]',
      errorMessage: '.oxd-alert-content',
      loginPanel: '.orangehrm-login-slot',
      dashboardHeader: '.oxd-topbar-header-breadcrumb'
    };
  }

  /**
   * Navigate to the login page
   * @param {string} url - The URL to navigate to
   */
  async navigateToLoginPage(url) {
    await this.page.goto(url, { waitUntil: 'networkidle' });
    await this.page.waitForSelector(this.selectors.loginPanel);
  }

  /**
   * Enter username
   * @param {string} username - The username to enter
   */
  async enterUsername(username) {
    await this.page.waitForSelector(this.selectors.usernameInput);
    await this.page.fill(this.selectors.usernameInput, username);
  }

  /**
   * Enter password
   * @param {string} password - The password to enter
   */
  async enterPassword(password) {
    await this.page.waitForSelector(this.selectors.passwordInput);
    await this.page.fill(this.selectors.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLoginButton() {
    await this.page.click(this.selectors.loginButton);
  }

  /**
   * Get error message text
   * @returns {Promise<string>} The error message text
   */
  async getErrorMessage() {
    await this.page.waitForSelector(this.selectors.errorMessage, { timeout: 5000 });
    return await this.page.textContent(this.selectors.errorMessage);
  }

  /**
   * Check if error message is displayed
   * @returns {Promise<boolean>} True if error message is visible
   */
  async isErrorMessageDisplayed() {
    try {
      await this.page.waitForSelector(this.selectors.errorMessage, { timeout: 5000 });
      return await this.page.isVisible(this.selectors.errorMessage);
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if user is on login page
   * @returns {Promise<boolean>} True if login panel is visible
   */
  async isOnLoginPage() {
    try {
      return await this.page.isVisible(this.selectors.loginPanel);
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if user is on dashboard
   * @returns {Promise<boolean>} True if dashboard header is visible
   */
  async isOnDashboard() {
    try {
      await this.page.waitForSelector(this.selectors.dashboardHeader, { timeout: 5000 });
      return await this.page.isVisible(this.selectors.dashboardHeader);
    } catch (error) {
      return false;
    }
  }

  /**
   * Get current page URL
   * @returns {Promise<string>} The current page URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }
}

module.exports = LoginPageObjects;

