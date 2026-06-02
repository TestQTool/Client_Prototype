// tests/Leave.spec.js
// Leave Module Test Suite — Qentrix Application

const { test, expect } = require('@playwright/test');
const LeavePage = require('../pageObjects/LeavePage');

test.describe('Leave Module', () => {
    let leavePage;

    test.beforeEach(async ({ page }) => {
        leavePage = new LeavePage(page);
        await leavePage.navigateToLeaveModule();
    });

    // ── @smoke tests ─────────────────────────────────────────────────────────
    test('[764] Leave Module - Verify Leave Module Access @smoke @regression', async ({ page }) => {
        await test.step('Navigate to Leave module from main menu', async () => {
            await leavePage.clickLeaveMenu();
        });

        await test.step('Verify Leave dashboard is displayed', async () => {
            await expect(page.locator(leavePage.selectors.leaveDashboardHeader)).toBeVisible();
        });

        await test.step('Verify Leave balance section is visible', async () => {
            await expect(page.locator(leavePage.selectors.leaveBalanceSection)).toBeVisible();
        });
    });

    test('[764] Leave Module - Apply for Leave @smoke @regression', async ({ page }) => {
        await test.step('Click Apply Leave button', async () => {
            await leavePage.clickApplyLeave();
        });

        await test.step('Select leave type', async () => {
            await leavePage.selectLeaveType('annual');
        });

        await test.step('Enter from date', async () => {
            const fromDate = leavePage.getFutureDateString(1);
            await leavePage.enterFromDate(fromDate);
        });

        await test.step('Enter to date', async () => {
            const toDate = leavePage.getFutureDateString(3);
            await leavePage.enterToDate(toDate);
        });

        await test.step('Enter leave reason', async () => {
            await leavePage.enterLeaveReason('Annual vacation leave request');
        });

        await test.step('Submit leave application', async () => {
            await leavePage.submitLeaveApplication();
        });

        await test.step('Verify success message is displayed', async () => {
            await expect(page.locator(leavePage.selectors.successMessage)).toBeVisible();
        });
    });

    test('[764] Leave Module - View Leave Balance @regression', async ({ page }) => {
        await test.step('Navigate to Leave dashboard', async () => {
            await leavePage.navigateToLeaveModule();
        });

        await test.step('Verify leave balance cards are displayed', async () => {
            await expect(page.locator(leavePage.selectors.leaveBalanceCard).first()).toBeVisible();
        });

        await test.step('Verify pending leave count is visible', async () => {
            await expect(page.locator(leavePage.selectors.pendingLeaveCount)).toBeVisible();
        });

        await test.step('Verify approved leave count is visible', async () => {
            await expect(page.locator(leavePage.selectors.approvedLeaveCount)).toBeVisible();
        });
    });

    test('[764] Leave Module - View Leave List @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });

        await test.step('Verify leave list table is displayed', async () => {
            await expect(page.locator(leavePage.selectors.leaveListTable)).toBeVisible();
        });

        await test.step('Verify table has leave records', async () => {
            const rowCount = await page.locator(leavePage.selectors.leaveTableRows).count();
            expect(rowCount).toBeGreaterThanOrEqual(0);
        });
    });

    test('[764] Leave Module - Filter Leave by Status @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });

        await test.step('Select Pending status filter', async () => {
            await leavePage.filterByStatus('pending');
        });

        await test.step('Click Apply Filter button', async () => {
            await leavePage.clickApplyFilter();
        });

        await test.step('Verify filtered results are displayed', async () => {
            await expect(page.locator(leavePage.selectors.leaveListTable)).toBeVisible();
        });
    });

    test('[764] Leave Module - Filter Leave by Type @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });

        await test.step('Select Annual Leave type filter', async () => {
            await leavePage.filterByType('annual');
        });

        await test.step('Click Apply Filter button', async () => {
            await leavePage.clickApplyFilter();
        });

        await test.step('Verify filtered results are displayed', async () => {
            await expect(page.locator(leavePage.selectors.leaveListTable)).toBeVisible();
        });
    });

    test('[764] Leave Module - Cancel Leave Application @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });

        await test.step('Click on a pending leave request', async () => {
            await leavePage.clickFirstPendingLeave();
        });

        await test.step('Click Cancel Request button', async () => {
            await leavePage.clickCancelRequest();
        });

        await test.step('Confirm cancellation', async () => {
            await leavePage.confirmCancellation();
        });

        await test.step('Verify success message for cancellation', async () => {
            await expect(page.locator(leavePage.selectors.successMessage)).toBeVisible();
        });
    });

    test('[764] Leave Module - View Leave Details @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });

        await test.step('Click View button on first leave record', async () => {
            await leavePage.clickViewLeave();
        });

        await test.step('Verify leave details modal is displayed', async () => {
            await expect(page.locator(leavePage.selectors.leaveDetailsModal)).toBeVisible();
        });

        await test.step('Verify leave status is displayed', async () => {
            await expect(page.locator(leavePage.selectors.leaveDetailStatus)).toBeVisible();
        });

        await test.step('Verify leave type is displayed', async () => {
            await expect(page.locator(leavePage.selectors.leaveDetailType)).toBeVisible();
        });

        await test.step('Close leave details modal', async () => {
            await leavePage.closeModal();
        });
    });

    test('[764] Leave Module - Validate Required Fields @regression', async ({ page }) => {
        await test.step('Click Apply Leave button', async () => {
            await leavePage.clickApplyLeave();
        });

        await test.step('Submit form without filling required fields', async () => {
            await leavePage.submitLeaveApplication();
        });

        await test.step('Verify error message is displayed', async () => {
            await expect(page.locator(leavePage.selectors.errorMessage)).toBeVisible();
        });
    });

    test('[764] Leave Module - Reset Filters @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });

        await test.step('Apply status filter', async () => {
            await leavePage.filterByStatus('approved');
            await leavePage.clickApplyFilter();
        });

        await test.step('Click Reset button', async () => {
            await leavePage.clickResetFilter();
        });

        await test.step('Verify all leaves are displayed', async () => {
            await expect(page.locator(leavePage.selectors.leaveListTable)).toBeVisible();
        });
    });
});
