// login.test.js - Test suite for ParaBank Login functionality
// TestCase ID: 2344 - Verify that login handles username with maximum character length
// Priority: 2-Medium
// Type: Functional

import { test, expect } from '../fixtures/test.js';
import { LoginPage } from '../pageObjects/LoginPage.js';

test.describe('Login Functionality - Maximum Username Length', () => {
  
  test('[2344] Verify that login handles username with maximum character length @MaxLengthValidation @LoginBoundary', async ({ page }) => {
    // Test Setup
    const loginPage = new LoginPage(page);
    const maxLengthUsername = 'a'.repeat(255); // 255 character username
    const password = process.env.TEST_PASSWORD || 'demo';

    // STEP 1: Navigate to url - Login page should be displayed
    await test.step('STEP 1: Navigate to url - Login page should be displayed', async () => {
      await loginPage.navigate();
      await loginPage.verifyLoginPageDisplayed();
    });

    // STEP 2: Enter username with 255 characters - Maximum length username should be entered
    await test.step('STEP 2: Enter username with 255 characters in the username field - Maximum length username should be entered', async () => {
      await loginPage.enterUsername(maxLengthUsername);
      
      // Verify the username was entered (may be truncated by maxlength attribute)
      const isEntered = await loginPage.verifyUsernameValue(maxLengthUsername);
      const maxLength = await loginPage.getUsernameMaxLength();
      
      if (maxLength) {
        console.log(`Username field has maxlength attribute: ${maxLength}`);
      }
      
      // Assertion: Username should be handled appropriately
      expect(isEntered || maxLength).toBeTruthy();
    });

    // STEP 3: Enter password - Password should be entered successfully
    await test.step('STEP 3: Enter password "demo" in the password field - Password should be entered successfully', async () => {
      await loginPage.enterPassword(password);
    });

    // STEP 4: Click the login button - Login request should be submitted for authentication
    await test.step('STEP 4: Click the login button - Login request should be submitted for authentication', async () => {
      await loginPage.clickLoginButton();
    });

    // STEP 5: Verify appropriate response - System should handle maximum length username appropriately
    await test.step('STEP 5: Verify appropriate response is displayed - System should handle maximum length username appropriately with validation or authentication response', async () => {
      const responseDisplayed = await loginPage.verifyLoginResponse();
      expect(responseDisplayed).toBeTruthy();
      
      // Additional verification: Check if error or success response
      const isError = await loginPage.isErrorDisplayed();
      const isSuccess = await loginPage.isLoginSuccessful();
      
      // System should show either validation error or authentication response
      expect(isError || isSuccess).toBeTruthy();
      
      if (isError) {
        const errorMsg = await loginPage.getErrorMessage();
        console.log(`Login validation/authentication response: ${errorMsg}`);
      } else if (isSuccess) {
        console.log('Login successful with maximum length username');
      }
    });
  });
});