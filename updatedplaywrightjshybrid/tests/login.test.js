import { test, expect } from '../fixtures/test.js';
import LoginPage from '../pageObjects/LoginPage.js';
import DashboardPage from '../pageObjects/DashboardPage.js';

test('[2458] Verify that user can login successfully with valid credentials @Smoke', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await test.step('STEP 1: Navigate to url - Login page should be displayed', async () => {
    await loginPage.navigate();
    await loginPage.verifyLoginPageDisplayed();
  });

  await test.step('STEP 2: Enter username in the username field - Username should be entered successfully', async () => {
    await loginPage.enterUsername(process.env.TEST_USERNAME);
    await loginPage.verifyUsernameEntered(process.env.TEST_USERNAME);
  });

  await test.step('STEP 3: Enter password in the password field - Password should be entered successfully', async () => {
    await loginPage.enterPassword(process.env.TEST_PASSWORD);
    await loginPage.verifyPasswordEntered();
  });

  await test.step('STEP 4: Click on the login button - Login request should be submitted', async () => {
    await loginPage.clickLoginButton();
    await loginPage.verifyLoginRequestSubmitted();
  });

  await test.step('STEP 5: Verify user is redirected to the dashboard or home page - User should see the authenticated home page', async () => {
    await dashboardPage.verifyUserRedirectedToDashboard();
  });
});

