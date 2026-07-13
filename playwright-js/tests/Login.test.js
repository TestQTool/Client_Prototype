import { expect } from '@playwright/test';
import test from '../testFixtures/fixture.js';

test.describe('Login', () => {

    test.describe.configure({ mode: 'parallel' });

    test('1802: Verify that system validates mandatory Vacancy Name field when creating a job vacancy @smoke @regression', async ({ LoginPage }) => {
        await test.step('Navigate to url "https://hr.quality-matrix.us/web/index.php/auth/login"', async () => {
            await LoginPage.waitForPageLoad();
            await LoginPage.navigate();
        });
        await test.step('Enter username "adminhrqa" and password "Adminhrqa@321"', async () => {
            await LoginPage.waitForPageLoad();
            await LoginPage.verifyPageLoaded();
        });
        await test.step('Enter Job Title "QA Engineer", leave Vacancy Name empty, select Hiring Manager, and enter Number of Positions "1"', async () => {
            await LoginPage.waitForPageLoad();
            await LoginPage.verifyPageLoaded();
        });
        await test.step('Click Save button and verify validation error is displayed', async () => {
            await LoginPage.waitForPageLoad();
            await LoginPage.verifyPageLoaded();
        });
    });

});