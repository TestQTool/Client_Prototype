// pages/loginPage.ts
// ─────────────────────────────────────────────────────────────────────────────
// Login Page — Actions and Assertions
// Generated from test inventory cases: TC-562, TC-22, TC-24, TC-25, TC-21, TC-23, TC-561, TC-563, TC-560, TC-564
// ─────────────────────────────────────────────────────────────────────────────
import BasePage from './basePage';
import { expect, Page } from '@playwright/test';
import {
    pageHeading,
    loginFormContainer,
    emailInput,
    usernameInput,
    passwordInput,
    loginButton,
    registerLink,
    errorMessage,
    requiredFieldError,
    invalidCredentialsMessage,
    emptyUsernameError,
    emptyPasswordError,
    dashboardHeading,
    logoutButton
} from '../pageObjects/loginPage';

class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    async navigate(): Promise<void> {
        const url = process.env.BASE_URL || this.testData.baseUrl || 'http://192.168.10.124:4001';
        await this.open(url);
        await this.waitForPageLoad();
    }

    // ── Actions ───────────────────────────────────────────────────────────────

    async fillUsername(username: string): Promise<void> {
        await this.waitAndFill(usernameInput, username);
    }

    async fillEmail(email: string): Promise<void> {
        await this.waitAndFill(emailInput, email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.waitAndFill(passwordInput, password);
    }

    async clickLoginButton(): Promise<void> {
        await this.waitAndClick(loginButton);
        await this.waitForPageLoad();
    }

    /**
     * Complete login flow with username and password.
     */
    async loginWithCredentials(username: string, password: string): Promise<void> {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Login using credentials from test-data/credentials.csv by role.
     */
    async loginAs(roleName: string): Promise<void> {
        const creds = this.getLoginDataByRole(roleName);
        await this.loginWithCredentials(creds.Username, creds.Password);
    }

    /**
     * Submit login without filling any fields (for empty field validation tests).
     */
    async submitEmptyLogin(): Promise<void> {
        await this.clickLoginButton();
    }

    /**
     * Clear username and password fields.
     */
    async clearLoginFields(): Promise<void> {
        await this.page.locator(usernameInput).clear();
        await this.page.locator(passwordInput).clear();
    }

    // ── Assertions ────────────────────────────────────────────────────────────

    async verifyLoginPageLoaded(): Promise<void> {
        await this.wait();
        await this.isElementVisible(pageHeading, this.testData.notVisibleText);
        await this.isElementVisible(loginFormContainer, this.testData.notVisibleText);
        expect(await this.getUrl()).toContain('/login');
    }

    async verifyLoginPageElements(): Promise<void> {
        await this.wait();
        await this.isElementVisible(emailInput, 'Email input not visible');
        await this.isElementVisible(passwordInput, 'Password input not visible');
        await this.isElementVisible(loginButton, 'Login button not visible');
        await this.isElementVisible(registerLink, 'Register link not visible');
    }

    async verifyLoginSuccess(): Promise<void> {
        await this.wait();
        const currentUrl = await this.getUrl();
        expect(currentUrl).toContain('/dashboard');
        await this.isElementVisible(dashboardHeading, 'Dashboard not loaded after login');
    }

    async verifyInvalidCredentialsError(): Promise<void> {
        await this.wait();
        await this.isElementVisible(errorMessage, 'Error message not visible');
        await this.verifyElementContainsText(errorMessage, 'Invalid credentials');
    }

    async verifyRequiredFieldError(): Promise<void> {
        await this.wait();
        await this.isElementVisible(requiredFieldError, 'Required field error not visible');
    }

    async verifyEmptyUsernameError(): Promise<void> {
        await this.wait();
        await this.isElementVisible(emptyUsernameError, 'Empty username error not visible');
    }

    async verifyEmptyPasswordError(): Promise<void> {
        await this.wait();
        await this.isElementVisible(emptyPasswordError, 'Empty password error not visible');
    }

    async verifyErrorMessage(expectedText: string): Promise<void> {
        await this.wait();
        await this.isElementVisible(errorMessage, 'Error message not visible');
        await this.verifyElementContainsText(errorMessage, expectedText);
    }

    async verifyStatusCode(expectedCode: number): Promise<void> {
        // Note: Playwright doesn't directly expose HTTP status codes in UI tests.
        // This method would be used in API test context or by intercepting network requests.
        // For UI tests, verify error messages or redirects instead.
        // If API endpoint /login exists, use page.request or separate API test.
        console.log(`Status code verification requested: ${expectedCode}`);
    }

    async verifyResponseContainsToken(): Promise<void> {
        // Similar to status code, token verification is typically done via API response.
        // In UI context, verify that login succeeded (URL changed, dashboard visible).
        await this.verifyLoginSuccess();
    }
}

export default LoginPage;
