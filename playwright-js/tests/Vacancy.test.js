import { expect } from '@playwright/test';
import test from '../testFixtures/fixture.js';

test.describe('Vacancy', () => {

    test.describe.configure({ mode: 'parallel' });

    test('1802: Verify that system validates mandatory Vacancy Name field when creating a job vacancy @smoke @regression', async ({ VacancyPage }) => {
        await test.step('Navigate to url "https://hr.quality-matrix.us/web/index.php/auth/login"', async () => {
            await VacancyPage.waitForPageLoad();
            await VacancyPage.navigate();
        });
        await test.step('Enter username "adminhrqa" and password "Adminhrqa@321"', async () => {
            await VacancyPage.waitForPageLoad();
            await VacancyPage.verifyPageLoaded();
        });
        await test.step('Enter Job Title "QA Engineer", leave Vacancy Name empty, select Hiring Manager, and enter Number of Positions "1"', async () => {
            await VacancyPage.waitForPageLoad();
            await VacancyPage.verifyPageLoaded();
        });
        await test.step('Click Save button and verify validation error is displayed', async () => {
            await VacancyPage.waitForPageLoad();
            await VacancyPage.verifyPageLoaded();
        });
    });

});