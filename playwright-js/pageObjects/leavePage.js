// pageObjects/leavePage.js
// Selectors for Leave Management — verified against application
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Navigation ──────────────────────────────────────────────────────────────
export const leaveMenuLink = '[data-testid="leave-menu"], a:has-text("Leave"), .oxd-main-menu-item:has-text("Leave")';
export const configureMenuLink = '[data-testid="configure-menu"], a:has-text("Configure")';
export const leaveTypesLink = '[data-testid="leave-types"], a:has-text("Leave Types")';
export const entitlementsLink = '[data-testid="entitlements"], a:has-text("Entitlements")';
export const reportsLink = '[data-testid="reports"], a:has-text("Reports")';
export const myLeaveLink = '[data-testid="my-leave"], a:has-text("My Leave")';
export const leaveListLink = '[data-testid="leave-list"], a:has-text("Leave List")';
export const applyLeaveLink = '[data-testid="apply-leave"], a:has-text("Apply")';
export const leaveCalendarLink = '[data-testid="leave-calendar"], a:has-text("Calendar")';

// ── Leave Types Page ────────────────────────────────────────────────────────
export const addLeaveTypeButton = 'button:has-text("Add"), [data-testid="add-leave-type"]';
export const leaveTypeNameInput = 'input[name="name"], [data-testid="leave-type-name"]';
export const saveLeaveTypeButton = 'button[type="submit"]:has-text("Save"), [data-testid="save-leave-type"]';
export const leaveTypesList = '[data-testid="leave-types-list"], .oxd-table-body';
export const leaveTypeRow = '[data-testid="leave-type-row"], .oxd-table-row';
export const editLeaveTypeIcon = '[data-testid="edit-icon"], .oxd-icon-button:has(.bi-pencil), button:has-text("Edit")';
export const deleteLeaveTypeIcon = '[data-testid="delete-icon"], .oxd-icon-button:has(.bi-trash), button:has-text("Delete")';
export const leaveTypeCheckbox = 'input[type="checkbox"], [data-testid="leave-type-checkbox"]';
export const deleteConfirmButton = 'button:has-text("Yes, Delete"), [data-testid="confirm-delete"]';
export const leaveTypeErrorMessage = '.oxd-input-field-error-message, [data-testid="error-message"]';

// ── Leave Entitlements Page ─────────────────────────────────────────────────
export const employeeNameInput = 'input[name="employee"], [data-testid="employee-name"]';
export const employeeDropdown = '[data-testid="employee-dropdown"], .oxd-autocomplete-dropdown';
export const leaveTypeDropdown = '[data-testid="leave-type-dropdown"], .oxd-select-text';
export const leavePeriodDropdown = '[data-testid="leave-period"], .oxd-select-text';
export const entitlementValueInput = 'input[name="entitlement"], [data-testid="entitlement-value"]';
export const saveEntitlementButton = 'button[type="submit"]:has-text("Save"), [data-testid="save-entitlement"]';
export const multipleEmployeesOption = 'input[type="radio"][value="multiple"], [data-testid="multiple-employees"]';
export const locationFilterDropdown = '[data-testid="location-filter"], .oxd-select-text';
export const entitlementErrorMessage = '.oxd-input-field-error-message, [data-testid="entitlement-error"]';

// ── Apply Leave Page ────────────────────────────────────────────────────────
export const applyLeaveTypeDropdown = '[data-testid="apply-leave-type"], .oxd-select-text';
export const fromDateInput = 'input[name="fromDate"], [data-testid="from-date"]';
export const toDateInput = 'input[name="toDate"], [data-testid="to-date"]';
export const halfDayCheckbox = 'input[name="halfDay"], [data-testid="half-day-checkbox"]';
export const commentsTextarea = 'textarea[name="comments"], [data-testid="leave-comments"]';
export const applyLeaveButton = 'button[type="submit"]:has-text("Apply"), [data-testid="apply-leave-btn"]';
export const leaveBalanceDisplay = '[data-testid="leave-balance"], .oxd-input-group__label-right';
export const workingDaysDisplay = '[data-testid="working-days"], .oxd-text--span';
export const leaveValidationError = '.oxd-input-field-error-message, [data-testid="leave-validation-error"]';
export const insufficientBalanceWarning = '[data-testid="balance-warning"], .oxd-text--warning';
export const overlapErrorMessage = '[data-testid="overlap-error"], .oxd-text--error';
export const dateValidationError = '[data-testid="date-error"], .oxd-input-field-error-message';

