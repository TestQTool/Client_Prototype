// pages/SavedProductsPagePage.js
// Page class for SavedProducts
// Template reference: StaticFrameworks/playwright-js/pages/_template.js
// ────
import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import {
    pageHeading,
    pageSubHeading,
    primaryInput,
    secondaryInput,
    emailInput,
    passwordInput,
    searchInput,
    submitBtn,
    cancelBtn,
    saveBtn,
    deleteBtn,
    editBtn,
    addBtn,
    primaryDropdown,
    dropdownOption,
    errorMessage,
    successMessage,
    fieldError,
    requiredError,
    dataTable,
    tableRow,
    tableHeader,
    noDataMessage,
    modalContainer,
    modalTitle,
    modalConfirmBtn,
    modalCloseBtn
} from '../pageObjects/SavedProductsPagePage.js';

class SavedProductsPage extends BasePage {
    constructor(page) {
        super(page);
    }

    // ── Navigation ────────────────────────────────────────────────────────────
    async navigate() {
        const url = process.env.BASE_URL || this.testData.baseUrl || '';
        await this.open(url + '/savedproducts');
        return await super.waitForPageLoad();
    }

    async loginAs(roleName) {
        const creds = this.getLoginDataByRole(roleName);
        return creds;
    }

    // ── Actions ──────────────────────────────────────────────────────────────
    async fillPrimaryField(value) {
        await this.waitAndFill(primaryInput, value);
    }

    async fillSearchField(value) {
        await this.waitAndFill(searchInput, value);
    }

    async submit() {
        await this.waitAndClick(submitBtn);
        return await super.waitForPageLoad();
    }

    async clickCancel() {
        await this.waitAndClick(cancelBtn);
        return await super.waitForPageLoad();
    }

    async clickSave() {
        await this.waitAndClick(saveBtn);
        return await super.waitForPageLoad();
    }

    async clickDelete() {
        await this.waitAndClick(deleteBtn);
        return await super.waitForPageLoad();
    }

    async clickEdit() {
        await this.waitAndClick(editBtn);
        return await super.waitForPageLoad();
    }

    async clickAdd() {
        await this.waitAndClick(addBtn);
        return await super.waitForPageLoad();
    }

    async selectDropdown(optionText) {
        await this.waitAndClick(primaryDropdown);
        const option = this.page.locator(dropdownOption).filter({ hasText: optionText });
        await option.click();
    }

    // ── Assertions ───────────────────────────────────────────────────────────
    async verifyPageLoaded() {
        await this.wait();
        await this.isElementVisible(pageHeading, this.testData.notVisibleText);
        expect(await this.getUrl()).toContain('/savedproducts');
    }

    async verifySuccessMessage() {
        await this.wait();
        await this.isElementVisible(successMessage, this.testData.notVisibleText);
    }

    async verifyErrorMessage(expectedText) {
        await this.wait();
        await this.isElementVisible(errorMessage, this.testData.notVisibleText);
        if (expectedText) {
            await this.verifyElementContainsText(errorMessage, expectedText);
        }
    }

    async verifyFieldError() {
        await this.wait();
        await this.isElementVisible(fieldError, this.testData.notVisibleText);
    }

    async verifyTableHasRows() {
        await this.wait();
        const count = await this.getCount(tableRow);
        expect(count).toBeGreaterThan(0);
    }

    async verifyRowCount(expectedCount) {
        await this.wait();
        const count = await this.getCount(tableRow);
        expect(count).toBe(expectedCount);
    }

    async verifyEmptyState() {
        await this.wait();
        const count = await this.getCount(tableRow);
        expect(count).toBe(0);
    }
}

export default SavedProductsPage;
