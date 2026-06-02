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
            await leavePage.verifyLeavePageLoaded();
        });

        await test.step('Verify Leave balance section is visible', async () => {
            await leavePage.verifyLeaveBalanceSectionVisible();
        });

        await test.step('Verify Apply Leave button is available', async () => {
            await leavePage.verifyApplyLeaveButtonVisible();
        });

        await test.step('Verify Leave list table is displayed', async () => {
            await leavePage.verifyLeaveListTableVisible();
        });
    });

    test('[764] Leave Module - Apply for Leave @smoke @regression', async ({ page }) => {
        await test.step('Click on Apply Leave button', async () => {
            await leavePage.clickApplyLeaveButton();
        });

        await test.step('Select Leave Type', async () => {
            await leavePage.selectLeaveType('Annual Leave');
        });

        await test.step('Enter Start Date', async () => {
            await leavePage.enterStartDate('2024-02-01');
        });

        await test.step('Enter End Date', async () => {
            await leavePage.enterEndDate('2024-02-03');
        });

        await test.step('Enter Leave Reason', async () => {
            await leavePage.enterLeaveReason('Personal vacation');
        });

        await test.step('Submit Leave Request', async () => {
            await leavePage.submitLeaveRequest();
        });

        await test.step('Verify success message is displayed', async () => {
            await leavePage.verifySuccessMessageDisplayed();
        });
    });

    test('[764] Leave Module - View Leave Balance @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.clickLeaveMenu();
        });

        await test.step('Verify Annual Leave balance is displayed', async () => {
            await leavePage.verifyAnnualLeaveBalanceVisible();
        });

        await test.step('Verify Sick Leave balance is displayed', async () => {
            await leavePage.verifySickLeaveBalanceVisible();
        });

        await test.step('Verify Casual Leave balance is displayed', async () => {
            await leavePage.verifyCasualLeaveBalanceVisible();
        });
    });

    test('[764] Leave Module - View Leave History @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.clickLeaveMenu();
        });

        await test.step('Verify Leave list table is visible', async () => {
            await leavePage.verifyLeaveListTableVisible();
        });

        await test.step('Verify Leave status column exists', async () => {
            await leavePage.verifyLeaveStatusColumnVisible();
        });

        await test.step('Verify Leave actions column exists', async () => {
            await leavePage.verifyLeaveActionsColumnVisible();
        });
    });

    test('[764] Leave Module - Filter Leaves by Status @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.clickLeaveMenu();
        });

        await test.step('Select Pending status filter', async () => {
            await leavePage.selectStatusFilter('Pending');
        });

        await test.step('Click Apply Filter button', async () => {
            await leavePage.clickApplyFilterButton();
        });

        await test.step('Verify filtered results are displayed', async () => {
            await leavePage.verifyFilteredResultsDisplayed();
        });
    });

    test('[764] Leave Module - Cancel Leave Request @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.clickLeaveMenu();
        });

        await test.step('Click on a pending leave request', async () => {
            await leavePage.clickPendingLeaveRequest();
        });

        await test.step('Click Delete/Cancel button', async () => {
            await leavePage.clickDeleteLeaveButton();
        });

        await test.step('Confirm cancellation in modal', async () => {
            await leavePage.confirmCancellation();
        });

        await test.step('Verify success message for cancellation', async () => {
            await leavePage.verifySuccessMessageDisplayed();
        });
    });

    test('[764] Leave Module - View Leave Calendar @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.clickLeaveMenu();
        });

        await test.step('Verify Leave calendar view is accessible', async () => {
            await leavePage.verifyLeaveCalendarVisible();
        });

        await test.step('Verify month selector is available', async () => {
            await leavePage.verifyMonthSelectorVisible();
        });

        await test.step('Verify year selector is available', async () => {
            await leavePage.verifyYearSelectorVisible();
        });
    });
});
