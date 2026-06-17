// Registration Page - Actions and Assertions
import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import * as registrationPage from '../pageObjects/registrationPage.js';

class RegistrationPage extends BasePage {
    constructor(page) {
        super(page);
    }

    // Navigation
    async navigateToRegistration() {
        await this.open('/register');
        return await super.waitForPageLoad();
    }

    // Form Actions
    async fillEmail(email) {
        await this.waitAndFill(registrationPage.emailInput, email);
    }

    async fillPassword(password) {
        await this.waitAndFill(registrationPage.passwordInput, password);
    }

    async fillConfirmPassword(confirmPassword) {
        await this.waitAndFill(registrationPage.confirmPasswordInput, confirmPassword);
    }

    async clickSubmit() {
        await this.waitAndClick(registrationPage.submitButton);
        await this.waitforNetworkIdle();
    }

    async clickRegisterButton() {
        await this.waitAndClick(registrationPage.registerButton);
        await this.waitforNetworkIdle();
    }

    async registerUser(email, password, confirmPassword = null) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        if (confirmPassword !== null) {
            await this.fillConfirmPassword(confirmPassword);
        } else {
            await this.fillConfirmPassword(password);
        }
        await this.clickSubmit();
    }

    async registerUserWithMismatchedPassword(email, password, confirmPassword) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.fillConfirmPassword(confirmPassword);
        await this.clickSubmit();
    }

    async submitEmptyForm() {
        await this.clickSubmit();
    }

    async submitWithoutEmail(password) {
        await this.fillPassword(password);
        await this.fillConfirmPassword(password);
        await this.clickSubmit();
    }

    async submitWithoutPassword(email) {
        await this.fillEmail(email);
        await this.clickSubmit();
    }

    async fillEmailWithMaxLength(maxLength) {
        const longEmail = 'a'.repeat(maxLength - 10) + '@test.com';
        await this.fillEmail(longEmail);
    }

    // Assertions
    async verifyRegistrationFormDisplayed() {
        await this.wait();
        await expect(this.page.locator(registrationPage.registrationFormTitle)).toBeVisible();
    }

    async verifyAllRequiredFieldsDisplayed() {
        await this.wait();
        await expect(this.page.locator(registrationPage.emailLabel)).toBeVisible();
        await expect(this.page.locator(registrationPage.passwordLabel)).toBeVisible();
        await expect(this.page.locator(registrationPage.confirmPasswordLabel)).toBeVisible();
        await expect(this.page.locator(registrationPage.emailInput)).toBeVisible();
        await expect(this.page.locator(registrationPage.passwordInput)).toBeVisible();
        await expect(this.page.locator(registrationPage.confirmPasswordInput)).toBeVisible();
        await expect(this.page.locator(registrationPage.submitButton)).toBeVisible();
    }

    async verifyRegistrationSuccess() {
        await this.wait();
        await expect(this.page.locator(registrationPage.registrationSuccessText)).toBeVisible();
    }

    async verifyEmailRequiredError() {
        await this.wait();
        await expect(this.page.locator(registrationPage.emailRequiredError)).toBeVisible();
    }

    async verifyPasswordRequiredError() {
        await this.wait();
        await expect(this.page.locator(registrationPage.passwordRequiredError)).toBeVisible();
    }

    async verifyInvalidEmailFormatError() {
        await this.wait();
        await expect(this.page.locator(registrationPage.emailFormatError)).toBeVisible();
    }

    async verifyDuplicateEmailError() {
        await this.wait();
        await expect(this.page.locator(registrationPage.duplicateEmailError)).toBeVisible();
    }

    async verifyPasswordMismatchError() {
        await this.wait();
        await expect(this.page.locator(registrationPage.passwordMismatchError)).toBeVisible();
    }

    async verifyPasswordLengthError() {
        await this.wait();
        await expect(this.page.locator(registrationPage.passwordLengthError)).toBeVisible();
    }

    async verifyEmailFieldAcceptsInput() {
        await this.wait();
        const emailValue = await this.page.locator(registrationPage.emailInput).inputValue();
        expect(emailValue.length).toBeGreaterThan(0);
    }

    // API Methods
    async registerUserViaAPI(email, password) {
        const response = await this.page.request.post(registrationPage.registrationApiEndpoint, {
            data: {
                email: email,
                password: password
            }
        });
        return response;
    }

    async verifyAPIResponse(response, expectedStatus) {
        expect(response.status()).toBe(expectedStatus);
        return await response.json();
    }

    async verifyAPIResponseContainsUserProfile(responseBody) {
        expect(responseBody).toHaveProperty('id');
        expect(responseBody).toHaveProperty('email');
    }

    async verifyPasswordNotInResponse(responseBody) {
        expect(responseBody).not.toHaveProperty('password');
    }

    async verifyAPIHeaders(response) {
        const headers = response.headers();
        expect(headers).toHaveProperty('content-type');
        expect(headers['content-type']).toContain('application/json');
    }

    async verifyAPIResponseTime(startTime, maxTime) {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        expect(responseTime).toBeLessThan(maxTime);
    }
}

export default RegistrationPage;

