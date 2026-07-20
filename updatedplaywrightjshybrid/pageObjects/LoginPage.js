import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    // TODO: Verify selectors during exploration
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: /log in/i });
    this.dashboardContainer = page.locator('[data-region="drawer"], .page-content, #page-wrapper');
    this.userProfile = page.locator('.userpicture, .user-menu, [data-userid]');
  }

  async navigateToLoginPage() {
    const url = process.env.BASE_URL;
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
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
    await expect(this.usernameInput).toHaveValue(/.+/);
    await expect(this.passwordInput).toHaveValue(/.+/);
  }

  async clickLoginButton() {
    await this.click(this.loginButton);
  }

  async verifyLoginRequestSubmitted() {
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  }

  async verifyDashboardDisplayed() {
    await expect(this.page).toHaveURL(/my|dashboard/, { timeout: 15000 });
    await expect(this.dashboardContainer.first()).toBeVisible({ timeout: 10000 });
  }

  async verifyUserProfileVisible() {
    await expect(this.userProfile.first()).toBeVisible({ timeout: 10000 });
  }
}