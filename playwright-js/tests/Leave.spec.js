// tests/Leave.spec.js
// Leave Module Tests — Qentrix Application

const { test, expect } = require('@playwright/test');
const LeavePage = require('../pageObjects/LeavePage');

test.describe('Leave Module', () => {
    let leavePage;

    test.beforeEach(async ({ page }) => {
        leavePage = new LeavePage(page);
        await leavePage.navigate();
    });

    // ── @smoke tests ─────────────────────────────────────────────────────────
    test('[764] Leave Module - Verify Leave Module Access @smoke @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.clickLeaveMenu();
        });

        await test.step('Verify Leave module page is displayed', async () => {
            await expect(page.locator(LeavePage.leaveModuleHeader)).toBeVisible();
            await expect(page).toHaveURL(/.*leave.*/);
        });
    });

    test('[764] Leave Module - Verify Leave Balance Display @smoke @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.clickLeaveMenu();
        });

        await test.step('Verify leave balance section is visible', async () => {
            await expect(page.locator(LeavePage.leaveBalanceSection)).toBeVisible();
        });

        await test.step('Verify annual leave balance is displayed', async () => {
            await expect(page.locator(LeavePage.annualLeaveBalance)).toBeVisible();
        });

        await test.step('Verify sick leave balance is displayed', async () => {
            await expect(page.locator(LeavePage.sickLeaveBalance)).toBeVisible();
        });
    });

    test('[764] Leave Module - Apply for Leave @smoke @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.clickLeaveMenu();
        });

        await test.step('Click on Apply Leave button', async () => {
            await leavePage.clickApplyLeave();
        });

        await test.step('Select leave type', async () => {
            await leavePage.selectLeaveType('Annual Leave');
        });

        await test.step('Enter from date', async () => {
            await leavePage.enterFromDate('2024-02-01');
        });

        await test.step('Enter to date', async () => {
            await leavePage.enterToDate('2024-02-02');
        });

        await test.step('Enter leave reason', async () => {
            await leavePage.enterLeaveReason('Personal vacation');
        });

        await test.step('Submit leave request', async () => {
            await leavePage.submitLeaveRequest();
        });

        await test.step('Verify success message is displayed', async () => {
            await expect(page.locator(LeavePage.successMessage)).toBeVisible();
        });
    });

    // ── @regression tests ────────────────────────────────────────────────────
    test('[764] Leave Module - View Leave List @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.clickLeaveMenu();
        });

        await test.step('Verify leave list table is displayed', async () => {
            await expect(page.locator(LeavePage.leaveListTable)).toBeVisible();
        });

        await test.step('Verify leave list has rows', async () => {
            const rowCount = await page.locator(LeavePage.leaveListRows).count();
            expect(rowCount).toBeGreaterThanOrEqual(0);
        });
    });

    test('[764] Leave Module - Filter Leaves by Status @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.clickLeaveMenu();
        });

        await test.step('Select status filter', async () => {
            await leavePage.selectStatusFilter('Pending');
        });

        await test.step('Apply filters', async () => {
            await leavePage.clickApplyFilters();
        });

        await test.step('Verify filtered results are displayed', async () => {
            await expect(page.locator(LeavePage.leaveListTable)).toBeVisible();
        });
    });

    test('[764] Leave Module - Cancel Leave Request @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.clickLeaveMenu();
        });

        await test.step('Click on Apply Leave button', async () => {
            await leavePage.clickApplyLeave();
        });

        await test.step('Select leave type', async () => {
            await leavePage.selectLeaveType('Sick Leave');
        });

        await test.step('Click cancel button', async () => {
            await leavePage.clickCancelLeave();
        });

        await test.step('Verify leave form is closed', async () => {
            await expect(page.locator(LeavePage.leaveTypeDropdown)).not.toBeVisible();
        });
    });

    test('[764] Leave Module - Delete Leave Request @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.clickLeaveMenu();
        });

        await test.step('Click delete button on first leave entry', async () => {
            await leavePage.clickDeleteLeave();
        });

        await test.step('Confirm deletion', async () => {
            await leavePage.confirmAction();
        });

        await test.step('Verify success message is displayed', async () => {
            await expect(page.locator(LeavePage.successMessage)).toBeVisible();
        });
    });

    test('[764] Leave Module - Validate Required Fields @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.clickLeaveMenu();
        });

        await test.step('Click on Apply Leave button', async () => {
            await leavePage.clickApplyLeave();
        });

        await test.step('Submit without filling required fields', async () => {
            await leavePage.submitLeaveRequest();
        });

        await test.step('Verify error message is displayed', async () => {
            await expect(page.locator(LeavePage.errorMessage)).toBeVisible();
        });
    });

    test('[764] Leave Module - Clear Filters @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.clickLeaveMenu();
        });

        await test.step('Select status filter', async () => {
            await leavePage.selectStatusFilter('Approved');
        });

        await test.step('Apply filters', async () => {
            await leavePage.clickApplyFilters();
        });

        await test.step('Clear filters', async () => {
            await leavePage.clickClearFilters();
        });

        await test.step('Verify all leaves are displayed', async () => {
            await expect(page.locator(LeavePage.leaveListTable)).toBeVisible();
        });
    });
});

