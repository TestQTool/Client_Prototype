import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginLink = page.locator('#login2');
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.locator('button').filter({ hasText: 'Log in' }).first();
    this.logoutLink = page.locator('#logout2');
    this.welcomeUser = page.locator('#nameofuser');
  }

  async navigateToHome() {
    await this.open('/');
  }

  async openLoginModal() {
    await this.click(this.loginLink);
    await expect(this.usernameInput).toBeVisible();
  }

  async fillUsername(username) {
    await this.fill(this.usernameInput, username);
  }

  async fillPassword(password) {
    await this.fill(this.passwordInput, password);
  }

  async clickLogin() {
    await this.click(this.loginButton);
  }

  async login(username, password) {
    await this.openLoginModal();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async verifyAuthenticationSuccessful() {
    await expect(this.welcomeUser).toBeVisible({ timeout: 10000 });
    await expect(this.logoutLink).toBeVisible();
  }
}

