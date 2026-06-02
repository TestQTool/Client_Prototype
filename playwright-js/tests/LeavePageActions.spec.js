const { test, expect } = require('@playwright/test');
const { LeavePageActionsPage } = require('../pageObjects/LeavePageActions');

test.describe("LeavePageActions", () => {
  test("Leave Module", async ({ page }) => {
    const LeavePageActionsPage = new LeavePageActionsPage(page);
    await page.goto('/');
});