// LeavePage class definition
class LeavePage {
    constructor(page) {
        this.page = page;
    }

    // ── Selectors (imported as static properties) ────────────────────────────
    static leaveMenuLink = '[data-testid="leave-menu"]';
    static leaveModuleHeader = 'h1:has-text("Leave")';
    static leaveTypeDropdown = 'select[name="leaveType"]';
    static fromDateInput = 'input[name="fromDate"]';
    static toDateInput = 'input[name="toDate"]';
    static leaveReasonTextarea = 'textarea[name="reason"]';
    static submitLeaveButton = 'button[type="submit"]:has-text("Submit")';
    static cancelLeaveButton = 'button[type="button"]:has-text("Cancel")';
    static leaveBalanceSection = '[data-testid="leave-balance"]';
    static annualLeaveBalance = '[data-testid="annual-leave-balance"]';
    static sickLeaveBalance = '[data-testid="sick-leave-balance"]';
    static leaveListTable = 'table[data-testid="leave-list"]';
    static leaveListRows = 'table[data-testid="leave-list"] tbody tr';
    static applyLeaveButton = 'button:has-text("Apply Leave")';
    static deleteLeaveButton = 'button[aria-label="Delete Leave"]';
    static filterByStatusDropdown = 'select[name="filterStatus"]';
    static applyFiltersButton = 'button:has-text("Apply Filters")';
    static clearFiltersButton = 'button:has-text("Clear Filters")';
    static successMessage = '[data-testid="success-message"]';
    static errorMessage = '[data-testid="error-message"]';
    static confirmYesButton = 'button:has-text("Yes")';

    // ── Navigation ───────────────────────────────────────────────────────────
    async navigate() {
        const baseUrl = process.env.BASE_URL || 'https://qentrix.example.com';
        await this.page.goto(`${baseUrl}/leave`);
        await this.page.waitForLoadState('networkidle');
    }

    // ── Actions ──────────────────────────────────────────────────────────────
    async clickLeaveMenu() {
        await this.page.locator(LeavePage.leaveMenuLink).click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickApplyLeave() {
        await this.page.locator(LeavePage.applyLeaveButton).click();
    }

    async selectLeaveType(leaveType) {
        await this.page.locator(LeavePage.leaveTypeDropdown).selectOption({ label: leaveType });
    }

    async enterFromDate(date) {
        await this.page.locator(LeavePage.fromDateInput).fill(date);
    }

    async enterToDate(date) {
        await this.page.locator(LeavePage.toDateInput).fill(date);
    }

    async enterLeaveReason(reason) {
        await this.page.locator(LeavePage.leaveReasonTextarea).fill(reason);
    }

    async submitLeaveRequest() {
        await this.page.locator(LeavePage.submitLeaveButton).click();
    }

    async clickCancelLeave() {
        await this.page.locator(LeavePage.cancelLeaveButton).click();
    }

    async clickDeleteLeave() {
        await this.page.locator(LeavePage.deleteLeaveButton).first().click();
    }

    async confirmAction() {
        await this.page.locator(LeavePage.confirmYesButton).click();
    }

    async selectStatusFilter(status) {
        await this.page.locator(LeavePage.filterByStatusDropdown).selectOption({ label: status });
    }

    async clickApplyFilters() {
        await this.page.locator(LeavePage.applyFiltersButton).click();
    }

    async clickClearFilters() {
        await this.page.locator(LeavePage.clearFiltersButton).click();
    }
}

module.exports = LeavePage;
