const { test, expect } = require('@playwright/test');
const LeaveModulePage = require('../pages/LeaveModulePage');
const config = require('../config/config');
const testData = require('../data/leaveModuleTestData');

test.describe('Leave Module - Feature [764]', () => {
  let leaveModulePage;

  test.beforeEach(async ({ page }) => {
    leaveModulePage = new LeaveModulePage(page);
    await page.goto(config.BASE_URL);
  });

  test('[764-1] Apply for Annual Leave @smoke @priority-high', async ({ page }) => {
    // Step 1: Navigate to Leave Module
    await leaveModulePage.navigateToLeaveModule();
    
    // Step 2: Click on Apply Leave button
    await leaveModulePage.clickApplyLeave();
    
    // Step 3: Select leave type as Annual Leave
    await leaveModulePage.selectLeaveType(testData.leaveTypes.annual);
    
    // Step 4: Enter from date and to date
    await leaveModulePage.enterFromDate(testData.dates.fromDate);
    await leaveModulePage.enterToDate(testData.dates.toDate);
    
    // Step 5: Enter comments
    await leaveModulePage.enterComments(testData.comments.vacation);
    
    // Step 6: Submit leave request
    await leaveModulePage.submitLeaveRequest();
    
    // Expected: Leave request should be submitted successfully
    const isSuccessful = await leaveModulePage.verifySuccessMessage();
    expect(isSuccessful).toBeTruthy();
    
    // Expected: Leave should appear in the leave list
    const isInList = await leaveModulePage.verifyLeaveInList(testData.leaveTypes.annual);
    expect(isInList).toBeTruthy();
  });

  test('[764-2] Apply for Sick Leave @regression @priority-medium', async ({ page }) => {
    // Step 1: Navigate to Leave Module
    await leaveModulePage.navigateToLeaveModule();
    
    // Step 2: Click on Apply Leave button
    await leaveModulePage.clickApplyLeave();
    
    // Step 3: Select leave type as Sick Leave
    await leaveModulePage.selectLeaveType(testData.leaveTypes.sick);
    
    // Step 4: Enter from date and to date
    await leaveModulePage.enterFromDate(testData.dates.sickFromDate);
    await leaveModulePage.enterToDate(testData.dates.sickToDate);
    
    // Step 5: Enter comments
    await leaveModulePage.enterComments(testData.comments.medical);
    
    // Step 6: Submit leave request
    await leaveModulePage.submitLeaveRequest();
    
    // Expected: Leave request should be submitted successfully
    const isSuccessful = await leaveModulePage.verifySuccessMessage();
    expect(isSuccessful).toBeTruthy();
  });

  test('[764-3] Cancel Leave Request @regression @priority-medium', async ({ page }) => {
    // Prerequisite: Apply for a leave first
    await leaveModulePage.navigateToLeaveModule();
    await leaveModulePage.clickApplyLeave();
    await leaveModulePage.selectLeaveType(testData.leaveTypes.annual);
    await leaveModulePage.enterFromDate(testData.dates.fromDate);
    await leaveModulePage.enterToDate(testData.dates.toDate);
    await leaveModulePage.enterComments(testData.comments.vacation);
    await leaveModulePage.submitLeaveRequest();
    await leaveModulePage.verifySuccessMessage();
    
    // Step 1: Navigate to Leave List
    await leaveModulePage.navigateToLeaveModule();
    
    // Step 2: Select a pending leave request
    // Step 3: Click on Cancel button
    await leaveModulePage.cancelLeaveRequest(testData.leaveTypes.annual);
    
    // Step 4: Confirm cancellation
    await leaveModulePage.confirmCancelLeave();
    
    // Expected: Leave request should be cancelled successfully
    const isSuccessful = await leaveModulePage.verifySuccessMessage();
    expect(isSuccessful).toBeTruthy();
  });

  test('[764-4] View Leave Balance @smoke @priority-high', async ({ page }) => {
    // Step 1: Navigate to Leave Module
    await leaveModulePage.navigateToLeaveModule();
    
    // Step 2: View Leave Balance section
    const isBalanceVisible = await leaveModulePage.viewLeaveBalance();
    
    // Expected: Leave balance should be displayed with available days for each leave type
    expect(isBalanceVisible).toBeTruthy();
  });
});