import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import {
    emailInput,
    passwordInput,
    loginButton,
    registerLink,
    errorMessage,
    usernameErrorMessage,
    passwordErrorMessage,
    dashboardHeading,
    logoutButton
} from '../pageObjects/loginPage.js';

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.apiContext = null;
    }

    /**
     * Navigate to login page
     */
    async navigateToLogin() {
        const loginUrl = process.env.BASE_URL || 'http://192.168.10.124:4001';
        await this.open(loginUrl);
        await this.waitForPageLoad();
    }

    /**
     * Verify login page is displayed
     */
    async verifyLoginPageDisplayed() {
        await this.wait();
        const emailVisible = await this.isElementVisible(emailInput);
        const passwordVisible = await this.isElementVisible(passwordInput);
        const loginBtnVisible = await this.isElementVisible(loginButton);
        const registerVisible = await this.isElementVisible(registerLink);
        
        expect(emailVisible).toBeTruthy();
        expect(passwordVisible).toBeTruthy();
        expect(loginBtnVisible).toBeTruthy();
        expect(registerVisible).toBeTruthy();
    }

    /**
     * Enter username/email
     */
    async enterUsername(username) {
        await this.waitAndFill(emailInput, username);
    }

    /**
     * Enter password
     */
    async enterPassword(password) {
        await this.waitAndFill(passwordInput, password);
    }

    /**
     * Click login button
     */
    async clickLogin() {
        await this.waitAndClick(loginButton);
        await this.waitforNetworkIdle();
    }

    /**
     * Perform complete login action
     */
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    /**
     * Verify successful login
     */
    async verifyLoginSuccess() {
        await this.wait();
        const currentUrl = await this.getUrl();
        const isDashboardVisible = await this.isElementVisible(dashboardHeading);
        
        expect(currentUrl).not.toContain('login');
        expect(isDashboardVisible).toBeTruthy();
    }

    /**
     * Verify login error message is displayed
     */
    async verifyLoginErrorDisplayed() {
        await this.wait();
        const isErrorVisible = await this.isElementVisible(errorMessage);
        expect(isErrorVisible).toBeTruthy();
    }

    /**
     * Verify error message contains text
     */
    async verifyErrorMessageContains(expectedText) {
        await this.wait();
        await this.verifyElementContainsText(errorMessage, expectedText);
    }

    /**
     * Verify username error message is displayed
     */
    async verifyUsernameErrorDisplayed() {
        await this.wait();
        const isErrorVisible = await this.isElementVisible(usernameErrorMessage);
        expect(isErrorVisible).toBeTruthy();
    }

    /**
     * Verify password error message is displayed
     */
    async verifyPasswordErrorDisplayed() {
        await this.wait();
        const isErrorVisible = await this.isElementVisible(passwordErrorMessage);
        expect(isErrorVisible).toBeTruthy();
    }

    /**
     * Send POST request to /login endpoint
     */
    async sendLoginRequest(username, password) {
        const baseUrl = process.env.BASE_URL || 'http://192.168.10.124:4001';
        const loginEndpoint = `${baseUrl}/login`;
        
        const response = await this.page.request.post(loginEndpoint, {
            data: {
                username: username,
                password: password
            }
        });
        
        return response;
    }

    /**
     * Verify API response status code
     */
    async verifyResponseStatus(response, expectedStatus) {
        await this.wait();
        expect(response.status()).toBe(expectedStatus);
    }

    /**
     * Verify response contains authentication token
     */
    async verifyResponseContainsToken(response) {
        await this.wait();
        const responseBody = await response.json();
        const hasToken = responseBody.token || responseBody.access_token || responseBody.authToken;
        expect(hasToken).toBeTruthy();
    }

    /**
     * Verify response contains error message
     */
    async verifyResponseContainsError(response, expectedErrorText = null) {
        await this.wait();
        const responseBody = await response.json();
        const errorMsg = responseBody.error || responseBody.message || responseBody.errorMessage;
        
        expect(errorMsg).toBeTruthy();
        
        if (expectedErrorText) {
            expect(errorMsg.toLowerCase()).toContain(expectedErrorText.toLowerCase());
        }
    }

    /**
     * Get login credentials by role
     */
    getCredentialsByRole(role) {
        return this.getLoginDataByRole(role);
    }
}

export default LoginPage;

