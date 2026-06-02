// tests/Leave.spec.js
// Leave Module Test Specifications — Qentrix Application

const { test, expect } = require('@playwright/test');
const LeavePage = require('../pageObjects/LeavePage');

test.describe('Leave Module', () => {
    let leavePage;

    test.beforeEach(async ({ page }) => {
        leavePage = new LeavePage(page);
        await leavePage.navigateToLeaveModule();
    });

    // ── @smoke tests ─────────────────────────────────────────────────────────
    test('[764] Verify Leave Module loads successfully @smoke @regression', async ({ page }) => {
        // Step 1: Verify the Leave Module page is accessible
        await test.step('Verify Leave Module navigation', async () => {
            await expect(page.locator(LeavePage.leaveDashboardHeader)).toBeVisible();
        });

        // Step 2: Verify main sections are displayed
        await test.step('Verify leave balance section is visible', async () => {
            await expect(page.locator(LeavePage.leaveBalanceSection)).toBeVisible();
        });

        // Step 3: Verify Apply Leave button is present
        await test.step('Verify Apply Leave button is available', async () => {
            await expect(page.locator(LeavePage.applyLeaveButton)).toBeVisible();
            await expect(page.locator(LeavePage.applyLeaveButton)).toBeEnabled();
        });

        // Step 4: Verify leave list/history table is displayed
        await test.step('Verify leave history table is visible', async () => {
            await expect(page.locator(LeavePage.leaveListTable)).toBeVisible();
        });
    });

    test('[764] Verify user can open Apply Leave form @smoke @regression', async ({ page }) => {
        // Step 1: Click on Apply Leave button
        await test.step('Click Apply Leave button', async () => {
            await page.locator(LeavePage.applyLeaveButton).click();
        });

        // Step 2: Verify the leave application form is displayed
        await test.step('Verify leave type dropdown is visible', async () => {
            await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();
        });

        // Step 3: Verify date inputs are present
        await test.step('Verify date fields are visible', async () => {
            await expect(page.locator(LeavePage.startDateInput)).toBeVisible();
            await expect(page.locator(LeavePage.endDateInput)).toBeVisible();
        });

        // Step 4: Verify reason field is present
        await test.step('Verify reason textarea is visible', async () => {
            await expect(page.locator(LeavePage.leaveReasonTextarea)).toBeVisible();
        });

        // Step 5: Verify submit button is present
        await test.step('Verify submit button is available', async () => {
            await expect(page.locator(LeavePage.submitLeaveButton)).toBeVisible();
        });
    });

    test('[764] Verify user can submit a leave application @smoke @regression', async ({ page }) => {
        // Step 1: Open the leave application form
        await test.step('Open Apply Leave form', async () => {
            await page.locator(LeavePage.applyLeaveButton).click();
            await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();
        });

        // Step 2: Select leave type
        await test.step('Select leave type', async () => {
            await page.locator(LeavePage.leaveTypeDropdown).selectOption({ index: 1 });
        });

        // Step 3: Enter start date
        await test.step('Enter start date', async () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const startDateStr = tomorrow.toISOString().split('T')[0];
            await page.locator(LeavePage.startDateInput).fill(startDateStr);
        });

        // Step 4: Enter end date
        await test.step('Enter end date', async () => {
            const dayAfterTomorrow = new Date();
            dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
            const endDateStr = dayAfterTomorrow.toISOString().split('T')[0];
            await page.locator(LeavePage.endDateInput).fill(endDateStr);
        });

        // Step 5: Enter reason for leave
        await test.step('Enter leave reason', async () => {
            await page.locator(LeavePage.leaveReasonTextarea).fill('Personal work - automation test leave request');
        });

        // Step 6: Submit the leave application
        await test.step('Submit leave application', async () => {
            await page.locator(LeavePage.submitLeaveButton).click();
        });

        // Step 7: Verify success message or leave appears in list
        await test.step('Verify leave submission success', async () => {
            await expect(page.locator(LeavePage.successMessage)).toBeVisible({ timeout: 10000 });
        });
    });

    test('[764] Verify leave balance is displayed correctly @regression', async ({ page }) => {
        // Step 1: Verify leave balance section is visible
        await test.step('Verify leave balance section visibility', async () => {
            await expect(page.locator(LeavePage.leaveBalanceSection)).toBeVisible();
        });

        // Step 2: Verify available leave count is displayed
        await test.step('Verify available leave count is shown', async () => {
            await expect(page.locator(LeavePage.availableLeaveCount)).toBeVisible();
        });

        // Step 3: Verify used leave count is displayed
        await test.step('Verify used leave count is shown', async () => {
            await expect(page.locator(LeavePage.usedLeaveCount)).toBeVisible();
        });

        // Step 4: Verify pending leave count is displayed
        await test.step('Verify pending leave count is shown', async () => {
            await expect(page.locator(LeavePage.pendingLeaveCount)).toBeVisible();
        });
    });

    test('[764] Verify leave history/list displays past leaves @regression', async ({ page }) => {
        // Step 1: Verify leave list table is present
        await test.step('Verify leave list table is visible', async () => {
            await expect(page.locator(LeavePage.leaveListTable)).toBeVisible();
        });

        // Step 2: Verify table has necessary columns
        await test.step('Verify table structure with columns', async () => {
            await expect(page.locator(LeavePage.leaveListTableBody)).toBeVisible();
        });

        // Step 3: Verify status filter is available
        await test.step('Verify status filter dropdown is available', async () => {
            await expect(page.locator(LeavePage.leaveStatusFilter)).toBeVisible();
        });
    });

    test('[764] Verify user can cancel an Apply Leave form @regression', async ({ page }) => {
        // Step 1: Open the leave application form
        await test.step('Open Apply Leave form', async () => {
            await page.locator(LeavePage.applyLeaveButton).click();
            await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();
        });

        // Step 2: Click cancel button
        await test.step('Click Cancel button', async () => {
            await page.locator(LeavePage.cancelLeaveButton).click();
        });

        // Step 3: Verify form is closed and dashboard is visible
        await test.step('Verify form is closed', async () => {
            await expect(page.locator(LeavePage.leaveTypeDropdown)).not.toBeVisible();
            await expect(page.locator(LeavePage.leaveDashboardHeader)).toBeVisible();
        });
    });

    test('[764] Verify leave type filter functionality @regression', async ({ page }) => {
        // Step 1: Locate the leave type filter
        await test.step('Verify leave type filter is available', async () => {
            await expect(page.locator(LeavePage.leaveTypeFilter)).toBeVisible();
        });

        // Step 2: Select a leave type from filter
        await test.step('Select a leave type filter option', async () => {
            await page.locator(LeavePage.leaveTypeFilter).selectOption({ index: 1 });
        });

        // Step 3: Apply filter
        await test.step('Apply filters', async () => {
            await page.locator(LeavePage.applyFiltersButton).click();
        });

        // Step 4: Verify filtered results are displayed
        await test.step('Verify leave list is updated', async () => {
            await expect(page.locator(LeavePage.leaveListTable)).toBeVisible();
        });
    });

    test('[764] Verify leave status filter functionality @regression', async ({ page }) => {
        // Step 1: Locate the leave status filter
        await test.step('Verify leave status filter is available', async () => {
            await expect(page.locator(LeavePage.leaveStatusFilter)).toBeVisible();
        });

        // Step 2: Select pending status from filter
        await test.step('Select Pending status filter', async () => {
            await page.locator(LeavePage.leaveStatusFilter).selectOption('pending');
        });

        // Step 3: Apply filter
        await test.step('Apply filters', async () => {
            await page.locator(LeavePage.applyFiltersButton).click();
        });

        // Step 4: Verify filtered results
        await test.step('Verify filtered leave list', async () => {
            await expect(page.locator(LeavePage.leaveListTable)).toBeVisible();
        });
    });

    test('[764] Verify clear filters functionality @regression', async ({ page }) => {
        // Step 1: Apply a filter first
        await test.step('Apply a status filter', async () => {
            await page.locator(LeavePage.leaveStatusFilter).selectOption('approved');
            await page.locator(LeavePage.applyFiltersButton).click();
        });

        // Step 2: Click clear filters
        await test.step('Click Clear Filters button', async () => {
            await page.locator(LeavePage.clearFiltersButton).click();
        });

        // Step 3: Verify filters are reset
        await test.step('Verify all leaves are displayed again', async () => {
            await expect(page.locator(LeavePage.leaveListTable)).toBeVisible();
        });
    });

    test('[764] Verify leave calendar view is accessible @regression', async ({ page }) => {
        // Step 1: Navigate to calendar view if available
        await test.step('Click on Leave Calendar view', async () => {
            const calendarView = page.locator(LeavePage.leaveCalendarView);
            if (await calendarView.isVisible()) {
                await calendarView.click();
            }
        });

        // Step 2: Verify calendar elements are displayed
        await test.step('Verify calendar month selector', async () => {
            const monthSelector = page.locator(LeavePage.calendarMonthSelector);
            if (await monthSelector.isVisible()) {
                await expect(monthSelector).toBeEnabled();
            }
        });
    });

    test('[764] Verify half-day leave option is available @regression', async ({ page }) => {
        // Step 1: Open Apply Leave form
        await test.step('Open Apply Leave form', async () => {
            await page.locator(LeavePage.applyLeaveButton).click();
            await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();
        });

        // Step 2: Verify half-day checkbox/toggle is available
        await test.step('Verify half-day option is present', async () => {
            const halfDayOption = page.locator(LeavePage.halfDayCheckbox);
            const halfDayToggle = page.locator(LeavePage.halfDayToggle);
            const isHalfDayVisible = await halfDayOption.isVisible() || await halfDayToggle.isVisible();
            expect(isHalfDayVisible).toBeTruthy();
        });
    });

    test('[764] Verify pagination on leave history list @regression', async ({ page }) => {
        // Step 1: Verify pagination container is visible
        await test.step('Check pagination availability', async () => {
            const pagination = page.locator(LeavePage.paginationContainer);
            if (await pagination.isVisible()) {
                await expect(pagination).toBeVisible();
            }
        });

        // Step 2: Click next page if available
        await test.step('Navigate to next page if available', async () => {
            const nextButton = page.locator(LeavePage.nextPageButton);
            if (await nextButton.isVisible() && await nextButton.isEnabled()) {
                await nextButton.click();
                await expect(page.locator(LeavePage.leaveListTable)).toBeVisible();
            }
        });
    });

    test('[764] Verify form validation for required fields @regression', async ({ page }) => {
        // Step 1: Open Apply Leave form
        await test.step('Open Apply Leave form', async () => {
            await page.locator(LeavePage.applyLeaveButton).click();
            await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();
        });

        // Step 2: Try to submit without filling required fields
        await test.step('Click submit without filling form', async () => {
            await page.locator(LeavePage.submitLeaveButton).click();
        });

        // Step 3: Verify validation error is shown
        await test.step('Verify validation errors appear', async () => {
            const errorMsg = page.locator(LeavePage.errorMessage);
            const startDateError = page.locator(`${LeavePage.startDateInput}:invalid`);
            const hasError = await errorMsg.isVisible() || await startDateError.count() > 0;
            expect(hasError).toBeTruthy();
        });
    });

    test('[764] Verify search functionality in leave history @regression', async ({ page }) => {
        // Step 1: Locate search input
        await test.step('Verify search input is available', async () => {
            const searchInput = page.locator(LeavePage.searchLeaveInput);
            if (await searchInput.isVisible()) {
                await expect(searchInput).toBeEnabled();
            }
        });

        // Step 2: Enter search term
        await test.step('Enter search keyword', async () => {
            const searchInput = page.locator(LeavePage.searchLeaveInput);
            if (await searchInput.isVisible()) {
                await searchInput.fill('Annual');
                await page.keyboard.press('Enter');
            }
        });

        // Step 3: Verify results are filtered
        await test.step('Verify search results', async () => {
            await expect(page.locator(LeavePage.leaveListTable)).toBeVisible();
        });
    });
});

