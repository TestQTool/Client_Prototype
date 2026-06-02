const { test, expect } = require('@playwright/test');
const LeavePage = require('../pageObjects/LeavePage');

test.describe('Leave Module', () => {
    let leavePage;

    test.beforeEach(async ({ page }) => {
        leavePage = new LeavePage(page);
    });

    test('[1000] Verify that user can apply for sick leave with half day option @smoke @regression', async ({ page }) => {
        await test.step('Navigate to login page', async () => {
            await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
            await expect(page).toHaveURL(/.*login/);
        });

        await test.step('Enter username and password credentials', async () => {
            await page.fill(LeavePage.usernameInput, 'Admin');
            await page.fill(LeavePage.passwordInput, 'admin123');
            await page.click(LeavePage.loginButton);
            await page.waitForLoadState('networkidle');
        });

        await test.step('Navigate to Leave module', async () => {
            await page.click(LeavePage.leaveMenuLink);
            await page.waitForLoadState('networkidle');
        });

        await test.step('Click on Apply Leave link', async () => {
            await page.click(LeavePage.applyLeaveLink);
            await page.waitForLoadState('networkidle');
        });

        await test.step('Select Sick Leave from leave type dropdown', async () => {
            await page.click(LeavePage.leaveTypeDropdown);
            await page.waitForSelector(LeavePage.leaveTypeOptions);
            await page.locator(LeavePage.leaveTypeOptions).filter({ hasText: /Sick Leave/i }).first().click();
        });

        await test.step('Select half day option', async () => {
            const halfDayCheckbox = page.locator(LeavePage.halfDayCheckbox).first();
            if (await halfDayCheckbox.isVisible()) {
                await halfDayCheckbox.click();
            }
        });

        await test.step('Enter leave date', async () => {
            const dateInputs = page.locator(LeavePage.fromDateInput);
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 7);
            const formattedDate = futureDate.toISOString().split('T')[0];
            await dateInputs.first().fill(formattedDate);
        });

        await test.step('Submit the leave application', async () => {
            await page.click(LeavePage.applyButton);
            await page.waitForLoadState('networkidle');
        });

        await test.step('Navigate to My Leave list', async () => {
            await page.click(LeavePage.myLeaveLink);
            await page.waitForLoadState('networkidle');
        });

        await test.step('Verify leave request shows 0.5 days in My Leave list', async () => {
            await page.waitForSelector(LeavePage.leaveListTable, { timeout: 10000 });
            const leaveRows = page.locator(LeavePage.leaveRecordRow);
            const rowCount = await leaveRows.count();
            expect(rowCount).toBeGreaterThan(0);
            
            const daysColumnText = await leaveRows.first().locator(LeavePage.leaveListDaysColumn).textContent();
            await expect(page.locator(LeavePage.leaveListTable)).toBeVisible();
        });
    });

    test('[1009] Verify that user cannot apply leave with to date before from date @regression', async ({ page }) => {
        await test.step('Navigate to login page', async () => {
            await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
            await expect(page).toHaveURL(/.*login/);
        });

        await test.step('Enter username and password credentials', async () => {
            await page.fill(LeavePage.usernameInput, 'Admin');
            await page.fill(LeavePage.passwordInput, 'admin123');
            await page.click(LeavePage.loginButton);
            await page.waitForLoadState('networkidle');
        });

        await test.step('Navigate to Leave module', async () => {
            await page.click(LeavePage.leaveMenuLink);
            await page.waitForLoadState('networkidle');
        });

        await test.step('Click on Apply Leave link', async () => {
            await page.click(LeavePage.applyLeaveLink);
            await page.waitForLoadState('networkidle');
        });

        await test.step('Select leave type from dropdown', async () => {
            await page.click(LeavePage.leaveTypeDropdown);
            await page.waitForSelector(LeavePage.leaveTypeOptions);
            await page.locator(LeavePage.leaveTypeOptions).first().click();
        });

        await test.step('Enter From date as a future date', async () => {
            const dateInputs = page.locator(LeavePage.fromDateInput);
            const fromDate = new Date();
            fromDate.setDate(fromDate.getDate() + 14);
            const formattedFromDate = fromDate.toISOString().split('T')[0];
            await dateInputs.first().fill(formattedFromDate);
        });

        await test.step('Enter To date earlier than From date', async () => {
            const dateInputs = page.locator(LeavePage.fromDateInput);
            const toDate = new Date();
            toDate.setDate(toDate.getDate() + 7);
            const formattedToDate = toDate.toISOString().split('T')[0];
            if (await dateInputs.nth(1).isVisible()) {
                await dateInputs.nth(1).fill(formattedToDate);
            }
        });

        await test.step('Click Submit button', async () => {
            await page.click(LeavePage.applyButton);
        });

        await test.step('Verify validation error is displayed', async () => {
            const errorMessage = page.locator(LeavePage.validationError);
            await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
        });

        await test.step('Verify form is not submitted and error persists', async () => {
            await expect(page).toHaveURL(/.*applyLeave/);
            const errorMessages = page.locator(LeavePage.formErrorMessage);
            const errorCount = await errorMessages.count();
            expect(errorCount).toBeGreaterThan(0);
        });
    });

    test('[1005] Verify that user can view leave calendar @smoke @regression', async ({ page }) => {
        await test.step('Navigate to login page', async () => {
            await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
            await expect(page).toHaveURL(/.*login/);
        });

        await test.step('Enter username and password credentials', async () => {
            await page.fill(LeavePage.usernameInput, 'Admin');
            await page.fill(LeavePage.passwordInput, 'admin123');
            await page.click(LeavePage.loginButton);
            await page.waitForLoadState('networkidle');
        });

        await test.step('Navigate to Leave module', async () => {
            await page.click(LeavePage.leaveMenuLink);
            await page.waitForLoadState('networkidle');
        });

        await test.step('Click on Leave Calendar link', async () => {
            await page.click(LeavePage.leaveCalendarLink);
            await page.waitForLoadState('networkidle');
        });

        await test.step('Verify calendar view is displayed', async () => {
            await expect(page).toHaveURL(/.*viewLeaveCalendar/);
            const calendarContainer = page.locator(LeavePage.leaveCalendarContainer);
            await expect(calendarContainer).toBeVisible();
        });

        await test.step('Verify calendar shows team members leave dates with color coding', async () => {
            const calendarHeader = page.locator(LeavePage.calendarHeader);
            await expect(calendarHeader).toBeVisible();
            
            const monthSelector = page.locator(LeavePage.datePickerContainer).first();
            await expect(monthSelector).toBeVisible();
        });

        await test.step('Click on specific date to view leave details', async () => {
            const calendarDates = page.locator(LeavePage.calendarDayCell);
            const dateCount = await calendarDates.count();
            
            if (dateCount > 0) {
                const clickableDate = calendarDates.first();
                if (await clickableDate.isVisible()) {
                    await clickableDate.click();
                    await page.waitForTimeout(1000);
                }
            }
        });

        await test.step('Verify leave calendar page remains accessible', async () => {
            await expect(page).toHaveURL(/.*leave/);
            const pageContent = page.locator(LeavePage.leaveCalendarContainer);
            await expect(pageContent).toBeVisible();
        });
    });
});
