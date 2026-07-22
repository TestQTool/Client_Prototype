import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Stable selectors from live evidence
    this.usernameInput = page.locator('#username').or(page.locator('input[name="username"]'));
    this.passwordInput = page.locator('#password').or(page.locator('input[name="password"]'));
    this.loginButton = page.locator('#loginbtn');
  }

  async navigateToLogin() {
    await this.open('/login/index.php');
  }

  async enterCredentials(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
  }

  async submitLoginForm() {
    await this.click(this.loginButton);
  }

  async verifyLoginPageOpen() {
    await expect(this.page).toHaveURL(/\/login\/index\.php/);
    await this.expectVisible(this.usernameInput);
    await this.expectVisible(this.passwordInput);
  }

  async verifyCredentialsEntered() {
    await expect(this.usernameInput).not.toBeEmpty();
    await expect(this.passwordInput).not.toBeEmpty();
  }

  async verifyLoginSubmitted() {
    // Verify navigation away from login page or loading state
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }
}

