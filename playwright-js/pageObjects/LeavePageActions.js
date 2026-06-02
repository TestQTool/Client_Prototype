const { expect } = require('@playwright/test');
const {
    leaveMenuLink,
    leaveNavItem,
    leaveTypeDropdown,
    leaveTypeSelect,
    startDateInput,
    endDateInput,
    leaveReasonTextarea,
    submitLeaveButton,
    cancelLeaveButton,
    applyLeaveButton,
    leaveBalanceSection,
    annualLeaveBalance,
    sickLeaveBalance,
    casualLeaveBalance,
    leaveListTable,
    leaveTableRows,
    leaveStatusColumn,
    leaveActionsColumn,
    viewLeaveDetailsButton,
    editLeaveButton,
    deleteLeaveButton,
    approveLeaveButton,
    rejectLeaveButton,
    pendingLeavesTab,
    approvedLeavesTab,
    rejectedLeavesTab,
    leaveCalendarView,
    calendarMonthSelector,
    calendarYearSelector,
    leaveStatusFilter,
    filterApplyButton,
    filterResetButton,
    successMessage,
    errorMessage,
    confirmationModal,
    confirmYesButton,
    confirmNoButton,
    leavePageHeader,
    leaveModuleContainer
} = require('./LeavePage');

class LeavePage {
    constructor(page) {
        this.page = page;
        this.baseUrl = process.env.BASE_URL || 'https://qentrix.com';
    }

    // ── Navigation ───────────────────────────────────────────────────────────
    async navigate() {
        await this.page.goto(`${this.baseUrl}/leave`);
        await this.page.waitForLoadState('networkidle');
    }

    async clickLeaveMenu() {
        const menuLink = this.page.locator(leaveMenuLink).or(this.page.locator(leaveNavItem));
        await menuLink.first().click();
        await this.page.waitForLoadState('networkidle');
    }

    // ── Actions ──────────────────────────────────────────────────────────────
    async clickApplyLeaveButton() {
        await this.page.locator(applyLeaveButton).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectLeaveType(leaveType) {
        const dropdown = this.page.locator(leaveTypeDropdown).or(this.page.locator(leaveTypeSelect));
        await dropdown.first().selectOption({ label: leaveType });
    }

    async enterStartDate(date) {
        await this.page.locator(startDateInput).fill(date);
    }

    async enterEndDate(date) {
        await this.page.locator(endDateInput).fill(date);
    }

    async enterLeaveReason(reason) {
        await this.page.locator(leaveReasonTextarea).fill(reason);
    }

    async submitLeaveRequest() {
        await this.page.locator(submitLeaveButton).click();
        await this.page.waitForLoadState('networkidle');
    }

    async cancelLeaveForm() {
        await this.page.locator(cancelLeaveButton).click();
    }

    async selectStatusFilter(status) {
        await this.page.locator(leaveStatusFilter).selectOption({ label: status });
    }

    async clickApplyFilterButton() {
        await this.page.locator(filterApplyButton).click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickResetFilterButton() {
        await this.page.locator(filterResetButton).click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickPendingLeaveRequest() {
        await this.page.locator(pendingLeavesTab).click();
        await this.page.waitForLoadState('domcontentloaded');
        const firstRow = this.page.locator(leaveTableRows).first();
        await firstRow.click();
    }

    async clickDeleteLeaveButton() {
        await this.page.locator(deleteLeaveButton).first().click();
    }

    async confirmCancellation() {
        await this.page.locator(confirmationModal).waitFor({ state: 'visible' });
        await this.page.locator(confirmYesButton).click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickViewLeaveDetails() {
        await this.page.locator(viewLeaveDetailsButton).first().click();
    }

    async clickEditLeave() {
        await this.page.locator(editLeaveButton).first().click();
    }

    async approveLeave() {
        await this.page.locator(approveLeaveButton).first().click();
        await this.page.waitForLoadState('networkidle');
    }

    async rejectLeave() {
        await this.page.locator(rejectLeaveButton).first().click();
        await this.page.waitForLoadState('networkidle');
    }

    // ── Assertions ───────────────────────────────────────────────────────────
    async verifyLeavePageLoaded() {
        const header = this.page.locator(leavePageHeader).or(this.page.locator(leaveModuleContainer));
        await expect(header.first()).toBeVisible();
        await expect(this.page).toHaveURL(/.*leave.*/i);
    }

    async verifyLeaveBalanceSectionVisible() {
        await expect(this.page.locator(leaveBalanceSection)).toBeVisible();
    }

    async verifyApplyLeaveButtonVisible() {
        await expect(this.page.locator(applyLeaveButton)).toBeVisible();
    }

    async verifyLeaveListTableVisible() {
        await expect(this.page.locator(leaveListTable)).toBeVisible();
    }

    async verifyAnnualLeaveBalanceVisible() {
        await expect(this.page.locator(annualLeaveBalance)).toBeVisible();
    }

    async verifySickLeaveBalanceVisible() {
        await expect(this.page.locator(sickLeaveBalance)).toBeVisible();
    }

    async verifyCasualLeaveBalanceVisible() {
        await expect(this.page.locator(casualLeaveBalance)).toBeVisible();
    }

    async verifyLeaveStatusColumnVisible() {
        await expect(this.page.locator(leaveStatusColumn).first()).toBeVisible();
    }

    async verifyLeaveActionsColumnVisible() {
        await expect(this.page.locator(leaveActionsColumn).first()).toBeVisible();
    }

    async verifySuccessMessageDisplayed() {
        await expect(this.page.locator(successMessage)).toBeVisible();
    }

    async verifyErrorMessageDisplayed() {
        await expect(this.page.locator(errorMessage)).toBeVisible();
    }

    async verifyFilteredResultsDisplayed() {
        const rows = this.page.locator(leaveTableRows);
        await expect(rows.first()).toBeVisible();
    }

    async verifyLeaveCalendarVisible() {
        await expect(this.page.locator(leaveCalendarView)).toBeVisible();
    }

    async verifyMonthSelectorVisible() {
        await expect(this.page.locator(calendarMonthSelector)).toBeVisible();
    }

    async verifyYearSelectorVisible() {
        await expect(this.page.locator(calendarYearSelector)).toBeVisible();
    }
}

module.exports = LeavePage;
