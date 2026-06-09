// tests/LeaveDateValidation.spec.js
import { expect } from '@playwright/test';
import test from '../testFixtures/fixture.js';
import * as leaveSelectors from '../pageObjects/leavePage.js';

test.describe('@LeaveDateValidation: Verify Leave Date Validation', () => {

    test.beforeEach(async ({ page }) => {
        await test.step('Navigate to url "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"', async () => {
            await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
            await page.waitForLoadState('networkidle');
        });

        await test.step('Configured application URL should open', async () => {
            await expect(page).toHaveURL(/.*login/);
        });

        await test.step('Enter username "Admin" and password "admin123"', async () => {
            await page.waitForSelector('input[name="username"]', { state: 'visible' });
            await page.fill('input[name="username"]', 'Admin');
            await page.fill('input[name="password"]', 'admin123');
        });

        await test.step('Configured credentials should be entered successfully', async () => {
            await expect(page.locator('input[name="username"]')).toHaveValue('Admin');
            await expect(page.locator('input[name="password"]')).toHaveValue('admin123');
        });

        await test.step('Click login button', async () => {
            await page.click('button[type="submit"]');
            await page.waitForLoadState('networkidle');
            await page.waitForSelector('.oxd-topbar-header-breadcrumb', { timeout: 10000 });
        });
    });

    test('[1009] Verify that user cannot apply leave with to date before from date @smoke @regression', async ({ page }) => {
        await test.step('Navigate to Leave module', async () => {
            await page.waitForSelector(leaveSelectors.leaveMenuLink, { state: 'visible' });
            await page.click(leaveSelectors.leaveMenuLink);
            await page.waitForLoadState('networkidle');
        });

        await test.step('Navigate to Apply Leave', async () => {
            await page.waitForTimeout(1000);
            await page.waitForSelector(leaveSelectors.applyLeaveSubMenu, { state: 'visible', timeout: 5000 });
            await page.click(leaveSelectors.applyLeaveSubMenu);
            await page.waitForLoadState('networkidle');
        });

        await test.step('Select leave type', async () => {
            await page.waitForSelector(leaveSelectors.leaveTypeDropdown, { state: 'visible' });
            await page.click(leaveSelectors.leaveTypeDropdown);
            await page.waitForTimeout(500);
            await page.click('.oxd-select-option:has-text("CAN - Sick")');
            await page.waitForTimeout(1000);
        });

        await test.step('Enter to date earlier than from date', async () => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 10);
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() + 2);

            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${day}-${month}`;
            };

            const fromDateFormatted = formatDate(futureDate);
            const toDateFormatted = formatDate(pastDate);

            const fromDateField = page.locator(leaveSelectors.fromDateInput).first();
            await fromDateField.waitFor({ state: 'visible' });
            await fromDateField.clear();
            await fromDateField.fill(fromDateFormatted);
            await page.waitForTimeout(500);

            const toDateField = page.locator(leaveSelectors.toDateInput).first();
            await toDateField.waitFor({ state: 'visible' });
            await toDateField.clear();
            await toDateField.fill(toDateFormatted);
            await page.waitForTimeout(500);
        });

        await test.step('Click Submit', async () => {
            await page.click(leaveSelectors.applyButton);
            await page.waitForTimeout(2000);
        });

        await test.step('Validation error should be displayed', async () => {
            const errorMsg = page.locator(leaveSelectors.errorMessage);
            await expect(errorMsg.first()).toBeVisible({ timeout: 5000 });
        });

        await test.step('Verify form is not submitted', async () => {
            await expect(page).toHaveURL(/.*leave\/apply/);
            const applyBtn = page.locator(leaveSelectors.applyButton);
            await expect(applyBtn).toBeVisible();
        });

        await test.step('Error message about invalid date range should persist', async () => {
            const errorMsg = page.locator(leaveSelectors.errorMessage);
            await expect(errorMsg.first()).toBeVisible();
            await page.waitForTimeout(1000);
            await expect(errorMsg.first()).toBeVisible();
        });
    });

});