/**
 * Login Test Suite
 * TestCase: [2341] Verify that login fails with invalid username
 * Priority: 1-High
 * Type: Functional
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test.describe('Login Functionality - Invalid Credentials', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  /**
   * [2341] Verify that login fails with invalid username
   * Priority: 1-High
   * Type: Functional
   */
  test('[2341] Verify that login fails with invalid username', async ({ page }) => {
    // Test data
    const testUrl = 'https://parabank.parasoft.com/parabank/index.htm?utm_source=chatgpt.com';
    const invalidUsername = 'invalidUser999';
    const password = 'demo';

    // STEP 1: Navigate to url - Login page should be displayed
    await test.step('Navigate to login page', async () => {
      await loginPage.navigate(testUrl);
      await expect(page).toHaveURL(/parabank\.parasoft\.com/);
    });

    // STEP 2: Enter username "invalidUser999" in the username field - Invalid username should be entered
    await test.step('Enter invalid username', async () => {
      await loginPage.enterUsername(invalidUsername);
    });

    // STEP 3: Enter password "demo" in the password field - Password should be entered successfully
    await test.step('Enter password', async () => {
      await loginPage.enterPassword(password);
    });

    // STEP 4: Click the login button - Login request should be submitted for authentication
    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    // STEP 5: Verify invalid credentials error message is displayed - Error message indicating authentication failure should appear
    await test.step('Verify error message is displayed', async () => {
      await loginPage.verifyErrorMessageDisplayed();
    });

    // STEP 6: Verify user remains on login page - User should not be redirected to authenticated area
    await test.step('Verify user remains on login page', async () => {
      await loginPage.verifyOnLoginPage();
    });
  });
});