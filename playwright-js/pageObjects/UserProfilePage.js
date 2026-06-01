const { expect } = require('@playwright/test');

class UserProfilePage {
  constructor(page) {
    this.page = page;
    this.profileMenuBtn = page.locator('[data-testid="profile-menu"]');
    this.profileLink = page.locator('[data-testid="profile-link"]');
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#email');
    this.phoneInput = page.locator('#phone');
    this.saveBtn = page.locator('[data-testid="save-profile-btn"]');
    this.successMessage = page.locator('.success-message');
    this.profileAvatar = page.locator('[data-testid="profile-avatar"]');
    this.uploadAvatarInput = page.locator('input[type="file"]');
    this.changePasswordLink = page.locator('[data-testid="change-password-link"]');
    this.currentPasswordInput = page.locator('#currentPassword');
    this.newPasswordInput = page.locator('#newPassword');
    this.confirmPasswordInput = page.locator('#confirmPassword');
    this.updatePasswordBtn = page.locator('[data-testid="update-password-btn"]');
  }

  async navigateToProfile() {
    await this.profileMenuBtn.click();
    await this.profileLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async updateProfileDetails(userData) {
    if (userData.firstName) {
      await this.firstNameInput.clear();
      await this.firstNameInput.fill(userData.firstName);
    }
    if (userData.lastName) {
      await this.lastNameInput.clear();
      await this.lastNameInput.fill(userData.lastName);
    }
    if (userData.email) {
      await this.emailInput.clear();
      await this.emailInput.fill(userData.email);
    }
    if (userData.phone) {
      await this.phoneInput.clear();
      await this.phoneInput.fill(userData.phone);
    }
  }

  async saveProfile() {
    await this.saveBtn.click();
  }

  async verifySuccessMessage(expectedMessage) {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText(expectedMessage);
  }

  async uploadAvatar(filePath) {
    await this.uploadAvatarInput.setInputFiles(filePath);
  }

  async changePassword(currentPassword, newPassword, confirmPassword) {
    await this.changePasswordLink.click();
    await this.currentPasswordInput.fill(currentPassword);
    await this.newPasswordInput.fill(newPassword);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.updatePasswordBtn.click();
  }

  async getProfileFieldValue(fieldName) {
    const fieldMap = {
      firstName: this.firstNameInput,
      lastName: this.lastNameInput,
      email: this.emailInput,
      phone: this.phoneInput
    };
    return await fieldMap[fieldName].inputValue();
  }
}

module.exports = { UserProfilePage };
