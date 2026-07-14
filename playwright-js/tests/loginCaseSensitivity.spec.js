/**
 * Test Case ID: 2417
 * Title: Verify that login is case-sensitive for password
 * Priority: 3-Low
 * Type: Functional
 */

const { test, expect } = require('@playwright/test');
const LoginPageObjects = require('../pageObjects/loginPageObjects');

test.describe('Login Case Sensitivity Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPageObjects(page);
  });

  test('[2417] Verify that login is case-sensitive for password - Priority: 3-Low', async ({ page }) => {
    // Test data
    const testData = {
      url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
      username: 'Admin',
      invalidPassword: 'ADMIN123',
      expectedErrorMessage: 'Invalid credentials'
    };

    // STEP 1: Navigate to url "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    // Expected: Login page should be displayed
    await loginPage.navigateToLoginPage(testData.url);
    const isLoginPageDisplayed = await loginPage.isOnLoginPage();
    expect(isLoginPageDisplayed).toBeTruthy();

    // STEP 2: Enter username "Admin" in the username field
    // Expected: Valid username should be entered
    await loginPage.enterUsername(testData.username);
    const usernameValue = await page.inputValue(loginPage.selectors.usernameInput);
    expect(usernameValue).toBe(testData.username);

    // STEP 3: Enter password "ADMIN123" in uppercase in the password field
    // Expected: Uppercase password should be entered
    await loginPage.enterPassword(testData.invalidPassword);
    const passwordValue = await page.inputValue(loginPage.selectors.passwordInput);
    expect(passwordValue).toBe(testData.invalidPassword);

    // STEP 4: Click the Login button
    // Expected: Login request should be submitted for authentication
    await loginPage.clickLoginButton();

    // STEP 5: Verify invalid credentials error message is displayed
    // Expected: Error message "Invalid credentials" should be displayed
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(testData.expectedErrorMessage);

    // STEP 6: Verify user remains on login page
    // Expected: User should not be redirected to dashboard
    const isStillOnLoginPage = await loginPage.isOnLoginPage();
    expect(isStillOnLoginPage).toBeTruthy();
    
    const isOnDashboard = await loginPage.isOnDashboard();
    expect(isOnDashboard).toBeFalsy();
  });
});

