/**
 * Test Case ID: 1994
 * Title: Verify that login fails with invalid username
 * Priority: 1-High
 * Type: Functional
 */

const { test, expect } = require('@playwright/test');
const LoginPageObjects = require('../pageObjects/loginPageObjects');

test.describe('Login Functionality Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPageObjects(page);
  });

  test('[1994] Verify that login fails with invalid username', async ({ page }) => {
    test.slow(); // Mark as slow test due to authentication steps
    
    // Test metadata
    const testCase = {
      id: '1994',
      priority: '1-High',
      type: 'Functional'
    };

    // STEP 1: Navigate to url "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    // Expected: Configured application URL should open
    await test.step('STEP 1: Navigate to login URL', async () => {
      await loginPage.navigateToLoginPage('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      const isOnLoginPage = await loginPage.isOnLoginPage();
      expect(isOnLoginPage).toBeTruthy();
      expect(page.url()).toContain('auth/login');
    });

    // STEP 2: Enter username "Admin" and password "admin123"
    // Expected: Configured credentials should be entered successfully
    await test.step('STEP 2: Enter invalid credentials', async () => {
      await loginPage.enterUsername('Admin');
      await loginPage.enterPassword('admin123');
      
      // Verify credentials are entered
      const usernameValue = await page.inputValue(loginPage.selectors.usernameInput);
      const passwordValue = await page.inputValue(loginPage.selectors.passwordInput);
      expect(usernameValue).toBe('Admin');
      expect(passwordValue).toBe('admin123');
    });

    // STEP 3: Click Login button
    // Expected: Login request should be submitted
    await test.step('STEP 3: Click Login button', async () => {
      await loginPage.clickLoginButton();
      // Wait for response after login attempt
      await page.waitForTimeout(2000);
    });

    // STEP 4: Verify error message is displayed
    // Expected: Error message should indicate invalid credentials
    await test.step('STEP 4: Verify error message is displayed', async () => {
      const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
      expect(isErrorDisplayed).toBeTruthy();
      
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.toLowerCase()).toMatch(/invalid|incorrect|wrong/);
    });

    // STEP 5: Verify user remains on login page
    // Expected: User should not be redirected to dashboard
    await test.step('STEP 5: Verify user remains on login page', async () => {
      const isOnLoginPage = await loginPage.isOnLoginPage();
      expect(isOnLoginPage).toBeTruthy();
      
      const currentUrl = await loginPage.getCurrentUrl();
      expect(currentUrl).toContain('auth/login');
      
      // Verify user is NOT on dashboard
      const isOnDashboard = await loginPage.isOnDashboard();
      expect(isOnDashboard).toBeFalsy();
    });
  });
});

