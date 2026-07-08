import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { PolicyAPI, PolicyPayload } from '../pageObjects/PolicyAPI';

/**
 * Test Case ID: 2159
 * Title: Verify that POST request to create policy endpoint returns 201 status code with valid payload
 * Priority: 1-High
 * Type: Non Functional
 */
test.describe('Policy Creation API Tests', () => {
  test('[2159] Verify that POST request to create policy endpoint returns 201 status code with valid payload', async ({ page, request }) => {
    // STEP 1: Navigate to url "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    // Expected: Configured application URL should open
    const loginPage = new LoginPage(page);
    await loginPage.navigate('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page).toHaveURL(/.*auth\/login/);

    // STEP 2: Enter username "Admin" and password "Admin"
    // Expected: Configured credentials should be entered successfully
    await loginPage.login('Admin', 'admin123');
    await loginPage.clickLogin();
    
    // Wait for navigation to complete
    await page.waitForURL(/.*dashboard/, { timeout: 10000 });

    // STEP 3: Send POST request to policy creation endpoint with valid customer details
    // Expected: API request should be sent
    const policyAPI = new PolicyAPI(request, 'https://opensource-demo.orangehrmlive.com');
    
    const validPayload: PolicyPayload = {
      customerDetails: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890'
      },
      policyType: 'Health Insurance',
      coverageAmount: 100000,
      premium: 5000,
      effectiveDate: '2024-01-01'
    };

    const response = await policyAPI.createPolicy(validPayload);

    // STEP 4: Verify response status code is 201 Created
    // Expected: API should return 201 status
    expect(response.status()).toBe(201);

    // STEP 5: Verify response body contains policy number and confirmation message
    // Expected: Policy creation confirmation should be returned in response
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('policyNumber');
    expect(responseBody.policyNumber).toBeTruthy();
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toContain('confirmation');
  });
});
