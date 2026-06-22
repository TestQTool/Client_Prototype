import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import * as loginSelectors from '../pageObjects/loginPage.js';

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }

    // Navigation
    async navigateToConfigurationsPage(url) {
        await this.open(url);
        return await super.waitForPageLoad();
    }

    // Login Actions
    async enterUsername(username) {
        await this.waitAndFill(loginSelectors.usernameInput, username);
    }

    async enterPassword(password) {
        await this.waitAndFill(loginSelectors.passwordInput, password);
    }

    async enterCredentials(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
    }

    async clickLoginButton() {
        await this.waitAndClick(loginSelectors.loginButton);
        await super.waitforNetworkIdle();
    }

    async clickLogoutButton() {
        await this.waitAndClick(loginSelectors.logoutButton);
        await super.waitforNetworkIdle();
    }

    async performLogin(username, password) {
        await this.enterCredentials(username, password);
        await this.clickLoginButton();
    }

    async performLoginWithRole(roleName) {
        const credentials = this.getLoginDataByRole(roleName);
        await this.performLogin(credentials.username, credentials.password);
    }

    // Logout Actions
    async performLogout() {
        await this.clickLogoutButton();
    }

    // Verification Methods
    async verifyConfigurationsPageIsDisplayed() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginSelectors.configurationsPageIndicator);
        expect(isVisible).toBeTruthy();
    }

    async verifyUserIsRedirectedToConfigurationsPage() {
        await this.wait();
        const currentUrl = await this.getUrl();
        expect(currentUrl).toContain('/configurations');
        await this.verifyConfigurationsPageIsDisplayed();
    }

    async verifyUserIsRedirectedToLoginPage() {
        await this.wait();
        const currentUrl = await this.getUrl();
        expect(currentUrl).toContain('/configurations');
    }

    async verifyErrorMessageIsDisplayed() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginSelectors.validationError);
        expect(isVisible).toBeTruthy();
    }

    async verifyInvalidCredentialsErrorIsDisplayed() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginSelectors.invalidCredentialsError);
        expect(isVisible).toBeTruthy();
    }

    async verifyUsernameRequiredErrorIsDisplayed() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginSelectors.usernameRequiredError);
        expect(isVisible).toBeTruthy();
    }

    async verifyPasswordRequiredErrorIsDisplayed() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginSelectors.passwordRequiredError);
        expect(isVisible).toBeTruthy();
    }

    async verifyBothFieldsRequiredErrorsAreDisplayed() {
        await this.verifyUsernameRequiredErrorIsDisplayed();
        await this.verifyPasswordRequiredErrorIsDisplayed();
    }

    async verifyUserRemainsOnLoginPage() {
        await this.wait();
        const currentUrl = await this.getUrl();
        expect(currentUrl).toContain('/configurations');
        const isVisible = await this.isElementVisible(loginSelectors.loginButton);
        expect(isVisible).toBeTruthy();
    }

    async verifyUserSessionPersistsAfterRefresh() {
        await this.wait();
        await this.page.reload();
        await super.waitForPageLoad();
        await this.verifyConfigurationsPageIsDisplayed();
    }

    async verifyAuthTokenIsStoredSecurely() {
        await this.wait();
        const cookies = await this.page.context().cookies();
        const authCookie = cookies.find(c => c.name === loginSelectors.authTokenCookie);
        expect(authCookie).toBeDefined();
        expect(authCookie.httpOnly).toBeTruthy();
    }

    async verifyTokenIsNotAccessibleViaJavaScript() {
        await this.wait();
        const tokenAccessible = await this.page.evaluate(() => {
            return document.cookie.includes('authToken');
        });
        expect(tokenAccessible).toBeFalsy();
    }

    async verifySessionExpiresAfterLogout() {
        await this.wait();
        const cookies = await this.page.context().cookies();
        const authCookie = cookies.find(c => c.name === loginSelectors.authTokenCookie);
        expect(authCookie).toBeUndefined();
    }

    async verifyAccessDeniedToProtectedPage() {
        await this.wait();
        const currentUrl = await this.getUrl();
        expect(currentUrl).toContain('/configurations');
    }

    async verifyNoSystemErrorOccurs() {
        await this.wait();
        const hasError = await this.page.locator('body').evaluate((el) => {
            return el.innerText.toLowerCase().includes('error') || el.innerText.toLowerCase().includes('crash');
        });
        expect(hasError).toBeFalsy();
    }

    async verifyLoginResponseTime(maxTimeMs = 3000) {
        const startTime = Date.now();
        await this.clickLoginButton();
        const responseTime = Date.now() - startTime;
        expect(responseTime).toBeLessThan(maxTimeMs);
    }

    async verifyLogoutResponseTime(maxTimeMs = 2000) {
        const startTime = Date.now();
        await this.clickLogoutButton();
        const responseTime = Date.now() - startTime;
        expect(responseTime).toBeLessThan(maxTimeMs);
    }

    async verifyPasswordIsNotVisibleInPlainText() {
        await this.wait();
        const passwordType = await this.page.locator(loginSelectors.passwordInput).getAttribute('type');
        expect(passwordType).toBe('password');
    }

    async verifyLoginAPIReturnsSuccessResponse() {
        const response = await this.page.waitForResponse(resp => 
            resp.url().includes('/login') || resp.url().includes('/auth') && resp.status() === 200
        );
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.token || body.authToken || body.accessToken).toBeDefined();
    }

    async verifyLoginAPIReturnsErrorResponse() {
        const response = await this.page.waitForResponse(resp => 
            resp.url().includes('/login') || resp.url().includes('/auth')
        );
        expect([401, 403]).toContain(response.status());
    }

    async verifyLogoutAPIInvalidatesSession() {
        await this.wait();
        const response = await this.page.waitForResponse(resp => 
            resp.url().includes('/logout')
        );
        expect(response.status()).toBe(200);
    }
}

export default LoginPage;

