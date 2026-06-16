import test from '../testFixtures/fixture.js';

test.describe.parallel('Leave Management Module - Smoke and Regression Tests', () => {

    test('[1000] Verify that user can apply for sick leave with half day option @smoke', async ({ leavePage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await leavePage.navigateToApplication('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        });

        await test.step('Enter username and password', async () => {
            await leavePage.login('Admin', 'admin123');
        });

        await test.step('Verify login successful', async () => {
            await leavePage.verifyLoginSuccessful();
        });

        await test.step('Navigate to Leave section', async () => {
            await leavePage.navigateToLeaveSection();
        });

        await test.step('Navigate to Apply Leave', async () => {
            await leavePage.navigateToApplyLeave();
        });

        await test.step('Select leave type as Sick Leave, select half day option, enter date and click Submit', async () => {
            const today = new Date().toISOString().split('T')[0];
            await leavePage.applyHalfDaySickLeave(today, 'Half day sick leave application');
        });

        await test.step('Verify half day leave application submitted successfully', async () => {
            await leavePage.verifyLeaveApplicationSubmitted();
        });

        await test.step('Navigate to My Leave list', async () => {
            await leavePage.navigateToMyLeave();
        });

        await test.step('Verify leave request shows 0.5 days in My Leave list', async () => {
            await leavePage.verifyHalfDayLeaveInList();
        });
    });

    test('[1009] Verify that user cannot apply leave with to date before from date @regression', async ({ leavePage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await leavePage.navigateToApplication('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        });

        await test.step('Enter username and password', async () => {
            await leavePage.login('Admin', 'admin123');
        });

        await test.step('Verify login successful', async () => {
            await leavePage.verifyLoginSuccessful();
        });

        await test.step('Navigate to Leave section', async () => {
            await leavePage.navigateToLeaveSection();
        });

        await test.step('Navigate to Apply Leave', async () => {
            await leavePage.navigateToApplyLeave();
        });

        await test.step('Select leave type, enter to date earlier than from date and click Submit', async () => {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const fromDate = tomorrow.toISOString().split('T')[0];
            const toDate = today.toISOString().split('T')[0];
            await leavePage.applyLeaveWithInvalidDateRange('Sick', fromDate, toDate);
        });

        await test.step('Verify validation error is displayed', async () => {
            await leavePage.verifyValidationErrorDisplayed();
        });

        await test.step('Verify date range error message is displayed', async () => {
            await leavePage.verifyDateRangeErrorDisplayed();
        });

        await test.step('Verify form is not submitted', async () => {
            await leavePage.verifyFormNotSubmitted();
        });
    });

    test('[1005] Verify that user can view leave calendar @smoke', async ({ leavePage }) => {
        await test.step('Navigate to configured application URL', async () => {
            await leavePage.navigateToApplication('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        });

        await test.step('Enter username and password', async () => {
            await leavePage.login('Admin', 'admin123');
        });

        await test.step('Verify login successful', async () => {
            await leavePage.verifyLoginSuccessful();
        });

        await test.step('Navigate to Leave section', async () => {
            await leavePage.navigateToLeaveSection();
        });

        await test.step('Navigate to Leave List or Calendar view', async () => {
            await leavePage.navigateToLeaveList();
        });

        await test.step('Verify calendar shows all team members leave dates', async () => {
            await leavePage.verifyLeaveCalendarVisible();
            await leavePage.verifyTeamMemberLeavesDisplayed();
        });

        await test.step('Click on specific date to view leave details', async () => {
            const today = new Date().getDate().toString();
            await leavePage.clickCalendarDate(today);
        });

        await test.step('Verify leave details for that date are displayed', async () => {
            await leavePage.verifyLeaveDetailsDisplayed();
        });
    });

});