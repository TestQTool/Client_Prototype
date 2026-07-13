const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/LoginPage');
const VacancyPage = require('../pageObjects/VacancyPage');

/**
 * Test Case ID: 1802
 * Title: Verify that system validates mandatory Vacancy Name field when creating a job vacancy
 * Priority: 1-High
 * Type: Functional
 */
test.describe('Vacancy Management - Validation Tests', () => {
  
  test('[1802] Verify that system validates mandatory Vacancy Name field when creating a job vacancy', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const vacancyPage = new VacancyPage(page);

    // STEP 1: Navigate to url "https://hr.quality-matrix.us/web/index.php/auth/login"
    // Expected: Configured application URL should open
    await page.goto('https://hr.quality-matrix.us/web/index.php/auth/login');
    await expect(page).toHaveURL(/.*auth\/login/);

    // STEP 2: Enter username "adminhrqa" and password "Adminhrqa@321"
    // Expected: Configured credentials should be entered successfully
    await loginPage.login('adminhrqa', 'Adminhrqa@321');
    await page.waitForLoadState('networkidle');
    
    // Navigate to Recruitment/Vacancies section
    await page.click('text=Recruitment');
    await page.waitForLoadState('networkidle');
    await page.click('text=Vacancies');
    await page.waitForLoadState('networkidle');
    await page.click('button:has-text("Add")');
    await page.waitForLoadState('networkidle');

    // STEP 3: Enter Job Title "QA Engineer", leave Vacancy Name empty, select Hiring Manager, and enter Number of Positions "1"
    // Expected: Vacancy Name field should remain empty
    await vacancyPage.fillJobTitle('QA Engineer');
    // Leave Vacancy Name empty intentionally
    await vacancyPage.fillNumberOfPositions('1');
    
    // Verify Vacancy Name field is empty
    const vacancyNameValue = await page.inputValue(vacancyPage.vacancyNameInput);
    expect(vacancyNameValue).toBe('');

    // STEP 4: Click Save button and verify validation error is displayed
    // Expected: System should display required field validation error for Vacancy Name
    await vacancyPage.clickSave();
    
    // Verify validation error is displayed
    const isErrorDisplayed = await vacancyPage.isRequiredFieldErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    // Additional validation - check error message content
    const errorElement = await vacancyPage.getValidationError();
    await expect(errorElement).toBeVisible();
  });

});