import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import { AuthenticationPageLocators } from '../pageObjects/AuthenticationPage.js';

class AuthenticationPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Navigation methods
  async navigateToLoginPage() {
    await this.open('/login');
    await this.waitForPageLoad();
  }

  async navigateToRegistrationPage() {
    await this.open('/register');
    await this.waitForPageLoad();
  }

  async navigateToForgotPasswordPage() {
    await this.open('/forgot-password');
    await this.waitForPageLoad();
  }

  async navigateToProfilePage() {
    await this.open('/profile');
    await this.waitForPageLoad();
  }

  async navigateToProfileSettings() {
    await this.open('/profile/settings');
    await this.waitForPageLoad();
  }

  async navigateToAccountInfoPage() {
    await this.open('/account');
    await this.waitForPageLoad();
  }

  async navigateToAccountActivitySection() {
    await this.open('/account/activity');
    await this.waitForPageLoad();
  }

  // Login methods
  async enterUsername(username) {
    await this.waitAndFill(AuthenticationPageLocators.usernameInput, username);
  }

  async enterPassword(password) {
    await this.waitAndFill(AuthenticationPageLocators.passwordInput, password);
  }

  async clickLoginButton() {
    await this.waitAndClick(AuthenticationPageLocators.loginButton);
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

  // Registration methods
  async enterRegistrationUsername(username) {
    await this.waitAndFill(AuthenticationPageLocators.registrationUsernameInput, username);
  }

  async enterRegistrationEmail(email) {
    await this.waitAndFill(AuthenticationPageLocators.registrationEmailInput, email);
  }

  async enterRegistrationPassword(password) {
    await this.waitAndFill(AuthenticationPageLocators.registrationPasswordInput, password);
  }

  async enterConfirmPassword(password) {
    await this.waitAndFill(AuthenticationPageLocators.registrationConfirmPasswordInput, password);
  }

  async clickRegisterButton() {
    await this.waitAndClick(AuthenticationPageLocators.registerButton);
    await this.waitforNetworkIdle();
  }

  async registerWithCredentials(username, email, password) {
    await this.enterRegistrationUsername(username);
    await this.enterRegistrationEmail(email);
    await this.enterRegistrationPassword(password);
    await this.clickRegisterButton();
  }

  // Profile methods
  async updateFirstName(firstName) {
    await this.waitAndFill(AuthenticationPageLocators.profileFirstNameInput, firstName);
  }

  async updateEmailAddress(email) {
    await this.waitAndFill(AuthenticationPageLocators.profileEmailInput, email);
  }

  async clickSaveChangesButton() {
    await this.waitAndClick(AuthenticationPageLocators.profileSaveButton);
    await this.waitforNetworkIdle();
  }

  // Password reset methods
  async enterForgotPasswordEmail(email) {
    await this.waitAndFill(AuthenticationPageLocators.forgotPasswordEmailInput, email);
  }

  async clickSendResetLinkButton() {
    await this.waitAndClick(AuthenticationPageLocators.sendResetLinkButton);
    await this.waitforNetworkIdle();
  }

  // Password change methods
  async clickChangePasswordOption() {
    await this.waitAndClick(AuthenticationPageLocators.changePasswordOption);
  }

  async enterCurrentPassword(password) {
    await this.waitAndFill(AuthenticationPageLocators.currentPasswordInput, password);
  }

  async enterNewPassword(password) {
    await this.waitAndFill(AuthenticationPageLocators.newPasswordInput, password);
  }

  async enterConfirmNewPassword(password) {
    await this.waitAndFill(AuthenticationPageLocators.confirmNewPasswordInput, password);
  }

  async clickSavePasswordButton() {
    await this.waitAndClick(AuthenticationPageLocators.savePasswordButton);
    await this.waitforNetworkIdle();
  }

  async changePassword(currentPassword, newPassword) {
    await this.enterCurrentPassword(currentPassword);
    await this.enterNewPassword(newPassword);
    await this.enterConfirmNewPassword(newPassword);
    await this.clickSavePasswordButton();
  }

  // Logout methods
  async navigateToUserMenu() {
    await this.waitAndClick(AuthenticationPageLocators.userMenu);
  }

  async clickLogoutOption() {
    await this.waitAndClick(AuthenticationPageLocators.logoutOption);
    await this.waitforNetworkIdle();
  }

  async confirmLogout() {
    await this.clickLogoutOption();
  }

  // Assertion methods
  async verifyLoginPageDisplays() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.loginPage);
    expect(isVisible).toBeTruthy();
  }

  async verifyRegistrationPageDisplays() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.registrationPage);
    expect(isVisible).toBeTruthy();
  }

  async verifyDashboardLoads() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.dashboard);
    expect(isVisible).toBeTruthy();
  }

  async verifyUserRemainsOnLoginPage() {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain('/login');
  }

  async verifyLoginErrorMessage() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.loginErrorMessage);
    expect(isVisible).toBeTruthy();
  }

  async verifyRegistrationErrorMessage() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.registrationErrorMessage);
    expect(isVisible).toBeTruthy();
  }

  async verifyRegistrationErrorContent(expectedText) {
    await this.wait();
    await this.verifyElementContainsText(AuthenticationPageLocators.registrationErrorMessage, expectedText);
  }

  async verifyProfilePageDisplays() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.profilePage);
    expect(isVisible).toBeTruthy();
  }

  async verifyProfileSuccessMessage() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.profileSuccessMessage);
    expect(isVisible).toBeTruthy();
  }

  async verifyEmailErrorMessage() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.profileEmailErrorMessage);
    expect(isVisible).toBeTruthy();
  }

  async verifyForgotPasswordPageDisplays() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.forgotPasswordPage);
    expect(isVisible).toBeTruthy();
  }

  async verifyResetPasswordErrorMessage() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.resetPasswordErrorMessage);
    expect(isVisible).toBeTruthy();
  }

  async verifyPasswordChangeFormAppears() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.currentPasswordInput);
    expect(isVisible).toBeTruthy();
  }

  async verifyPasswordChangeErrorMessage() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.passwordChangeErrorMessage);
    expect(isVisible).toBeTruthy();
  }

  async verifyPasswordUpdatedSuccessfully() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.passwordChangeSuccessMessage);
    expect(isVisible).toBeTruthy();
  }

  async verifyRedirectToLoginPage() {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain('/login');
  }

  async verifyRedirectToDashboard() {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain('/dashboard');
  }

  async verifyDashboardElementsVisible() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.dashboardTitle);
    expect(isVisible).toBeTruthy();
  }

  async verifyAccountInfoPageDisplays() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.accountInfoPage);
    expect(isVisible).toBeTruthy();
  }

  async verifyUsernameDisplayed() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.accountUsername);
    expect(isVisible).toBeTruthy();
  }

  async verifyEmailAddressShown() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.accountEmail);
    expect(isVisible).toBeTruthy();
  }

  async verifyAccountCreationDate() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.accountCreationDate);
    expect(isVisible).toBeTruthy();
  }

  async verifyActivityPageLoads() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.accountActivitySection);
    expect(isVisible).toBeTruthy();
  }

  async verifyLoginHistoryDisplayed() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.loginHistoryList);
    expect(isVisible).toBeTruthy();
  }

  async verifyActivityTimestampsAccurate() {
    await this.wait();
    const count = await this.getCount(AuthenticationPageLocators.activityTimestamps);
    expect(count).toBeGreaterThan(0);
  }

  async verifySessionExpired() {
    await this.wait();
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain('/login');
  }

  async verifyMinimumLengthErrorMessage() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.registrationErrorMessage);
    expect(isVisible).toBeTruthy();
  }

  async verifyAccountCreatedSuccessfully() {
    await this.wait();
    const isVisible = await this.isElementVisible(AuthenticationPageLocators.registrationSuccessMessage);
    expect(isVisible).toBeTruthy();
  }
}

export default AuthenticationPage;