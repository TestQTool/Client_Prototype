import { test, expect } from '../fixtures/test.js';
import LoginPage from '../pageObjects/LoginPage.js';

test.describe('Login Feature', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('[2811] Verify that user can successfully log in with valid credentials @Smoke', async () => {
    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;

    await test.step('Navigate to url process.env.BASE_URL', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter username process.env.TEST_USERNAME and password process.env.TEST_PASSWORD', async () => {
      await loginPage.enterCredentials(username, password);
      await loginPage.verifyCredentialsEntered();
    });

    await test.step('Click the login button', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyLoginRequestSubmitted();
    });

    await test.step('Verify user is redirected to dashboard', async () => {
      await loginPage.verifyDashboardDisplayed();
      await loginPage.verifyUserProfileVisible();
    });
  });
});