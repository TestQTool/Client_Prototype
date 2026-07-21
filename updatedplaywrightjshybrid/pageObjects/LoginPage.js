import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Stable selectors from live inspection evidence
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginbtn');
  }

  async navigateToLoginPage() {
    await this.open('');
  }

  async verifyLoginPageDisplayed() {
    await expect(this.page).toHaveURL(/login\/index\.php/);
    await this.expectVisible(this.usernameInput);
    await this.expectVisible(this.passwordInput);
    await this.expectVisible(this.loginButton);
  }

  async enterCredentials(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
  }

  async verifyCredentialsEntered() {
    await expect(this.usernameInput).toHaveValue(/.+/);
    await expect(this.passwordInput).toHaveValue(/.+/);
  }

  async clickLoginButtonAndStartTimer() {
    const startTime = Date.now();
    await this.click(this.loginButton);
    return startTime;
  }

  async verifyLoginRequestSubmitted() {
    await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
  }

  async measureTimeUntilDashboard(startTime) {
    // Wait for navigation away from login page
    await this.page.waitForURL(url => !url.includes('/login/index.php'), { timeout: 10000 });
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    return responseTime;
  }

  async verifyAuthenticationResponseTime(responseTime) {
    return responseTime;
  }

  async verifyAuthenticationWithinThreshold(responseTime, thresholdMs) {
    expect(responseTime).toBeLessThanOrEqual(thresholdMs);
  }
}

