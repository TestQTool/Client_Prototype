import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import * as authSelectors from '../pageObjects/authenticationPage.js';

class AuthenticationPage extends BasePage {
    constructor(page) {
        super(page);
    }

    // Navigation Methods
    async navigateToLoginPage() {
        await this.open(authSelectors.loginPageUrl);
        await this.waitForPageLoad();
    }

    async navigateToRegistrationPage() {
        await this.open(authSelectors.registrationPageUrl);
        await this.waitForPageLoad();
    }

    async navigateToForgotPasswordPage() {
        await this.open(authSelectors.forgotPasswordPageUrl);
        await this.waitForPageLoad();
    }

    async navigateToProfilePage() {
        await this.open(authSelectors.profilePageUrl);
        await this.waitForPageLoad();
    }

    async navigateToAccountInfoPage() {
        await this.open(authSelectors.accountInfoPageUrl);
        await this.waitForPageLoad();
    }

    async navigateToAccountActivityPage() {
        await this.open(authSelectors.accountActivityPageUrl);
        await this.waitForPageLoad();
    }

    // Login Actions
    async enterUsername(username) {
        await this.waitAndFill(authSelectors.usernameInput, username);
    }

    async enterPassword(password) {
        await this.waitAndFill(authSelectors.passwordInput, password);
    }

    async clickLoginButton() {
        await this.waitAndClick(authSelectors.loginButton);
        await this.waitforNetworkIdle();
    }

