import { test, expect } from '../fixtures/test.js';
import LoginPage from '../pageObjects/LoginPage.js';
import testData from '../test-data/testdata.json' assert { type: 'json' };

test('[2819] Verify that login handles password with maximum character length @Regression', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const { username, password, expectedErrorMessage } = testData.login.maxLengthPassword;

  test.info().annotations.push(
    { type: 'test-case-id', description: '2819' },
    { type: 'priority', description: '2-Medium' }
  );

  await test.step('Navigate to login page', async () => {
    await loginPage.navigateToLoginPage();
  });

  await test.step('Verify login page should be displayed', async () => {
    await loginPage.verifyLoginPageDisplayed();
  });

  await test.step('Enter username and password with 255 characters', async () => {
    await loginPage.enterCredentials(username, password);
  });

  await test.step('Verify valid username and maximum length password should be entered', async () => {
    await loginPage.verifyCredentialsEntered();
  });

  await test.step('Click the login button', async () => {
    await loginPage.clickLoginButton();
  });

  await test.step('Verify login request should be submitted', async () => {
    await loginPage.verifyLoginRequestSubmitted();
  });

  await test.step('Verify authentication error message is displayed', async () => {
    await loginPage.verifyAuthenticationErrorDisplayed(expectedErrorMessage);
  });

  await test.step('Verify error message indicating invalid credentials should appear', async () => {
    await expect(loginPage.errorMessage).toBeVisible();
  });

  await test.step('Verify system behavior is stable', async () => {
    await loginPage.verifySystemStable();
  });

  await test.step('Verify no system crash or unexpected behavior should occur', async () => {
    const pageState = await page.evaluate(() => document.readyState);
    expect(pageState).toBe('complete');
  });
});

