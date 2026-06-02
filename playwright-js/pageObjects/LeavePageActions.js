// pageObjects/LeavePageActions.js
// Page Object Class for Leave Module — Qentrix Application

const selectors = require('./LeavePage');

class LeavePage {
    constructor(page) {
        this.page = page;
        this.selectors = selectors;
    }

    // ── Navigation ───────────────────────────────────────────────────────────
    async navigateToLeaveModule() {
        const baseUrl = process.env.BASE_URL || 'https://qentrix.com';
        await this.page.goto(`${baseUrl}/leave`);
        await this.page.waitForLoadState('networkidle');
    }

    async clickLeaveMenu() {
        const leaveMenu = this.page.locator(this.selectors.leaveMenuLink);
        if (await leaveMenu.isVisible()) {
            await leaveMenu.click();
        } else {
            await this.page.locator(this.selectors.leaveNavItem).click();
        }
        await this.page.waitForLoadState('networkidle');
    }

    // ── Apply Leave Actions ──────────────────────────────────────────────────
    async clickApplyLeave() {
        await this.page.locator(this.selectors.applyLeaveButton).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectLeaveType(leaveType) {
        const dropdown = this.page.locator(this.selectors.leaveTypeDropdown);
        if (await dropdown.isVisible()) {
            await dropdown.selectOption(leaveType);
        } else {
            await this.page.locator(this.selectors.leaveTypeInput).click();
            await this.page.locator(`text=${leaveType}`).click();
        }
    }

    async enterFromDate(date) {
        await this.page.locator(this.selectors.fromDateInput).fill(date);
    }

    async enterToDate(date) {
        await this.page.locator(this.selectors.toDateInput).fill(date);
    }

    async enterLeaveReason(reason) {
        const textarea = this.page.locator(this.selectors.leaveReasonTextarea);
        if (await textarea.isVisible()) {
            await textarea.fill(reason);
        } else {
            await this.page.locator(this.selectors.leaveReasonInput).fill(reason);
        }
    }

    async submitLeaveApplication() {
        await this.page.locator(this.selectors.submitLeaveButton).click();
        await this.page.waitForLoadState('networkidle');
    }

    async cancelLeaveForm() {
        await this.page.locator(this.selectors.cancelLeaveButton).click();
    }

    // ── Filter Actions ───────────────────────────────────────────────────────
    async filterByStatus(status) {
        await this.page.locator(this.selectors.leaveStatusFilter).selectOption(status);
    }

    async filterByType(leaveType) {
        await this.page.locator(this.selectors.leaveTypeFilter).selectOption(leaveType);
    }

    async clickApplyFilter() {
        await this.page.locator(this.selectors.filterApplyButton).click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickResetFilter() {
        await this.page.locator(this.selectors.filterResetButton).click();
        await this.page.waitForLoadState('networkidle');
    }

    // ── Leave List Actions ───────────────────────────────────────────────────
    async clickViewLeave() {
        await this.page.locator(this.selectors.viewLeaveButton).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickEditLeave() {
        await this.page.locator(this.selectors.editLeaveButton).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickDeleteLeave() {
        await this.page.locator(this.selectors.deleteLeaveButton).first().click();
    }

    async clickFirstPendingLeave() {
        const pendingRow = this.page.locator(`${this.selectors.leaveTableRows}:has-text("Pending")`).first();
        await pendingRow.click();
    }

    async clickCancelRequest() {
        await this.page.locator(this.selectors.cancelLeaveRequestButton).click();
    }

    async confirmCancellation() {
        await this.page.locator(this.selectors.confirmApprovalButton).click();
        await this.page.waitForLoadState('networkidle');
    }

    // ── Modal Actions ────────────────────────────────────────────────────────
    async closeModal() {
        await this.page.locator(this.selectors.modalCloseButton).click();
    }

    // ── Approval Actions (Manager) ───────────────────────────────────────────
    async clickPendingApprovalsTab() {
        await this.page.locator(this.selectors.pendingApprovalsTab).click();
        await this.page.waitForLoadState('networkidle');
    }

    async approveLeave() {
        await this.page.locator(this.selectors.approveLeaveButton).first().click();
    }

    async rejectLeave() {
        await this.page.locator(this.selectors.rejectLeaveButton).first().click();
    }

    async enterApprovalComments(comments) {
        await this.page.locator(this.selectors.approvalCommentsInput).fill(comments);
    }

    async confirmApproval() {
        await this.page.locator(this.selectors.confirmApprovalButton).click();
        await this.page.waitForLoadState('networkidle');
    }

    // ── Utility Methods ──────────────────────────────────────────────────────
    getFutureDateString(daysFromNow) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
    }

    async getLeaveRowCount() {
        return await this.page.locator(this.selectors.leaveTableRows).count();
    }

    async isLeaveBalanceVisible() {
        return await this.page.locator(this.selectors.leaveBalanceSection).isVisible();
    }

    async getSuccessMessageText() {
        return await this.page.locator(this.selectors.successMessage).textContent();
    }

    async getErrorMessageText() {
        return await this.page.locator(this.selectors.errorMessage).textContent();
    }
}

module.exports = LeavePage;
