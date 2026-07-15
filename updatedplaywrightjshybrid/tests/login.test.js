/**
 * Login Test Suite
 * Test Case: [2342] Verify that login fails with invalid password
 * Priority: 1-High
 * Type: Functional
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test.describe('Login Functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('[2342] Verify that login fails with invalid password', async ({ page }) => {
    // Test data
    const testUrl = 'https://parabank.parasoft.com/parabank/index.htm?utm_source=chatgpt.com';
    const validUsername = 'john';
    const invalidPassword = 'wrongPassword123';

    // STEP 1: Navigate to url - Login page should be displayed
    await test.step('Navigate to login page', async () => {
      await loginPage.navigate(testUrl);
      await loginPage.verifyLoginPageDisplayed();
    });

    // STEP 2: Enter username in the username field - Username should be entered successfully
    await test.step('Enter username', async () => {
      await loginPage.enterUsername(validUsername);
      await loginPage.verifyUsernameEntered(validUsername);
    });

    // STEP 3: Enter password in the password field - Invalid password should be entered
    await test.step('Enter invalid password', async () => {
      await loginPage.enterPassword(invalidPassword);
      await loginPage.verifyPasswordEntered();
    });

    // STEP 4: Click the login button - Login request should be submitted for authentication
    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    // STEP 5: Verify invalid credentials error message is displayed - Error message indicating authentication failure should appear
    await test.step('Verify error message is displayed', async () => {
      await loginPage.verifyInvalidCredentialsError();
    });

    // STEP 6: Verify user remains on login page - User should not be redirected to authenticated area
    await test.step('Verify user remains on login page', async () => {
      await loginPage.verifyRemainsOnLoginPage();
    });
  });
});