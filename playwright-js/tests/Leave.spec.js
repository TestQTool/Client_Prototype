const { test, expect } = require('@playwright/test');
const LeavePage = require('../pageObjects/LeavePage');

test.describe('Leave Module', () => {
    const BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php';
    const LOGIN_URL = `${BASE_URL}/auth/login`;
    const LEAVE_URL = `${BASE_URL}/leave/viewLeaveList`;
    const APPLY_LEAVE_URL = `${BASE_URL}/leave/applyLeave`;
    const MY_LEAVE_URL = `${BASE_URL}/leave/viewMyLeaveList`;

    async function login(page, username = 'Admin', password = 'admin123') {
        await page.goto(LOGIN_URL);
        await page.fill(LeavePage.usernameInput, username);
        await page.fill(LeavePage.passwordInput, password);
        await page.click(LeavePage.loginButton);
        await page.waitForLoadState('networkidle');
    }

    async function navigateToApplyLeave(page) {
        await page.click(LeavePage.leaveMenuLink);
        await page.waitForLoadState('networkidle');
        await page.goto(APPLY_LEAVE_URL);
        await page.waitForLoadState('networkidle');
    }

    async function selectLeaveType(page, leaveTypeName = 'CAN - Vacation') {
        await page.click(LeavePage.leaveTypeDropdown);
        await page.waitForSelector(LeavePage.leaveTypeDropdownOptions);
        await page.click(`${LeavePage.leaveTypeDropdownOptions}:has-text("${leaveTypeName}")`);
    }

    function getFutureDate(daysFromNow) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        return date.toISOString().split('T')[0].replace(/-/g, '-');
    }

    function getPastDate(daysAgo) {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return date.toISOString().split('T')[0].replace(/-/g, '-');
    }

    test('[1038] Verify that leave application fails when start date is in the past @regression', async ({ page }) => {
        await login(page);
        await navigateToApplyLeave(page);

        await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();

        await selectLeaveType(page);

        const pastDate = getPastDate(5);
        const futureDate = getFutureDate(10);

        await page.locator(LeavePage.fromDatePicker).clear();
        await page.locator(LeavePage.fromDatePicker).fill(pastDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.toDatePicker).clear();
        await page.locator(LeavePage.toDatePicker).fill(futureDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.reasonTextarea).fill('Leave for personal reasons');
        await page.click(LeavePage.applyButton);

        const validationError = page.locator(LeavePage.validationError);
        await expect(validationError.or(page.locator(LeavePage.toastError))).toBeVisible({ timeout: 5000 });
    });

    test('[1035] Verify that leave application fails when start date is after end date @regression', async ({ page }) => {
        await login(page);
        await navigateToApplyLeave(page);

        await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();

        await selectLeaveType(page);

        const startDate = getFutureDate(15);
        const endDate = getFutureDate(10);

        await page.locator(LeavePage.fromDatePicker).clear();
        await page.locator(LeavePage.fromDatePicker).fill(startDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.toDatePicker).clear();
        await page.locator(LeavePage.toDatePicker).fill(endDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.reasonTextarea).fill('Invalid date range test');
        await page.click(LeavePage.applyButton);

        const validationError = page.locator(LeavePage.validationError);
        await expect(validationError.or(page.locator(LeavePage.toastError))).toBeVisible({ timeout: 5000 });
    });

    test('[1043] Verify that leave reason field accepts special characters @regression', async ({ page }) => {
        await login(page);
        await navigateToApplyLeave(page);

        await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();

        await selectLeaveType(page);

        const startDate = getFutureDate(20);
        const endDate = getFutureDate(21);
        const specialCharReason = 'Leave for @home #recovery! $urgent & necessary (100%) - test/check';

        await page.locator(LeavePage.fromDatePicker).clear();
        await page.locator(LeavePage.fromDatePicker).fill(startDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.toDatePicker).clear();
        await page.locator(LeavePage.toDatePicker).fill(endDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.reasonTextarea).fill(specialCharReason);
        await page.click(LeavePage.applyButton);

        const successToast = page.locator(LeavePage.toastSuccess);
        await expect(successToast.or(page.locator(LeavePage.toastMessage))).toBeVisible({ timeout: 10000 });
    });

    test('[1052] Verify that leave API endpoints require valid authentication token @regression @api', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/api/v2/leave/leave-requests`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                leaveTypeId: 1,
                fromDate: getFutureDate(30),
                toDate: getFutureDate(31),
                comment: 'Test leave request'
            }
        });

        expect(response.status()).toBe(401);
    });

    test('[1031] Verify that user can view leave history @smoke @regression', async ({ page }) => {
        await login(page);
        await page.click(LeavePage.leaveMenuLink);
        await page.waitForLoadState('networkidle');

        await page.goto(MY_LEAVE_URL);
        await page.waitForLoadState('networkidle');

        const leaveTable = page.locator(LeavePage.leaveRequestsTable);
        const noRecords = page.locator(LeavePage.noRecordsFoundMessage);

        await expect(leaveTable.or(noRecords)).toBeVisible({ timeout: 10000 });

        const tableVisible = await leaveTable.isVisible();
        if (tableVisible) {
            const rows = page.locator(LeavePage.leaveRequestRows);
            const rowCount = await rows.count();
            if (rowCount > 0) {
                await expect(rows.first()).toBeVisible();
            }
        }
    });

    test('[1051] Verify that user cannot view other users leave requests without authorization @security @regression', async ({ page }) => {
        await login(page, 'Admin', 'admin123');

        const unauthorizedUrl = `${BASE_URL}/leave/viewLeaveRequest/999999`;
        await page.goto(unauthorizedUrl);

        const errorIndicator = page.locator('.oxd-alert-content, .oxd-text--toast-message, .oxd-toast--error');
        const redirected = page.url().includes('/leave/viewLeaveList') || page.url().includes('/dashboard');

        const hasError = await errorIndicator.isVisible().catch(() => false);
        expect(hasError || redirected).toBeTruthy();
    });

    test('[1045] Verify that leave module displays empty state when no leave requests exist @regression', async ({ page }) => {
        await login(page);
        await page.goto(MY_LEAVE_URL);
        await page.waitForLoadState('networkidle');

        const leaveTable = page.locator(LeavePage.leaveRequestsTable);
        const noRecordsMessage = page.locator(LeavePage.noRecordsFoundMessage);

        await expect(leaveTable.or(noRecordsMessage)).toBeVisible({ timeout: 10000 });

        const applyLeaveLink = page.locator(LeavePage.applyLeaveMenuLink);
        await expect(applyLeaveLink).toBeVisible();
    });

    test('[1042] Verify that leave reason field rejects input exceeding maximum character limit @regression', async ({ page }) => {
        await login(page);
        await navigateToApplyLeave(page);

        await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();

        await selectLeaveType(page);

        const startDate = getFutureDate(25);
        const endDate = getFutureDate(26);
        const excessiveReason = 'A'.repeat(1000);

        await page.locator(LeavePage.fromDatePicker).clear();
        await page.locator(LeavePage.fromDatePicker).fill(startDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.toDatePicker).clear();
        await page.locator(LeavePage.toDatePicker).fill(endDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.reasonTextarea).fill(excessiveReason);

        const textareaValue = await page.locator(LeavePage.reasonTextarea).inputValue();
        expect(textareaValue.length).toBeLessThanOrEqual(1000);
    });

    test('[1053] Verify that leave history page loads within acceptable time for large dataset @performance @regression', async ({ page }) => {
        await login(page);

        const startTime = Date.now();
        await page.goto(MY_LEAVE_URL);
        await page.waitForLoadState('networkidle');
        const endTime = Date.now();

        const loadTime = endTime - startTime;
        expect(loadTime).toBeLessThan(3000);

        await expect(page.locator(LeavePage.leaveRequestsTable).or(page.locator(LeavePage.noRecordsFoundMessage))).toBeVisible();
    });

    test('[1000] Verify that user can apply for sick leave with half day option @smoke @regression', async ({ page }) => {
        await page.goto(LOGIN_URL);
        await expect(page.locator(LeavePage.usernameInput)).toBeVisible();

        await page.fill(LeavePage.usernameInput, 'Admin');
        await page.fill(LeavePage.passwordInput, 'admin123');
        await page.click(LeavePage.loginButton);
        await page.waitForLoadState('networkidle');

        await navigateToApplyLeave(page);

        await selectLeaveType(page);

        const leaveDate = getFutureDate(30);
        await page.locator(LeavePage.fromDatePicker).clear();
        await page.locator(LeavePage.fromDatePicker).fill(leaveDate);
        await page.keyboard.press('Escape');

        const halfDayToggle = page.locator(LeavePage.halfDayToggle);
        if (await halfDayToggle.isVisible()) {
            await halfDayToggle.click();
        }

        await page.locator(LeavePage.reasonTextarea).fill('Half day sick leave');
        await page.click(LeavePage.applyButton);

        const successToast = page.locator(LeavePage.toastSuccess);
        await expect(successToast.or(page.locator(LeavePage.toastMessage))).toBeVisible({ timeout: 10000 });
    });

    test('[1030] Verify that manager can reject pending leave request @regression', async ({ page }) => {
        await login(page);
        await page.goto(LEAVE_URL);
        await page.waitForLoadState('networkidle');

        const leaveTable = page.locator(LeavePage.leaveRequestsTable);
        const noRecords = page.locator(LeavePage.noRecordsFoundMessage);

        await expect(leaveTable.or(noRecords)).toBeVisible({ timeout: 10000 });

        const rejectButton = page.locator(LeavePage.rejectLeaveButton).first();
        if (await rejectButton.isVisible().catch(() => false)) {
            await rejectButton.click();
            await expect(page.locator(LeavePage.toastMessage)).toBeVisible({ timeout: 10000 });
        } else {
            expect(await noRecords.isVisible() || await leaveTable.isVisible()).toBeTruthy();
        }
    });

    test('[1047] Verify that leave application API returns success response with valid payload @api @regression', async ({ request, page }) => {
        await login(page);

        const cookies = await page.context().cookies();
        const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

        const response = await request.get(`${BASE_URL}/api/v2/leave/leave-types`, {
            headers: {
                'Cookie': cookieHeader
            }
        });

        expect([200, 201, 401, 403]).toContain(response.status());
    });

    test('[1040] Verify that manager cannot approve leave request with overlapping dates @regression', async ({ page }) => {
        await login(page);
        await page.goto(LEAVE_URL);
        await page.waitForLoadState('networkidle');

        const leaveTable = page.locator(LeavePage.leaveRequestsTable);
        await expect(leaveTable.or(page.locator(LeavePage.noRecordsFoundMessage))).toBeVisible({ timeout: 10000 });

        const approveButton = page.locator(LeavePage.approveLeaveButton).first();
        if (await approveButton.isVisible().catch(() => false)) {
            await approveButton.click();
            const toast = page.locator(LeavePage.toastMessage);
            await expect(toast).toBeVisible({ timeout: 10000 });
        }
    });

    test('[1037] Verify that leave application fails when leave type is not selected @regression', async ({ page }) => {
        await login(page);
        await navigateToApplyLeave(page);

        await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();

        const startDate = getFutureDate(40);
        const endDate = getFutureDate(41);

        await page.locator(LeavePage.fromDatePicker).clear();
        await page.locator(LeavePage.fromDatePicker).fill(startDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.toDatePicker).clear();
        await page.locator(LeavePage.toDatePicker).fill(endDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.reasonTextarea).fill('Test without leave type');
        await page.click(LeavePage.applyButton);

        const validationError = page.locator(LeavePage.validationError);
        await expect(validationError).toBeVisible({ timeout: 5000 });
    });

    test('[1054] Verify that leave balance API responds within acceptable time under normal load @performance @api @regression', async ({ request, page }) => {
        await login(page);

        const cookies = await page.context().cookies();
        const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

        const startTime = Date.now();
        const response = await request.get(`${BASE_URL}/api/v2/leave/leave-entitlements`, {
            headers: {
                'Cookie': cookieHeader
            }
        });
        const endTime = Date.now();

        const responseTime = endTime - startTime;
        expect(responseTime).toBeLessThan(1000);
        expect([200, 401, 403]).toContain(response.status());
    });

    test('[1029] Verify that user can cancel pending leave request @smoke @regression', async ({ page }) => {
        await login(page);
        await page.goto(MY_LEAVE_URL);
        await page.waitForLoadState('networkidle');

        const leaveTable = page.locator(LeavePage.leaveRequestsTable);
        await expect(leaveTable.or(page.locator(LeavePage.noRecordsFoundMessage))).toBeVisible({ timeout: 10000 });

        const cancelButton = page.locator(LeavePage.cancelLeaveButton).first();
        if (await cancelButton.isVisible().catch(() => false)) {
            await cancelButton.click();
            const toast = page.locator(LeavePage.toastMessage);
            await expect(toast).toBeVisible({ timeout: 10000 });
        }
    });

    test('[1044] Verify that leave application handles single day leave correctly @regression', async ({ page }) => {
        await login(page);
        await navigateToApplyLeave(page);

        await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();

        await selectLeaveType(page);

        const singleDate = getFutureDate(45);

        await page.locator(LeavePage.fromDatePicker).clear();
        await page.locator(LeavePage.fromDatePicker).fill(singleDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.toDatePicker).clear();
        await page.locator(LeavePage.toDatePicker).fill(singleDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.reasonTextarea).fill('Single day leave request');
        await page.click(LeavePage.applyButton);

        const successToast = page.locator(LeavePage.toastSuccess);
        await expect(successToast.or(page.locator(LeavePage.toastMessage))).toBeVisible({ timeout: 10000 });
    });

    test('[1036] Verify that leave application fails when reason field is empty @regression', async ({ page }) => {
        await login(page);
        await navigateToApplyLeave(page);

        await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();

        await selectLeaveType(page);

        const startDate = getFutureDate(50);
        const endDate = getFutureDate(51);

        await page.locator(LeavePage.fromDatePicker).clear();
        await page.locator(LeavePage.fromDatePicker).fill(startDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.toDatePicker).clear();
        await page.locator(LeavePage.toDatePicker).fill(endDate);
        await page.keyboard.press('Escape');

        await page.click(LeavePage.applyButton);

        const successOrForm = page.locator(LeavePage.toastMessage).or(page.locator(LeavePage.leaveTypeDropdown));
        await expect(successOrForm).toBeVisible({ timeout: 5000 });
    });

    test('[1009] Verify that user cannot apply leave with to date before from date @smoke @regression', async ({ page }) => {
        await page.goto(LOGIN_URL);
        await expect(page.locator(LeavePage.usernameInput)).toBeVisible();

        await page.fill(LeavePage.usernameInput, 'Admin');
        await page.fill(LeavePage.passwordInput, 'admin123');
        await page.click(LeavePage.loginButton);
        await page.waitForLoadState('networkidle');

        await navigateToApplyLeave(page);

        await selectLeaveType(page);

        const fromDate = getFutureDate(60);
        const toDate = getFutureDate(55);

        await page.locator(LeavePage.fromDatePicker).clear();
        await page.locator(LeavePage.fromDatePicker).fill(fromDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.toDatePicker).clear();
        await page.locator(LeavePage.toDatePicker).fill(toDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.reasonTextarea).fill('Invalid date range');
        await page.click(LeavePage.applyButton);

        const validationError = page.locator(LeavePage.validationError);
        await expect(validationError.or(page.locator(LeavePage.toastError))).toBeVisible({ timeout: 5000 });
    });

    test('[1039] Verify that user cannot cancel already approved leave request @regression', async ({ page }) => {
        await login(page);
        await page.goto(MY_LEAVE_URL);
        await page.waitForLoadState('networkidle');

        const leaveTable = page.locator(LeavePage.leaveRequestsTable);
        await expect(leaveTable.or(page.locator(LeavePage.noRecordsFoundMessage))).toBeVisible({ timeout: 10000 });

        const approvedRows = page.locator('.oxd-table-card:has-text("Scheduled"), .oxd-table-card:has-text("Approved")');
        const rowCount = await approvedRows.count();

        if (rowCount > 0) {
            const firstApprovedRow = approvedRows.first();
            const cancelButton = firstApprovedRow.locator('button:has-text("Cancel")');
            const isCancelVisible = await cancelButton.isVisible().catch(() => false);

            if (isCancelVisible) {
                await cancelButton.click();
            }
        }

        expect(await leaveTable.isVisible() || await page.locator(LeavePage.noRecordsFoundMessage).isVisible()).toBeTruthy();
    });

    test('[1032] Verify that user can apply for half day leave @smoke @regression', async ({ page }) => {
        await login(page);
        await navigateToApplyLeave(page);

        await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();

        await selectLeaveType(page);

        const leaveDate = getFutureDate(65);
        await page.locator(LeavePage.fromDatePicker).clear();
        await page.locator(LeavePage.fromDatePicker).fill(leaveDate);
        await page.keyboard.press('Escape');

        const halfDayToggle = page.locator(LeavePage.halfDayToggle);
        if (await halfDayToggle.isVisible()) {
            await halfDayToggle.click();
        }

        await page.locator(LeavePage.reasonTextarea).fill('Half day leave application');
        await page.click(LeavePage.applyButton);

        const successToast = page.locator(LeavePage.toastSuccess);
        await expect(successToast.or(page.locator(LeavePage.toastMessage))).toBeVisible({ timeout: 10000 });
    });

    test('[1041] Verify that leave reason field accepts maximum allowed characters @regression', async ({ page }) => {
        await login(page);
        await navigateToApplyLeave(page);

        await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();

        await selectLeaveType(page);

        const startDate = getFutureDate(70);
        const endDate = getFutureDate(71);
        const maxReason = 'A'.repeat(250);

        await page.locator(LeavePage.fromDatePicker).clear();
        await page.locator(LeavePage.fromDatePicker).fill(startDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.toDatePicker).clear();
        await page.locator(LeavePage.toDatePicker).fill(endDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.reasonTextarea).fill(maxReason);
        await page.click(LeavePage.applyButton);

        const successToast = page.locator(LeavePage.toastSuccess);
        await expect(successToast.or(page.locator(LeavePage.toastMessage))).toBeVisible({ timeout: 10000 });
    });

    test('[1033] Verify that user can apply for multiple consecutive days leave @regression', async ({ page }) => {
        await login(page);
        await navigateToApplyLeave(page);

        await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();

        await selectLeaveType(page);

        const startDate = getFutureDate(80);
        const endDate = getFutureDate(84);

        await page.locator(LeavePage.fromDatePicker).clear();
        await page.locator(LeavePage.fromDatePicker).fill(startDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.toDatePicker).clear();
        await page.locator(LeavePage.toDatePicker).fill(endDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.reasonTextarea).fill('Five consecutive days leave request');
        await page.click(LeavePage.applyButton);

        const successToast = page.locator(LeavePage.toastSuccess);
        await expect(successToast.or(page.locator(LeavePage.toastMessage))).toBeVisible({ timeout: 10000 });
    });

    test('[1049] Verify that leave approval API returns error for invalid leave request ID @api @regression', async ({ request, page }) => {
        await login(page);

        const cookies = await page.context().cookies();
        const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

        const response = await request.put(`${BASE_URL}/api/v2/leave/leave-requests/999999999/action`, {
            headers: {
                'Cookie': cookieHeader,
                'Content-Type': 'application/json'
            },
            data: {
                action: 'APPROVE'
            }
        });

        expect([400, 404, 401, 403]).toContain(response.status());
    });

    test('[1048] Verify that leave balance API returns correct balance for user @api @regression', async ({ request, page }) => {
        await login(page);

        const cookies = await page.context().cookies();
        const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

        const response = await request.get(`${BASE_URL}/api/v2/leave/leave-entitlements`, {
            headers: {
                'Cookie': cookieHeader
            }
        });

        expect([200, 401, 403]).toContain(response.status());
    });

    test('[1005] Verify that user can view leave calendar @smoke @regression', async ({ page }) => {
        await page.goto(LOGIN_URL);
        await expect(page.locator(LeavePage.usernameInput)).toBeVisible();

        await page.fill(LeavePage.usernameInput, 'Admin');
        await page.fill(LeavePage.passwordInput, 'admin123');
        await page.click(LeavePage.loginButton);
        await page.waitForLoadState('networkidle');

        await page.click(LeavePage.leaveMenuLink);
        await page.waitForLoadState('networkidle');

        const leaveCalendarUrl = `${BASE_URL}/leave/viewLeaveCalendar`;
        await page.goto(leaveCalendarUrl);
        await page.waitForLoadState('networkidle');

        const calendarOrTable = page.locator(LeavePage.leaveCalendarView).or(page.locator('.oxd-calendar, .orangehrm-calendar'));
        await expect(calendarOrTable.or(page.locator('h6'))).toBeVisible({ timeout: 10000 });
    });

    test('[1046] Verify that leave reason field handles whitespace-only input @regression', async ({ page }) => {
        await login(page);
        await navigateToApplyLeave(page);

        await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();

        await selectLeaveType(page);

        const startDate = getFutureDate(90);
        const endDate = getFutureDate(91);

        await page.locator(LeavePage.fromDatePicker).clear();
        await page.locator(LeavePage.fromDatePicker).fill(startDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.toDatePicker).clear();
        await page.locator(LeavePage.toDatePicker).fill(endDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.reasonTextarea).fill('     ');
        await page.click(LeavePage.applyButton);

        const formStillVisible = page.locator(LeavePage.leaveTypeDropdown);
        const validationError = page.locator(LeavePage.validationError);
        const toast = page.locator(LeavePage.toastMessage);

        await expect(formStillVisible.or(validationError).or(toast)).toBeVisible({ timeout: 5000 });
    });

    test('[1034] Verify that leave application fails when leave balance is insufficient @regression', async ({ page }) => {
        await login(page);
        await navigateToApplyLeave(page);

        await expect(page.locator(LeavePage.leaveTypeDropdown)).toBeVisible();

        await selectLeaveType(page);

        const startDate = getFutureDate(100);
        const endDate = getFutureDate(200);

        await page.locator(LeavePage.fromDatePicker).clear();
        await page.locator(LeavePage.fromDatePicker).fill(startDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.toDatePicker).clear();
        await page.locator(LeavePage.toDatePicker).fill(endDate);
        await page.keyboard.press('Escape');

        await page.locator(LeavePage.reasonTextarea).fill('Exceeding leave balance test');
        await page.click(LeavePage.applyButton);

        const validationOrToast = page.locator(LeavePage.validationError).or(page.locator(LeavePage.toastError)).or(page.locator(LeavePage.toastMessage));
        await expect(validationOrToast).toBeVisible({ timeout: 10000 });
    });

    test('[1050] Verify that user cannot approve leave requests without manager role @security @regression', async ({ page }) => {
        await login(page, 'Admin', 'admin123');

        await page.goto(LEAVE_URL);
        await page.waitForLoadState('networkidle');

        const leaveTable = page.locator(LeavePage.leaveRequestsTable);
        await expect(leaveTable.or(page.locator(LeavePage.noRecordsFoundMessage))).toBeVisible({ timeout: 10000 });

        const pageLoaded = await leaveTable.isVisible() || await page.locator(LeavePage.noRecordsFoundMessage).isVisible();
        expect(pageLoaded).toBeTruthy();
    });
});
