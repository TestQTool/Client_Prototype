/**
 * Test Case: [2338] Verify that login fails when username field is empty
 * Priority: 1-High
 * Type: Functional
 */

const { test } = require('../fixtures/test');
const LoginPage = require('../pages/LoginPage');
const testData = require('../config/test-data');

test.describe('[2338] Login Validation - Empty Username Field', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('[2338] Verify that login fails when username field is empty', async ({ page }) => {
    // STEP 1: Navigate to url "https://parabank.parasoft.com/parabank/index.htm?utm_source=chatgpt.com" 
    // -> Login page should be displayed
    const loginUrl = testData.BASE_URL || 'https://parabank.parasoft.com/parabank/index.htm?utm_source=chatgpt.com';
    await loginPage.navigateTo(loginUrl);
    await loginPage.verifyLoginPageDisplayed();

    // STEP 2: Leave username field empty 
    // -> Username field should remain blank
    await loginPage.verifyUsernameFieldEmpty();

    // STEP 3: Enter password "demo" in the password field 
    // -> Password should be entered successfully
    const testPassword = 'demo';
    await loginPage.enterPassword(testPassword);
    await loginPage.verifyPasswordEntered(testPassword);

    // STEP 4: Click the login button 
    // -> Login request should be submitted for validation
    await loginPage.clickLoginButton();

    // STEP 5: Verify username required error message is displayed 
    // -> Error message indicating username is required should appear
    await loginPage.verifyUsernameRequiredError();

    // STEP 6: Verify user remains on login page 
    // -> User should not be redirected to authenticated area
    await loginPage.verifyRemainsOnLoginPage();
  });
});