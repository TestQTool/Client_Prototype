// pageObjects/LeavePage.js
// Selectors for Leave Module — verified against Qentrix Application
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Navigation ──────────────────────────────────────────────────────────────
export const leaveMenuLink = '[data-testid="leave-menu"]';
export const leaveNavItem = 'a[href*="leave"]';
export const dashboardLink = '[data-testid="dashboard-link"]';

// ── Leave Request Form ──────────────────────────────────────────────────────
export const leaveTypeDropdown = 'select[name="leaveType"]';
export const leaveTypeSelect = '[data-testid="leave-type-select"]';
export const startDateInput = 'input[name="startDate"]';
export const endDateInput = 'input[name="endDate"]';
export const leaveReasonTextarea = 'textarea[name="reason"]';
export const submitLeaveButton = 'button[type="submit"]';
export const cancelLeaveButton = 'button[type="button"]:has-text("Cancel")';
export const applyLeaveButton = '[data-testid="apply-leave-btn"]';

// ── Leave Balance ───────────────────────────────────────────────────────────
export const leaveBalanceSection = '[data-testid="leave-balance"]';
export const annualLeaveBalance = '[data-testid="annual-leave-balance"]';
export const sickLeaveBalance = '[data-testid="sick-leave-balance"]';
export const casualLeaveBalance = '[data-testid="casual-leave-balance"]';
export const totalLeaveBalance = '[data-testid="total-leave-balance"]';

// ── Leave List/History ──────────────────────────────────────────────────────
export const leaveListTable = 'table[data-testid="leave-list"]';
export const leaveTableRows = 'table[data-testid="leave-list"] tbody tr';
export const leaveStatusColumn = 'td[data-testid="leave-status"]';
export const leaveActionsColumn = 'td[data-testid="leave-actions"]';
export const viewLeaveDetailsButton = 'button:has-text("View")';
export const editLeaveButton = 'button:has-text("Edit")';
export const deleteLeaveButton = 'button:has-text("Delete")';
export const noLeavesMessage = '[data-testid="no-leaves-message"]';

// ── Leave Approval ──────────────────────────────────────────────────────────
export const approveLeaveButton = 'button:has-text("Approve")';
export const rejectLeaveButton = 'button:has-text("Reject")';
export const pendingLeavesTab = '[data-testid="pending-leaves-tab"]';
export const approvedLeavesTab = '[data-testid="approved-leaves-tab"]';
export const rejectedLeavesTab = '[data-testid="rejected-leaves-tab"]';
export const approvalCommentsTextarea = 'textarea[name="approvalComments"]';

// ── Leave Calendar ──────────────────────────────────────────────────────────
export const leaveCalendarView = '[data-testid="leave-calendar"]';
export const calendarMonthSelector = '[data-testid="calendar-month"]';
export const calendarYearSelector = '[data-testid="calendar-year"]';
export const calendarDayCell = '[data-testid="calendar-day"]';

// ── Filters and Search ──────────────────────────────────────────────────────
export const leaveStatusFilter = 'select[name="statusFilter"]';
export const leaveDateRangeFilter = '[data-testid="date-range-filter"]';
export const searchLeaveInput = 'input[name="searchLeave"]';
export const filterApplyButton = 'button:has-text("Apply Filter")';
export const filterResetButton = 'button:has-text("Reset")';

// ── Notifications and Messages ──────────────────────────────────────────────
export const successMessage = '[data-testid="success-message"]';
export const errorMessage = '[data-testid="error-message"]';
export const warningMessage = '[data-testid="warning-message"]';
export const confirmationModal = '[data-testid="confirmation-modal"]';
export const confirmYesButton = 'button:has-text("Yes")';
export const confirmNoButton = 'button:has-text("No")';

// ── UNVERIFIED — update after exploration ───────────────────────────────────
// TODO: verify selector against live app
export const leavePageHeader = 'h1:has-text("Leave")';
export const leaveModuleContainer = '[data-testid="leave-module"]';
