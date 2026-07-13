class VacancyPage {
  constructor(page) {
    this.page = page;
    this.jobTitleInput = 'input[placeholder="Type for hints..."]';
    this.vacancyNameInput = 'input.oxd-input--active:nth-of-type(2)';
    this.hiringManagerInput = 'input[placeholder="Type for hints..."]:nth-of-type(2)';
    this.numberOfPositionsInput = 'input[placeholder="Type here"]';
    this.saveButton = 'button[type="submit"]';
    this.validationError = '.oxd-input-field-error-message';
    this.requiredFieldError = 'span.oxd-text--span:has-text("Required")';
  }

  async fillJobTitle(jobTitle) {
    await this.page.fill(this.jobTitleInput, jobTitle);
    await this.page.waitForTimeout(500);
  }

  async fillVacancyName(vacancyName) {
    if (vacancyName) {
      await this.page.fill(this.vacancyNameInput, vacancyName);
    }
  }

  async selectHiringManager(hiringManager) {
    await this.page.fill(this.hiringManagerInput, hiringManager);
    await this.page.waitForTimeout(500);
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
  }

  async fillNumberOfPositions(number) {
    await this.page.fill(this.numberOfPositionsInput, number);
  }

  async clickSave() {
    await this.page.click(this.saveButton);
    await this.page.waitForTimeout(1000);
  }

  async getValidationError() {
    return await this.page.locator(this.validationError).first();
  }

  async isRequiredFieldErrorDisplayed() {
    return await this.page.locator(this.requiredFieldError).isVisible();
  }
}

module.exports = VacancyPage;