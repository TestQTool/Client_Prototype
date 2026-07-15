/**
 * Login Test Suite
 * TestCase ID: 2337 - Verify that user can login successfully with valid credentials
 * Priority: 1-High
 * Type: Functional
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

// Test data - should be loaded from config/test-data helpers in actual framework
const testData = {
  url: 'https://parabank.parasoft.com/parabank/index.htm?utm_source=chatgpt.com',
  username: 'john',
  password: 'demo'
};

test.describe('Login Functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('[2337] Verify that user can login successfully with valid credentials', async ({ page }) => {
    test.info().annotations.push(
      { type: 'TestCase ID', description: '2337' },
      { type: 'Priority', description: '1-High' },
      { type: 'Type', description: 'Functional' }
    );

    // STEP 1: Navigate to url "https://parabank.parasoft.com/parabank/index.htm?utm_source=chatgpt.com"
    // Expected: Login page should be displayed
    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLoginPage(testData.url);
      await loginPage.verifyLoginPageDisplayed();
    });

    // STEP 2: Enter username "john" in the username field
    // Expected: Username should be entered successfully
    await test.step('Enter username', async () => {
      await loginPage.enterUsername(testData.username);
      await loginPage.verifyUsernameEntered(testData.username);
    });

    // STEP 3: Enter password "demo" in the password field
    // Expected: Password should be entered successfully
    await test.step('Enter password', async () => {
      await loginPage.enterPassword(testData.password);
      await loginPage.verifyPasswordEntered(testData.password);
    });

    // STEP 4: Click the login button
    // Expected: Login request should be submitted
    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    // STEP 5: Verify user is redirected to account overview page
    // Expected: Account overview page should be displayed with user account details
    await test.step('Verify account overview page', async () => {
      await loginPage.verifyAccountOverviewPage();
    });
  });
});

