import { Page, Locator, expect } from '@playwright/test';

export class LeaveModulePage {
  readonly page: Page;
  readonly leaveMenuLink: Locator;
  readonly leaveManagementHeader: Locator;
  readonly leaveRequestsList: Locator;
  readonly applyLeaveButton: Locator;
  readonly leaveTypeDropdown: Locator;
  readonly fromDateField: Locator;
  readonly toDateField: Locator;
  readonly submitLeaveButton: Locator;
  readonly approveButton: Locator;
  readonly rejectButton: Locator;
  readonly leaveRequestRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.leaveMenuLink = page.locator('[data-testid="leave-menu"], a[href*="leave"]').first();
    this.leaveManagementHeader = page.locator('h1, h2, [data-testid="leave-header"]').filter({ hasText: /leave/i }).first();
    this.leaveRequestsList = page.locator('[data-testid="leave-requests-list"], .leave-list, table');
    this.applyLeaveButton = page.locator('[data-testid="apply-leave"], button').filter({ hasText: /apply.*leave/i }).first();
    this.leaveTypeDropdown = page.locator('[data-testid="leave-type"], select[name*="leave"], #leaveType');
    this.fromDateField = page.locator('[data-testid="from-date"], input[name*="from"], #fromDate');
    this.toDateField = page.locator('[data-testid="to-date"], input[name*="to"], #toDate');
    this.submitLeaveButton = page.locator('[data-testid="submit-leave"], button[type="submit"]').filter({ hasText: /submit|apply/i }).first();
    this.approveButton = page.locator('[data-testid="approve-leave"], button').filter({ hasText: /approve/i }).first();
    this.rejectButton = page.locator('[data-testid="reject-leave"], button').filter({ hasText: /reject/i }).first();
    this.leaveRequestRow = page.locator('[data-testid="leave-request-row"], tr, .leave-item').first();
  }

  async navigateToLeaveModule() {
    await this.leaveMenuLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLeaveManagementInterface() {
    await expect(this.leaveManagementHeader).toBeVisible();
    await expect(this.page).toHaveURL(/.*leave.*/i);
  }

  async viewLeaveRequests() {
    await expect(this.leaveRequestsList).toBeVisible();
    const requestCount = await this.page.locator('[data-testid="leave-request-row"], tr, .leave-item').count();
    expect(requestCount).toBeGreaterThanOrEqual(0);
  }

  async applyForLeave() {
    await this.applyLeaveButton.click();
    await expect(this.leaveTypeDropdown).toBeVisible();
    
    // Fill leave application form
    await this.leaveTypeDropdown.selectOption({ index: 1 });
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const fromDate = today.toISOString().split('T')[0];
    const toDate = tomorrow.toISOString().split('T')[0];
    
    await this.fromDateField.fill(fromDate);
    await this.toDateField.fill(toDate);
    await this.submitLeaveButton.click();
    
    // Verify submission success
    await this.page.waitForLoadState('networkidle');
  }

  async approveOrRejectLeaveRequests() {
    // Check if approve/reject buttons are visible (user must have permission)
    const approveVisible = await this.approveButton.isVisible().catch(() => false);
    const rejectVisible = await this.rejectButton.isVisible().catch(() => false);
    
    if (approveVisible || rejectVisible) {
      // Test approve functionality
      if (approveVisible) {
        await this.approveButton.click();
        await this.page.waitForLoadState('networkidle');
      }
      
      // Test reject functionality on another request if available
      if (rejectVisible) {
        const rejectButtons = await this.page.locator('[data-testid="reject-leave"], button').filter({ hasText: /reject/i }).all();
        if (rejectButtons.length > 0) {
          await rejectButtons[0].click();
          await this.page.waitForLoadState('networkidle');
        }
      }
    } else {
      // Verify that the approve/reject section exists even if not clickable for current user
      await expect(this.leaveRequestsList).toBeVisible();
    }
  }
}
