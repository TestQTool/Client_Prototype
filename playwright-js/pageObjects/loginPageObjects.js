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
      errorMessage: '.oxd-alert-content--error',
      loginPage: '.orangehrm-login-form',
      dashboardPage: '.oxd-topbar-header-breadcrumb'
    };
  }

  /**
   * Navigate to login page
   * @param {string} url - Login page URL
   */
  async navigateToLoginPage(url) {
    await this.page.goto(url);
    await this.page.waitForSelector(this.selectors.loginPage, { timeout: 10000 });
  }

  /**
   * Enter username
   * @param {string} username - Username to enter
   */
  async enterUsername(username) {
    await this.page.fill(this.selectors.usernameInput, username);
  }

  /**
   * Enter password
   * @param {string} password - Password to enter
   */
  async enterPassword(password) {
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
   * @returns {Promise<string>} Error message text
   */
  async getErrorMessage() {
    await this.page.waitForSelector(this.selectors.errorMessage, { timeout: 5000 });
    return await this.page.textContent(this.selectors.errorMessage);
  }

  /**
   * Check if error message is visible
   * @returns {Promise<boolean>} True if error message is visible
   */
  async isErrorMessageVisible() {
    return await this.page.isVisible(this.selectors.errorMessage);
  }

  /**
   * Check if user is on login page
   * @returns {Promise<boolean>} True if on login page
   */
  async isOnLoginPage() {
    return await this.page.isVisible(this.selectors.loginPage);
  }

  /**
   * Check if user is on dashboard
   * @returns {Promise<boolean>} True if on dashboard
   */
  async isOnDashboard() {
    try {
      await this.page.waitForSelector(this.selectors.dashboardPage, { timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = LoginPageObjects;

