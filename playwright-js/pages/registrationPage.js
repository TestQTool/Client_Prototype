import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import { registrationPageLocators } from '../pageObjects/registrationPage.js';

class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async navigateToRegistration() {
    await this.open('/register');
    return await this.waitForPageLoad();
  }

  async verifyRegistrationFormDisplayed() {
    await this.wait();
    const formVisible = await this.isElementVisible(registrationPageLocators.registrationForm) || 
                        await this.isElementVisible(registrationPageLocators.registrationFormAlt);
    expect(formVisible).toBeTruthy();
  }

  async verifyAllRequiredFieldsDisplayed() {
    await this.wait();
    
    const emailVisible = await this.isElementVisible(registrationPageLocators.emailInput) || 
                         await this.isElementVisible(registrationPageLocators.emailInputAlt);
    const passwordVisible = await this.isElementVisible(registrationPageLocators.passwordInput) || 
                           await this.isElementVisible(registrationPageLocators.passwordInputAlt);
    const confirmPasswordVisible = await this.isElementVisible(registrationPageLocators.confirmPasswordInput) || 
                                  await this.isElementVisible(registrationPageLocators.confirmPasswordInputAlt);
    const submitVisible = await this.isElementVisible(registrationPageLocators.submitButton) || 
                         await this.isElementVisible(registrationPageLocators.submitButtonAlt);
    
    expect(emailVisible).toBeTruthy();
    expect(passwordVisible).toBeTruthy();
    expect(confirmPasswordVisible).toBeTruthy();
    expect(submitVisible).toBeTruthy();
  }

  async fillRegistrationForm(email, password, confirmPassword = null) {
    try {
      await this.waitAndFill(registrationPageLocators.emailInput, email);
    } catch {
      await this.waitAndFill(registrationPageLocators.emailInputAlt, email);
    }
    
    try {
      await this.waitAndFill(registrationPageLocators.passwordInput, password);
    } catch {
      await this.waitAndFill(registrationPageLocators.passwordInputAlt, password);
    }
    
    if (confirmPassword !== null) {
      try {
        await this.waitAndFill(registrationPageLocators.confirmPasswordInput, confirmPassword);
      } catch {
        await this.waitAndFill(registrationPageLocators.confirmPasswordInputAlt, confirmPassword);
      }
    }
  }

  async submitRegistration() {
    try {
      await this.waitAndClick(registrationPageLocators.submitButton);
    } catch {
      await this.waitAndClick(registrationPageLocators.submitButtonAlt);
    }
    await this.waitforNetworkIdle();
  }

  async registerUser(email, password, confirmPassword = null) {
    const confirmPwd = confirmPassword === null ? password : confirmPassword;
    await this.fillRegistrationForm(email, password, confirmPwd);
    await this.submitRegistration();
  }

  async verifySuccessfulRegistration() {
    await this.wait();
    const successVisible = await this.isElementVisible(registrationPageLocators.successMessage) || 
                          await this.isElementVisible(registrationPageLocators.successMessageAlt);
    expect(successVisible).toBeTruthy();
  }

  async verifyEmailRequiredError() {
    await this.wait();
    const errorVisible = await this.isElementVisible(registrationPageLocators.emailRequiredError);
    expect(errorVisible).toBeTruthy();
  }

  async verifyPasswordRequiredError() {
    await this.wait();
    const errorVisible = await this.isElementVisible(registrationPageLocators.passwordRequiredError);
    expect(errorVisible).toBeTruthy();
  }

  async verifyInvalidEmailFormatError() {
    await this.wait();
    const errorVisible = await this.isElementVisible(registrationPageLocators.emailFormatError);
    expect(errorVisible).toBeTruthy();
  }

  async verifyPasswordMismatchError() {
    await this.wait();
    const errorVisible = await this.isElementVisible(registrationPageLocators.passwordMismatchError);
    expect(errorVisible).toBeTruthy();
  }

  async verifyDuplicateEmailError() {
    await this.wait();
    const errorVisible = await this.isElementVisible(registrationPageLocators.duplicateEmailError);
    expect(errorVisible).toBeTruthy();
  }

  async verifyRegistrationFails() {
    await this.wait();
    const successNotVisible = !(await this.isElementVisible(registrationPageLocators.successMessage)) && 
                              !(await this.isElementVisible(registrationPageLocators.successMessageAlt));
    expect(successNotVisible).toBeTruthy();
  }

  async fillEmailWithMaxLength(maxLength = 255) {
    const longEmail = 'a'.repeat(maxLength - 13) + '@example.com';
    try {
      await this.waitAndFill(registrationPageLocators.emailInput, longEmail);
    } catch {
      await this.waitAndFill(registrationPageLocators.emailInputAlt, longEmail);
    }
    return longEmail;
  }

  generateUniqueEmail() {
    const timestamp = Date.now();
    return `testuser${timestamp}@example.com`;
  }

  generateValidPassword() {
    return 'ValidPass123!';
  }
}

export default RegistrationPage;

