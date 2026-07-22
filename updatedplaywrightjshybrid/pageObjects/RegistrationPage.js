import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.signUpLink = page.locator('#signin2');
    this.usernameInput = page.locator('#sign-username');
    this.passwordInput = page.locator('#sign-password');
    this.signUpButton = page.locator('button[onclick="register()"]');
    this.successAlert = page.locator('.alert, [role="alert"]');
    this.registrationModal = page.locator('#signInModal');
  }

  async navigateToHomePage() {
    await this.open('/');
  }

  async verifyHomePageLoaded() {
    await expect(this.page).toHaveURL(/demoblaze\.com/);
    await expect(this.page.locator('#nava')).toBeVisible();
  }

  async clickSignUpButton() {
    await this.click(this.signUpLink);
  }

  async verifyRegistrationModalOpened() {
    await expect(this.registrationModal).toBeVisible();
  }

  async enterUsername(username) {
    await this.fill(this.usernameInput, username);
  }

  async verifyUsernameEntered() {
    await expect(this.usernameInput).not.toBeEmpty();
  }

  async enterPassword(password) {
    await this.fill(this.passwordInput, password);
  }

  async verifyPasswordEntered() {
    await expect(this.passwordInput).not.toBeEmpty();
  }

  async submitRegistration() {
    await this.click(this.signUpButton);
  }

  async verifySuccessMessageDisplayed(expectedMessage) {
    this.page.once('dialog', async dialog => {
      expect(dialog.message()).toContain(expectedMessage);
      await dialog.accept();
    });
  }

  async verifyRegistrationModalClosed() {
    await expect(this.registrationModal).not.toBeVisible({ timeout: 10000 });
  }
}

