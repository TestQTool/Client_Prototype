import { test, expect } from '../fixtures/test.js';
import LoginPage from '../pageObjects/LoginPage.js';
import testData from '../test-data/testdata.json' assert { type: 'json' };

const { loginPage: loginTestData } = testData;

test.describe('Login Page Navigation', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('[2830] Verify that user can navigate to login page directly via URL @Regression', async () => {
    test.info().annotations.push(
      { type: 'testcase-id', description: '2830' },
      { type: 'priority', description: '3-Low' }
    );

    await test.step('Navigate to login page URL', async () => {
      await loginPage.navigateToLoginPage();
    });

    await test.step('Login page should load successfully', async () => {
      await loginPage.verifyLoginPageLoaded();
    });

    await test.step('Verify login form is displayed', async () => {
      await loginPage.verifyLoginFormDisplayed();
    });

    await test.step('Username field, password field, and login button should be visible', async () => {
      await loginPage.verifyLoginFormDisplayed();
    });

    await test.step('Verify page title or heading indicates login page', async () => {
      await loginPage.verifyPageTitleOrHeadingIndicatesLoginPage();
    });

    await test.step('Page should display appropriate login page identifier', async () => {
      await loginPage.verifyPageTitleOrHeadingIndicatesLoginPage();
    });
  });
});

