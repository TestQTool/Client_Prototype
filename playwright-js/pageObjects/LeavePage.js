// pageObjects/LeavePage.js
// Selectors for Leave Module — Qentrix Application
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Navigation ──────────────────────────────────────────────────────────────
export const leaveMenuLink = '[data-testid="leave-menu"]';
export const leaveNavItem = 'a[href*="leave"]';
export const sidebarLeaveOption = '.sidebar-menu >> text=Leave';

// ── Leave Dashboard ─────────────────────────────────────────────────────────
export const leaveDashboardHeader = 'h1:has-text("Leave")';
export const leaveBalanceSection = '[data-testid="leave-balance"]';
export const leaveBalanceCard = '.leave-balance-card';
export const availableLeaveCount = '[data-testid="available-leave"]';
export const usedLeaveCount = '[data-testid="used-leave"]';
export const pendingLeaveCount = '[data-testid="pending-leave"]';

// ── Apply Leave Form ────────────────────────────────────────────────────────
export const applyLeaveButton = 'button:has-text("Apply Leave")';
export const leaveTypeDropdown = 'select[name="leaveType"]';
export const leaveTypeSelect = '[data-testid="leave-type-select"]';
export const startDateInput = 'input[name="startDate"]';
export const endDateInput = 'input[name="endDate"]';
export const leaveReasonTextarea = 'textarea[name="reason"]';
export const leaveCommentsInput = 'input[name="comments"]';
export const submitLeaveButton = 'button[type="submit"]:has-text("Submit")';
export const cancelLeaveButton = 'button:has-text("Cancel")';
export const halfDayCheckbox = 'input[name="halfDay"]';
export const halfDayToggle = '[data-testid="half-day-toggle"]';

// ── Leave List / History ────────────────────────────────────────────────────
export const leaveListTable = 'table[data-testid="leave-list"]';
export const leaveListTableBody = 'table[data-testid="leave-list"] tbody';
export const leaveListRows = 'table[data-testid="leave-list"] tbody tr';
export const leaveStatusColumn = 'td[data-column="status"]';
export const leaveTypeColumn = 'td[data-column="type"]';
export const leaveDateColumn = 'td[data-column="date"]';
export const leaveActionsColumn = 'td[data-column="actions"]';
export const viewLeaveDetailsButton = 'button:has-text("View")';
export const editLeaveButton = 'button:has-text("Edit")';
export const deleteLeaveButton = 'button:has-text("Delete")';
export const withdrawLeaveButton = 'button:has-text("Withdraw")';

// ── Leave Status Badges ─────────────────────────────────────────────────────
export const pendingStatusBadge = '.status-badge.pending';
export const approvedStatusBadge = '.status-badge.approved';
export const rejectedStatusBadge = '.status-badge.rejected';
export const cancelledStatusBadge = '.status-badge.cancelled';

// ── Leave Approval Section (Manager View) ───────────────────────────────────
export const pendingApprovalsTab = '[data-testid="pending-approvals-tab"]';
export const approveLeaveButton = 'button:has-text("Approve")';
export const rejectLeaveButton = 'button:has-text("Reject")';
export const approvalCommentsInput = 'textarea[name="approvalComments"]';
export const confirmApprovalButton = 'button:has-text("Confirm")';

// ── Leave Calendar ──────────────────────────────────────────────────────────
export const leaveCalendarView = '[data-testid="leave-calendar"]';
export const calendarMonthSelector = 'select[name="calendarMonth"]';
export const calendarYearSelector = 'select[name="calendarYear"]';
export const calendarDayCell = '.calendar-day';
export const calendarLeaveIndicator = '.calendar-leave-marker';

// ── Filters and Search ──────────────────────────────────────────────────────
export const leaveStatusFilter = 'select[name="statusFilter"]';
export const leaveTypeFilter = 'select[name="typeFilter"]';
export const dateRangeFilter = '[data-testid="date-range-filter"]';
export const searchLeaveInput = 'input[placeholder*="Search"]';
export const applyFiltersButton = 'button:has-text("Apply Filters")';
export const clearFiltersButton = 'button:has-text("Clear")';

// ── Notifications and Messages ──────────────────────────────────────────────
export const successMessage = '.toast-success, .alert-success';
export const errorMessage = '.toast-error, .alert-danger';
export const warningMessage = '.toast-warning, .alert-warning';
export const confirmationModal = '[data-testid="confirmation-modal"]';
export const modalConfirmButton = '.modal button:has-text("Confirm")';
export const modalCancelButton = '.modal button:has-text("Cancel")';

// ── Pagination ──────────────────────────────────────────────────────────────
export const paginationContainer = '.pagination';
export const nextPageButton = 'button[aria-label="Next page"]';
export const previousPageButton = 'button[aria-label="Previous page"]';
export const pageNumberButtons = '.pagination button[data-page]';

// ── UNVERIFIED — update after exploration ───────────────────────────────────
// TODO: verify selector against live app
export const leaveEntitlementSection = '[data-testid="leave-entitlement"]';
export const teamLeaveView = '[data-testid="team-leave-view"]';
export const exportLeaveButton = 'button:has-text("Export")';
