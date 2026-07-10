const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/loginPage');
const JobVacancyPage = require('../pageObjects/jobVacancyPage');

test.describe('Job Vacancy - Functional Tests', () => {
  let loginPage;
  let jobVacancyPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    jobVacancyPage = new JobVacancyPage(page);
  });

  /**
   * Test Case ID: 1801
   * Title: Verify that system validates mandatory Job Title field when creating a job vacancy
   * Priority: 1-High
   * Type: Functional
   */
  test('[1801] Verify that system validates mandatory Job Title field when creating a job vacancy', async ({ page }) => {
    // STEP 1: Navigate to url "https://hr.quality-matrix.us/web/index.php/auth/login"
    // Expected: Configured application URL should open
    await loginPage.navigate('https://hr.quality-matrix.us/web/index.php/auth/login');
    await expect(page).toHaveURL(/auth\/login/);

    // STEP 2: Enter username "adminhrqa" and password "Adminhrqa@321"
    // Expected: Configured credentials should be entered successfully
    await loginPage.login('adminhrqa', 'Adminhrqa@321');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/dashboard/);

    // Navigate to Vacancies page
    await jobVacancyPage.navigateToVacancies();
    await page.waitForLoadState('networkidle');
    await jobVacancyPage.clickAddVacancy();
    await page.waitForLoadState('networkidle');

    // STEP 3: Leave Job Title field empty and fill Vacancy Name "SE-2024-002", select Hiring Manager, and enter Number of Positions "2"
    // Expected: Job Title field should remain empty
    await jobVacancyPage.fillVacancyForm('SE-2024-002', 'Peter Mac Anderson', '2', false);

    // STEP 4: Click Save button and verify validation error is displayed
    // Expected: System should display required field validation error for Job Title
    await jobVacancyPage.clickSave();
    await page.waitForTimeout(1000);
    const isValidationErrorVisible = await jobVacancyPage.verifyValidationError();
    expect(isValidationErrorVisible).toBeTruthy();
  });
});

