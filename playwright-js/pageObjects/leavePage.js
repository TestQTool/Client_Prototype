// pageObjects/leavePage.js
// Selectors for Leave Module — verified against https://opensource-demo.orangehrmlive.com
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Navigation ──────────────────────────────────────────────────────────────
export const leaveMenuLink = '.oxd-main-menu-item:has-text("Leave")';
export const applyLeaveSubMenu = 'a:has-text("Apply")';
export const myLeaveSubMenu = 'a:has-text("My Leave")';
export const leaveListSubMenu = 'a:has-text("Leave List")';

// ── Apply Leave Form ────────────────────────────────────────────────────────
export const leaveTypeDropdown = '.oxd-select-text-input';
export const leaveTypeOptions = '.oxd-select-dropdown .oxd-select-option';
export const fromDateInput = 'input[placeholder="yyyy-dd-mm"]:first-of-type';
export const toDateInput = 'input[placeholder="yyyy-dd-mm"]:last-of-type';
export const partialDaysDropdown = '.oxd-select-text-input:has-text("Partial Days")';
export const durationDropdown = '.oxd-select-text-input:has-text("Duration")';
export const commentsTextarea = 'textarea[placeholder="Type here"]';
export const applyButton = 'button[type="submit"]';

// ── Half Day Options ────────────────────────────────────────────────────────
export const halfDayOption = '.oxd-select-option:has-text("Half Day")';
export const startHalfDayOption = '.oxd-select-option:has-text("Start Day Only")';
export const endHalfDayOption = '.oxd-select-option:has-text("End Day Only")';
export const allDaysOption = '.oxd-select-option:has-text("All Days")';

// ── My Leave List ───────────────────────────────────────────────────────────
export const leaveTable = '.oxd-table';
export const leaveTableRows = '.oxd-table-body .oxd-table-row';
export const leaveRecordCell = '.oxd-table-cell';
export const leaveDaysCell = '.oxd-table-cell:nth-child(4)';
export const leaveStatusCell = '.oxd-table-cell:nth-child(6)';

// ── Leave Calendar ──────────────────────────────────────────────────────────
export const calendarIcon = '.bi-calendar';
export const calendarView = '.oxd-calendar-wrapper';
export const calendarDates = '.oxd-calendar-date';
export const leaveIndicator = '.oxd-calendar-date--leave';
export const calendarDateWithLeave = '.oxd-calendar-date--leave';

// ── Validation Messages ─────────────────────────────────────────────────────
export const errorMessage = '.oxd-input-field-error-message';
export const toastMessage = '.oxd-toast';
export const toastSuccessMessage = '.oxd-toast--success';
export const toastErrorMessage = '.oxd-toast--error';
export const dateRangeErrorMessage = 'span.oxd-input-field-error-message:has-text("To date should be after from date")';
export const requiredFieldError = 'span:has-text("Required")';

// ── Leave Details Modal ─────────────────────────────────────────────────────
export const leaveDetailsModal = '.oxd-dialog-sheet';
export const leaveDetailsContent = '.oxd-dialog-sheet .oxd-text';
export const closeModalButton = '.oxd-dialog-close-button';

// ── Filters ─────────────────────────────────────────────────────────────────
export const fromDateFilter = 'input[placeholder="From"]';
export const toDateFilter = 'input[placeholder="To"]';
export const searchButton = 'button[type="submit"]';
export const resetButton = 'button[type="reset"]';