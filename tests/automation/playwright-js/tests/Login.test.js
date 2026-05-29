const { test } = require('../testFixtures/fixture');
const { expect } = require('@playwright/test');

test.describe('User Login Functionality', () => {
  
  test.beforeEach(async ({ loginPage, baseUrl }) => {
    await loginPage.navigate(baseUrl);
  });

  test('TC001 - Verify successful login with valid credentials', async ({ loginPage, loginTestData }) => {
    await test.step('Enter valid username', async () => {
      await loginPage.enterUsername(loginTestData.validUser.username);
    });

    await test.step('Enter valid password', async () => {
      await loginPage.enterPassword(loginTestData.validUser.password);
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify login success', async () => {
      await loginPage.verifyLoginSuccess();
    });
  });

  test('TC002 - Verify login failure with invalid credentials', async ({ loginPage, loginTestData }) => {
    await test.step('Enter invalid credentials and submit', async () => {
      await loginPage.login(
        loginTestData.invalidUser.username,
        loginTestData.invalidUser.password
      );
    });

    await test.step('Verify error message is displayed', async () => {
      await loginPage.verifyLoginFailure(loginTestData.invalidUser.expectedError);
    });
  });

  test('TC003 - Verify login with empty credentials', async ({ loginPage, loginTestData }) => {
    await test.step('Submit empty credentials', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify validation error message', async () => {
      await loginPage.verifyLoginFailure(loginTestData.emptyCredentials.expectedError);
    });
  });

  test('TC004 - Verify login with empty password', async ({ loginPage, loginTestData }) => {
    await test.step('Enter username without password', async () => {
      await loginPage.enterUsername(loginTestData.emptyPassword.username);
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify password required error', async () => {
      await loginPage.verifyLoginFailure(loginTestData.emptyPassword.expectedError);
    });
  });

  test('TC005 - Verify login with special characters', async ({ loginPage, loginTestData }) => {
    await test.step('Enter credentials with special characters', async () => {
      await loginPage.login(
        loginTestData.specialCharacters.username,
        loginTestData.specialCharacters.password
      );
    });

    await test.step('Verify appropriate error handling', async () => {
      await loginPage.verifyLoginFailure(loginTestData.specialCharacters.expectedError);
    });
  });

  test('TC006 - Verify logout functionality after successful login', async ({ loginPage, loginTestData }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.login(
        loginTestData.validUser.username,
        loginTestData.validUser.password
      );
    });

    await test.step('Verify login success', async () => {
      await loginPage.verifyLoginSuccess();
    });

    await test.step('Perform logout', async () => {
      await loginPage.logout();
    });

    await test.step('Verify user is logged out', async () => {
      const isLoggedIn = await loginPage.isLoggedIn();
      expect(isLoggedIn).toBe(false);
    });
  });

  test('TC007 - Verify user remains logged in after page refresh', async ({ loginPage, loginTestData, page }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.login(
        loginTestData.validUser.username,
        loginTestData.validUser.password
      );
    });

    await test.step('Verify login success', async () => {
      await loginPage.verifyLoginSuccess();
    });

    await test.step('Refresh the page', async () => {
      await page.reload();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify user is still logged in', async () => {
      const isLoggedIn = await loginPage.isLoggedIn();
      expect(isLoggedIn).toBe(true);
    });
  });

});
