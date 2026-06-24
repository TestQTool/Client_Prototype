import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import { REGISTRATION_PAGE } from '../pageObjects/RegistrationPage.js';

class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async navigateToRegistration() {
    await this.open(REGISTRATION_PAGE.url);
    return await this.waitForPageLoad();
  }

  async fillEmail(email) {
    await this.waitAndFill(REGISTRATION_PAGE.emailInput, email);
  }

  async fillUsername(username) {
    await this.waitAndFill(REGISTRATION_PAGE.usernameInput, username);
  }

  async fillPassword(password) {
    await this.waitAndFill(REGISTRATION_PAGE.passwordInput, password);
  }

  async clickRegisterButton() {
    await this.waitAndClick(REGISTRATION_PAGE.registerButton);
    await this.wait(1000);
  }

  async clickLoginButton() {
    await this.waitAndClick(REGISTRATION_PAGE.loginButton);
    await this.waitForPageLoad();
  }

  async fillRegistrationForm(username, email, password) {
    if (username) await this.fillUsername(username);
    if (email) await this.fillEmail(email);
    if (password) await this.fillPassword(password);
  }

  async registerUser(username, email, password) {
    await this.fillRegistrationForm(username, email, password);
    await this.clickRegisterButton();
  }

  async verifyValidationErrorDisplayed() {
    await this.wait();
    const isVisible = await this.isElementVisible(REGISTRATION_PAGE.validationErrorMessage);
    expect(isVisible).toBeTruthy();
  }

  async verifyEmailRequiredError() {
    await this.wait();
    const isVisible = await this.isElementVisible(REGISTRATION_PAGE.emailRequiredError);
    expect(isVisible).toBeTruthy();
  }

  async verifyPasswordRequiredError() {
    await this.wait();
    const isVisible = await this.isElementVisible(REGISTRATION_PAGE.passwordRequiredError);
    expect(isVisible).toBeTruthy();
  }

  async verifyInvalidEmailFormatError() {
    await this.wait();
    const isVisible = await this.isElementVisible(REGISTRATION_PAGE.invalidEmailFormatError);
    expect(isVisible).toBeTruthy();
  }

  async verifyPasswordLengthError() {
    await this.wait();
    const isVisible = await this.isElementVisible(REGISTRATION_PAGE.passwordLengthError);
    expect(isVisible).toBeTruthy();
  }

  async verifyEmailAlreadyExistsError() {
    await this.wait();
    const isVisible = await this.isElementVisible(REGISTRATION_PAGE.emailAlreadyExistsError);
    expect(isVisible).toBeTruthy();
  }

  async verifyRegistrationSuccess() {
    await this.wait();
    const isVisible = await this.isElementVisible(REGISTRATION_PAGE.confirmationMessage);
    expect(isVisible).toBeTruthy();
  }

  async verifySuccessMessage() {
    await this.wait();
    const isVisible = await this.isElementVisible(REGISTRATION_PAGE.successMessage);
    expect(isVisible).toBeTruthy();
  }

  async verifyPageLoaded() {
    await this.wait();
    const url = await this.getUrl();
    expect(url).toContain('configurations');
  }

  async verifyRegistrationFormVisible() {
    await this.wait();
    const isVisible = await this.isElementVisible(REGISTRATION_PAGE.registrationForm);
    expect(isVisible).toBeTruthy();
  }

  async sendMultipleRegistrationRequests(count, email, password) {
    const requests = [];
    for (let i = 0; i < count; i++) {
      requests.push(this.registerUser(`user${i}`, `${i}_${email}`, password));
    }
    await Promise.all(requests);
  }

  async sendRapidRegistrationRequests(count, email, password) {
    for (let i = 0; i < count; i++) {
      await this.fillRegistrationForm(`user${i}`, `${i}_${email}`, password);
      await this.clickRegisterButton();
    }
  }

  async enterSpecialCharactersInEmail(specialCharEmail) {
    await this.fillEmail(specialCharEmail);
  }

  async enterXSSPayloadInEmail(xssPayload) {
    await this.fillEmail(xssPayload);
  }

  async enterSQLInjectionInEmail(sqlPayload) {
    await this.fillEmail(sqlPayload);
  }

  async measurePageLoadTime() {
    const startTime = Date.now();
    await this.navigateToRegistration();
    const endTime = Date.now();
    return endTime - startTime;
  }

  async verifyPageLoadWithinThreshold(threshold = 3000) {
    const loadTime = await this.measurePageLoadTime();
    expect(loadTime).toBeLessThan(threshold);
  }
}

export default RegistrationPage;

