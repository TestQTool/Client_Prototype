import { expect } from '@playwright/test';
import test from '../testFixtures/fixture.js';

test.describe.parallel('@Leave: Verify Leave Module functionality', () => {

    test.beforeEach(async ({ page, loginPage }) => {
        await test.step('Open the application', async () => {
            await page.openApp();
        });
        await test.step('Login with Admin credentials', async () => {
            const adminCreds = loginPage.getLoginDataByRole('Admin');
            await loginPage.fillUsername(adminCreds.Username);
            await loginPage.fillPassword(adminCreds.Password);
            await loginPage.clickLogin();
        });
        await test.step('Verify dashboard loaded', async () => {
            await loginPage.verifyLandingPage();
        });
    });

    test('LVE-001: @smoke @regression Verify Leave module navigation', async ({ leavePage }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });
        await test.step('Verify Leave module is loaded', async () => {
            await leavePage.verifyLeaveModuleLoaded();
        });
    });

    test('LVE-002: @smoke @regression Verify Apply Leave page loads', async ({ leavePage }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });
        await test.step('Navigate to Apply Leave page', async () => {
            await leavePage.navigateToApplyLeave();
        });
        await test.step('Verify Apply Leave page is loaded', async () => {
            await leavePage.verifyApplyLeavePageLoaded();
        });
    });

    test('LVE-003: @smoke @regression Verify My Leave page loads', async ({ leavePage }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });
        await test.step('Navigate to My Leave page', async () => {
            await leavePage.navigateToMyLeave();
        });
        await test.step('Verify My Leave page is loaded', async () => {
            await leavePage.verifyMyLeavePageLoaded();
        });
    });

    test('LVE-004: @smoke @regression Verify Leave List page loads', async ({ leavePage }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });
        await test.step('Navigate to Leave List page', async () => {
            await leavePage.navigateToLeaveList();
        });
        await test.step('Verify Leave List page is loaded', async () => {
            await leavePage.verifyLeaveListPageLoaded();
        });
    });

    test('LVE-005: @regression Verify leave application with valid data', async ({ leavePage }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });
        await test.step('Navigate to Apply Leave page', async () => {
            await leavePage.navigateToApplyLeave();
        });
        await test.step('Fill leave application form', async () => {
            await leavePage.applyLeave('CAN - Vacation', '2024-01-15', '2024-01-17', 'Family vacation');
        });
        await test.step('Verify leave application success', async () => {
            await leavePage.verifyLeaveApplicationSuccess();
        });
    });

    test('LVE-006: @regression Verify required field validation on Apply Leave form', async ({ leavePage }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });
        await test.step('Navigate to Apply Leave page', async () => {
            await leavePage.navigateToApplyLeave();
        });
        await test.step('Submit form without filling required fields', async () => {
            await leavePage.submitLeaveApplication();
        });
        await test.step('Verify required field error is displayed', async () => {
            await leavePage.verifyRequiredFieldError();
        });
    });

    test('LVE-007: @regression Verify Leave List filter by date range', async ({ leavePage }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });
        await test.step('Navigate to Leave List page', async () => {
            await leavePage.navigateToLeaveList();
        });
        await test.step('Filter by date range', async () => {
            await leavePage.filterByDateRange('2024-01-01', '2024-01-31');
        });
        await test.step('Click Search button', async () => {
            await leavePage.clickSearch();
        });
        await test.step('Verify filtered results are displayed', async () => {
            await leavePage.verifyLeaveRecordsVisible();
        });
    });

    test('LVE-008: @regression Verify Leave List reset filter', async ({ leavePage }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });
        await test.step('Navigate to Leave List page', async () => {
            await leavePage.navigateToLeaveList();
        });
        await test.step('Filter by date range', async () => {
            await leavePage.filterByDateRange('2024-01-01', '2024-01-31');
        });
        await test.step('Click Reset button', async () => {
            await leavePage.clickReset();
        });
        await test.step('Verify filters are cleared', async () => {
            await leavePage.verifyLeaveListPageLoaded();
        });
    });

    test('LVE-009: @regression Verify Leave Balance widget is visible', async ({ leavePage }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });
        await test.step('Navigate to My Leave page', async () => {
            await leavePage.navigateToMyLeave();
        });
        await test.step('Verify Leave Balance widget is visible', async () => {
            await leavePage.verifyLeaveBalanceVisible();
        });
    });

    test('LVE-010: @smoke @regression Verify Assign Leave page loads', async ({ leavePage }) => {
        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });
        await test.step('Navigate to Assign Leave page', async () => {
            await leavePage.navigateToAssignLeave();
        });
        await test.step('Verify Assign Leave page is loaded', async () => {
            await leavePage.verifyAssignLeavePageLoaded();
        });
    });

});