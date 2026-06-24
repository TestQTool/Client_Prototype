import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import {
    leaveTypeDropdown,
    startDateInput,
    endDateInput,
    reasonInput,
    submitButton,
    validationError,
    confirmationMessage,
    totalLeaveDaysDisplay,
    leaveRequestStatus,
    leaveRequestRow
} from '../pageObjects/LeaveRequestPage.js';

class LeaveRequestPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async selectLeaveType(leaveType) {
        await this.page.selectOption(leaveTypeDropdown, leaveType);
    }

    async enterStartDate(startDate) {
        await this.waitAndFill(startDateInput, startDate);
    }

    async enterEndDate(endDate) {
        await this.waitAndFill(endDateInput, endDate);
    }

    async enterReason(reason) {
        await this.waitAndFill(reasonInput, reason);
    }

    async enterMaximumCharactersInReason() {
        const maxChars = 'A'.repeat(500);
        await this.enterReason(maxChars);
    }

    async enterSpecialCharactersInReason() {
        await this.enterReason('<script>alert("test")</script>!@#$%^&*()');
    }

    async clickSubmitButton() {
        await this.waitAndClick(submitButton);
        await this.waitforNetworkIdle();
    }

    async verifyConfirmationMessage() {
        await this.wait();
        await expect(this.page.locator(confirmationMessage)).toBeVisible();
    }

    async verifyValidationError(expectedError) {
        await this.wait();
        await this.verifyElementContainsText(validationError, expectedError);
    }

    async verifyTotalLeaveDays(expectedDays) {
        await this.wait();
        await this.verifyElementText(totalLeaveDaysDisplay, expectedDays);
    }

    async verifyLeaveRequestStatus(expectedStatus) {
        await this.wait();
        await this.verifyElementContainsText(leaveRequestStatus, expectedStatus);
    }

    async locateSubmittedLeaveRequest() {
        await this.wait();
        return await this.isElementVisible(leaveRequestRow);
    }

    async submitLeaveRequest(leaveType, startDate, endDate, reason) {
        await this.selectLeaveType(leaveType);
        await this.enterStartDate(startDate);
        await this.enterEndDate(endDate);
        await this.enterReason(reason);
        await this.clickSubmitButton();
    }
}

export default LeaveRequestPage;

