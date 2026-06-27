// pages/loginPage.js
// ─────────────────────────────────────────────────────────────────────────────
// Feature: Login
// Generated: Qentrix ScriptGenerationAgent
// ─────────────────────────────────────────────────────────────────────────────
import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import {
    pageHeading,
    loginFormTitle,
    emailInput,
    usernameInput,
    passwordInput,
    loginBtn,
    registerLink,
    errorMessage,
    invalidCredentialsMsg,
    requiredFieldError,
    missingUsernameMsg,
    missingPasswordMsg,
    authToken,
    dashboardUrl
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

    // ── Actions ───────────────────────────────────────────────────────────────

    async fillEmail(email) {
        await this.waitAndFill(emailInput, email);
    }

    async fillUsername(username) {
        await this.waitAndFill(usernameInput, username);
    }

    async fillPassword(password) {
        await this.waitAndFill(passwordInput, password);
    }

    async clickLogin() {
        await this.waitAndClick(loginBtn);
        return await super.waitForPageLoad();
    }

    async clickRegister() {
        await this.waitAndClick(registerLink);
        return await super.waitForPageLoad();
    }

    /**
     * Login with username and password.
     * @param {string} username
     * @param {string} password
     */
    async loginWith(username, password) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    /**
     * Login with email and password.
     * @param {string} email
     * @param {string} password
     */
    async loginWithEmail(email, password) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    /**
     * Login using role-based credentials from credentials.csv
     * @param {string} roleName - must match RoleName column
     */
    async loginAs(roleName) {
        const creds = this.getLoginDataByRole(roleName);
        await this.loginWith(creds.Username, creds.Password);
    }

    /**
     * Send POST request to /login endpoint (API-based login)
     * @param {object} payload - { username, password }
     */
    async sendLoginRequest(payload) {
        const baseUrl = process.env.BASE_URL || this.testData.baseUrl || 'http://192.168.10.124:4001';
        const response = await this.page.request.post(`${baseUrl}/login`, {
            data: payload
        });
        return response;
    }

    // ── Assertions ────────────────────────────────────────────────────────────

    async verifyLoginPageLoaded() {
        await this.wait();
        await this.isElementVisible(loginFormTitle, this.testData.notVisibleText);
        await this.isElementVisible(emailInput, this.testData.notVisibleText);
        await this.isElementVisible(passwordInput, this.testData.notVisibleText);
        await this.isElementVisible(loginBtn, this.testData.notVisibleText);
        await this.isElementVisible(registerLink, this.testData.notVisibleText);
    }

    async verifyLoginSuccess() {
        await this.wait();
        const currentUrl = await this.getUrl();
        expect(currentUrl).toContain(dashboardUrl);
    }

    async verifyInvalidCredentialsError() {
        await this.wait();
        await this.isElementVisible(errorMessage, this.testData.notVisibleText);
        await this.verifyElementContainsText(errorMessage, 'Invalid credentials');
    }

    async verifyRequiredFieldError() {
        await this.wait();
        await this.isElementVisible(requiredFieldError, this.testData.notVisibleText);
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

    async verifyResponseStatus(response, expectedStatus) {
        await this.wait();
        expect(response.status()).toBe(expectedStatus);
    }

    async verifyAuthTokenPresent(response) {
        await this.wait();
        const body = await response.json();
        expect(body).toHaveProperty('token');
        expect(body.token).toBeTruthy();
    }

    async verifyErrorMessageInResponse(response, expectedMessage) {
        await this.wait();
        const body = await response.json();
        expect(body).toHaveProperty('error');
        expect(body.error).toContain(expectedMessage);
    }
}

export default LoginPage;

