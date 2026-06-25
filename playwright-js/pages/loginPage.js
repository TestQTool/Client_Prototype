import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import * as loginPageLocators from '../pageObjects/loginPage.js';

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }

    /**
     * Navigate to login page
     * @param {string} baseUrl - Application base URL from environment
     */
    async navigateToLogin(baseUrl = process.env.BASE_URL || 'http://192.168.10.124:4001') {
        await this.open(baseUrl);
        await this.waitForPageLoad();
    }

    /**
     * Verify login page is displayed
     */
    async verifyLoginPageDisplayed() {
        await this.wait();
        await expect(this.page.locator(loginPageLocators.usernameInput).or(this.page.locator(loginPageLocators.emailInput))).toBeVisible();
        await expect(this.page.locator(loginPageLocators.passwordInput)).toBeVisible();
        await expect(this.page.locator(loginPageLocators.loginButton)).toBeVisible();
    }

    /**
     * Enter username in login form
     * @param {string} username - Username to enter
     */
    async enterUsername(username) {
        const usernameField = this.page.locator(loginPageLocators.usernameInput).or(this.page.locator(loginPageLocators.emailInput));
        await this.waitAndFill(usernameField, username);
    }

    /**
     * Enter password in login form
     * @param {string} password - Password to enter
     */
    async enterPassword(password) {
        await this.waitAndFill(loginPageLocators.passwordInput, password);
    }

    /**
     * Click login button
     */
    async clickLoginButton() {
        await this.waitAndClick(loginPageLocators.loginButton);
        await this.waitforNetworkIdle();
    }

    /**
     * Perform complete login action
     * @param {string} username - Username
     * @param {string} password - Password
     */
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Verify successful login
     */
    async verifyLoginSuccess() {
        await this.wait();
        const currentUrl = await this.getUrl();
        expect(currentUrl).not.toContain('/login');
    }

    /**
     * Verify login failure with error message
     * @param {string} expectedErrorText - Expected error message text
     */
    async verifyLoginFailure(expectedErrorText = 'invalid credentials') {
        await this.wait();
        const errorLocator = this.page.locator(loginPageLocators.errorMessage)
            .or(this.page.locator(loginPageLocators.validationError))
            .or(this.page.locator(loginPageLocators.invalidCredentialsError));
        await expect(errorLocator.first()).toBeVisible();
        await this.verifyElementContainsText(errorLocator.first(), expectedErrorText);
    }

    /**
     * Verify missing username error
     */
    async verifyMissingUsernameError() {
        await this.wait();
        const errorLocator = this.page.locator(loginPageLocators.missingUsernameError)
            .or(this.page.locator(loginPageLocators.validationError));
        await expect(errorLocator.first()).toBeVisible();
    }

    /**
     * Verify missing password error
     */
    async verifyMissingPasswordError() {
        await this.wait();
        const errorLocator = this.page.locator(loginPageLocators.missingPasswordError)
            .or(this.page.locator(loginPageLocators.validationError));
        await expect(errorLocator.first()).toBeVisible();
    }

    /**
     * Verify authentication token is present (API response validation)
     * For API tests, this would validate response body
     */
    async verifyAuthTokenPresent() {
        await this.wait();
        // For UI validation, check if token exists in localStorage or session
        const hasToken = await this.page.evaluate(() => {
            return !!(localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || document.cookie.includes('token'));
        });
        expect(hasToken).toBeTruthy();
    }

    /**
     * Verify register link is visible
     */
    async verifyRegisterLinkVisible() {
        await this.wait();
        await expect(this.page.locator(loginPageLocators.registerLink)).toBeVisible();
    }
}

export default LoginPage;