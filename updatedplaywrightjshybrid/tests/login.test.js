import { test, expect } from '../fixtures/test.js';
import LoginPage from '../pageObjects/LoginPage.js';
import * as dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

test.describe('Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  // TestCase ID: 2412
  // Priority: 3-Low
  // Type: Functional
  test('[2412] Verify that login handles username with single character', async ({ page }) => {
    // STEP 1: Navigate to url -> Login page should be displayed
    await loginPage.navigate(BASE_URL);
    const isLoginPageDisplayed = await loginPage.isLoginPageDisplayed();
    expect(isLoginPageDisplayed).toBeTruthy();

    // STEP 2: Enter username "A" in the username field -> Single character username should be entered
    await loginPage.enterUsername('A');

    // STEP 3: Enter password "admin123" in the password field -> Valid password should be entered
    await loginPage.enterPassword(TEST_PASSWORD);

    // STEP 4: Click the Login button -> Login request should be submitted for authentication
    await loginPage.clickLoginButton();

    // STEP 5: Verify invalid credentials error message is displayed -> Error message "Invalid credentials" should be displayed
    const isErrorMessageDisplayed = await loginPage.verifyErrorMessage('Invalid credentials');
    expect(isErrorMessageDisplayed).toBeTruthy();

    // STEP 6: Verify user remains on login page -> User should not be redirected to dashboard
    const remainsOnLoginPage = await loginPage.verifyOnLoginPage();
    expect(remainsOnLoginPage).toBeTruthy();
  });
});