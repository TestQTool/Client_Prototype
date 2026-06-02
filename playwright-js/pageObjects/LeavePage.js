// pageObjects/LeavePage.js
// Selectors for Leave Module — verified against OrangeHRM Demo
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Navigation ──────────────────────────────────────────────────────────────
export const leaveMenuLink = 'a[href*="/leave/viewLeaveList"]';
export const applyLeaveMenuLink = 'a[href*="/leave/applyLeave"]';
export const myLeaveMenuLink = 'a[href*="/leave/viewMyLeaveList"]';
export const leaveListMenuLink = 'a[href*="/leave/viewLeaveList"]';

// ── Login Page ──────────────────────────────────────────────────────────────
export const usernameInput = 'input[name="username"]';
export const passwordInput = 'input[name="password"]';
export const loginButton = 'button[type="submit"]';

// ── Apply Leave Form ────────────────────────────────────────────────────────
export const leaveTypeDropdown = '.oxd-select-text';
export const leaveTypeDropdownOptions = '.oxd-select-option';
export const fromDateInput = 'input[placeholder="yyyy-dd-mm"]';
export const toDateInput = '(//input[contains(@placeholder,"yyyy")])[2]';
export const fromDatePicker = '.oxd-date-input:first-of-type input';
export const toDatePicker = '.oxd-date-input:last-of-type input';
export const partialDaysDropdown = '.oxd-select-wrapper:nth-of-type(2) .oxd-select-text';
export const halfDayCheckbox = 'input[type="checkbox"]';
export const halfDayToggle = '.oxd-switch-input';
export const durationDropdown = '.oxd-select-text--after';
export const commentsTextarea = 'textarea[placeholder="Type here"]';
export const reasonTextarea = 'textarea';
export const applyButton = 'button[type="submit"]';
export const cancelButton = 'button[type="button"]';

// ── Leave List / History ────────────────────────────────────────────────────
export const leaveHistoryTab = 'a:has-text("Leave List")';
export const myLeaveRequestsTab = 'a:has-text("My Leave")';
export const pendingApprovalsTab = 'a:has-text("Leave List")';
export const leaveRequestsTable = '.oxd-table';
export const leaveRequestRows = '.oxd-table-card';
export const leaveStatusCell = '.oxd-table-cell:nth-child(6)';
export const leaveDateCell = '.oxd-table-cell:nth-child(2)';
export const leaveTypeCell = '.oxd-table-cell:nth-child(3)';
export const leaveActionButtons = '.oxd-table-cell-actions';
export const cancelLeaveButton = 'button:has-text("Cancel")';
export const approveLeaveButton = 'button:has-text("Approve")';
export const rejectLeaveButton = 'button:has-text("Reject")';

// ── Leave Balance ───────────────────────────────────────────────────────────
export const leaveBalanceWidget = '.oxd-grid-item';
export const leaveBalanceValue = '.oxd-text--subtitle-1';

// ── Calendar ────────────────────────────────────────────────────────────────
export const leaveCalendarView = '.oxd-calendar-wrapper';
export const calendarDateCell = '.oxd-calendar-date';
export const calendarLeaveIndicator = '.oxd-calendar-event';

// ── Validation & Messages ───────────────────────────────────────────────────
export const validationError = '.oxd-input-field-error-message';
export const formError = '.oxd-form-error';
export const toastMessage = '.oxd-toast';
export const toastSuccess = '.oxd-toast--success';
export const toastError = '.oxd-toast--error';
export const emptyStateMessage = '.oxd-text--subtitle-2';
export const noRecordsFoundMessage = '.oxd-text:has-text("No Records Found")';

// ── Confirmation Dialog ─────────────────────────────────────────────────────
export const confirmationDialog = '.oxd-dialog-container';
export const confirmYesButton = 'button:has-text("Yes, Delete")';
export const confirmNoButton = 'button:has-text("No, Cancel")';

// ── Filters ─────────────────────────────────────────────────────────────────
export const fromDateFilter = 'input[placeholder="From"]';
export const toDateFilter = 'input[placeholder="To"]';
export const statusFilter = '.oxd-select-text';
export const searchButton = 'button[type="submit"]';
export const resetButton = 'button[type="reset"]';
