const { expect } = require('@playwright/test');

class LeavePage {
  constructor(page) {
    this.page = page;
    
    // Navigation elements
    this.leaveMenuLink = page.locator('a[href*="leave"], span:has-text("Leave")');
    this.applyLeaveTab = page.locator('a:has-text("Apply"), button:has-text("Apply Leave")');
    this.myLeaveTab = page.locator('a:has-text("My Leave")');
    this.leaveListTab = page.locator('a:has-text("Leave List")');
    this.assignLeaveTab = page.locator('a:has-text("Assign Leave")');
    
    // Apply Leave Form elements
    this.leaveTypeDropdown = page.locator('select[name*="leaveType"], [data-testid="leave-type"]');
    this.fromDateInput = page.locator('input[name*="fromDate"], [data-testid="from-date"]');
    this.toDateInput = page.locator('input[name*="toDate"], [data-testid="to-date"]');
    this.partialDaysDropdown = page.locator('select[name*="partialDays"], [data-testid="partial-days"]');
    this.durationDropdown = page.locator('select[name*="duration"], [data-testid="duration"]');
    this.commentsTextarea = page.locator('textarea[name*="comment"], [data-testid="comments"]');
    this.applyButton = page.locator('button[type="submit"]:has-text("Apply"), input[type="submit"]');
    this.cancelButton = page.locator('button:has-text("Cancel")');
    
    // Leave Balance elements
    this.leaveBalanceSection = page.locator('[class*="leave-balance"], [data-testid="leave-balance"]');
    this.leaveBalanceValue = page.locator('[class*="balance-value"], [data-testid="balance-value"]');
    
    // Leave List/Table elements
    this.leaveTable = page.locator('table[class*="leave"], [data-testid="leave-table"]');
    this.leaveTableRows = page.locator('table tbody tr');
    this.leaveStatusColumn = page.locator('td[class*="status"], [data-testid="leave-status"]');
    
    // Filter elements
    this.fromDateFilter = page.locator('input[name*="filterFromDate"], [data-testid="filter-from-date"]');
    this.toDateFilter = page.locator('input[name*="filterToDate"], [data-testid="filter-to-date"]');
    this.statusFilter = page.locator('select[name*="status"], [data-testid="status-filter"]');
    this.searchButton = page.locator('button:has-text("Search"), input[type="submit"]:has-text("Search")');
    this.resetButton = page.locator('button:has-text("Reset")');
    
    // Action buttons
    this.viewLeaveButton = page.locator('button:has-text("View"), a:has-text("View")');
    this.cancelLeaveButton = page.locator('button:has-text("Cancel Leave")');
    
    // Messages
    this.successMessage = page.locator('[class*="success"], [data-testid="success-message"]');
    this.errorMessage = page.locator('[class*="error"], [data-testid="error-message"]');
    this.validationMessage = page.locator('[class*="validation"], .oxd-input-field-error-message');
  }

  async navigateToLeaveModule() {
    await this.leaveMenuLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToApplyLeave() {
    await this.navigateToLeaveModule();
    await this.applyLeaveTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToMyLeave() {
    await this.navigateToLeaveModule();
    await this.myLeaveTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToLeaveList() {
    await this.navigateToLeaveModule();
    await this.leaveListTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectLeaveType(leaveType) {
    await this.leaveTypeDropdown.selectOption({ label: leaveType });
  }

  async enterFromDate(fromDate) {
    await this.fromDateInput.fill(fromDate);
  }

  async enterToDate(toDate) {
    await this.toDateInput.fill(toDate);
  }

  async selectPartialDays(partialDays) {
    if (partialDays) {
      await this.partialDaysDropdown.selectOption({ label: partialDays });
    }
  }

  async selectDuration(duration) {
    if (duration) {
      await this.durationDropdown.selectOption({ label: duration });
    }
  }

  async enterComments(comments) {
    if (comments) {
      await this.commentsTextarea.fill(comments);
    }
  }

  async clickApplyButton() {
    await this.applyButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }

  async applyLeave(leaveData) {
    await this.selectLeaveType(leaveData.leaveType);
    await this.enterFromDate(leaveData.fromDate);
    await this.enterToDate(leaveData.toDate);
    await this.selectPartialDays(leaveData.partialDays);
    await this.selectDuration(leaveData.duration);
    await this.enterComments(leaveData.comments);
    await this.clickApplyButton();
  }

  async getLeaveBalance() {
    return await this.leaveBalanceValue.textContent();
  }

  async filterLeaveList(filterData) {
    if (filterData.fromDate) {
      await this.fromDateFilter.fill(filterData.fromDate);
    }
    if (filterData.toDate) {
      await this.toDateFilter.fill(filterData.toDate);
    }
    if (filterData.status) {
      await this.statusFilter.selectOption({ label: filterData.status });
    }
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async resetFilters() {
    await this.resetButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getLeaveTableRowCount() {
    return await this.leaveTableRows.count();
  }

  async getLeaveStatus(rowIndex) {
    const row = this.leaveTableRows.nth(rowIndex);
    return await row.locator('td').nth(5).textContent();
  }

  async cancelLeaveByIndex(rowIndex) {
    const row = this.leaveTableRows.nth(rowIndex);
    await row.locator('button:has-text("Cancel")').click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifySuccessMessage(expectedMessage) {
    await expect(this.successMessage).toContainText(expectedMessage);
  }

  async verifyErrorMessage(expectedMessage) {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  async verifyValidationMessage(expectedMessage) {
    await expect(this.validationMessage).toContainText(expectedMessage);
  }

  async isLeaveTableDisplayed() {
    return await this.leaveTable.isVisible();
  }

  async verifyLeaveAppliedSuccessfully() {
    await expect(this.successMessage).toBeVisible();
  }
}

module.exports = { LeavePage };
