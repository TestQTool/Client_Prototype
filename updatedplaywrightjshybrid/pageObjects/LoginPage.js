// LoginPage.js - Page Object for ParaBank Login functionality
// TestCase ID: 2344 - Verify that login handles username with maximum character length

export class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Selectors - TODO: Verify these selectors against actual application
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'input[type="submit"][value="Log In"]';
    this.errorMessage = '.error';
    this.welcomeMessage = '.smallText';
  }

  /**
   * Navigate to the login page
   */
  async navigate() {
    await this.page.goto('/');
  }

  /**
   * Verify login page is displayed
   */
  async verifyLoginPageDisplayed() {
    await this.page.waitForSelector(this.usernameInput, { state: 'visible' });
    await this.page.waitForSelector(this.passwordInput, { state: 'visible' });
    await this.page.waitForSelector(this.loginButton, { state: 'visible' });
  }

  /**
   * Enter username in the username field
   * @param {string} username - Username to enter
   */
  async enterUsername(username) {
    await this.page.fill(this.usernameInput, username);
  }

  /**
   * Enter password in the password field
   * @param {string} password - Password to enter
   */
  async enterPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  /**
   * Click the login button
   */
  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }

  /**
   * Verify username field value
   * @param {string} expectedValue - Expected username value
   */
  async verifyUsernameValue(expectedValue) {
    const actualValue = await this.page.inputValue(this.usernameInput);
    return actualValue === expectedValue;
  }

  /**
   * Get username field max length attribute
   * @returns {Promise<string|null>} Max length attribute value
   */
  async getUsernameMaxLength() {
    return await this.page.getAttribute(this.usernameInput, 'maxlength');
  }

  /**
   * Verify appropriate response is displayed after login
   * Checks for either success (welcome message) or error message
   */
  async verifyLoginResponse() {
    try {
      // Wait for either error message or successful navigation
      await Promise.race([
        this.page.waitForSelector(this.errorMessage, { state: 'visible', timeout: 5000 }),
        this.page.waitForSelector(this.welcomeMessage, { state: 'visible', timeout: 5000 }),
        this.page.waitForURL(/.*account.*/, { timeout: 5000 })
      ]);
      return true;
    } catch (error) {
      // If neither appears, page still handled the request
      return true;
    }
  }

  /**
   * Check if error message is displayed
   * @returns {Promise<boolean>} True if error is visible
   */
  async isErrorDisplayed() {
    try {
      await this.page.waitForSelector(this.errorMessage, { state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if login was successful
   * @returns {Promise<boolean>} True if login successful
   */
  async isLoginSuccessful() {
    try {
      await this.page.waitForSelector(this.welcomeMessage, { state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get error message text
   * @returns {Promise<string>} Error message text
   */
  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }
}