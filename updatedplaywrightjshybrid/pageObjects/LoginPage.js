import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginLink = page.locator('#login2');
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.locator('button').filter({ hasText: 'Log in' }).first();
    this.welcomeUserLink = page.locator('#nameofuser');
    this.logoutLink = page.locator('#logout2');
  }

  async navigateToHome() {
    await this.open('/');
  }

  async verifyHomePageLoaded() {
    await expect(this.page).toHaveTitle('STORE');
    await expect(this.page).toHaveURL(/demoblaze\.com/);
  }

  async clickLoginLink() {
    await this.click(this.loginLink);
  }

  async verifyLoginModalOpened() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
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

  async verifyLoginSubmitted() {
    await this.page.waitForTimeout(1000);
  }

  async verifyUserAuthenticatedOnHomePage(username) {
    await expect(this.page).toHaveURL(/demoblaze\.com/);
    await expect(this.welcomeUserLink).toBeVisible();
    await expect(this.welcomeUserLink).toContainText(username);
  }

  async verifyLogoutOptionVisible() {
    await expect(this.logoutLink).toBeVisible();
  }
}

