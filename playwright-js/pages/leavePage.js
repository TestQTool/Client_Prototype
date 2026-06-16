import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import * as leavePageSelectors from '../pageObjects/leavePage.js';

class LeavePage extends BasePage {
    constructor(page) {
        super(page);
    }

    // Navigation Methods
    async navigateToApplication(url) {
        await this.open(url);
        await super.waitForPageLoad();
    }

    async login(username, password) {
        await this.waitAndFill(leavePageSelectors.usernameInput, username);
        await this.waitAndFill(leavePageSelectors.passwordInput, password);
        await this.waitAndClick(leavePageSelectors.loginButton);
        await super.waitForPageLoad();
    }

    async navigateToLeaveSection() {
        await this.waitAndClick(leavePageSelectors.leaveMenuLink);
        await super.waitForPageLoad();
    }

    async navigateToApplyLeave() {
        await this.waitAndClick(leavePageSelectors.applyLink);
        await super.waitForPageLoad();
    }

    async navigateToMyLeave() {
        await this.waitAndClick(leavePageSelectors.myLeaveLink);
        await super.waitForPageLoad();
    }

    async navigateToLeaveList() {
        await this.waitAndClick(leavePageSelectors.leaveListLink);
        await super.waitForPageLoad();
    }

    // Leave Application Methods
    async selectLeaveType(leaveType) {
        await this.waitAndClick(leavePageSelectors.leaveTypeDropdown);
        await this.page.waitForTimeout(500);
        await this.waitAndClick(leavePageSelectors.leaveTypeOption(leaveType));
    }

    async selectHalfDayOption() {
        await this.waitAndClick(leavePageSelectors.halfDayDropdown);
        await this.page.waitForTimeout(500);
        await this.waitAndClick(leavePageSelectors.halfDayOption);
    }

    async enterFromDate(date) {
        await this.waitAndFill(leavePageSelectors.fromDateInput, date);
    }

    async enterToDate(date) {
        await this.waitAndFill(leavePageSelectors.toDateInput, date);
    }

    async enterComments(comments) {
        await this.waitAndFill(leavePageSelectors.commentsTextarea, comments);
    }

    async submitLeaveApplication() {
        await this.waitAndClick(leavePageSelectors.submitButton);
        await this.page.waitForTimeout(1000);
    }

    async applyHalfDaySickLeave(fromDate, comments = '') {
        await this.selectLeaveType('Sick');
        await this.selectHalfDayOption();
        await this.enterFromDate(fromDate);
        if (comments) {
            await this.enterComments(comments);
        }
        await this.submitLeaveApplication();
    }

    async applyLeaveWithInvalidDateRange(leaveType, fromDate, toDate) {
        await this.selectLeaveType(leaveType);
        await this.enterFromDate(fromDate);
        await this.enterToDate(toDate);
        await this.submitLeaveApplication();
    }

    // Assertion Methods
    async verifyLoginSuccessful() {
        await this.wait();
        const url = await this.getUrl();
        expect(url).toContain('/dashboard');
    }

    async verifyLeaveApplicationSubmitted() {
        await this.wait();
        const isSuccessVisible = await this.isElementVisible(leavePageSelectors.successToast);
        expect(isSuccessVisible).toBeTruthy();
    }

    async verifyHalfDayLeaveInList() {
        await this.wait();
        const isHalfDayVisible = await this.isElementVisible(leavePageSelectors.leaveRecordRow('0.5'));
        expect(isHalfDayVisible).toBeTruthy();
    }

    async verifyValidationErrorDisplayed() {
        await this.wait();
        const isErrorVisible = await this.isElementVisible(leavePageSelectors.validationErrorMessage);
        expect(isErrorVisible).toBeTruthy();
    }

    async verifyDateRangeErrorDisplayed() {
        await this.wait();
        const isDateErrorVisible = await this.isElementVisible(leavePageSelectors.dateRangeError);
        expect(isDateErrorVisible).toBeTruthy();
    }

    async verifyFormNotSubmitted() {
        await this.wait();
        const url = await this.getUrl();
        expect(url).toContain('/leave/apply');
    }

    async verifyLeaveCalendarVisible() {
        await this.wait();
        const isCalendarVisible = await this.isElementVisible(leavePageSelectors.leaveCalendar);
        expect(isCalendarVisible).toBeTruthy();
    }

    async verifyTeamMemberLeavesDisplayed() {
        await this.wait();
        const leaveCount = await this.getCount(leavePageSelectors.teamMemberLeave);
        expect(leaveCount).toBeGreaterThan(0);
    }

    async clickCalendarDate(date) {
        await this.waitAndClick(leavePageSelectors.calendarDateCell(date));
        await this.page.waitForTimeout(500);
    }

    async verifyLeaveDetailsDisplayed() {
        await this.wait();
        const isDetailsVisible = await this.isElementVisible(leavePageSelectors.calendarLeaveDetails);
        expect(isDetailsVisible).toBeTruthy();
    }
}

export default LeavePage;