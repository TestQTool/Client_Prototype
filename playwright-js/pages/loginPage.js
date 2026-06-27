// pages/loginPage.js
// ─────────────────────────────────────────────────────────────────────────────
// Login page actions and assertions
// ─────────────────────────────────────────────────────────────────────────────
import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import {
    usernameInput,
    emailInput,
    passwordInput,
    loginButton,
    registerLink,
    errorMessage,
    invalidCredsMsg,
    missingUsernameMsg,
    missingPasswordMsg,
    requiredFieldMsg,
    loginPageHeading,
    emailLabel,
    passwordLabel,
    dashboardIndicator,
    authToken,
} from '../pageObjects/loginPage.js';

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }

    // ── Navigation ────────────────────────────────────────────────────────────
    async navigate() {
        const url = process.env.BASE_URL || this.testData.baseUrl || 'http://192.168.10.124:4001';
        await this.open(url);
        return await super.waitForPageLoad();
    }

    async navigateToLoginEndpoint() {
        const url = process.env.BASE_URL || this.testData.baseUrl || 'http://192.168.10.124:4001';
        await this.open(`${url}/login`);
        return await super.waitForPageLoad();
    }

    // ── Actions ───────────────────────────────────────────────────────────────

    async fillUsername(username) {
        await this.waitAndFill(usernameInput, username);
    }

    async fillEmail(email) {
        await this.waitAndFill(emailInput, email);
    }

    async fillPassword(password) {
        await this.waitAndFill(passwordInput, password);
    }

    async clickLoginButton() {
        await this.waitAndClick(loginButton);
        return await super.waitForPageLoad();
    }

    async submitEmptyForm() {
        await this.waitAndClick(loginButton);
        return await super.waitForPageLoad();
    }

    /**
     * Login with credentials for a given role.
     * Uses credentials.csv via getLoginDataByRole().
     */
    async loginAs(roleName) {
        const creds = this.getLoginDataByRole(roleName);
        await this.fillUsername(creds.Username);
        await this.fillPassword(creds.Password);
        await this.clickLoginButton();
        return await super.waitForPageLoad();
    }

    /**
     * Login with explicit username and password.
     */
    async loginWith(username, password) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
        return await super.waitForPageLoad();
    }

    /**
     * Send POST request to /login endpoint (API-based login tests).
     */
    async sendLoginRequest(username, password) {
        const url = process.env.BASE_URL || this.testData.baseUrl || 'http://192.168.10.124:4001';
        const response = await this.page.request.post(`${url}/login`, {
            data: { username, password }
        });
        return response;
    }

    // ── Assertions ────────────────────────────────────────────────────────────

    async verifyLoginPageLoaded() {
        await this.wait();
        await this.isElementVisible(loginPageHeading, this.testData.notVisibleText);
        await this.isElementVisible(emailLabel, this.testData.notVisibleText);
        await this.isElementVisible(passwordLabel, this.testData.notVisibleText);
        await this.isElementVisible(loginButton, this.testData.notVisibleText);
        await this.isElementVisible(registerLink, this.testData.notVisibleText);
    }

    async verifyLoginSuccess() {
        await this.wait();
        const currentUrl = await this.getUrl();
        expect(currentUrl).toContain('/dashboard');
    }

    async verifyAuthTokenPresent(response) {
        const body = await response.json();
        expect(body).toHaveProperty('token');
        expect(body.token).toBeTruthy();
    }

    async verifyResponseStatus(response, expectedStatus) {
        expect(response.status()).toBe(expectedStatus);
    }

    async verifyInvalidCredentialsError() {
        await this.wait();
        await this.isElementVisible(errorMessage, this.testData.notVisibleText);
        await this.verifyElementContainsText(errorMessage, 'Invalid credentials');
    }

    async verifyMissingUsernameError() {
        await this.wait();
        await this.isElementVisible(errorMessage, this.testData.notVisibleText);
        await this.verifyElementContainsText(errorMessage, 'missing username');
    }

    async verifyMissingPasswordError() {
        await this.wait();
        await this.isElementVisible(errorMessage, this.testData.notVisibleText);
        await this.verifyElementContainsText(errorMessage, 'missing password');
    }

    async verifyRequiredFieldError() {
        await this.wait();
        await this.isElementVisible(requiredFieldMsg, this.testData.notVisibleText);
    }

    async verifyErrorMessageContains(expectedText) {
        await this.wait();
        await this.isElementVisible(errorMessage, this.testData.notVisibleText);
        await this.verifyElementContainsText(errorMessage, expectedText);
    }
}

export default LoginPage;

