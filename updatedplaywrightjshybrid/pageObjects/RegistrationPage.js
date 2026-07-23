import BasePage from '../core/BasePage.js';
import { expect } from '@playwright/test';

export default class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Locators - TODO: Verify selectors against live application
    this.usernameInput = page.locator('input[name="username"]').or(page.getByPlaceholder('Username'));
    this.emailInput = page.locator('input[name="email"]').or(page.getByPlaceholder('Email'));
    this.passwordInput = page.locator('input[name="password"]').or(page.getByPlaceholder('Password'));
    this.confirmPasswordInput = page.locator('input[name="confirmPassword"]').or(page.getByPlaceholder('Confirm Password'));
    this.phoneInput = page.locator('input[name="phone"]').or(page.getByPlaceholder('Phone Number'));
    this.addressInput = page.locator('input[name="address"]').or(page.getByPlaceholder('Address'));
    this.submitButton = page.getByRole('button', { name: /submit|register/i });
    this.successMessage = page.locator('.success-message, .alert-success, [role="alert"]');
    this.userProfileSection = page.locator('.profile, .user-info, [data-testid="user-profile"]');
  }

  async navigateToRegistrationPage() {
    await this.page.goto(process.env.BASE_URL);
    // TODO: Add navigation steps to reach registration page from login page
    // This may require clicking a "Register" or "Sign Up" link
    const registerLink = this.page.getByRole('link', { name: /register|sign up/i });
    if (await registerLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await registerLink.click();
    }
  }

  async verifyRegistrationPageDisplayed() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async enterValidCredentials(username, email, password, confirmPassword) {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async verifyRequiredFieldsFilled() {
    await expect(this.usernameInput).toHaveValue(/.+/);
    await expect(this.emailInput).toHaveValue(/.+/);
    await expect(this.passwordInput).toHaveValue(/.+/);
    await expect(this.confirmPasswordInput).toHaveValue(/.+/);
  }

  async enterOptionalFields(phone, address) {
    await this.phoneInput.fill(phone);
    await this.addressInput.fill(address);
  }

  async verifyOptionalFieldsFilled() {
    await expect(this.phoneInput).toHaveValue(/.+/);
    await expect(this.addressInput).toHaveValue(/.+/);
  }

  async submitRegistrationForm() {
    await this.submitButton.click();
  }

  async verifyRegistrationSubmitted() {
    // Wait for navigation or success indicator
    await this.page.waitForLoadState('networkidle');
  }

  async verifySuccessMessageDisplayed(expectedMessage) {
    await expect(this.successMessage).toBeVisible();
    if (expectedMessage) {
      await expect(this.successMessage).toContainText(expectedMessage);
    }
  }

  async verifyUserDataSaved(userData) {
    await expect(this.userProfileSection).toBeVisible();
    
    // Verify username
    const usernameDisplay = this.page.locator('.username, .user-name, [data-testid="username"]');
    await expect(usernameDisplay).toContainText(userData.username);
    
    // Verify email
    const emailDisplay = this.page.locator('.email, .user-email, [data-testid="email"]');
    await expect(emailDisplay).toContainText(userData.email);
    
    // Verify optional fields if present
    if (userData.phone) {
      const phoneDisplay = this.page.locator('.phone, .user-phone, [data-testid="phone"]');
      await expect(phoneDisplay).toContainText(userData.phone);
    }
    
    if (userData.address) {
      const addressDisplay = this.page.locator('.address, .user-address, [data-testid="address"]');
      await expect(addressDisplay).toContainText(userData.address);
    }
  }
}

