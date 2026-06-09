// pageObjects/leavePage.js
// Selectors for Leave Module — OrangeHRM 5.7
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Navigation ──────────────────────────────────────────────────────────────
export const leaveMenuLink = '.oxd-main-menu-item:has-text("Leave")';
export const dashboardLink = '.oxd-main-menu-item:has-text("Dashboard")';

// ── Leave Actions (Top Menu) ────────────────────────────────────────────────
export const applyLeaveBtn = 'a:has-text("Apply")';
export const myLeaveBtn = 'a:has-text("My Leave")';
export const leaveListBtn = 'a:has-text("Leave List")';
export const assignLeaveBtn = 'a:has-text("Assign Leave")';

// ── Apply Leave Form ────────────────────────────────────────────────────────
export const leaveTypeDropdown = '.oxd-select-text--active';
export const leaveTypeOptions = '.oxd-select-dropdown .oxd-select-option';
export const fromDateInput = 'input[placeholder="yyyy-dd-mm"]:first-of-type';
export const toDateInput = 'input[placeholder="yyyy-dd-mm"]:nth-of-type(2)';
export const commentsTextarea = 'textarea[placeholder="Type comment here"]';
export const submitLeaveBtn = 'button[type="submit"]:has-text("Apply")';

// ── My Leave Page ───────────────────────────────────────────────────────────
export const leaveRecordsTable = '.oxd-table-body';
export const leaveTableRows = '.oxd-table-body .oxd-table-row';
export const noRecordsMessage = '.oxd-table-card .orangehrm-horizontal-padding span';
export const cancelLeaveBtn = 'button.oxd-button--label:has-text("Cancel")';

// ── Leave List (Search/Filter) ──────────────────────────────────────────────
export const fromDateFilter = '.oxd-date-input input:first-of-type';
export const toDateFilter = '.oxd-date-input input:nth-of-type(2)';
export const leaveStatusDropdown = '.oxd-select-text';
export const employeeNameInput = 'input[placeholder="Type for hints..."]';
export const searchBtn = 'button[type="submit"]:has-text("Search")';
export const resetBtn = 'button[type="reset"]:has-text("Reset")';

// ── Leave Status Labels ─────────────────────────────────────────────────────
export const statusPending = '.oxd-chip--pending';
export const statusApproved = '.oxd-chip--approved';
export const statusRejected = '.oxd-chip--rejected';
export const statusCancelled = '.oxd-chip--cancelled';

// ── Validation / Messages ───────────────────────────────────────────────────
export const successToast = '.oxd-toast--success';
export const errorToast = '.oxd-toast--error';
export const requiredFieldError = 'span.oxd-input-field-error-message';
export const pageTitle = '.oxd-topbar-header-title h6';

// ── Leave Balance Widget ────────────────────────────────────────────────────
export const leaveBalanceCard = '.orangehrm-leave-balance-text';
export const leaveBalanceValue = '.orangehrm-leave-balance-text span';
