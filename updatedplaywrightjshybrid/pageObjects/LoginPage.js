import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors from live inspection evidence - using stable id attributes
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginbtn');
    this.loginForm = page.locator('form').filter({ has: this.usernameInput });
    this.pageHeading = page.locator('h1, h2').filter({ hasText: 'Log in' });
  }

  async navigateToLoginPage() {
    await this.open(process.env.BASE_URL);
  }

  async verifyLoginPageLoaded() {
    await expect(this.page).toHaveURL(/\/login\/index\.php/);
    await expect(this.page).toHaveTitle(/Log in to the site/);
  }

  async verifyLoginFormDisplayed() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async verifyPageTitleOrHeadingIndicatesLoginPage() {
    const pageTitle = await this.page.title();
    expect(pageTitle.toLowerCase()).toContain('log in');
  }
}

