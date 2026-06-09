// tests/HalfDayLeave.spec.js
import { expect } from '@playwright/test';
import test from '../testFixtures/fixture.js';
import * as leaveSelectors from '../pageObjects/leavePage.js';
import * as halfDaySelectors from '../pageObjects/HalfDayLeavePage.js';

test.describe('@HalfDayLeave: Verify Half Day Leave Application', () => {

    test.beforeEach(async ({ page }) => {
        await test.step('Navigate to application URL', async () => {
            await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
            await page.waitForLoadState('networkidle');
        });

        await test.step('Enter username "Admin" and password "admin123"', async () => {
            await page.waitForSelector('input[name="username"]', { state: 'visible' });
            await page.fill('input[name="username"]', 'Admin');
            await page.fill('input[name="password"]', 'admin123');
        });

        await test.step('Click login button', async () => {
            await page.click('button[type="submit"]');
            await page.waitForLoadState('networkidle');
            await page.waitForSelector('.oxd-topbar-header-breadcrumb', { timeout: 10000 });
        });
    });

    test('[1000] Verify that user can apply for sick leave with half day option @smoke @regression', async ({ page }) => {
        await test.step('Navigate to Leave menu', async () => {
            await page.waitForSelector(leaveSelectors.leaveMenuLink, { state: 'visible' });
            await page.click(leaveSelectors.leaveMenuLink);
            await page.waitForLoadState('networkidle');
        });

        await test.step('Click on Apply Leave', async () => {
            await page.waitForTimeout(1000);
            await page.waitForSelector(leaveSelectors.applyLeaveSubMenu, { state: 'visible', timeout: 5000 });
            await page.click(leaveSelectors.applyLeaveSubMenu);
            await page.waitForLoadState('networkidle');
        });

        await test.step('Select leave type as Sick Leave', async () => {
            await page.waitForSelector(leaveSelectors.leaveTypeDropdown, { state: 'visible' });
            await page.click(leaveSelectors.leaveTypeDropdown);
            await page.waitForTimeout(500);
            await page.click('.oxd-select-option:has-text("CAN - Sick")');
            await page.waitForTimeout(500);
        });

        await test.step('Enter from date', async () => {
            const today = new Date();
            today.setDate(today.getDate() + 2);
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${day}-${month}`;
            
            const fromDateField = page.locator(leaveSelectors.fromDateInput).first();
            await fromDateField.waitFor({ state: 'visible' });
            await fromDateField.clear();
            await fromDateField.fill(formattedDate);
        });

        await test.step('Select half day option', async () => {
            await page.waitForTimeout(1000);
            const partialDaysDropdowns = page.locator('.oxd-select-text-input');
            const count = await partialDaysDropdowns.count();
            
            for (let i = 0; i < count; i++) {
                const dropdown = partialDaysDropdowns.nth(i);
                const text = await dropdown.textContent();
                if (text.includes('All Days') || text.includes('-- Select --')) {
                    await dropdown.click();
                    await page.waitForTimeout(500);
                    await page.click('.oxd-select-option:has-text("All Days")');
                    break;
                }
            }
            await page.waitForTimeout(500);
        });

        await test.step('Select duration as Half Day', async () => {
            const durationDropdowns = page.locator('.oxd-select-text-input');
            const count = await durationDropdowns.count();
            
            for (let i = 0; i < count; i++) {
                const dropdown = durationDropdowns.nth(i);
                const text = await dropdown.textContent();
                if (text.includes('Full Day') || text.includes('-- Select --')) {
                    await dropdown.click();
                    await page.waitForTimeout(500);
                    const halfDayOption = page.locator('.oxd-select-option').filter({ hasText: 'Half Day - Morning' });
                    if (await halfDayOption.count() > 0) {
                        await halfDayOption.first().click();
                        break;
                    }
                }
            }
            await page.waitForTimeout(500);
        });

        await test.step('Click Submit button', async () => {
            await page.click(leaveSelectors.applyButton);
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);
        });

        await test.step('Half day leave application should be submitted successfully', async () => {
            const successToast = page.locator(leaveSelectors.toastSuccessMessage);
            await expect(successToast).toBeVisible({ timeout: 5000 });
        });

        await test.step('Navigate to My Leave', async () => {
            await page.click(leaveSelectors.leaveMenuLink);
            await page.waitForTimeout(1000);
            await page.click(leaveSelectors.myLeaveSubMenu);
            await page.waitForLoadState('networkidle');
        });

        await test.step('Verify leave request shows 0.5 days in My Leave list', async () => {
            await page.waitForSelector(leaveSelectors.leaveTable, { state: 'visible', timeout: 10000 });
            const daysCell = page.locator(leaveSelectors.leaveTableRows).first().locator('.oxd-table-cell').nth(3);
            await expect(daysCell).toBeVisible();
            const daysText = await daysCell.textContent();
            expect(daysText).toContain('0.5');
        });
    });

});