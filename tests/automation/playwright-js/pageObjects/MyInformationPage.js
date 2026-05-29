const { expect } = require('@playwright/test');

class MyInformationPage {
  constructor(page) {
    this.page = page;
    this.myInfoMenu = page.locator('a[href*="viewMyDetails"], [data-testid="my-info"], span:has-text("My Info")');
    this.firstNameInput = page.locator('input[name="firstName"], [data-testid="firstName"], input.orangehrm-firstname');
    this.middleNameInput = page.locator('input[name="middleName"], [data-testid="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"], [data-testid="lastName"], input.orangehrm-lastname');
    this.employeeIdInput = page.locator('input[name="employeeId"], [data-testid="employeeId"]');
    this.saveButton = page.locator('button[type="submit"]:has-text("Save"), [data-testid="save-button"]').first();
    this.successMessage = page.locator('.success-message, [data-testid="success-message"], .oxd-toast--success');
    this.profilePicture = page.locator('.profile-picture, [data-testid="profile-picture"], .orangehrm-edit-employee-image');
    this.personalDetailsSection = page.locator('.personal-details, [data-testid="personal-details"], .orangehrm-main-title');
  }

  async navigateToMyInformation() {
    await this.myInfoMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMyInformationPageLoaded() {
    await expect(this.personalDetailsSection).toBeVisible({ timeout: 10000 });
  }

  async getFirstName() {
    return await this.firstNameInput.inputValue();
  }

  async getLastName() {
    return await this.lastNameInput.inputValue();
  }

  async updateFirstName(firstName) {
    await this.firstNameInput.clear();
    await this.firstNameInput.fill(firstName);
  }

  async updateMiddleName(middleName) {
    await this.middleNameInput.clear();
    await this.middleNameInput.fill(middleName);
  }

  async updateLastName(lastName) {
    await this.lastNameInput.clear();
    await this.lastNameInput.fill(lastName);
  }

  async updatePersonalDetails(personalData) {
    if (personalData.firstName) {
      await this.updateFirstName(personalData.firstName);
    }
    if (personalData.middleName) {
      await this.updateMiddleName(personalData.middleName);
    }
    if (personalData.lastName) {
      await this.updateLastName(personalData.lastName);
    }
  }

  async saveChanges() {
    await this.saveButton.click();
  }

  async verifySaveSuccess() {
    await expect(this.successMessage).toBeVisible({ timeout: 10000 });
  }

  async verifyProfilePictureVisible() {
    await expect(this.profilePicture).toBeVisible();
  }

  async getPersonalDetails() {
    return {
      firstName: await this.getFirstName(),
      lastName: await this.getLastName()
    };
  }
}

module.exports = { MyInformationPage };
