// Leave Page - Actions and Assertions
// Generated for OrangeHRM Leave Module

import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import { leavePageLocators } from '../pageObjects/leavePage.js';

class LeavePage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Navigation Methods
  async navigateToLeaveModule() {
    await this.waitAndClick(leavePageLocators.leaveMenu);
    await this.waitForPageLoad();
  }

  async clickApplyLeave() {
    await this.waitAndClick(leavePageLocators.applyLink);
    await this.waitForPageLoad();
  }

  async clickMyLeave() {
    await this.waitAndClick(leavePageLocators.myLeaveLink);
    await this.waitForPageLoad();
  }

  async clickLeaveList() {
    await this.waitAndClick(leavePageLocators.leaveListLink);
    await this.waitForPageLoad();
  }

  // Apply Leave with Half Day
  async selectLeaveType(leaveType) {
    await this.waitAndClick(leavePageLocators.leaveTypeDropdown);
    await this.wait(1000);
    await this.waitAndClick(leavePageLocators.leaveTypeOption(leaveType));
    await this.wait(500);
  }

  async selectHalfDayOption(option = 'All Days') {
    await this.waitAndClick(leavePageLocators.halfDayDropdown);
    await this.wait(1000);
    await this.waitAndClick(leavePageLocators.halfDayOption(option));
    await this.wait(500);
  }

  async enterLeaveDate(date) {
    // Date format expected: yyyy-mm-dd or configurable
    await this.waitAndFill(leavePageLocators.fromDateInput, date);
    await this.wait(500);
  }

  async enterLeaveDateRange(fromDate, toDate) {
    await this.waitAndFill(leavePageLocators.fromDateInput, fromDate);
    await this.wait(300);
    await this.waitAndFill(leavePageLocators.toDateInput, toDate);
    await this.wait(300);
  }

  async enterComments(comments) {
    await this.waitAndFill(leavePageLocators.commentsTextarea, comments);
  }

  async clickSubmit() {
    await this.waitAndClick(leavePageLocators.applyButton);
    await this.waitforNetworkIdle();
  }

  async applyHalfDayLeave(leaveType, halfDayOption, date, comments = '') {
    await this.selectLeaveType(leaveType);
    await this.selectHalfDayOption(halfDayOption);
    await this.enterLeaveDate(date);
    if (comments) {
      await this.enterComments(comments);
    }
    await this.clickSubmit();
  }

  // Verification Methods - My Leave
  async verifyLeaveRequestDays(expectedDays, rowIndex = 1) {
    await this.wait();
    const daysLocator = rowIndex === 1 
      ? leavePageLocators.firstLeaveRequestDays 
      : leavePageLocators.leaveDaysCell(rowIndex);
    
    await this.verifyElementContainsText(daysLocator, expectedDays);
  }

  async verifyLeaveApplicationSuccess() {
    await this.wait();
    const isVisible = await this.isElementVisible(leavePageLocators.successToast);
    expect(isVisible).toBeTruthy();
  }

  async getLeaveRequestDaysText(rowIndex = 1) {
    await this.wait();
    const daysLocator = rowIndex === 1 
      ? leavePageLocators.firstLeaveRequestDays 
      : leavePageLocators.leaveDaysCell(rowIndex);
    
    return await this.page.locator(daysLocator).textContent();
  }

  // Calendar Methods
  async openCalendar() {
    const isCalendarVisible = await this.isElementVisible(leavePageLocators.calendarView);
    if (!isCalendarVisible) {
      await this.waitAndClick(leavePageLocators.calendarIcon);
      await this.wait(1000);
    }
  }

  async verifyCalendarIsDisplayed() {
    await this.wait();
    const isVisible = await this.isElementVisible(leavePageLocators.calendarView);
    expect(isVisible).toBeTruthy();
  }

  async verifyCalendarShowsLeaveDates() {
    await this.wait();
    const leaveDotsCount = await this.getCount(leavePageLocators.calendarLeaveDot);
    expect(leaveDotsCount).toBeGreaterThan(0);
  }

  async clickCalendarDate(date) {
    await this.waitAndClick(leavePageLocators.calendarDateCell(date));
    await this.wait(1000);
  }

  async verifyLeaveDetailsDisplayed() {
    await this.wait();
    const isVisible = await this.isElementVisible(leavePageLocators.leaveDetailsModal);
    expect(isVisible).toBeTruthy();
  }

  async closeLeaveDetailsModal() {
    const isModalVisible = await this.isElementVisible(leavePageLocators.closeModalButton);
    if (isModalVisible) {
      await this.waitAndClick(leavePageLocators.closeModalButton);
      await this.wait(500);
    }
  }

  // Navigation to Calendar View (if separate page/tab)
  async navigateToCalendarView() {
    // TODO: verify selector against live app - calendar navigation pattern unclear
    await this.navigateToLeaveModule();
    await this.openCalendar();
  }
}

export default LeavePage;