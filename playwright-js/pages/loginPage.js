import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import * as loginSelectors from '../pageObjects/loginPage.js';

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }

    // Navigation
    async navigateToLoginPage(url = process.env.BASE_URL || 'http://192.168.10.124:4001') {
        await this.open(url);
        await super.waitForPageLoad();
    }

    // Actions - Login Form
    async fillUsername(username) {
        const selector = await this.findFirstVisible([loginSelectors.usernameInput, loginSelectors.emailInput]);
        await this.waitAndFill(selector, username);
    }

    async fillPassword(password) {
        await this.waitAndFill(loginSelectors.passwordInput, password);
    }

    async clickLoginButton() {
        await this.waitAndClick(loginSelectors.loginButton);
        await super.waitforNetworkIdle();
    }

    async pressEnterOnPasswordField() {
        await this.page.locator(loginSelectors.passwordInput).press('Enter');
        await super.waitforNetworkIdle();
    }

    async loginWithCredentials(username, password) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    async loginByRole(roleName) {
        const credentials = this.getLoginDataByRole(roleName);
        await this.loginWithCredentials(credentials.username, credentials.password);
    }

    async loginWithEnterKey(username, password) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.pressEnterOnPasswordField();
    }

    async clearPasswordField() {
        await this.page.locator(loginSelectors.passwordInput).clear();
    }

    async tabNavigationFromUsername() {
        await this.page.locator(loginSelectors.usernameInput).press('Tab');
    }

    async tabNavigationFromPassword() {
        await this.page.locator(loginSelectors.passwordInput).press('Tab');
    }

    async findFirstVisible(selectors) {
        for (const selector of selectors) {
            if (await this.isElementVisible(selector, 1000)) {
                return selector;
            }
        }
        return selectors[0];
    }

    // Assertions - Page State
    async verifyLoginPageDisplayed() {
        await this.wait();
        const usernameVisible = await this.isElementVisible(loginSelectors.usernameInput) || 
                                await this.isElementVisible(loginSelectors.emailInput);
        const passwordVisible = await this.isElementVisible(loginSelectors.passwordInput);
        const loginButtonVisible = await this.isElementVisible(loginSelectors.loginButton);
        
        expect(usernameVisible).toBeTruthy();
        expect(passwordVisible).toBeTruthy();
        expect(loginButtonVisible).toBeTruthy();
    }

    async verifyRegisterLinkDisplayed() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginSelectors.registerLink);
        expect(isVisible).toBeTruthy();
    }

    async verifyPasswordFieldIsMasked() {
        await this.wait();
        const inputType = await this.page.locator(loginSelectors.passwordInput).getAttribute('type');
        expect(inputType).toBe('password');
    }

    async verifyPasswordNotVisibleInSource() {
        await this.wait();
        const passwordValue = await this.page.locator(loginSelectors.passwordInput).getAttribute('value');
        const pageSource = await this.page.content();
        if (passwordValue && passwordValue.length > 0) {
            expect(pageSource).not.toContain(passwordValue);
        }
    }

    // Assertions - Error Messages
    async verifyErrorMessageDisplayed() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginSelectors.errorMessage);
        expect(isVisible).toBeTruthy();
    }

    async verifyUsernameRequiredError() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginSelectors.usernameRequiredError) ||
                          await this.isElementVisible(loginSelectors.errorMessage);
        expect(isVisible).toBeTruthy();
    }

    async verifyPasswordRequiredError() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginSelectors.passwordRequiredError) ||
                          await this.isElementVisible(loginSelectors.errorMessage);
        expect(isVisible).toBeTruthy();
    }

    async verifyInvalidCredentialsError() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginSelectors.invalidCredentialsError) ||
                          await this.isElementVisible(loginSelectors.errorMessage);
        expect(isVisible).toBeTruthy();
    }

    async verifyAccountLockedError() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginSelectors.accountLockedError) ||
                          await this.isElementVisible(loginSelectors.errorMessage);
        expect(isVisible).toBeTruthy();
    }

    async verifyAccountDeactivatedError() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginSelectors.accountDeactivatedError) ||
                          await this.isElementVisible(loginSelectors.errorMessage);
        expect(isVisible).toBeTruthy();
    }

    async verifyPasswordLengthError() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginSelectors.passwordLengthError) ||
                          await this.isElementVisible(loginSelectors.errorMessage);
        expect(isVisible).toBeTruthy();
    }

    async verifyUserRemainsOnLoginPage() {
        await this.wait();
        const currentUrl = await this.getUrl();
        const loginButtonVisible = await this.isElementVisible(loginSelectors.loginButton);
        expect(loginButtonVisible).toBeTruthy();
    }

    // Assertions - Post-Login
    async verifyLoginSuccessful() {
        await this.wait();
        const currentUrl = await this.getUrl();
        const dashboardVisible = await this.isElementVisible(loginSelectors.dashboardHeader, 5000);
        expect(dashboardVisible || !currentUrl.includes('login')).toBeTruthy();
    }

    async verifyRedirectToIntendedPage(expectedUrl) {
        await this.wait();
        const currentUrl = await this.getUrl();
        expect(currentUrl).toContain(expectedUrl);
    }

    async verifySessionExpiredMessage() {
        await this.wait();
        const isVisible = await this.isElementVisible(loginSelectors.sessionExpiredMessage) ||
                          await this.isElementVisible(loginSelectors.errorMessage);
        expect(isVisible).toBeTruthy();
    }

    // Assertions - Security
    async verifyUrlUsesHttps() {
        await this.wait();
        const currentUrl = await this.getUrl();
        expect(currentUrl).toMatch(/^https:\/\//);
    }

    async verifyCaptchaOrRateLimitDisplayed() {
        await this.wait();
        const captchaVisible = await this.isElementVisible(loginSelectors.captchaElement, 2000);
        const errorVisible = await this.isElementVisible(loginSelectors.errorMessage, 2000);
        expect(captchaVisible || errorVisible).toBeTruthy();
    }

    async verifyPasswordFieldCleared() {
        await this.wait();
        const passwordValue = await this.page.locator(loginSelectors.passwordInput).inputValue();
        expect(passwordValue).toBe('');
    }

    // Assertions - Tab Navigation
    async verifyFocusOnUsername() {
        await this.wait();
        const usernameSelector = await this.findFirstVisible([loginSelectors.usernameInput, loginSelectors.emailInput]);
        const isFocused = await this.page.locator(usernameSelector).evaluate(el => el === document.activeElement);
        expect(isFocused).toBeTruthy();
    }

    async verifyFocusOnPassword() {
        await this.wait();
        const isFocused = await this.page.locator(loginSelectors.passwordInput).evaluate(el => el === document.activeElement);
        expect(isFocused).toBeTruthy();
    }

    async verifyFocusOnLoginButton() {
        await this.wait();
        const isFocused = await this.page.locator(loginSelectors.loginButton).evaluate(el => el === document.activeElement);
        expect(isFocused).toBeTruthy();
    }

    // Performance
    async measureLoginResponseTime() {
        const startTime = Date.now();
        await this.clickLoginButton();
        const endTime = Date.now();
        return endTime - startTime;
    }

    async verifyLoginResponseTimeWithinLimit(maxTime = 3000) {
        const responseTime = await this.measureLoginResponseTime();
        expect(responseTime).toBeLessThan(maxTime);
    }
}

export default LoginPage;