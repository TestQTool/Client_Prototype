import { test, expect } from '../fixtures/test.js';
import LoginPage from '../pageObjects/LoginPage.js';
import PolicyPage from '../pageObjects/PolicyPage.js';
import testData from '../test-data/testdata.json' assert { type: 'json' };

test.describe('Policy Management', () => {
  let loginPage;
  let policyPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    policyPage = new PolicyPage(page);
  });

  test('[2579] Verify that insurance agent can successfully create a new policy with all valid customer and policy details @Smoke', async ({ page }) => {
    test.info().annotations.push(
      { type: 'testcase_id', description: '2579' },
      { type: 'priority', description: '1-High' }
    );

    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;
    const { customer, policyDetails } = testData.policy;

    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLogin();
      await loginPage.verifyLoginPageOpen();
    });

    await test.step('Enter valid credentials', async () => {
      await loginPage.enterCredentials(username, password);
      await loginPage.verifyCredentialsEntered();
    });

    await test.step('Submit the login form', async () => {
      await loginPage.submitLoginForm();
      await loginPage.verifyLoginSubmitted();
    });

    await test.step('Navigate to policy creation module', async () => {
      await policyPage.navigateToPolicyModule();
      await policyPage.verifyPolicyFormDisplayed();
    });

    await test.step('Enter valid customer details including name, contact information, and address', async () => {
      await policyPage.enterCustomerDetails(customer);
      await policyPage.verifyCustomerDetailsCaptured();
    });

    await test.step('Enter valid policy information including policy type, coverage options, premium amount, and effective dates', async () => {
      await policyPage.enterPolicyInformation(policyDetails);
      await policyPage.verifyPolicyInformationCaptured();
    });

    await test.step('Submit the policy creation form', async () => {
      await policyPage.submitPolicyForm();
      await policyPage.verifyPolicyValidationTriggered();
    });

    await test.step('Verify policy is created successfully and confirmation message is displayed', async () => {
      await policyPage.verifyPolicyCreatedSuccessfully();
    });
  });
});

