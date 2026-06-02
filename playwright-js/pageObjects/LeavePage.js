// pageObjects/LeavePage.js
// Selectors for Leave Module — Qentrix Application
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Navigation ──────────────────────────────────────────────────────────────
export const leaveMenuLink = '[data-testid="leave-menu"]';
export const leaveNavItem = 'a[href*="leave"]';
export const leaveModuleHeader = 'h1:has-text("Leave")';

// ── Leave Request Form ──────────────────────────────────────────────────────
export const leaveTypeDropdown = 'select[name="leaveType"]';
export const startDateInput = 'input[name="startDate"]';
export const endDateInput = 'input[name="endDate"]';
export const leaveReasonTextarea = 'textarea[name="reason"]';
export const submitLeaveButton = 'button[type="submit"]:has-text("Submit")';
export const cancelLeaveButton = 'button[type="button"]:has-text("Cancel")';

// ── Leave Balance ───────────────────────────────────────────────────────────
export const leaveBalanceSection = '[data-testid="leave-balance"]';
export const annualLeaveBalance = '[data-testid="annual-leave-balance"]';
export const sickLeaveBalance = '[data-testid="sick-leave-balance"]';
export const casualLeaveBalance = '[data-testid="casual-leave-balance"]';

// ── Leave List/Table ────────────────────────────────────────────────────────
export const leaveTable = 'table[data-testid="leave-table"]';
export const leaveTableRows = 'table[data-testid="leave-table"] tbody tr';
export const leaveStatusColumn = 'td[data-column="status"]';
export const leaveActionsColumn = 'td[data-column="actions"]';
export const viewLeaveButton = 'button:has-text("View")';
export const editLeaveButton = 'button:has-text("Edit")';
export const deleteLeaveButton = 'button:has-text("Delete")';

// ── Filters ─────────────────────────────────────────────────────────────────
export const filterByStatusDropdown = 'select[name="filterStatus"]';
export const filterByTypeDropdown = 'select[name="filterType"]';
export const filterDateRangeStart = 'input[name="filterStartDate"]';
export const filterDateRangeEnd = 'input[name="filterEndDate"]';
export const applyFilterButton = 'button:has-text("Apply")';
export const clearFilterButton = 'button:has-text("Clear")';

// ── Leave Approval (Manager View) ──────────────────────────────────────────
export const pendingLeavesTab = '[data-testid="pending-leaves-tab"]';
export const approveLeaveButton = 'button:has-text("Approve")';
export const rejectLeaveButton = 'button:has-text("Reject")';
export const approvalCommentsTextarea = 'textarea[name="approvalComments"]';
export const confirmApprovalButton = 'button:has-text("Confirm")';

// ── Notifications/Messages ──────────────────────────────────────────────────
export const successMessage = '[data-testid="success-message"]';
export const errorMessage = '[data-testid="error-message"]';
export const warningMessage = '[data-testid="warning-message"]';

// ── Modal/Dialog ────────────────────────────────────────────────────────────
export const leaveDetailsModal = '[data-testid="leave-details-modal"]';
export const confirmDeleteModal = '[data-testid="confirm-delete-modal"]';
export const confirmDeleteYesButton = 'button:has-text("Yes")';
export const confirmDeleteNoButton = 'button:has-text("No")';
export const modalCloseButton = 'button[aria-label="Close"]';

// ── UNVERIFIED — update after exploration ───────────────────────────────────
// TODO: verify selector against live app
export const leaveCalendarView = '[data-testid="leave-calendar"]';
export const exportLeavesButton = 'button:has-text("Export")';
export const printLeavesButton = 'button:has-text("Print")';
