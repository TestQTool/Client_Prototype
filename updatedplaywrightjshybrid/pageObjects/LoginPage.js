import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]').or(page.getByPlaceholder('Username'));
    this.passwordInput = page.locator('input[name="password"]').or(page.getByPlaceholder('Password'));
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async navigateToLoginPage() {
    await this.open('/web/index.php/auth/login');
  }

  async enterCredentials(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
  }

  async submitLoginForm() {
    await this.click(this.loginButton);
  }

  async expectLoginPageOpen() {
    await expect(this.page).toHaveURL(/\/auth\/login/);
    await this.expectVisible(this.usernameInput);
  }

  async expectCredentialsEntered() {
    await expect(this.usernameInput).not.toBeEmpty();
    await expect(this.passwordInput).not.toBeEmpty();
  }

  async expectAuthenticated() {
    await expect(this.page).not.toHaveURL(/\/auth\/login/);
    await this.page.waitForLoadState('domcontentloaded');
  }
}

