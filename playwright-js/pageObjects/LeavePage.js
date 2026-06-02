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
export const durationDropdown = 'select[name="duration"]';
export const commentsTextarea = 'textarea[name="comments"]';
export const submitLeaveButton = 'button[type="submit"]:has-text("Apply")';
export const cancelLeaveButton = 'button:has-text("Cancel")';

// ── Leave Balance ───────────────────────────────────────────────────────────
export const leaveBalanceSection = '[data-testid="leave-balance"]';
export const annualLeaveBalance = '[data-testid="annual-leave-balance"]';
export const sickLeaveBalance = '[data-testid="sick-leave-balance"]';

// ── Leave List/History ──────────────────────────────────────────────────────
export const leaveListTable = 'table[data-testid="leave-list"]';
export const leaveListRows = 'table[data-testid="leave-list"] tbody tr';
export const leaveStatusBadge = '[data-testid="leave-status"]';
export const viewLeaveButton = 'button:has-text("View")';
export const editLeaveButton = 'button:has-text("Edit")';
export const deleteLeaveButton = 'button:has-text("Delete")';

// ── Apply Leave Tab ─────────────────────────────────────────────────────────
export const applyLeaveTab = '[data-testid="apply-leave-tab"]';
export const myLeaveTab = '[data-testid="my-leave-tab"]';
export const entitlementsTab = '[data-testid="entitlements-tab"]';

// ── Notifications/Messages ──────────────────────────────────────────────────
export const successMessage = '.toast-success, [data-testid="success-message"]';
export const errorMessage = '.toast-error, [data-testid="error-message"]';
export const confirmationModal = '[data-testid="confirmation-modal"]';
export const confirmYesButton = 'button:has-text("Yes")';
export const confirmNoButton = 'button:has-text("No")';

// ── UNVERIFIED — update after exploration ───────────────────────────────────
// TODO: verify selector against live app
export const leaveCalendarView = '[data-testid="leave-calendar"]';
export const teamLeaveSection = '[data-testid="team-leave"]';
