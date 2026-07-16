import BasePage from '../core/BasePage.js';
import { expect } from '@playwright/test';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    // TODO: Verify selectors with actual application
    this.usernameInput = page.getByRole('textbox', { name: /username/i });
    this.passwordInput = page.getByRole('textbox', { name: /password/i });
    this.loginButton = page.getByRole('button', { name: /login/i });
  }

  async navigate() {
    await this.page.goto(process.env.BASE_URL);
  }

  async verifyLoginPageDisplayed() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  async verifyUsernameEntered(username) {
    await expect(this.usernameInput).toHaveValue(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async verifyPasswordEntered() {
    await expect(this.passwordInput).not.toBeEmpty();
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async verifyLoginRequestSubmitted() {
    // Technical: Wait for navigation or loading state
    await this.page.waitForLoadState('networkidle');
  }
}

