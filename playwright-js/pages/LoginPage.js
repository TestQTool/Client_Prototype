import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import {
    usernameInput,
    passwordInput,
    loginButton,
    errorMessage,
    inventoryContainer
} from '../pageObjects/LoginPage.js';

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async navigateToApplication() {
        await this.open(process.env.BASE_URL || 'https://www.saucedemo.com/');
        await this.waitForPageLoad();
    }

    async enterUsername(username) {
        await this.waitAndFill(usernameInput, username);
    }

    async enterPassword(password) {
        await this.waitAndFill(passwordInput, password);
    }

    async clickLoginButton() {
        await this.waitAndClick(loginButton);
        await this.waitforNetworkIdle();
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async verifyLoginSuccess() {
        await this.wait();
        await expect(this.page.locator(inventoryContainer)).toBeVisible();
    }

    async verifyErrorMessage(expectedMessage) {
        await this.wait();
        await this.verifyElementContainsText(errorMessage, expectedMessage);
    }
}

export default LoginPage;

