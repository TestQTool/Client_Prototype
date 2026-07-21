import { test, expect } from '../fixtures/test.js';
import LoginPage from '../pageObjects/LoginPage.js';

test('[2829] Verify that login page displays username and password input fields @Regression', async ({ page }) => {
  test.info().annotations.push(
    { type: 'testcase_id', description: '2829' },
    { type: 'priority', description: '3-Low' }
  );

  const loginPage = new LoginPage(page);

  await test.step('Navigate to login page', async () => {
    await loginPage.navigateToLoginPage();
  });

  await test.step('Verify login page should be displayed', async () => {
    await expect(page).toHaveURL(/login/);
  });

  await test.step('Verify username input field is visible', async () => {
    await loginPage.verifyUsernameFieldVisible();
  });

  await test.step('Verify username field should be present and accessible', async () => {
    await expect(loginPage.usernameInput).toBeEditable();
  });

  await test.step('Verify password input field is visible', async () => {
    await loginPage.verifyPasswordFieldVisible();
  });

  await test.step('Verify password field should be present and accessible', async () => {
    await expect(loginPage.passwordInput).toBeEditable();
  });

  await test.step('Verify login button is visible', async () => {
    await loginPage.verifyLoginButtonVisible();
  });

  await test.step('Verify login button should be present and clickable', async () => {
    await expect(loginPage.loginButton).toBeEnabled();
  });
});

