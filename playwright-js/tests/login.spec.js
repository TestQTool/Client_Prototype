const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/loginPage');

/**
 * Test Case ID: 5
 * Title: To Test Login Form with Valid Data
 * Priority: 2-Medium
 * Type: Functional
 */
test.describe('Login Functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('[TC-5] To Test Login Form with Valid Data - Priority: 2-Medium', async ({ page, baseURL }) => {
    // STEP 1: Navigate to 192.168.10.124:4001
    // Expected: System should display a Login Page with the Email, Password fields, Login button and Register Hyperlink
    const url = baseURL || 'http://192.168.10.124:4001';
    await loginPage.navigateToLoginPage(url);

    // Verify all required elements are displayed
    const isDisplayed = await loginPage.isLoginPageDisplayed();
    expect(isDisplayed).toBeTruthy();

    // Additional assertions for individual elements
    await expect(page.locator(loginPage.emailField)).toBeVisible();
    await expect(page.locator(loginPage.passwordField)).toBeVisible();
    await expect(page.locator(loginPage.loginButton)).toBeVisible();
    await expect(page.locator(loginPage.registerLink)).toBeVisible();
  });
});