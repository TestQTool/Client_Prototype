import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import * as leavePageObjects from '../pageObjects/leavePage.js';

class LeavePage extends BasePage {
    constructor(page) {
        super(page);
    }

    // Login Actions
    async navigateToApplication(url) {
        await this.open(url);
        await this.waitForPageLoad();
    }

    async login(username, password) {
        await this.waitAndFill(leavePageObjects.usernameInput, username);
        await this.waitAndFill(leavePageObjects.passwordInput, password);
        await this.waitAndClick(leavePageObjects.loginButton);
        await this.waitForPageLoad();
        await this.waitforNetworkIdle();
    }

    async navigateToLeaveModule() {
        await this.waitAndClick(leavePageObjects.leaveMenuLink);
        await this.waitForPageLoad();
        await this.wait(1000);
    }

    // Leave Application Actions
    async selectLeaveType(leaveType) {
        await this.waitAndClick(leavePageObjects.leaveTypeDropdown);
        await this.wait(500);
        const leaveOption = leavePageObjects.leaveTypeOption(leaveType);
        await this.waitAndClick(leaveOption);
        await this.wait(500);
    }

    async selectHalfDayOption() {
        await this.waitAndClick(leavePageObjects.halfDayToggle);
        await this.wait(500);
        await this.waitAndClick(leavePageObjects.halfDayOption);
        await this.wait(500);
    }

    async selectDuration(duration) {
        await this.waitAndClick(leavePageObjects.durationDropdown);
        await this.wait(500);
        const durationOpt = leavePageObjects.durationOption(duration);
        await this.waitAndClick(durationOpt);
        await this.wait(500);
    }

    async enterLeaveDate(date) {
        // Clear and enter date in format YYYY-MM-DD
        await this.page.locator(leavePageObjects.fromDateInput).clear();
        await this.waitAndFill(leavePageObjects.fromDateInput, date);
        await this.wait(300);
    }

    async enterToDate(date) {
        await this.page.locator(leavePageObjects.toDateInput).clear();
        await this.waitAndFill(leavePageObjects.toDateInput, date);
        await this.wait(300);
    }

    async enterComments(comments) {
        await this.waitAndFill(leavePageObjects.commentsTextarea, comments);
    }

    async submitLeaveApplication() {
        await this.waitAndClick(leavePageObjects.applyButton);
        await this.waitforNetworkIdle();
        await this.wait(1000);
    }

    async applyHalfDayLeave(leaveType, date) {
        await this.navigateToLeaveModule();
        await this.selectLeaveType(leaveType);
        await this.selectHalfDayOption();
        await this.enterLeaveDate(date);
        await this.submitLeaveApplication();
    }

    // My Leave Actions
    async navigateToMyLeave() {
        await this.waitAndClick(leavePageObjects.myLeaveTab);
        await this.waitForPageLoad();
        await this.waitforNetworkIdle();
        await this.wait(1000);
    }

    // Calendar Actions
    async openLeaveCalendar() {
        const isCalendarVisible = await this.isElementVisible(leavePageObjects.calendarView);
        if (!isCalendarVisible) {
            await this.waitAndClick(leavePageObjects.calendarIcon);
            await this.wait(1000);
        }
    }

    async clickCalendarDate(date) {
        const dateLocator = leavePageObjects.calendarDate(date);
        await this.waitAndClick(dateLocator);
        await this.wait(500);
    }

    // Assertions
    async verifyLoginSuccess() {
        await this.wait();
        const dashboardVisible = await this.isElementVisible(leavePageObjects.dashboardHeader);
        expect(dashboardVisible).toBeTruthy();
    }

    async verifyHalfDayLeaveSubmitted() {
        await this.wait();
        const successVisible = await this.isElementVisible(leavePageObjects.successToast);
        expect(successVisible).toBeTruthy();
    }

    async verifyLeaveShowsHalfDay() {
        await this.wait();
        await this.navigateToMyLeave();
        
        const durationText = await this.page.locator(leavePageObjects.firstLeaveRequestDuration).textContent();
        expect(durationText.trim()).toContain('0.5');
    }

    async verifyLeaveCalendarDisplayed() {
        await this.wait();
        const calendarVisible = await this.isElementVisible(leavePageObjects.calendarView);
        expect(calendarVisible).toBeTruthy();
    }

    async verifyCalendarShowsLeaveDates() {
        await this.wait();
        const leaveDatesCount = await this.getCount(leavePageObjects.calendarDateWithLeave);
        expect(leaveDatesCount).toBeGreaterThan(0);
    }

    async verifyLeaveDetailsDisplayed() {
        await this.wait();
        const detailsVisible = await this.isElementVisible(leavePageObjects.leaveTooltip);
        expect(detailsVisible).toBeTruthy();
    }
}

export default LeavePage;

