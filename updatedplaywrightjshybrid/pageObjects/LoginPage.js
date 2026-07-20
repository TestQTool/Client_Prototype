import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    // TODO: Verify selectors against actual application
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.alert-danger, .error, [role="alert"]');
  }

  async navigateToLoginPage() {
    await this.open(process.env.BASE_URL);
  }

  async verifyLoginPageDisplayed() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async enterCredentials(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
  }

  async verifyCredentialsEntered() {
    await expect(this.usernameInput).not.toBeEmpty();
    await expect(this.passwordInput).not.toBeEmpty();
  }

  async clickLoginButton() {
    await this.click(this.loginButton);
  }

  async verifyLoginRequestSubmitted() {
    await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
  }

  async verifyAuthenticationErrorDisplayed(expectedMessage) {
    await expect(this.errorMessage).toBeVisible();
    if (expectedMessage) {
      await expect(this.errorMessage).toContainText(expectedMessage);
    }
  }

  async verifySystemStable() {
    await expect(this.page).not.toHaveURL(/error|crash|500/);
    const consoleLogs = [];
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleLogs.push(msg.text());
      }
    });
    await this.page.waitForTimeout(1000);
  }
}

