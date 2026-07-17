import BasePage from '../core/BasePage.js';
import { expect } from '@playwright/test';

export default class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    
    // TODO: Verify selectors - inferred from common registration form patterns
    this.usernameInput = page.getByLabel('Username');
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password', { exact: true });
    this.confirmPasswordInput = page.getByLabel('Confirm Password');
    this.submitButton = page.getByRole('button', { name: 'Register' });
    this.usernameRequiredError = page.getByText('Username is required').or(page.getByText('Required'));
    this.pageHeading = page.getByRole('heading', { name: /register|sign up/i });
  }

  async navigate() {
    await this.page.goto(`${process.env.BASE_URL}/web/index.php/auth/login`);
  }

  async leaveUsernameEmpty() {
    // Ensure username field remains blank - no action needed
    await this.usernameInput.clear();
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async fillConfirmPassword(confirmPassword) {
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async submitRegistrationForm() {
    await this.submitButton.click();
  }

  async verifyRegistrationPageDisplayed() {
    await expect(this.pageHeading).toBeVisible();
  }

  async verifyUsernameFieldBlank() {
    await expect(this.usernameInput).toHaveValue('');
  }

  async verifyOtherFieldsFilled(email, password, confirmPassword) {
    await expect(this.emailInput).toHaveValue(email);
    await expect(this.passwordInput).toHaveValue(password);
    await expect(this.confirmPasswordInput).toHaveValue(confirmPassword);
  }

  async verifyUsernameRequiredMessageDisplayed() {
    await expect(this.usernameRequiredError).toBeVisible();
  }

  async verifyUserRemainsOnRegistrationPage() {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.page).toHaveURL(/register|signup|auth/i);
  }
}

