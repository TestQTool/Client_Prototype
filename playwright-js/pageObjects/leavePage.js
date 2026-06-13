// Leave Module Page Object - Locators Only

// Login Section
export const usernameInput = 'input[name="username"]';
export const passwordInput = 'input[name="password"]';
export const loginButton = 'button[type="submit"]';

// Navigation
export const leaveMenuLink = '//a[contains(@class, "oxd-main-menu-item")]//span[text()="Leave"]';
export const dashboardHeader = '.oxd-topbar-header-breadcrumb';

// Leave Application Form
export const leaveTypeDropdown = '//label[text()="Leave Type"]/parent::div/following-sibling::div//div[contains(@class, "oxd-select-text")]';
export const leaveTypeOption = (type) => `//div[@role="listbox"]//span[text()="${type}"]`;
export const halfDayToggle = '//label[text()="Partial Days"]/parent::div/following-sibling::div//div[contains(@class, "oxd-select-text")]';
export const halfDayOption = '//div[@role="listbox"]//span[contains(text(), "Half Day")]';
export const fromDateInput = '//label[text()="From Date"]/parent::div/following-sibling::div//input';
export const toDateInput = '//label[text()="To Date"]/parent::div/following-sibling::div//input';
export const durationDropdown = '//label[text()="Duration"]/parent::div/following-sibling::div//div[contains(@class, "oxd-select-text")]';
export const durationOption = (option) => `//div[@role="listbox"]//span[text()="${option}"]`;
export const commentsTextarea = '//label[text()="Comments"]/parent::div/following-sibling::div//textarea';
export const applyButton = 'button[type="submit"]';

// Leave List/My Leave
export const myLeaveTab = '//a[contains(text(), "My Leave")]';
export const leaveListTable = '.oxd-table-body';
export const leaveListRow = '.oxd-table-card';
export const leaveDurationCell = (rowIndex) => `(//div[contains(@class, "oxd-table-card")])[${rowIndex}]//div[contains(@class, "oxd-table-cell")][4]`;
export const leaveTypeCell = (rowIndex) => `(//div[contains(@class, "oxd-table-card")])[${rowIndex}]//div[contains(@class, "oxd-table-cell")][2]`;
export const firstLeaveRequestDuration = '(//div[contains(@class, "oxd-table-card")])[1]//div[contains(@class, "oxd-table-cell")][4]';

// Leave Calendar
export const leaveListMenuOption = '//a[contains(@class, "oxd-topbar-body-nav-tab-item") and text()="Leave List"]';
export const calendarIcon = '//i[contains(@class, "bi-calendar")]';
export const calendarView = '.oxd-calendar-wrapper';
export const calendarDate = (date) => `//div[contains(@class, "oxd-calendar-date") and text()="${date}"]`;
export const calendarDateWithLeave = '//div[contains(@class, "oxd-calendar-date") and contains(@class, "--leave")]';
export const leaveTooltip = '.oxd-leave-card';
export const leaveDetailsModal = '.oxd-dialog-container';

// Success Messages
export const successToast = '.oxd-toast--success';
export const successMessage = '.oxd-text--toast-message';

// Verification Elements
export const pageTitle = '.oxd-topbar-header-breadcrumb-module';
export const loadingSpinner = '.oxd-loading-spinner';

