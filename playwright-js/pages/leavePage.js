import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import { leavePageSelectors } from '../pageObjects/leavePage.js';

class LeavePage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Navigation methods
  async navigateToLeaveModule() {
    await this.waitAndClick(leavePageSelectors.leaveMenuLink);
    await this.waitForPageLoad();
  }

  async clickApplyLeave() {
    await this.waitAndClick(leavePageSelectors.applyLeaveButton);
    await this.waitForPageLoad();
  }

  async navigateToMyLeave() {
    await this.waitAndClick(leavePageSelectors.myLeaveLink);
    await this.waitForPageLoad();
  }

  async navigateToLeaveCalendar() {
    await this.waitAndClick(leavePageSelectors.leaveCalendarLink);
    await this.waitForPageLoad();
  }

  // Apply Leave Form methods
  async selectLeaveType(leaveType) {
    await this.waitAndClick(leavePageSelectors.leaveTypeDropdown);
    const optionSelector = eval(leavePageSelectors.leaveTypeOption);
    await this.waitAndClick(optionSelector);
  }

  async enterFromDate(date) {
    await this.waitAndFill(leavePageSelectors.fromDateInput, date);
  }

  async enterToDate(date) {
    await this.waitAndFill(leavePageSelectors.toDateInput, date);
  }

  async selectPartialDays(option) {
    await this.waitAndClick(leavePageSelectors.partialDaysDropdown);
    const optionSelector = eval(leavePageSelectors.partialDaysOption);
    await this.waitAndClick(optionSelector);
  }

  async selectDuration(duration) {
    await this.waitAndClick(leavePageSelectors.durationDropdown);
    const durationSelector = eval(leavePageSelectors.durationOption);
    await this.waitAndClick(durationSelector);
  }

  async enterComments(comments) {
    await this.waitAndFill(leavePageSelectors.commentsTextarea, comments);
  }

  async submitLeaveApplication() {
    await this.waitAndClick(leavePageSelectors.applySubmitButton);
    await this.waitforNetworkIdle();
  }

  async applySickLeaveHalfDay(fromDate, toDate, comments) {
    await this.selectLeaveType('Sick Leave');
    await this.enterFromDate(fromDate);
    await this.enterToDate(toDate);
    await this.selectPartialDays('Half Day');
    await this.selectDuration('Half Day - Morning');
    if (comments) {
      await this.enterComments(comments);
    }
    await this.submitLeaveApplication();
  }

  // Leave Calendar methods
  async isCalendarVisible() {
    return await this.isElementVisible(leavePageSelectors.calendarContainer);
  }

  async getCalendarMonthYear() {
    await this.wait();
    return await this.page.locator(leavePageSelectors.calendarMonthYear).textContent();
  }

  async navigateToNextMonth() {
    await this.waitAndClick(leavePageSelectors.calendarNextButton);
    await this.wait();
  }

  async navigateToPreviousMonth() {
    await this.waitAndClick(leavePageSelectors.calendarPrevButton);
    await this.wait();
  }

  async isLeaveEventVisible() {
    return await this.isElementVisible(leavePageSelectors.leaveEventMarker);
  }

  async isLegendVisible() {
    return await this.isElementVisible(leavePageSelectors.legendContainer);
  }

  async verifyLegendContainsSickLeave() {
    await this.wait();
    const isVisible = await this.isElementVisible(leavePageSelectors.legendSickLeave);
    expect(isVisible).toBeTruthy();
  }

  async verifyLegendContainsAnnualLeave() {
    await this.wait();
    const isVisible = await this.isElementVisible(leavePageSelectors.legendAnnualLeave);
    expect(isVisible).toBeTruthy();
  }

  // My Leave methods
  async isLeaveListVisible() {
    return await this.isElementVisible(leavePageSelectors.leaveListTable);
  }

  async verifyLeaveStatus(status) {
    await this.wait();
    const statusSelector = eval(leavePageSelectors.leaveStatusBadge);
    const isVisible = await this.isElementVisible(statusSelector);
    expect(isVisible).toBeTruthy();
  }

  async verifyLeaveTypeInList(leaveType) {
    await this.wait();
    const leaveRowSelector = eval(leavePageSelectors.leaveRow);
    const isVisible = await this.isElementVisible(leaveRowSelector);
    expect(isVisible).toBeTruthy();
  }

  // Assertion methods
  async verifySuccessMessage(expectedMessage) {
    await this.wait();
    await this.verifyElementContainsText(leavePageSelectors.successMessage, expectedMessage);
  }

  async verifyErrorMessage(expectedMessage) {
    await this.wait();
    await this.verifyElementContainsText(leavePageSelectors.errorMessage, expectedMessage);
  }

  async verifyCalendarIsDisplayed() {
    await this.wait();
    const isVisible = await this.isCalendarVisible();
    expect(isVisible).toBeTruthy();
  }

  async verifyCalendarLegendIsDisplayed() {
    await this.wait();
    const isVisible = await this.isLegendVisible();
    expect(isVisible).toBeTruthy();
  }
}

export default LeavePage;

