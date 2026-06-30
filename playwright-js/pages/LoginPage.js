const { expect } = require('@playwright/test');
const config = require('../config/test-config');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async navigate() {
    await this.page.goto(config.BASE_URL || 'https://hr.quality-matrix.us/web/index.php/auth/login');
  }

  async login(username, password) {
    const user = username || config.credentials.username || 'adminhrqa';
    const pass = password || config.credentials.password || 'Adminhrqa@321';
    
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
    
    // Wait for navigation after login
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = LoginPage;