// ── My Leave / Leave List Page ──────────────────────────────────────────────
export const leaveStatusFilter = '[data-testid="status-filter"], .oxd-select-text';
export const leaveListTable = '[data-testid="leave-list-table"], .oxd-table-body';
export const leaveRequestRow = '[data-testid="leave-request-row"], .oxd-table-row';
export const cancelLeaveButton = 'button:has-text("Cancel"), [data-testid="cancel-leave"]';
export const cancelConfirmButton = 'button:has-text("Yes, Cancel"), [data-testid="confirm-cancel"]';
export const pendingStatusLabel = '.oxd-chip--default:has-text("Pending"), [data-testid="status-pending"]';
export const approvedStatusLabel = '.oxd-chip--success:has-text("Approved"), [data-testid="status-approved"]';
export const noRecordsFoundMessage = '.oxd-text:has-text("No Records Found"), [data-testid="no-records"]';
export const leaveSuccessMessage = '.oxd-toast--success, [data-testid="success-message"]';

// ── Leave Approval Page (Supervisor/HR) ─────────────────────────────────────
export const approveLeaveButton = 'button:has-text("Approve"), [data-testid="approve-leave"]';
export const rejectLeaveButton = 'button:has-text("Reject"), [data-testid="reject-leave"]';
export const rejectionCommentsInput = 'textarea[name="rejectionComments"], [data-testid="rejection-comments"]';
export const confirmApprovalButton = 'button:has-text("Confirm"), [data-testid="confirm-approval"]';
export const bulkSelectCheckbox = 'input[type="checkbox"][name="selectAll"], [data-testid="select-all"]';
export const approveSelectedButton = 'button:has-text("Approve Selected"), [data-testid="approve-selected"]';
export const employeeSearchInput = 'input[name="employeeSearch"], [data-testid="employee-search"]';

// ── Leave Reports Page ──────────────────────────────────────────────────────
export const reportEmployeeFilter = 'input[name="reportEmployee"], [data-testid="report-employee"]';
export const reportDateFromFilter = 'input[name="reportDateFrom"], [data-testid="report-date-from"]';
export const reportDateToFilter = 'input[name="reportDateTo"], [data-testid="report-date-to"]';
export const reportStatusFilter = '[data-testid="report-status"], .oxd-select-text';
export const reportLeaveTypeFilter = '[data-testid="report-leave-type"], .oxd-select-text';
export const generateReportButton = 'button:has-text("Generate"), [data-testid="generate-report"]';
export const exportCsvButton = 'button:has-text("Export to CSV"), [data-testid="export-csv"]';
export const reportTable = '[data-testid="report-table"], .oxd-table-body';
export const reportDataRow = '[data-testid="report-row"], .oxd-table-row';

// ── Leave Calendar Page ─────────────────────────────────────────────────────
export const calendarContainer = '[data-testid="leave-calendar"], .oxd-calendar';
export const calendarMonthView = '[data-testid="month-view"], .oxd-calendar-month';
export const publicHolidayIndicator = '[data-testid="holiday-indicator"], .oxd-calendar-holiday';
export const employeeLeaveIndicator = '[data-testid="employee-leave"], .oxd-calendar-leave';
export const calendarDayCell = '[data-testid="calendar-day"], .oxd-calendar-date';

// ── Common Elements ─────────────────────────────────────────────────────────
export const toastSuccessMessage = '.oxd-toast--success, [data-testid="toast-success"]';
export const toastErrorMessage = '.oxd-toast--error, [data-testid="toast-error"]';
export const confirmationDialog = '[data-testid="confirmation-dialog"], .oxd-dialog-sheet';
export const unauthorizedMessage = '[data-testid="unauthorized"], .oxd-text:has-text("Unauthorized")';
export const loadingSpinner = '[data-testid="loading"], .oxd-loading-spinner';

// ── UNVERIFIED — update after exploration ───────────────────────────────────
// TODO: verify selector against live app
export const leaveTypeDropdownOption = '.oxd-select-option, [data-testid="dropdown-option"]';
export const datepickerCalendar = '.oxd-date-input-calendar, [data-testid="datepicker"]';
export const datepickerDayButton = '.oxd-calendar-date, [data-testid="calendar-day-btn"]';