import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import { LOGIN_PAGE } from '../pageObjects/loginPage.js';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async navigateToLoginPage(url) {
    await this.open(url);
    await super.waitForPageLoad();
  }

  async verifyLoginPageLoaded() {
    await this.wait();
    await expect(this.page.locator(LOGIN_PAGE.loginForm)).toBeVisible();
  }

  async fillUsername(username) {
    await this.waitAndFill(LOGIN_PAGE.usernameInput, username);
  }

  async fillPassword(password) {
    await this.waitAndFill(LOGIN_PAGE.passwordInput, password);
  }

  async clickLoginButton() {
    await this.waitAndClick(LOGIN_PAGE.loginButton);
    await super.waitforNetworkIdle();
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async verifyLoginSuccessful() {
    await this.wait();
    await expect(this.page.locator(LOGIN_PAGE.dashboardHeader)).toBeVisible();
  }

  async verifyLoginError() {
    await this.wait();
    await expect(this.page.locator(LOGIN_PAGE.errorMessage)).toBeVisible();
  }

  async logout() {
    await this.waitAndClick(LOGIN_PAGE.userDropdown);
    await this.waitAndClick('.oxd-userdropdown-link[href="/web/index.php/auth/logout"]');
    await super.waitForPageLoad();
  }
}

export default LoginPage;

