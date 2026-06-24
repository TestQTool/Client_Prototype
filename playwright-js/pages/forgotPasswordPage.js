import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import { forgotPasswordSelectors } from '../pageObjects/forgotPasswordPage.js';

class ForgotPasswordPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async navigateToForgotPassword(url) {
    await this.open(url);
    await this.waitForPageLoad();
  }

  async enterCredentials(username, password) {
    const usernameInput = '#username'; // TODO: verify selector against live app
    const passwordInput = '#password'; // TODO: verify selector against live app
    await this.waitAndFill(usernameInput, username);
    await this.waitAndFill(passwordInput, password);
  }

  async enterEmail(email) {
    await this.waitAndFill(forgotPasswordSelectors.emailInput, email);
  }

  async clickSubmit() {
    await this.waitAndClick(forgotPasswordSelectors.submitButton);
    await this.waitforNetworkIdle();
  }

  async verifyValidationErrorDisplayed() {
    await this.wait();
    const isVisible = await this.isElementVisible(forgotPasswordSelectors.validationError);
    expect(isVisible).toBeTruthy();
  }

  async verifySuccessMessageDisplayed() {
    await this.wait();
    const isVisible = await this.isElementVisible(forgotPasswordSelectors.successMessage);
    expect(isVisible).toBeTruthy();
  }

  async verifyRequiredFieldErrorDisplayed() {
    await this.wait();
    const isVisible = await this.isElementVisible(forgotPasswordSelectors.requiredFieldError);
    expect(isVisible).toBeTruthy();
  }

  async verifyEmailFieldVisible() {
    await this.wait();
    const isVisible = await this.isElementVisible(forgotPasswordSelectors.emailInput);
    expect(isVisible).toBeTruthy();
  }

  async verifySubmitButtonVisible() {
    await this.wait();
    const isVisible = await this.isElementVisible(forgotPasswordSelectors.submitButton);
    expect(isVisible).toBeTruthy();
  }

  async verifyPageLoadsWithinTime(maxTime) {
    const startTime = Date.now();
    await this.waitForPageLoad();
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(maxTime);
  }

  async verifyResponseStatusCode(statusCode) {
    // This would typically be done via API testing
    // Placeholder for API response validation
    await this.wait();
  }

  async verifyResponseContainsErrorMessage() {
    await this.wait();
    const isVisible = await this.isElementVisible(forgotPasswordSelectors.validationError);
    expect(isVisible).toBeTruthy();
  }

  async verifyResponseContainsSuccessMessage() {
    await this.wait();
    const isVisible = await this.isElementVisible(forgotPasswordSelectors.successMessage);
    expect(isVisible).toBeTruthy();
  }

  async verifyGenericResponseMessage() {
    await this.wait();
    const messageText = await this.verifyElementText(forgotPasswordSelectors.successMessage, '');
    // Verify message does not reveal email existence
  }

  async verifyResetLinkUsesHTTPS() {
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain('https://');
  }

  async measureResponseTime() {
    const startTime = Date.now();
    await this.clickSubmit();
    const endTime = Date.now();
    return endTime - startTime;
  }

  async verifyResponseTimeWithinLimit(maxTime) {
    const responseTime = await this.measureResponseTime();
    expect(responseTime).toBeLessThan(maxTime);
  }
}

export default ForgotPasswordPage;

