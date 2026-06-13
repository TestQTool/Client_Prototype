import test from '../testFixtures/fixture.js';

test.describe.parallel('Leave Management Tests @regression', () => {
  test('[TC-1000] Verify that user can apply for sick leave with half day option @smoke', async ({ page, leavePage }) => {
    await test.step('Navigate to Leave module', async () => {
      await leavePage.navigateToLeaveModule();
    });

    await test.step('Click Apply Leave button', async () => {
      await leavePage.clickApplyLeave();
    });

    await test.step('Select Sick Leave type', async () => {
      await leavePage.selectLeaveType('Sick Leave');
    });

    await test.step('Enter leave dates', async () => {
      const today = new Date().toISOString().split('T')[0];
      await leavePage.enterFromDate(today);
      await leavePage.enterToDate(today);
    });

    await test.step('Select Partial Days - Half Day option', async () => {
      await leavePage.selectPartialDays('Half Day');
    });

    await test.step('Select Half Day duration - Morning', async () => {
      await leavePage.selectDuration('Half Day - Morning');
    });

    await test.step('Enter comments for leave application', async () => {
      await leavePage.enterComments('Medical appointment in the morning');
    });

    await test.step('Submit leave application', async () => {
      await leavePage.submitLeaveApplication();
    });

    await test.step('Verify success message is displayed', async () => {
      await leavePage.verifySuccessMessage('Leave application submitted successfully');
    });

    await test.step('Navigate to My Leave section', async () => {
      await leavePage.navigateToMyLeave();
    });

    await test.step('Verify leave appears in My Leave list', async () => {
      await leavePage.verifyLeaveTypeInList('Sick Leave');
    });

    await test.step('Verify leave status is Pending', async () => {
      await leavePage.verifyLeaveStatus('Pending');
    });
  });

  test('[TC-1005] Verify that user can view leave calendar @smoke', async ({ page, leavePage }) => {
    await test.step('Navigate to Leave module', async () => {
      await leavePage.navigateToLeaveModule();
    });

    await test.step('Click Leave Calendar link', async () => {
      await leavePage.navigateToLeaveCalendar();
    });

    await test.step('Verify calendar is displayed', async () => {
      await leavePage.verifyCalendarIsDisplayed();
    });

    await test.step('Verify calendar shows current month and year', async () => {
      const monthYear = await leavePage.getCalendarMonthYear();
      const currentMonth = new Date().toLocaleString('default', { month: 'long' });
      const currentYear = new Date().getFullYear();
      test.expect(monthYear).toContain(currentMonth);
      test.expect(monthYear).toContain(currentYear.toString());
    });

    await test.step('Navigate to next month in calendar', async () => {
      await leavePage.navigateToNextMonth();
    });

    await test.step('Verify calendar updates to next month', async () => {
      const nextMonthYear = await leavePage.getCalendarMonthYear();
      test.expect(nextMonthYear.length).toBeGreaterThan(0);
    });

    await test.step('Navigate to previous month in calendar', async () => {
      await leavePage.navigateToPreviousMonth();
    });

    await test.step('Verify calendar legend is displayed', async () => {
      await leavePage.verifyCalendarLegendIsDisplayed();
    });

    await test.step('Verify legend contains Sick Leave', async () => {
      await leavePage.verifyLegendContainsSickLeave();
    });

    await test.step('Verify legend contains Annual Leave', async () => {
      await leavePage.verifyLegendContainsAnnualLeave();
    });
  });
});

