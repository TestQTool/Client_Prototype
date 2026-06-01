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
    this.employeeIdInput = page.locator('//label[text()="Employee Id"]/following::input[1]');
    this.otherIdInput = page.locator('//label[text()="Other Id"]/following::input[1]');
    this.driverLicenseInput = page.locator('//label[text()="Driver\'s License Number"]/following::input[1]');
    this.licenseExpiryDateInput = page.locator('//label[text()="License Expiry Date"]/following::input[1]');
    this.nationalityDropdown = page.locator('//label[text()="Nationality"]/following::div[contains(@class,"select")][1]');
    this.maritalStatusDropdown = page.locator('//label[text()="Marital Status"]/following::div[contains(@class,"select")][1]');
    this.dateOfBirthInput = page.locator('//label[text()="Date of Birth"]/following::input[1]');
    this.genderMaleRadio = page.locator('input[type="radio"][value="1"]');
    this.genderFemaleRadio = page.locator('input[type="radio"][value="2"]');
    this.saveButton = page.locator('button[type="submit"]:has-text("Save")');
    this.successMessage = page.locator('.oxd-toast-content--success');
    this.profilePicture = page.locator('.employee-image');
    this.attachmentsSection = page.locator('h6:has-text("Attachments")');
  }

  async navigateToMyInfo() {
    await this.myInfoMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMyInfoPageLoaded() {
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

  async savePersonalDetails() {
    await this.saveButton.first().click();
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

  async verifyPersonalDetailsDisplayed() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.employeeIdInput).toBeVisible();
  }
}

module.exports = { MyInformationPage };
