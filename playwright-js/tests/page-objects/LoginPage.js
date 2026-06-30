/**
 * Login Page Object
 * Handles authentication and session management
 */

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
  }

  /**
   * Navigate to login page
   * @param {string} url - Login URL
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Perform login action
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Extract authentication cookies
   * @returns {Promise<Array>} Array of cookies
   */
  async getAuthCookies() {
    return await this.page.context().cookies();
  }

  /**
   * Get session token from cookies
   * @returns {Promise<string|null>} Session token or null
   */
  async getSessionToken() {
    const cookies = await this.getAuthCookies();
    const sessionCookie = cookies.find(c => 
      c.name.toLowerCase().includes('session') || 
      c.name.toLowerCase().includes('token')
    );
    return sessionCookie ? sessionCookie.value : null;
  }

  /**
   * Format cookies for API requests
   * @returns {Promise<string>} Cookie string
   */
  async getCookieString() {
    const cookies = await this.getAuthCookies();
    return cookies.map(c => `${c.name}=${c.value}`).join('; ');
  }
}

module.exports = { LoginPage };

