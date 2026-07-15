import { test, expect } from '../fixtures/test.js';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Login Tests @Functional', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('[2343] Verify that login fails with both invalid username and password @2-Medium @Functional', async ({ page, baseURL }) => {
    // STEP 1: Navigate to url - Login page should be displayed
    await loginPage.navigateToLoginPage(baseURL);
    await loginPage.verifyLoginPageDisplayed();

    // STEP 2: Enter username "invalidUser999" in the username field - Invalid username should be entered
    await loginPage.enterUsername('invalidUser999');

    // STEP 3: Enter password "wrongPassword123" in the password field - Invalid password should be entered
    await loginPage.enterPassword('wrongPassword123');

    // STEP 4: Click the login button - Login request should be submitted for authentication
    await loginPage.clickLoginButton();

    // STEP 5: Verify invalid credentials error message is displayed - Error message indicating authentication failure should appear
    await loginPage.verifyErrorMessageDisplayed();

    // STEP 6: Verify user remains on login page - User should not be redirected to authenticated area
    await loginPage.verifyRemainsOnLoginPage();
  });
});

