const { expect } = require('@playwright/test');

class RegistrationPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.confirmPasswordInput = page.locator('#confirmPassword');
    this.phoneInput = page.locator('#phone');
    this.termsCheckbox = page.locator('#termsCheckbox');
    this.registerButton = page.locator('button[type="submit"], #registerBtn, .register-button');
    this.successMessage = page.locator('.success-message, .registration-success, [data-testid="success-message"]');
    this.errorMessage = page.locator('.error-message, .registration-error, [data-testid="error-message"]');
    this.registrationForm = page.locator('form#registrationForm, .registration-form, [data-testid="registration-form"]');
  }

  async navigate(baseUrl) {
    const url = baseUrl || process.env.BASE_URL || 'https://example.com';
    await this.page.goto(`${url}/register`);
  }

  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
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

  async fillPhone(phone) {
    await this.phoneInput.fill(phone);
  }

  async acceptTerms() {
    await this.termsCheckbox.check();
  }

  async clickRegisterButton() {
    await this.registerButton.click();
  }

  async fillRegistrationForm(userData) {
    if (userData.firstName) await this.fillFirstName(userData.firstName);
    if (userData.lastName) await this.fillLastName(userData.lastName);
    if (userData.email) await this.fillEmail(userData.email);
    if (userData.password) await this.fillPassword(userData.password);
    if (userData.confirmPassword) await this.fillConfirmPassword(userData.confirmPassword);
    if (userData.phone) await this.fillPhone(userData.phone);
    if (userData.acceptTerms) await this.acceptTerms();
  }

  async submitRegistration(userData) {
    await this.fillRegistrationForm(userData);
    await this.clickRegisterButton();
  }

  async verifySuccessMessage(expectedMessage) {
    await expect(this.successMessage).toBeVisible();
    if (expectedMessage) {
      await expect(this.successMessage).toContainText(expectedMessage);
    }
  }

  async verifyErrorMessage(expectedMessage) {
    await expect(this.errorMessage).toBeVisible();
    if (expectedMessage) {
      await expect(this.errorMessage).toContainText(expectedMessage);
    }
  }

  async verifyRegistrationFormDisplayed() {
    await expect(this.registrationForm).toBeVisible();
  }

  async verifyFieldValidationError(fieldLocator, errorMessage) {
    const field = this.page.locator(fieldLocator);
    await expect(field).toBeVisible();
    const validationMessage = await field.evaluate(el => el.validationMessage);
    if (errorMessage) {
      expect(validationMessage).toContain(errorMessage);
    }
  }
}

module.exports = { RegistrationPage };
