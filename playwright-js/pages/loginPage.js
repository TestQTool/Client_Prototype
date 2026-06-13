import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import * as loginPageObjects from '../pageObjects/loginPage.js';

export default class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async navigateToLoginPage(url) {
        await this.open(url);
        return await this.waitForPageLoad();
    }

    async enterUsername(username) {
        await this.waitAndFill(loginPageObjects.usernameInput, username);
    }

    async enterPassword(password) {
        await this.waitAndFill(loginPageObjects.passwordInput, password);
    }

    async enterCredentials(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
    }

    async clickLoginButton() {
        await this.waitAndClick(loginPageObjects.loginButton);
        return await this.waitforNetworkIdle();
    }

    async login(username, password) {
        await this.enterCredentials(username, password);
        return await this.clickLoginButton();
    }

    async loginWithRole(roleName) {
        const credentials = this.getLoginDataByRole(roleName);
        return await this.login(credentials.username, credentials.password);
    }

    async verifyDashboardIsDisplayed() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginPageObjects.dashboardContainer);
        expect(isVisible).toBeTruthy();
    }

    async verifyErrorMessageIsDisplayed() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginPageObjects.errorMessage);
        expect(isVisible).toBeTruthy();
    }

    async verifyValidationMessagesForRequiredFields() {
        await this.wait();
        const usernameErrorVisible = await this.isElementVisible(loginPageObjects.usernameRequiredMessage);
        const passwordErrorVisible = await this.isElementVisible(loginPageObjects.passwordRequiredMessage);
        expect(usernameErrorVisible).toBeTruthy();
        expect(passwordErrorVisible).toBeTruthy();
    }

    async verifyPasswordFieldMasksInput() {
        await this.wait();
        const passwordType = await this.page.getAttribute(loginPageObjects.passwordInput, 'type');
        expect(passwordType).toBe('password');
    }

    async verifyAccountLockoutMessageIsDisplayed() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginPageObjects.accountLockoutMessage);
        expect(isVisible).toBeTruthy();
    }

    async sendLoginAPIRequest(username, password) {
        const response = await this.page.request.post(`${process.env.BASE_URL}/api/login`, {
            data: { username, password }
        });
        return response;
    }

    async sendLoginAPIRequestWithoutUsername(password) {
        const response = await this.page.request.post(`${process.env.BASE_URL}/api/login`, {
            data: { password }
        });
        return response;
    }

    async sendLoginAPIRequestWithoutPassword(username) {
        const response = await this.page.request.post(`${process.env.BASE_URL}/api/login`, {
            data: { username }
        });
        return response;
    }

    async sendLoginAPIRequestWithMethod(method, username, password) {
        const response = await this.page.request.fetch(`${process.env.BASE_URL}/api/login`, {
            method: method,
            data: { username, password }
        });
        return response;
    }

    async sendLoginAPIRequestWithMalformedJSON() {
        const response = await this.page.request.post(`${process.env.BASE_URL}/api/login`, {
            headers: { 'Content-Type': 'application/json' },
            data: '{invalid json}'
        });
        return response;
    }

    async verifyAPIResponseStatus(response, expectedStatus) {
        expect(response.status()).toBe(expectedStatus);
    }

    async verifyAPIResponseContainsToken(response) {
        const responseBody = await response.json();
        expect(responseBody.token).toBeDefined();
        expect(responseBody.token).not.toBe('');
    }

    async verifyAPIResponseContainsErrorMessage(response) {
        const responseBody = await response.json();
        expect(responseBody.error).toBeDefined();
    }

    async verifyAPIResponseContentType(response) {
        const contentType = response.headers()['content-type'];
        expect(contentType).toContain('application/json');
    }

    async verifyAPIResponseIsValidJSON(response) {
        const responseBody = await response.json();
        expect(responseBody).toBeDefined();
    }

    async verifyAPIResponseAllowedMethods(response) {
        const allowHeader = response.headers()['allow'];
        expect(allowHeader).toContain('POST');
    }

    async verifyAPIResponseCacheControl(response) {
        const cacheControl = response.headers()['cache-control'];
        expect(cacheControl).toMatch(/(no-store|no-cache)/);
    }

    async attemptMultipleFailedLogins(username, invalidPassword, attempts) {
        for (let i = 0; i < attempts; i++) {
            await this.enterCredentials(username, invalidPassword);
            await this.clickLoginButton();
            await this.wait();
        }
    }
}

