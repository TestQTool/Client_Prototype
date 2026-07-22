import { test, expect } from '../fixtures/test.js';
import LoginPage from '../pageObjects/LoginPage.js';
import testData from '../test-data/testdata.json' assert { type: 'json' };

test('[3247] Verify that user can successfully log in with valid credentials @Smoke', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const username = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;

  await test.step('Navigate to application home page', async () => {
    await loginPage.navigateToHome();
    await loginPage.verifyHomePageLoaded();
  });

  await test.step('Click on the Login link in the navigation menu', async () => {
    await loginPage.clickLoginLink();
    await loginPage.verifyLoginModalOpened();
  });

  await test.step('Enter valid credentials in the respective fields', async () => {
    await loginPage.enterCredentials(username, password);
    await loginPage.verifyCredentialsEntered();
  });

  await test.step('Click the Log in button', async () => {
    await loginPage.clickLoginButton();
    await loginPage.verifyLoginSubmitted();
  });

  await test.step('Verify user is redirected to home page with authenticated state', async () => {
    await loginPage.verifyUserAuthenticatedOnHomePage(username);
  });

  await test.step('Verify logout option is visible in navigation menu', async () => {
    await loginPage.verifyLogoutOptionVisible();
  });
});