    async loginWithCredentials(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async loginWithRole(roleName) {
        const credentials = this.getLoginDataByRole(roleName);
        await this.loginWithCredentials(credentials.username, credentials.password);
    }

    // Registration Actions
    async enterRegistrationUsername(username) {
        await this.waitAndFill(authSelectors.registrationUsernameInput, username);
    }

    async enterRegistrationEmail(email) {
        await this.waitAndFill(authSelectors.registrationEmailInput, email);
    }

    async enterRegistrationPassword(password) {
        await this.waitAndFill(authSelectors.registrationPasswordInput, password);
    }

    async clickRegisterButton() {
        await this.waitAndClick(authSelectors.registerButton);
        await this.waitforNetworkIdle();
    }

    async registerUser(username, email, password) {
        await this.enterRegistrationUsername(username);
        await this.enterRegistrationEmail(email);
        await this.enterRegistrationPassword(password);
        await this.clickRegisterButton();
    }

    // Password Reset Actions
    async enterForgotPasswordEmail(email) {
        await this.waitAndFill(authSelectors.forgotPasswordEmailInput, email);
    }

    async clickSendResetLinkButton() {
        await this.waitAndClick(authSelectors.sendResetLinkButton);
        await this.waitforNetworkIdle();
    }

    // Profile Actions
    async updateFirstName(firstName) {
        await this.waitAndFill(authSelectors.firstNameInput, firstName);
    }

    async updateProfileEmail(email) {
        await this.waitAndFill(authSelectors.profileEmailInput, email);
    }

    async clickSaveChanges() {
        await this.waitAndClick(authSelectors.saveChangesButton);
        await this.waitforNetworkIdle();
    }

    async updateProfile(firstName, email) {
        await this.updateFirstName(firstName);
        await this.updateProfileEmail(email);
        await this.clickSaveChanges();
    }

    // Password Change Actions
    async clickChangePasswordOption() {
        await this.waitAndClick(authSelectors.changePasswordOption);
    }

    async enterCurrentPassword(password) {
        await this.waitAndFill(authSelectors.currentPasswordInput, password);
    }

    async enterNewPassword(password) {
        await this.waitAndFill(authSelectors.newPasswordInput, password);
    }

    async enterConfirmPassword(password) {
        await this.waitAndFill(authSelectors.confirmPasswordInput, password);
    }

    async clickSavePassword() {
        await this.waitAndClick(authSelectors.savePasswordButton);
        await this.waitforNetworkIdle();
    }

    async changePassword(currentPassword, newPassword) {
        await this.enterCurrentPassword(currentPassword);
        await this.enterNewPassword(newPassword);
        await this.enterConfirmPassword(newPassword);
        await this.clickSavePassword();
    }

    // Logout Actions
    async clickUserMenu() {
        await this.waitAndClick(authSelectors.userMenu);
    }

    async clickLogoutOption() {
        await this.waitAndClick(authSelectors.logoutOption);
    }

    async confirmLogout() {
        await this.waitAndClick(authSelectors.logoutConfirmButton);
        await this.waitForPageLoad();
    }

    async logout() {
        await this.clickUserMenu();
        await this.clickLogoutOption();
        await this.confirmLogout();
    }

    // Assertion Methods
    async verifyLoginPageDisplayed() {
        await this.wait();
        const currentUrl = await this.getUrl();
        expect(currentUrl).toContain(authSelectors.loginPageUrl);
    }

    async verifyDashboardLoaded() {
        await this.wait();
        const isVisible = await this.isElementVisible(authSelectors.dashboardHeader);
        expect(isVisible).toBeTruthy();
    }

    async verifyLoginErrorMessage() {
        await this.wait();
        const isVisible = await this.isElementVisible(authSelectors.loginErrorMessage);
        expect(isVisible).toBeTruthy();
    }

    async verifyRegistrationSuccess() {
        await this.wait();
        const isVisible = await this.isElementVisible(authSelectors.registrationSuccessMessage);
        expect(isVisible).toBeTruthy();
    }

    async verifyRegistrationError(expectedText) {
        await this.wait();
        await this.verifyElementContainsText(authSelectors.registrationErrorMessage, expectedText);
    }

    async verifyPasswordMinLengthError() {
        await this.wait();
        const isVisible = await this.isElementVisible(authSelectors.passwordMinLengthError);
        expect(isVisible).toBeTruthy();
    }

    async verifyResetLinkSuccess() {
        await this.wait();
        const isVisible = await this.isElementVisible(authSelectors.resetLinkSuccessMessage);
        expect(isVisible).toBeTruthy();
    }

    async verifyResetLinkError() {
        await this.wait();
        const isVisible = await this.isElementVisible(authSelectors.resetLinkErrorMessage);
        expect(isVisible).toBeTruthy();
    }

    async verifyProfileUpdateSuccess() {
        await this.wait();
        const isVisible = await this.isElementVisible(authSelectors.profileSuccessMessage);
        expect(isVisible).toBeTruthy();
    }

    async verifyProfileEmailValidationError() {
        await this.wait();
        const isVisible = await this.isElementVisible(authSelectors.profileEmailValidationError);
        expect(isVisible).toBeTruthy();
    }

    async verifyPasswordChangeSuccess() {
        await this.wait();
        const isVisible = await this.isElementVisible(authSelectors.passwordChangeSuccessMessage);
        expect(isVisible).toBeTruthy();
    }

    async verifyPasswordChangeError() {
        await this.wait();
        const isVisible = await this.isElementVisible(authSelectors.passwordChangeErrorMessage);
        expect(isVisible).toBeTruthy();
    }

    async verifyUsernameDisplayed(expectedUsername) {
        await this.wait();
        await this.verifyElementContainsText(authSelectors.displayedUsername, expectedUsername);
    }

    async verifyEmailDisplayed(expectedEmail) {
        await this.wait();
        await this.verifyElementContainsText(authSelectors.displayedEmail, expectedEmail);
    }

    async verifyAccountCreationDatePresent() {
        await this.wait();
        const isVisible = await this.isElementVisible(authSelectors.accountCreationDate);
        expect(isVisible).toBeTruthy();
    }

    async verifyActivityHistoryDisplayed() {
        await this.wait();
        const isVisible = await this.isElementVisible(authSelectors.activityHistoryTable);
        expect(isVisible).toBeTruthy();
    }

    async verifyActivityTimestampsPresent() {
        await this.wait();
        const count = await this.getCount(authSelectors.activityTimestamps);
        expect(count).toBeGreaterThan(0);
    }

    async verifyUserRemainsOnLoginPage() {
        await this.verifyLoginPageDisplayed();
    }

    async verifyRedirectToLoginPage() {
        await this.wait();
        const currentUrl = await this.getUrl();
        expect(currentUrl).toContain(authSelectors.loginPageUrl);
    }
}

export default AuthenticationPage;

