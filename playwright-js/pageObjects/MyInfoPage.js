class MyInfoPage {
  constructor(page) {
    this.page = page;
    this.myInfoMenu = page.locator('a[href="/web/index.php/pim/viewMyDetails"]');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.nicknameInput = page.locator('div.oxd-form-row').nth(1).locator('input.oxd-input').nth(1);
    this.employeeIdInput = page.locator('div.oxd-form-row').nth(2).locator('input.oxd-input').first();
    this.otherIdInput = page.locator('div.oxd-form-row').nth(2).locator('input.oxd-input').nth(1);
    this.licenseNumberInput = page.locator('div.oxd-form-row').nth(3).locator('input.oxd-input').first();
    this.licenseExpiryDateInput = page.locator('div.oxd-form-row').nth(3).locator('input.oxd-input--active, input.oxd-input').nth(1);
    this.nationalityDropdown = page.locator('div.oxd-form-row').nth(4).locator('div.oxd-select-text').first();
    this.maritalStatusDropdown = page.locator('div.oxd-form-row').nth(4).locator('div.oxd-select-text').nth(1);
    this.dateOfBirthInput = page.locator('div.oxd-form-row').nth(5).locator('input.oxd-input');
    this.genderMaleRadio = page.locator('input[type="radio"][value="1"]');
    this.genderFemaleRadio = page.locator('input[type="radio"][value="2"]');
    this.savePersonalDetailsButton = page.locator('form').first().locator('button[type="submit"]');
    this.successToast = page.locator('.oxd-toast--success');
    this.personalDetailsHeader = page.locator('h6.oxd-text--h6').filter({ hasText: 'Personal Details' });
  }

  async navigateToMyInfo() {
    await this.myInfoMenu.click();
    await this.personalDetailsHeader.waitFor({ state: 'visible' });
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

  async updateNickname(nickname) {
    await this.nicknameInput.clear();
    await this.nicknameInput.fill(nickname);
  }

  async updateEmployeeId(employeeId) {
    await this.employeeIdInput.clear();
    await this.employeeIdInput.fill(employeeId);
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
    if (personalData.nickname) {
      await this.updateNickname(personalData.nickname);
    }
    if (personalData.employeeId) {
      await this.updateEmployeeId(personalData.employeeId);
    }
  }

  async savePersonalDetails() {
    await this.savePersonalDetailsButton.click();
  }

  async isSuccessToastVisible() {
    await this.successToast.waitFor({ state: 'visible', timeout: 10000 });
    return await this.successToast.isVisible();
  }

  async getFirstNameValue() {
    return await this.firstNameInput.inputValue();
  }

  async getLastNameValue() {
    return await this.lastNameInput.inputValue();
  }

  async getMiddleNameValue() {
    return await this.middleNameInput.inputValue();
  }
}

module.exports = { MyInfoPage };