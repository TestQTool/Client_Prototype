import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.validationError = page.locator('.alert-danger, .error, [role="alert"]');
  }

  async navigateToLoginPage() {
    await this.open('/login/index.php');
  }

  async verifyLoginPageDisplayed() {
    await this.expectVisible(this.usernameInput);
    await this.expectVisible(this.passwordInput);
    await this.expectVisible(this.loginButton);
  }

  async leaveBothFieldsEmpty() {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }

  async verifyBothFieldsBlank() {
    await expect(this.usernameInput).toHaveValue('');
    await expect(this.passwordInput).toHaveValue('');
  }

  async clickLoginButton() {
    await this.click(this.loginButton);
  }

  async verifyFormAttemptedSubmission() {
    // Technical step: wait for form submission attempt
    await this.page.waitForTimeout(500);
  }

  async verifyValidationErrorsDisplayed() {
    await this.expectVisible(this.validationError);
  }

  async verifyUserRemainsOnLoginPage() {
    await expect(this.page).toHaveURL(/\/login\/index\.php/);
    await this.expectVisible(this.loginButton);
  }
}

