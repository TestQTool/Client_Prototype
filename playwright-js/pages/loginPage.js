import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import {
    usernameInput,
    passwordInput,
    loginButton,
    invalidCredentialsAlert,
    requiredFieldError,
    usernameFieldContainer,
    passwordFieldContainer,
    loginForm,
    dashboardHeader,
    userDropdown
} from '../pageObjects/loginPage.js';

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }

    // ── Navigation ───────────────────────────────────────────────────────────
    async navigate() {
        const url = process.env.BASE_URL || this.testData.baseUrl || 'https://opensource-demo.orangehrmlive.com';
        await this.open(url + '/web/index.php/auth/login');
        return await super.waitForPageLoad();
    }

    // ── Actions ──────────────────────────────────────────────────────────────
    async enterUsername(username) {
        await this.fill(usernameInput, username);
    }

    async enterPassword(password) {
        await this.fill(passwordInput, password);
    }

    async clickLoginButton() {
        await this.click(loginButton);
    }

    async loginWithCredentials(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async loginAsAdmin() {
        const adminData = this.getLoginDataByRole('Admin');
        await this.loginWithCredentials(adminData.username, adminData.password);
    }

    async clearUsernameField() {
        await this.page.locator(usernameInput).clear();
    }

    async clearPasswordField() {
        await this.page.locator(passwordInput).clear();
    }

    async clearAllFields() {
        await this.clearUsernameField();
        await this.clearPasswordField();
    }

    async clickLoginWithEmptyUsername() {
        await this.clearUsernameField();
        await this.clickLoginButton();
    }

    async clickLoginWithEmptyFields() {
        await this.clearAllFields();
        await this.clickLoginButton();
    }

    // ── Session & Security ───────────────────────────────────────────────────
    async getSessionToken() {
        const cookies = await this.page.context().cookies();
        return cookies.find(cookie => 
            cookie.name.toLowerCase().includes('session') || 
            cookie.name.toLowerCase().includes('token') ||
            cookie.name === 'orangehrm'
        );
    }

    async getLocalStorageItem(key) {
        return await this.page.evaluate((k) => localStorage.getItem(k), key);
    }

    async getSessionStorageItem(key) {
        return await this.page.evaluate((k) => sessionStorage.getItem(k), key);
    }

    async getAllCookies() {
        return await this.page.context().cookies();
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    // ── Assertions ───────────────────────────────────────────────────────────
    async verifyLoginPageLoaded() {
        await this.wait();
        await expect(this.page.locator(loginForm)).toBeVisible();
    }

    async verifyInvalidCredentialsError() {
        await this.wait();
        await expect(this.page.locator(invalidCredentialsAlert)).toBeVisible();
        await expect(this.page.locator(invalidCredentialsAlert)).toContainText('Invalid credentials');
    }

    async verifyRequiredErrorForUsername() {
        await this.wait();
        const usernameContainer = this.page.locator(usernameFieldContainer);
        await expect(usernameContainer.locator(requiredFieldError)).toBeVisible();
        await expect(usernameContainer.locator(requiredFieldError)).toHaveText('Required');
    }

    async verifyRequiredErrorForPassword() {
        await this.wait();
        const passwordContainer = this.page.locator(passwordFieldContainer);
        await expect(passwordContainer.locator(requiredFieldError)).toBeVisible();
        await expect(passwordContainer.locator(requiredFieldError)).toHaveText('Required');
    }

    async verifyRequiredErrorForBothFields() {
        await this.verifyRequiredErrorForUsername();
        await this.verifyRequiredErrorForPassword();
    }

    async verifyLoginSuccess() {
        await this.wait();
        await expect(this.page.locator(dashboardHeader)).toBeVisible();
    }

    async verifySessionTokenExists() {
        await this.wait();
        const sessionToken = await this.getSessionToken();
        expect(sessionToken).toBeTruthy();
        return sessionToken;
    }

    async verifySessionTokenIsSecure() {
        const sessionToken = await this.getSessionToken();
        expect(sessionToken).toBeTruthy();
        // Verify secure flag is set (for HTTPS)
        if (this.page.url().startsWith('https://')) {
            expect(sessionToken.secure).toBe(true);
        }
        return sessionToken;
    }

    async verifyHttpsProtocol() {
        const currentUrl = await this.getCurrentUrl();
        expect(currentUrl).toMatch(/^https:\/\//);
    }

    async verifyUrlIsHttps(url) {
        expect(url).toMatch(/^https:\/\//);
    }
}

export default LoginPage;
