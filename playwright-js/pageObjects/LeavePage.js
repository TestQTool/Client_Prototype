// pageObjects/LeavePage.js
// Selectors for Leave Module — Qentrix Application
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Navigation ──────────────────────────────────────────────────────────────
export const leaveMenuLink = '[data-testid="leave-menu"]';
export const leaveModuleHeader = 'h1:has-text("Leave")';

// ── Leave Request Form ──────────────────────────────────────────────────────
export const leaveTypeDropdown = 'select[name="leaveType"]';
export const fromDateInput = 'input[name="fromDate"]';
export const toDateInput = 'input[name="toDate"]';
export const leaveReasonTextarea = 'textarea[name="reason"]';
export const submitLeaveButton = 'button[type="submit"]:has-text("Submit")';
export const cancelLeaveButton = 'button[type="button"]:has-text("Cancel")';

// ── Leave Balance ───────────────────────────────────────────────────────────
export const leaveBalanceSection = '[data-testid="leave-balance"]';
export const annualLeaveBalance = '[data-testid="annual-leave-balance"]';
export const sickLeaveBalance = '[data-testid="sick-leave-balance"]';
export const casualLeaveBalance = '[data-testid="casual-leave-balance"]';

// ── Leave List/Table ────────────────────────────────────────────────────────
export const leaveListTable = 'table[data-testid="leave-list"]';
export const leaveListRows = 'table[data-testid="leave-list"] tbody tr';
export const leaveStatusColumn = 'td[data-column="status"]';
export const leaveActionsColumn = 'td[data-column="actions"]';

// ── Leave Actions ───────────────────────────────────────────────────────────
export const applyLeaveButton = 'button:has-text("Apply Leave")';
export const viewLeaveDetailsButton = 'button[aria-label="View Details"]';
export const editLeaveButton = 'button[aria-label="Edit Leave"]';
export const deleteLeaveButton = 'button[aria-label="Delete Leave"]';
export const approveLeaveButton = 'button:has-text("Approve")';
export const rejectLeaveButton = 'button:has-text("Reject")';

// ── Leave Filters ───────────────────────────────────────────────────────────
export const filterByStatusDropdown = 'select[name="filterStatus"]';
export const filterByTypeDropdown = 'select[name="filterType"]';
export const filterByDateInput = 'input[name="filterDate"]';
export const applyFiltersButton = 'button:has-text("Apply Filters")';
export const clearFiltersButton = 'button:has-text("Clear Filters")';

// ── Notifications/Messages ──────────────────────────────────────────────────
export const successMessage = '[data-testid="success-message"]';
export const errorMessage = '[data-testid="error-message"]';
export const confirmationModal = '[data-testid="confirmation-modal"]';
export const confirmYesButton = 'button:has-text("Yes")';
export const confirmNoButton = 'button:has-text("No")';

// ── UNVERIFIED — update after exploration ───────────────────────────────────
// TODO: verify selector against live app
export const leaveCalendarView = '[data-testid="leave-calendar"]';
export const teamLeaveView = '[data-testid="team-leave"]';
