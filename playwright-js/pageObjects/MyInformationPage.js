const { expect } = require('@playwright/test');

class MyInformationPage {
  constructor(page) {
    this.page = page;
    this.myInfoMenu = page.locator('a[href*="viewMyDetails"]');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('input[name="employeeId"]');
    this.saveButton = page.locator('button[type="submit"]').first();
    this.successMessage = page.locator('.oxd-toast--success');
    this.personalDetailsHeader = page.locator('h6:has-text("Personal Details")');
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

  async updatePersonalDetails(firstName, middleName, lastName) {
    await this.updateFirstName(firstName);
    await this.updateMiddleName(middleName);
    await this.updateLastName(lastName);
  }

  async savePersonalDetails() {
    await this.saveButton.click();
  }

  async verifySuccessMessage() {
    await expect(this.successMessage).toBeVisible();
  }

  async getEmployeeId() {
    return await this.employeeIdInput.inputValue();
  }
}

module.exports = { MyInformationPage };
