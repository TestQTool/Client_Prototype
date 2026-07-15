/**
 * Login Test Suite
 * Test Case: [2339] Verify that login fails when password field is empty
 * Priority: 1-High
 * Type: Functional
 */

const { test, expect } = require('../fixtures/test');
const LoginPage = require('../pages/LoginPage');
const testData = require('../test-data/login.data');

test.describe('Login Functionality - Empty Password Validation', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('[2339] Verify that login fails when password field is empty', async ({ page }) => {
    // STEP 1: Navigate to url "https://parabank.parasoft.com/parabank/index.htm?utm_source=chatgpt.com"
    // Expected: Login page should be displayed
    await test.step('Navigate to login page', async () => {
      await loginPage.navigateTo(testData.loginUrl);
      const isDisplayed = await loginPage.verifyLoginPageDisplayed();
      expect(isDisplayed).toBeTruthy();
    });

    // STEP 2: Enter username "john" in the username field
    // Expected: Username should be entered successfully
    await test.step('Enter username', async () => {
      await loginPage.enterUsername(testData.emptyPasswordTest.username);
      const isEntered = await loginPage.verifyUsernameEntered(testData.emptyPasswordTest.username);
      expect(isEntered).toBeTruthy();
    });

    // STEP 3: Leave password field empty
    // Expected: Password field should remain blank
    await test.step('Leave password field empty', async () => {
      await loginPage.leavePasswordEmpty();
      const isEmpty = await loginPage.verifyPasswordFieldEmpty();
      expect(isEmpty).toBeTruthy();
    });

    // STEP 4: Click the login button
    // Expected: Login request should be submitted for validation
    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
      // Wait a moment for validation to occur
      await page.waitForTimeout(500);
    });

    // STEP 5: Verify password required error message is displayed
    // Expected: Error message indicating password is required should appear
    await test.step('Verify password required error message', async () => {
      const errorDisplayed = await loginPage.verifyErrorMessageDisplayed();
      expect(errorDisplayed).toBeTruthy();
      
      const isPasswordError = await loginPage.verifyPasswordRequiredError();
      expect(isPasswordError).toBeTruthy();
    });

    // STEP 6: Verify user remains on login page
    // Expected: User should not be redirected to authenticated area
    await test.step('Verify user remains on login page', async () => {
      const remainsOnLoginPage = await loginPage.verifyRemainsOnLoginPage();
      expect(remainsOnLoginPage).toBeTruthy();
    });
  });
});

