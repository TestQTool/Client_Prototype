// Leave Page Object - Locators Only
// Generated for OrangeHRM Leave Module

export const leavePageLocators = {
  // Navigation
  leaveMenu: "//span[text()='Leave']",
  applyLink: "//a[text()='Apply']",
  myLeaveLink: "//a[text()='My Leave']",
  leaveListLink: "//a[text()='Leave List']",
  
  // Apply Leave Form
  leaveTypeDropdown: "//label[text()='Leave Type']/parent::div/following-sibling::div//div[@class='oxd-select-text-input']",
  leaveTypeOption: (leaveType) => `//div[@role='listbox']//span[text()='${leaveType}']",
  
  // Half Day Options
  halfDayDropdown: "//label[text()='Partial Days']/parent::div/following-sibling::div//div[@class='oxd-select-text-input']",
  halfDayOption: (option) => `//div[@role='listbox']//span[contains(text(),'${option}')]",
  
  // Date Selection
  fromDateInput: "//label[text()='From Date']/parent::div/following-sibling::div//input",
  toDateInput: "//label[text()='To Date']/parent::div/following-sibling::div//input",
  
  // Comments
  commentsTextarea: "//label[text()='Comments']/parent::div/following-sibling::div//textarea",
  
  // Actions
  applyButton: "//button[@type='submit' and contains(., 'Apply')]",
  cancelButton: "//button[@type='button' and contains(., 'Cancel')]",
  
  // My Leave List
  leaveTable: "//div[@class='oxd-table-body']",
  leaveTableRow: "//div[@class='oxd-table-card']",
  leaveDaysCell: (rowIndex) => `(//div[@class='oxd-table-card'])[${rowIndex}]//div[@class='oxd-table-cell'][4]`,
  leaveStatusCell: (rowIndex) => `(//div[@class='oxd-table-card'])[${rowIndex}]//div[@class='oxd-table-cell'][6]`,
  firstLeaveRequestDays: "(//div[@class='oxd-table-card'])[1]//div[@class='oxd-table-cell'][4]",
  firstLeaveRequestStatus: "(//div[@class='oxd-table-card'])[1]//div[@class='oxd-table-cell'][6]",
  
  // Leave Calendar
  calendarIcon: "//button[@title='Calendar']",
  calendarView: "//div[contains(@class, 'leave-calendar')]",
  calendarMonth: "//div[@class='oxd-calendar-header']//li[@class='--month-name']",
  calendarYear: "//div[@class='oxd-calendar-header']//li[@class='--year']",
  calendarDates: "//div[@class='oxd-calendar-dates-grid']",
  calendarDateCell: (date) => `//div[@class='oxd-calendar-date' and text()='${date}']",
  calendarLeaveDot: "//div[@class='oxd-calendar-date-wrapper']//div[contains(@class, 'leave-dot')]",
  
  // Leave Details Modal/Popup
  leaveDetailsModal: "//div[@role='document' or contains(@class, 'modal')]",
  leaveDetailsHeader: "//div[@role='document']//h6",
  leaveDetailsContent: "//div[@role='document']//div[@class='orangehrm-leave-card']",
  closeModalButton: "//button[@aria-label='Close' or contains(@class, 'close')]",
  
  // Success/Error Messages
  successToast: "//div[@class='oxd-toast oxd-toast--success']",
  errorToast: "//div[@class='oxd-toast oxd-toast--error']",
  toastMessage: "//div[@class='oxd-toast-content']//p[@class='oxd-text--toast-message']"
};