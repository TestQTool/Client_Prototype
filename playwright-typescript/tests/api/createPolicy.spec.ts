import { test, expect, request } from '@playwright/test';
import { LoginPage } from '../../pageObjects/LoginPage';

/**
 * Test Case ID: 2159
 * Title: Verify that POST request to create policy endpoint returns 201 status code with valid payload
 * Priority: 1-High
 * Type: Non Functional
 */
test.describe('Policy Creation API Tests', () => {
  
  test('[2159] Verify that POST request to create policy endpoint returns 201 status code with valid payload', async ({ page, request }) => {
    const loginPage = new LoginPage(page);
    const baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    const username = 'Admin';
    const password = 'Admin';

    // STEP 1: Navigate to url "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    // Expected: Configured application URL should open
    await loginPage.navigate(baseURL);
    await expect(page).toHaveURL(/auth\/login/);

    // STEP 2: Enter username "Admin" and password "Admin"
    // Expected: Configured credentials should be entered successfully
    await loginPage.enterCredentials(username, password);

    // STEP 3: Send POST request to policy creation endpoint with valid customer details, policy type, coverage amount, premium, and effective date
    // Expected: API request should be sent
    const policyPayload = {
      customerDetails: {
        customerId: 'CUST-001',
        customerName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890'
      },
      policyType: 'COMPREHENSIVE',
      coverageAmount: 100000,
      premium: 1200,
      effectiveDate: new Date().toISOString().split('T')[0]
    };

    const apiContext = await request.newContext();
    const response = await apiContext.post('/api/policy/create', {
      data: policyPayload,
      headers: {
        'Content-Type': 'application/json'
      }
    });

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

    await apiContext.dispose();
  });
});
