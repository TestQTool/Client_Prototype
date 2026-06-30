class LeaveModulePage {
  constructor(page) {
    this.page = page;
    this.leaveMenuLink = page.locator('a[href*="leave"], text=Leave');
    this.applyLeaveButton = page.locator('button:has-text("Apply"), a:has-text("Apply")');
    this.leaveTypeDropdown = page.locator('select[name="leaveType"], [data-testid="leave-type"]');
    this.fromDateInput = page.locator('input[name="fromDate"], [type="date"]:first-of-type');
    this.toDateInput = page.locator('input[name="toDate"], [type="date"]:last-of-type');
    this.commentsTextarea = page.locator('textarea[name="comments"], textarea');
    this.submitButton = page.locator('button[type="submit"], button:has-text("Submit")');
    this.successMessage = page.locator('.success-message, .toast-success, text=successfully');
    this.leaveList = page.locator('.leave-list, [data-testid="leave-list"]');
    this.cancelLeaveButton = page.locator('button:has-text("Cancel"), a:has-text("Cancel")');
    this.confirmCancelButton = page.locator('button:has-text("Confirm"), button:has-text("Yes")');
    this.leaveBalanceSection = page.locator('.leave-balance, [data-testid="leave-balance"]');
  }

  async navigateToLeaveModule() {
    await this.leaveMenuLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickApplyLeave() {
    await this.applyLeaveButton.click();
  }

  async selectLeaveType(leaveType) {
    await this.leaveTypeDropdown.selectOption(leaveType);
  }

  async enterFromDate(date) {
    await this.fromDateInput.fill(date);
  }

  async enterToDate(date) {
    await this.toDateInput.fill(date);
  }

  async enterComments(comments) {
    await this.commentsTextarea.fill(comments);
  }

  async submitLeaveRequest() {
    await this.submitButton.click();
  }

  async verifySuccessMessage() {
    await this.successMessage.waitFor({ state: 'visible' });
    return await this.successMessage.isVisible();
  }

  async verifyLeaveInList(leaveType) {
    const leaveItem = this.page.locator(`text=${leaveType}`);
    return await leaveItem.isVisible();
  }

  async cancelLeaveRequest(leaveType) {
    const leaveRow = this.page.locator(`tr:has-text("${leaveType}")`);
    await leaveRow.locator(this.cancelLeaveButton).click();
  }

  async confirmCancelLeave() {
    await this.confirmCancelButton.click();
  }

  async viewLeaveBalance() {
    return await this.leaveBalanceSection.isVisible();
  }
}

module.exports = LeaveModulePage;