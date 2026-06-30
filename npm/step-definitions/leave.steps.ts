import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LeaveModulePage } from '../pages/LeaveModulePage';

let leaveModulePage: LeaveModulePage;

Given('I am logged in to the application', async function () {
  const { page } = this;
  await page.goto('/');
  // Assume login is handled by framework hooks or existing authentication helper
});

When('I navigate to the Leave module', async function () {
  const { page } = this;
  leaveModulePage = new LeaveModulePage(page);
  await leaveModulePage.navigateToLeaveModule();
});

Then('I should see the Leave management interface', async function () {
  await leaveModulePage.verifyLeaveManagementInterface();
});

Then('I should be able to view leave requests', async function () {
  await leaveModulePage.viewLeaveRequests();
});

Then('I should be able to apply for leave', async function () {
  await leaveModulePage.applyForLeave();
});

Then('I should be able to approve or reject leave requests', async function () {
  await leaveModulePage.approveOrRejectLeaveRequests();
});
