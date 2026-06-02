// pageObjects/LeavePage.js
// Selectors for Leave Module — Qentrix Application
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Navigation ──────────────────────────────────────────────────────────────
export const leaveMenuLink = '[data-testid="leave-menu"]';
export const leaveNavItem = 'a[href*="leave"]';
export const leaveSidebarItem = '.sidebar-menu >> text=Leave';

// ── Leave Dashboard ─────────────────────────────────────────────────────────
export const leaveDashboardHeader = 'h1:has-text("Leave")';
export const leaveBalanceSection = '[data-testid="leave-balance"]';
export const leaveBalanceCard = '.leave-balance-card';
export const pendingLeaveCount = '[data-testid="pending-leave-count"]';
export const approvedLeaveCount = '[data-testid="approved-leave-count"]';
export const rejectedLeaveCount = '[data-testid="rejected-leave-count"]';

// ── Apply Leave Form ────────────────────────────────────────────────────────
export const applyLeaveButton = 'button:has-text("Apply Leave")';
export const leaveTypeDropdown = 'select[name="leaveType"]';
export const leaveTypeInput = '[data-testid="leave-type-select"]';
export const fromDateInput = 'input[name="fromDate"]';
export const toDateInput = 'input[name="toDate"]';
export const leaveReasonTextarea = 'textarea[name="reason"]';
export const leaveReasonInput = '[data-testid="leave-reason"]';
export const submitLeaveButton = 'button[type="submit"]:has-text("Submit")';
export const cancelLeaveButton = 'button:has-text("Cancel")';

// ── Leave Type Options ──────────────────────────────────────────────────────
export const annualLeaveOption = 'option[value="annual"]';
export const sickLeaveOption = 'option[value="sick"]';
export const casualLeaveOption = 'option[value="casual"]';
export const maternityLeaveOption = 'option[value="maternity"]';
export const paternityLeaveOption = 'option[value="paternity"]';

// ── Leave List/Table ────────────────────────────────────────────────────────
export const leaveListTable = 'table[data-testid="leave-list"]';
export const leaveTableRows = 'table[data-testid="leave-list"] tbody tr';
export const leaveStatusColumn = 'td[data-column="status"]';
export const leaveActionsColumn = 'td[data-column="actions"]';
export const viewLeaveButton = 'button:has-text("View")';
export const editLeaveButton = 'button:has-text("Edit")';
export const deleteLeaveButton = 'button:has-text("Delete")';
export const cancelLeaveRequestButton = 'button:has-text("Cancel Request")';

// ── Leave Filters ───────────────────────────────────────────────────────────
export const leaveStatusFilter = 'select[name="statusFilter"]';
export const leaveTypeFilter = 'select[name="typeFilter"]';
export const leaveDateRangeFilter = '[data-testid="date-range-filter"]';
export const filterApplyButton = 'button:has-text("Apply Filter")';
export const filterResetButton = 'button:has-text("Reset")';

// ── Leave Approval (Manager View) ──────────────────────────────────────────
export const pendingApprovalsTab = '[data-testid="pending-approvals-tab"]';
export const approveLeaveButton = 'button:has-text("Approve")';
export const rejectLeaveButton = 'button:has-text("Reject")';
export const approvalCommentsInput = 'textarea[name="approvalComments"]';
export const confirmApprovalButton = 'button:has-text("Confirm")';

// ── Leave Details Modal ─────────────────────────────────────────────────────
export const leaveDetailsModal = '[data-testid="leave-details-modal"]';
export const modalCloseButton = 'button[aria-label="Close"]';
export const leaveDetailStatus = '[data-testid="leave-detail-status"]';
export const leaveDetailType = '[data-testid="leave-detail-type"]';
export const leaveDetailDates = '[data-testid="leave-detail-dates"]';

// ── Notifications/Messages ──────────────────────────────────────────────────
export const successMessage = '.alert-success';
export const errorMessage = '.alert-error';
export const warningMessage = '.alert-warning';
export const toastNotification = '[data-testid="toast-notification"]';

// ── UNVERIFIED — update after exploration ───────────────────────────────────
// TODO: verify selector against live app
export const leaveCalendarView = '[data-testid="leave-calendar"]';
export const holidayListLink = 'a:has-text("Holiday List")';
export const leaveHistoryTab = '[data-testid="leave-history-tab"]';
