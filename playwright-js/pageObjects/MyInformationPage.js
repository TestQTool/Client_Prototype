const { expect } = require('@playwright/test');

class MyInformationPage {
  constructor(page) {
    this.page = page;
    
    // Locators for My Information section
    this.myInfoMenu = page.locator('a:has-text("My Info")');
    this.personalDetailsHeader = page.locator('h6:has-text("Personal Details")');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('input.oxd-input').nth(4);
    this.otherIdInput = page.locator('input.oxd-input').nth(5);
    this.licenseNumberInput = page.locator('input.oxd-input').nth(6);
    this.licenseExpiryDateInput = page.locator('input[placeholder="yyyy-mm-dd"]').first();
    this.nationalityDropdown = page.locator('.oxd-select-text').first();
    this.maritalStatusDropdown = page.locator('.oxd-select-text').nth(1);
    this.dateOfBirthInput = page.locator('input[placeholder="yyyy-mm-dd"]').nth(1);
    this.genderMaleRadio = page.locator('input[type="radio"][value="1"]');
    this.genderFemaleRadio = page.locator('input[type="radio"][value="2"]');
    this.saveButton = page.locator('button[type="submit"]').first();
    this.successMessage = page.locator('.oxd-toast-content--success');
    
    // Profile picture section
    this.profilePictureSection = page.locator('.orangehrm-edit-employee-image');
    this.profileImageUpload = page.locator('input[type="file"]');
  }

  async navigateToMyInfo() {
    await this.myInfoMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPersonalDetailsDisplayed() {
    await expect(this.personalDetailsHeader).toBeVisible();
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

  async updatePersonalDetails(userData) {
    if (userData.firstName) {
      await this.updateFirstName(userData.firstName);
    }
    if (userData.middleName) {
      await this.updateMiddleName(userData.middleName);
    }
    if (userData.lastName) {
      await this.updateLastName(userData.lastName);
    }
  }

  async savePersonalDetails() {
    await this.saveButton.click();
  }

  async verifySuccessMessage() {
    await expect(this.successMessage).toBeVisible();
  }

  async getFirstName() {
    return await this.firstNameInput.inputValue();
  }

  async getLastName() {
    return await this.lastNameInput.inputValue();
  }
}

module.exports = { MyInformationPage };
