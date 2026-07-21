import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Stable selectors from live inspection evidence
    this.usernameInput = page.locator('#username').or(page.locator('input[name="username"]'));
    this.passwordInput = page.locator('#password').or(page.locator('input[name="password"]'));
    this.loginButton = page.locator('#loginbtn');
  }

  async navigateToLoginPage() {
    await this.open(process.env.BASE_URL);
  }

  async verifyUsernameFieldVisible() {
    await expect(this.usernameInput).toBeVisible();
  }

  async verifyPasswordFieldVisible() {
    await expect(this.passwordInput).toBeVisible();
  }

  async verifyLoginButtonVisible() {
    await expect(this.loginButton).toBeVisible();
  }
}

