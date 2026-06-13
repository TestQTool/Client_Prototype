// Leave Module Tests
// Generated for OrangeHRM Leave functionality

import test from '../testFixtures/fixture.js';

test.describe.parallel('Leave Module - Leave Application and Calendar', () => {
  
  test('[TC-1000] Verify that user can apply for sick leave with half day option @smoke @regression', async ({ loginPage, leavePage }) => {
    await test.step('Navigate to OrangeHRM login page', async () => {
      await loginPage.open('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    await test.step('Login with Admin credentials', async () => {
      await loginPage.login('Admin', 'admin123');
      await loginPage.verifyLoginSuccess();
    });

    await test.step('Navigate to Leave module', async () => {
      await leavePage.navigateToLeaveModule();
    });

    await test.step('Click Apply to open leave application form', async () => {
      await leavePage.clickApplyLeave();
    });

    await test.step('Apply half day sick leave', async () => {
      const today = new Date();
      const leaveDate = today.toISOString().split('T')[0]; // yyyy-mm-dd format
      
      await leavePage.selectLeaveType('CAN - Sick');
      await leavePage.selectHalfDayOption('Half Day - Morning');
      await leavePage.enterLeaveDate(leaveDate);
      await leavePage.enterComments('Half day sick leave for medical appointment');
      await leavePage.clickSubmit();
    });

    await test.step('Verify leave application success', async () => {
      await leavePage.verifyLeaveApplicationSuccess();
    });

    await test.step('Navigate to My Leave and verify 0.5 days deduction', async () => {
      await leavePage.clickMyLeave();
      await leavePage.verifyLeaveRequestDays('0.5');
    });
  });

  test('[TC-1005] Verify that user can view leave calendar @smoke @regression', async ({ loginPage, leavePage }) => {
    await test.step('Navigate to OrangeHRM login page', async () => {
      await loginPage.open('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    await test.step('Login with Admin credentials', async () => {
      await loginPage.login('Admin', 'admin123');
      await loginPage.verifyLoginSuccess();
    });

    await test.step('Navigate to Leave module', async () => {
      await leavePage.navigateToLeaveModule();
    });

    await test.step('Open leave calendar view', async () => {
      await leavePage.navigateToCalendarView();
    });

    await test.step('Verify calendar displays team leave dates with color coding', async () => {
      await leavePage.verifyCalendarIsDisplayed();
      await leavePage.verifyCalendarShowsLeaveDates();
    });

    await test.step('Click on a specific date to view leave details', async () => {
      const today = new Date();
      const dateNumber = today.getDate().toString();
      
      await leavePage.clickCalendarDate(dateNumber);
    });

    await test.step('Verify leave details are displayed for selected date', async () => {
      await leavePage.verifyLeaveDetailsDisplayed();
    });
  });
});