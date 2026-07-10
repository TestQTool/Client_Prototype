const { expect } = require('@playwright/test');

class JobVacancyPage {
  constructor(page) {
    this.page = page;
    this.recruitmentMenu = page.locator('span:has-text("Recruitment")');
    this.vacanciesSubMenu = page.locator('a:has-text("Vacancies")');
    this.addButton = page.locator('button:has-text("Add")');
    this.jobTitleDropdown = page.locator('div.oxd-select-text-input').first();
    this.vacancyNameInput = page.locator('input[placeholder="Type here"]').nth(0);
    this.hiringManagerInput = page.locator('input[placeholder="Type for hints..."]');
    this.numberOfPositionsInput = page.locator('input[placeholder="Type here"]').nth(1);
    this.saveButton = page.locator('button[type="submit"]:has-text("Save")');
    this.validationError = page.locator('.oxd-input-field-error-message, span.oxd-text--span:has-text("Required")');
  }

  async navigateToVacancies() {
    await this.recruitmentMenu.click();
    await this.vacanciesSubMenu.click();
  }

  async clickAddVacancy() {
    await this.addButton.click();
  }

  async fillVacancyForm(vacancyName, hiringManager, numberOfPositions, fillJobTitle = false) {
    if (!fillJobTitle) {
      // Leave Job Title field empty - skip interaction
    }
    
    if (vacancyName) {
      await this.vacancyNameInput.fill(vacancyName);
    }
    
    if (hiringManager) {
      await this.hiringManagerInput.fill(hiringManager);
      await this.page.waitForTimeout(1000);
      await this.page.keyboard.press('ArrowDown');
      await this.page.keyboard.press('Enter');
    }
    
    if (numberOfPositions) {
      await this.numberOfPositionsInput.fill(numberOfPositions);
    }
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async verifyValidationError() {
    await expect(this.validationError).toBeVisible();
    return await this.validationError.isVisible();
  }
}

module.exports = JobVacancyPage;

