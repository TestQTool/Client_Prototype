const { expect } = require('@playwright/test');

class MyInformationPage {
  constructor(page) {
    this.page = page;
    
    // Section tabs
    this.personalDetailsTab = page.locator('a:has-text("Personal Details")');
    this.contactDetailsTab = page.locator('a:has-text("Contact Details")');
    this.emergencyContactsTab = page.locator('a:has-text("Emergency Contacts")');
    this.dependentsTab = page.locator('a:has-text("Dependents")');
    this.immigrationTab = page.locator('a:has-text("Immigration")');
    this.qualificationsTab = page.locator('a:has-text("Qualifications")');
    
    // Section containers
    this.personalDetailsSection = page.locator('.orangehrm-main-title:has-text("Personal Details")');
    this.contactDetailsSection = page.locator('.orangehrm-main-title:has-text("Contact Details")');
    this.emergencyContactsSection = page.locator('.orangehrm-main-title:has-text("Emergency Contacts")');
    this.dependentsSection = page.locator('.orangehrm-main-title:has-text("Dependents")');
    this.immigrationSection = page.locator('.orangehrm-main-title:has-text("Immigration")');
    this.qualificationsSection = page.locator('.orangehrm-main-title:has-text("Qualifications")');
    
    // Navigation elements
    this.myInfoMenu = page.locator('a.oxd-main-menu-item:has-text("My Info")');
    this.sectionTabs = page.locator('.orangehrm-tabs-wrapper a');
    this.activeTab = page.locator('.orangehrm-tabs-wrapper a.--active');
    
    // Form fields
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    
    // Error elements
    this.errorMessage = page.locator('.oxd-alert-content-text');
    this.toastMessage = page.locator('.oxd-toast-content');
  }

  async navigateToMyInformation() {
    await this.myInfoMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickPersonalDetailsTab() {
    await this.personalDetailsTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickContactDetailsTab() {
    await this.contactDetailsTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickEmergencyContactsTab() {
    await this.emergencyContactsTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickDependentsTab() {
    await this.dependentsTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickImmigrationTab() {
    await this.immigrationTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickQualificationsTab() {
    await this.qualificationsTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getAllSectionTabs() {
    return await this.sectionTabs.all();
  }

  async verifyAllTabsVisible() {
    await expect(this.personalDetailsTab).toBeVisible();
    await expect(this.contactDetailsTab).toBeVisible();
    await expect(this.emergencyContactsTab).toBeVisible();
    await expect(this.dependentsTab).toBeVisible();
    await expect(this.immigrationTab).toBeVisible();
    await expect(this.qualificationsTab).toBeVisible();
  }

  async verifyPersonalDetailsSectionDisplayed() {
    await expect(this.personalDetailsSection).toBeVisible();
  }

  async verifyContactDetailsSectionDisplayed() {
    await expect(this.contactDetailsSection).toBeVisible();
  }

  async verifyEmergencyContactsSectionDisplayed() {
    await expect(this.emergencyContactsSection).toBeVisible();
  }

  async verifyDependentsSectionDisplayed() {
    await expect(this.dependentsSection).toBeVisible();
  }

  async verifyImmigrationSectionDisplayed() {
    await expect(this.immigrationSection).toBeVisible();
  }

  async verifyQualificationsSectionDisplayed() {
    await expect(this.qualificationsSection).toBeVisible();
  }

  async verifyActiveTabHighlighted(tabName) {
    const activeTabText = await this.activeTab.textContent();
    expect(activeTabText).toContain(tabName);
  }

  async navigateThroughAllSectionsSequentially() {
    await this.clickPersonalDetailsTab();
    await this.verifyPersonalDetailsSectionDisplayed();
    
    await this.clickContactDetailsTab();
    await this.verifyContactDetailsSectionDisplayed();
    
    await this.clickEmergencyContactsTab();
    await this.verifyEmergencyContactsSectionDisplayed();
    
    await this.clickDependentsTab();
    await this.verifyDependentsSectionDisplayed();
    
    await this.clickImmigrationTab();
    await this.verifyImmigrationSectionDisplayed();
    
    await this.clickQualificationsTab();
    await this.verifyQualificationsSectionDisplayed();
  }

  async enterPersonalDetails(firstName, middleName, lastName) {
    if (firstName) {
      await this.firstNameInput.clear();
      await this.firstNameInput.fill(firstName);
    }
    if (middleName) {
      await this.middleNameInput.clear();
      await this.middleNameInput.fill(middleName);
    }
    if (lastName) {
      await this.lastNameInput.clear();
      await this.lastNameInput.fill(lastName);
    }
  }

  async verifyEnteredPersonalDetails(firstName, middleName, lastName) {
    if (firstName) {
      await expect(this.firstNameInput).toHaveValue(firstName);
    }
    if (middleName) {
      await expect(this.middleNameInput).toHaveValue(middleName);
    }
    if (lastName) {
      await expect(this.lastNameInput).toHaveValue(lastName);
    }
  }

  async navigateUsingKeyboard() {
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('ArrowRight');
    await this.page.keyboard.press('Enter');
  }

  async tabToSectionTabs() {
    let maxTabs = 20;
    while (maxTabs > 0) {
      await this.page.keyboard.press('Tab');
      const focusedElement = await this.page.locator(':focus');
      const tagName = await focusedElement.evaluate(el => el.tagName);
      if (tagName === 'A') {
        const parent = await focusedElement.evaluate(el => el.closest('.orangehrm-tabs-wrapper'));
        if (parent) break;
      }
      maxTabs--;
    }
  }

  async navigateWithArrowKeys(direction) {
    if (direction === 'right') {
      await this.page.keyboard.press('ArrowRight');
    } else if (direction === 'left') {
      await this.page.keyboard.press('ArrowLeft');
    }
  }

  async pressEnterOnFocusedTab() {
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async rapidSectionSwitching(iterations = 5) {
    for (let i = 0; i < iterations; i++) {
      await this.personalDetailsTab.click();
      await this.contactDetailsTab.click();
      await this.emergencyContactsTab.click();
      await this.dependentsTab.click();
      await this.immigrationTab.click();
      await this.qualificationsTab.click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  async checkForJSErrors() {
    const errors = [];
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    return errors;
  }

  async getPageLoadTime() {
    const startTime = Date.now();
    await this.page.waitForLoadState('networkidle');
    const endTime = Date.now();
    return endTime - startTime;
  }

  async verifyHTTPS() {
    const url = this.page.url();
    expect(url).toMatch(/^https:\/\//);
  }

  async navigateToInvalidSection(invalidPath) {
    const baseUrl = this.page.url().split('/web/')[0];
    await this.page.goto(`${baseUrl}/web/index.php/pim/viewMyDetails/${invalidPath}`);
  }

  async verifyErrorHandlingOrRedirect() {
    const currentUrl = this.page.url();
    const hasError = await this.errorMessage.isVisible().catch(() => false);
    const isRedirected = !currentUrl.includes('invalid');
    return hasError || isRedirected;
  }
}

module.exports = { MyInformationPage };
