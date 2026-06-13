// Login Page - Actions and Assertions
// Generated for OrangeHRM Login

import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import { loginPageLocators } from '../pageObjects/loginPage.js';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async login(username, password) {
    await this.waitAndFill(loginPageLocators.usernameInput, username);
    await this.waitAndFill(loginPageLocators.passwordInput, password);
    await this.waitAndClick(loginPageLocators.loginButton);
    await this.waitForPageLoad();
  }

  async verifyLoginSuccess() {
    await this.wait();
    const isVisible = await this.isElementVisible(loginPageLocators.dashboardHeader);
    expect(isVisible).toBeTruthy();
  }

  async verifyLoginError() {
    await this.wait();
    const isVisible = await this.isElementVisible(loginPageLocators.errorMessage);
    expect(isVisible).toBeTruthy();
  }
}

export default LoginPage;