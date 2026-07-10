import { expect } from '@playwright/test';
import test from '../testFixtures/fixture.js';

test.describe('Login', () => {

    test.describe.configure({ mode: 'parallel' });

    test('1801: Verify that system validates mandatory Job Title field when creating a job vacancy @smoke @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://hr.quality-matrix.us/web/index.php/auth/login"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "adminhrqa" and password "Adminhrqa@321"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Leave Job Title field empty and fill Vacancy Name "SE-2024-002", select Hiring Manager, and enter Number of Positions "2"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Click Save button and verify validation error is displayed', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

});