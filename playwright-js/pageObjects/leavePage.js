// Leave Management Page Objects

export const leavePageSelectors = {
  // Navigation
  leaveMenuLink: "//a[contains(., 'Leave')]",
  applyLeaveButton: "//button[contains(., 'Apply')]",
  myLeaveLink: "//a[contains(., 'My Leave')]",
  leaveCalendarLink: "//a[contains(., 'Leave Calendar')]",

  // Apply Leave Form
  leaveTypeDropdown: "[id='leave_type']",
  leaveTypeOption: "(leaveType) => `//select[@id='leave_type']/option[contains(., '${leaveType}')]`",
  fromDateInput: "[id='from_date']",
  toDateInput: "[id='to_date']",
  partialDaysDropdown: "[id='partial_days']",
  partialDaysOption: "(option) => `//select[@id='partial_days']/option[contains(., '${option}')]`",
  durationDropdown: "[id='duration']",
  durationOption: "(duration) => `//select[@id='duration']/option[contains(., '${duration}')]`",
  commentsTextarea: "[id='leave_comment']",
  applySubmitButton: "[id='applyBtn']",
  cancelButton: "//button[contains(., 'Cancel')]",

  // Leave Calendar
  calendarContainer: "[id='calendar']",
  calendarMonthYear: "[class*='calendar-header']",
  calendarPrevButton: "//button[contains(@class, 'prev')]",
  calendarNextButton: "//button[contains(@class, 'next')]",
  calendarDateCell: "(date) => `//td[@data-date='${date}']`",
  leaveEventMarker: "[class*='leave-event']",
  legendContainer: "[class*='calendar-legend']",
  legendSickLeave: "//span[contains(., 'Sick Leave')]",
  legendAnnualLeave: "//span[contains(., 'Annual Leave')]",

  // My Leave List
  leaveListTable: "[id='leave_list_table']",
  leaveStatusBadge: "(status) => `//span[contains(@class, 'badge') and contains(., '${status}')]`",
  leaveRow: "(leaveType) => `//tr[contains(., '${leaveType}')]`",

  // Notifications & Messages
  successMessage: "[class*='success-message']",
  errorMessage: "[class*='error-message']",
  validationError: "[class*='validation-error']",
  confirmationModal: "[role='dialog']",
  confirmButton: "//button[contains(., 'Confirm')]"
};

