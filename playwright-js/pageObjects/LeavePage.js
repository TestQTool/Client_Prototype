// pageObjects/LeavePage.js
// Selectors for Leave Management — verified against https://opensource-demo.orangehrmlive.com
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Login Page ──────────────────────────────────────────────────────────────
export const usernameInput = 'input[name="username"]';
export const passwordInput = 'input[name="password"]';
export const loginButton = 'button[type="submit"]';

// ── Main Navigation ─────────────────────────────────────────────────────────
export const leaveMenuLink = 'a[href*="/leave/viewLeaveList"]';
export const dashboardHeader = '.oxd-topbar-header-breadcrumb';

// ── Leave Module Navigation ─────────────────────────────────────────────────
export const applyLeaveLink = 'a[href*="/leave/applyLeave"]';
export const myLeaveLink = 'a[href*="/leave/viewMyLeaveList"]';
export const leaveCalendarLink = 'a[href*="/leave/viewLeaveCalendar"]';
export const leaveListLink = 'a[href*="/leave/viewLeaveList"]';

// ── Apply Leave Form ────────────────────────────────────────────────────────
export const leaveTypeDropdown = '.oxd-select-text';
export const leaveTypeOptions = '.oxd-select-dropdown .oxd-select-option';
export const fromDateInput = 'input[placeholder="yyyy-mm-dd"]';
export const toDateInput = '(//input[@placeholder="yyyy-mm-dd"])[2]';
export const fromDateInputFirst = '.oxd-form-row:nth-child(2) input[placeholder="yyyy-mm-dd"]';
export const toDateInputSecond = '.oxd-form-row:nth-child(3) input[placeholder="yyyy-mm-dd"]';
export const halfDayCheckbox = '.oxd-checkbox-input';
export const halfDayLabel = 'label:has-text("Half Day")';
export const partialDaysDropdown = '.oxd-form-row:has-text("Partial Days") .oxd-select-text';
export const durationDropdown = '.oxd-form-row:has-text("Duration") .oxd-select-text';
export const commentsTextarea = 'textarea[placeholder="Type here"]';
export const applyButton = 'button[type="submit"]';
export const cancelButton = 'button[type="button"]:has-text("Cancel")';

// ── Date Picker ─────────────────────────────────────────────────────────────
export const datePickerContainer = '.oxd-date-input';
export const datePickerDays = '.oxd-calendar-date';
export const datePickerMonthYear = '.oxd-calendar-selector';
export const datePickerNextMonth = '.oxd-icon-button:has(.bi-chevron-right)';
export const datePickerPrevMonth = '.oxd-icon-button:has(.bi-chevron-left)';

// ── Validation Messages ─────────────────────────────────────────────────────
export const validationError = '.oxd-input-field-error-message';
export const formErrorMessage = '.oxd-form-row .oxd-input-field-error-message';
export const toastMessage = '.oxd-toast';
export const toastSuccess = '.oxd-toast--success';
export const toastError = '.oxd-toast--error';

// ── My Leave List ───────────────────────────────────────────────────────────
export const leaveListTable = '.oxd-table';
export const leaveListRows = '.oxd-table-body .oxd-table-row';
export const leaveListDateColumn = '.oxd-table-cell:nth-child(1)';
export const leaveListDaysColumn = '.oxd-table-cell:nth-child(4)';
export const leaveListStatusColumn = '.oxd-table-cell:nth-child(5)';
export const leaveRecordRow = '.oxd-table-card';
export const noRecordsMessage = '.oxd-toast:has-text("No Records Found")';

// ── Leave Calendar ──────────────────────────────────────────────────────────
export const leaveCalendarContainer = '.oxd-layout-context';
export const calendarView = '.orangehrm-leave-calendar';
export const calendarHeader = '.oxd-topbar-header-breadcrumb';
export const calendarMonthSelector = '.oxd-calendar-selector';
export const calendarDayCell = '.oxd-calendar-date';
export const calendarEventCell = '.orangehrm-leave-calendar-event';
export const calendarLegend = '.oxd-sheet--rounded';
export const employeeAutocomplete = 'input[placeholder="Type for hints..."]';
export const employeeSuggestions = '.oxd-autocomplete-dropdown';

// ── Loading States ──────────────────────────────────────────────────────────
export const loadingSpinner = '.oxd-loading-spinner';
export const pageLoader = '.oxd-form-loader';