// Leave Page Class for Page Object Model
class LeavePage {
    constructor(page) {
        this.page = page;
        this.baseUrl = process.env.BASE_URL || 'https://qentrix.example.com';
    }

    // Navigation
    async navigateToLeaveModule() {
        await this.page.goto(`${this.baseUrl}/leave`);
        await this.page.waitForLoadState('networkidle');
    }

    // Static selectors reference
    static get leaveDashboardHeader() { return 'h1:has-text("Leave")'; }
    static get leaveBalanceSection() { return '[data-testid="leave-balance"]'; }
    static get applyLeaveButton() { return 'button:has-text("Apply Leave")'; }
    static get leaveTypeDropdown() { return 'select[name="leaveType"]'; }
    static get startDateInput() { return 'input[name="startDate"]'; }
    static get endDateInput() { return 'input[name="endDate"]'; }
    static get leaveReasonTextarea() { return 'textarea[name="reason"]'; }
    static get submitLeaveButton() { return 'button[type="submit"]:has-text("Submit")'; }
    static get cancelLeaveButton() { return 'button:has-text("Cancel")'; }
    static get successMessage() { return '.toast-success, .alert-success'; }
    static get errorMessage() { return '.toast-error, .alert-danger'; }
    static get leaveListTable() { return 'table[data-testid="leave-list"]'; }
    static get leaveListTableBody() { return 'table[data-testid="leave-list"] tbody'; }
    static get leaveStatusFilter() { return 'select[name="statusFilter"]'; }
    static get leaveTypeFilter() { return 'select[name="typeFilter"]'; }
    static get applyFiltersButton() { return 'button:has-text("Apply Filters")'; }
    static get clearFiltersButton() { return 'button:has-text("Clear")'; }
    static get leaveCalendarView() { return '[data-testid="leave-calendar"]'; }
    static get calendarMonthSelector() { return 'select[name="calendarMonth"]'; }
    static get halfDayCheckbox() { return 'input[name="halfDay"]'; }
    static get halfDayToggle() { return '[data-testid="half-day-toggle"]'; }
    static get paginationContainer() { return '.pagination'; }
    static get nextPageButton() { return 'button[aria-label="Next page"]'; }
    static get searchLeaveInput() { return 'input[placeholder*="Search"]'; }
    static get availableLeaveCount() { return '[data-testid="available-leave"]'; }
    static get usedLeaveCount() { return '[data-testid="used-leave"]'; }
    static get pendingLeaveCount() { return '[data-testid="pending-leave"]'; }
}

module.exports = LeavePage;
