// pageObjects/LeaveCalendarPage.js
// Selectors for Leave Calendar functionality
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Calendar View ───────────────────────────────────────────────────────────
export const calendarContainer = '.oxd-calendar-wrapper';
export const calendarHeader = '.oxd-calendar-header';
export const calendarBody = '.oxd-calendar-dates';
export const calendarDate = '.oxd-calendar-date';
export const calendarDateActive = '.oxd-calendar-date--selected';
export const calendarDateWithLeave = '.oxd-calendar-date--leave';
export const calendarDateToday = '.oxd-calendar-date--today';

// ── Calendar Navigation ─────────────────────────────────────────────────────
export const calendarPrevButton = '.oxd-calendar-selector-month-selected ~ button:first-of-type';
export const calendarNextButton = '.oxd-calendar-selector-month-selected ~ button:last-of-type';
export const monthYearSelector = '.oxd-calendar-selector-month-selected';

// ── Leave Details Popup ─────────────────────────────────────────────────────
export const leaveDetailsPopup = '.oxd-dialog-sheet';
export const leaveDetailsTitle = '.oxd-dialog-sheet .oxd-text--h6';
export const leaveDetailsEmployeeName = '.oxd-text--subtitle-2';
export const leaveDetailsLeaveType = '.oxd-text--span';
export const leaveDetailsDuration = '.oxd-text--p';
export const closeDetailsButton = '.oxd-dialog-close-button';

// ── Leave Indicators ────────────────────────────────────────────────────────
export const leaveColorIndicator = '.oxd-calendar-date-wrapper .oxd-calendar-date-card';
export const leaveTooltip = '.oxd-tooltip';
export const multipleLeavesIndicator = '.oxd-calendar-date--multiple-leaves';

// ── Team Members Filter ─────────────────────────────────────────────────────
export const teamMemberFilter = '.oxd-autocomplete-wrapper input';
export const teamMemberDropdown = '.oxd-autocomplete-dropdown';
export const teamMemberOption = '.oxd-autocomplete-option';

// ── Legend ──────────────────────────────────────────────────────────────────
export const calendarLegend = '.oxd-calendar-legend';
export const legendItem = '.oxd-calendar-legend-item';
export const legendColorBox = '.oxd-calendar-legend-color';
export const legendLabel = '.oxd-calendar-legend-label';