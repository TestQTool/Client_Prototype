import test from '../testFixtures/fixture.js';

test.describe.parallel('Leave Module - Automation Tests', () => {

    test('[TC-1000] Verify that user can apply for sick leave with half day option @smoke @regression', async ({ leavePage }) => {
        await test.step('Navigate to application URL', async () => {
            await leavePage.navigateToApplication('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        });

        await test.step('Enter username and password', async () => {
            await leavePage.login('Admin', 'admin123');
        });

        await test.step('Verify login success', async () => {
            await leavePage.verifyLoginSuccess();
        });

        await test.step('Select leave type as Sick Leave, select half day option, enter date and click Submit', async () => {
            const leaveDate = new Date();
            leaveDate.setDate(leaveDate.getDate() + 5);
            const formattedDate = leaveDate.toISOString().split('T')[0];
            
            await leavePage.applyHalfDayLeave('CAN - Sick', formattedDate);
        });

        await test.step('Verify half day leave application submitted successfully', async () => {
            await leavePage.verifyHalfDayLeaveSubmitted();
        });

        await test.step('Verify leave request shows 0.5 days in My Leave list', async () => {
            await leavePage.verifyLeaveShowsHalfDay();
        });
    });

    test('[TC-1005] Verify that user can view leave calendar @smoke @regression', async ({ leavePage }) => {
        await test.step('Navigate to application URL', async () => {
            await leavePage.navigateToApplication('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        });

        await test.step('Enter username and password', async () => {
            await leavePage.login('Admin', 'admin123');
        });

        await test.step('Verify login success', async () => {
            await leavePage.verifyLoginSuccess();
        });

        await test.step('Navigate to Leave module', async () => {
            await leavePage.navigateToLeaveModule();
        });

        await test.step('Open leave calendar', async () => {
            await leavePage.openLeaveCalendar();
        });

        await test.step('Verify calendar shows all team members leave dates', async () => {
            await leavePage.verifyLeaveCalendarDisplayed();
            await leavePage.verifyCalendarShowsLeaveDates();
        });

        await test.step('Click on specific date to view leave details', async () => {
            const targetDate = new Date().getDate().toString();
            await leavePage.clickCalendarDate(targetDate);
        });

        await test.step('Verify leave details for that date are displayed', async () => {
            await leavePage.verifyLeaveDetailsDisplayed();
        });
    });

});

