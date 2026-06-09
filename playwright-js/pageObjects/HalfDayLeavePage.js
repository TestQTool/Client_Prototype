// pageObjects/HalfDayLeavePage.js
// Selectors specific to Half Day Leave application
// RULES: named exports ONLY | zero logic | zero imports | group with comments

// ── Duration Selection ──────────────────────────────────────────────────────
export const durationDropdownWrapper = '.oxd-select-wrapper:has(label:has-text("Duration"))';
export const durationDropdown = '.oxd-select-text-input';
export const durationOptions = '.oxd-select-dropdown .oxd-select-option';
export const halfDayMorningOption = '.oxd-select-option:has-text("Half Day - Morning")';
export const halfDayAfternoonOption = '.oxd-select-option:has-text("Half Day - Afternoon")';
export const fullDayOption = '.oxd-select-option:has-text("Full Day")';
export const specifyTimeOption = '.oxd-select-option:has-text("Specify Time")';

// ── Partial Days Configuration ──────────────────────────────────────────────
export const partialDaysWrapper = '.oxd-input-group:has(label:has-text("Partial Days"))';
export const partialDaysDropdownTrigger = partialDaysWrapper + ' .oxd-select-text-input';
export const partialDaysAllDays = '.oxd-select-option:has-text("All Days")';
export const partialDaysStartDay = '.oxd-select-option:has-text("Start Day Only")';
export const partialDaysEndDay = '.oxd-select-option:has-text("End Day Only")';
export const partialDaysStartEndDay = '.oxd-select-option:has-text("Start and End Day")';

// ── Time Selection (if Specify Time) ───────────────────────────────────────
export const fromTimeInput = 'input[placeholder="hh:mm"]';
export const toTimeInput = 'input[placeholder="hh:mm"]:last-of-type';
export const timePickerDropdown = '.oxd-time-picker-dropdown';

// ── Leave Balance Display ───────────────────────────────────────────────────
export const leaveBalanceSection = '.oxd-form-row:has-text("Leave Balance")';
export const leaveBalanceValue = '.oxd-text--span';
export const leaveBalanceLabel = '.oxd-label';

// ── Half Day Confirmation ───────────────────────────────────────────────────
export const halfDayIndicator = '.oxd-chip:has-text("Half Day")';
export const daysDeductionText = '.oxd-text:has-text("0.5")';
export const appliedDaysCount = '.oxd-table-cell:has-text("0.5")';