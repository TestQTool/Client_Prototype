import { test, expect } from '../fixtures/test.js';
import LoginPage from '../pageObjects/LoginPage.js';
import testData from '../test-data/testdata.json' assert { type: 'json' };

test.describe('Login Performance Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('[2840] Verify that login authentication response time is within acceptable threshold @Performance', async () => {
    test.info().annotations.push(
      { type: 'testcase_id', description: '2840' },
      { type: 'priority', description: '2-Medium' }
    );

    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;
    const threshold = testData.performance.authenticationThreshold;

    let startTime;
    let responseTime;

    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLoginPage();
    });

    await test.step('Login page should be displayed', async () => {
      await loginPage.verifyLoginPageDisplayed();
    });

    await test.step('Enter valid credentials', async () => {
      await loginPage.enterCredentials(username, password);
    });

    await test.step('Valid credentials should be entered', async () => {
      await loginPage.verifyCredentialsEntered();
    });

    await test.step('Click the login button and start timer', async () => {
      startTime = await loginPage.clickLoginButtonAndStartTimer();
    });

    await test.step('Login request should be submitted and response time measurement should begin', async () => {
      await loginPage.verifyLoginRequestSubmitted();
    });

    await test.step('Measure time until dashboard is displayed', async () => {
      responseTime = await loginPage.measureTimeUntilDashboard(startTime);
    });

    await test.step('Authentication response time should be recorded', async () => {
      await loginPage.verifyAuthenticationResponseTime(responseTime);
      console.log(`Authentication response time: ${responseTime}ms`);
    });

    await test.step('Verify authentication completes within 2 seconds', async () => {
      await loginPage.verifyAuthenticationWithinThreshold(responseTime, threshold);
    });

    await test.step('Login process should complete within acceptable performance threshold', async () => {
      expect(responseTime).toBeLessThanOrEqual(threshold);
      console.log(`Performance test passed: ${responseTime}ms <= ${threshold}ms`);
    });
  });
});

