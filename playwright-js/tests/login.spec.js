const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const testData = require('../config/testData');

test.describe('Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('[560] Verify that login works with valid credentials', async ({ page }) => {
    // QENTRIX_REQUIREMENT_SIGNATURE:ed6d926493b275d452fc7d2302f1ee3ac5d62aa3ec1a11d793c91f721342c865
    // Send POST request to /login endpoint – Request should be accepted
    // Include valid username in request body – Username should be processed
    // Include valid password in request body – Password should be processed
    // Submit authentication request – Response should return 200 status code
    // Validate response contains authentication token – Token should be present in response
    
    const response = await loginPage.loginViaAPI(
      testData.validCredentials.username,
      testData.validCredentials.password
    );
    
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.token).toBeDefined();
    expect(responseBody.token).not.toBe('');
  });

  test('[561] Verify that login fails with invalid username', async ({ page }) => {
    // QENTRIX_REQUIREMENT_SIGNATURE:ed6d926493b275d452fc7d2302f1ee3ac5d62aa3ec1a11d793c91f721342c865
    // Send POST request to /login endpoint – Request should be accepted
    // Include invalid username in request body – Username should be processed
    // Include valid password in request body – Password should be processed
    // Submit authentication request – Response should return 401 status code
    // Validate error message in response – Error message should indicate invalid credentials
    
    const response = await loginPage.loginViaAPI(
      testData.invalidCredentials.username,
      testData.validCredentials.password
    );
    
    expect(response.status()).toBe(401);
    const responseBody = await response.json();
    expect(responseBody.error).toBeDefined();
    expect(responseBody.error.toLowerCase()).toContain('invalid');
  });

  test('[562] Verify that login fails with invalid password', async ({ page }) => {
    // QENTRIX_REQUIREMENT_SIGNATURE:ed6d926493b275d452fc7d2302f1ee3ac5d62aa3ec1a11d793c91f721342c865
    // Send POST request to /login endpoint – Request should be accepted
    // Include valid username in request body – Username should be processed
    // Include invalid password in request body – Password should be processed
    // Submit authentication request – Response should return 401 status code
    // Validate error message in response – Error message should indicate invalid credentials
    
    const response = await loginPage.loginViaAPI(
      testData.validCredentials.username,
      testData.invalidCredentials.password
    );
    
    expect(response.status()).toBe(401);
    const responseBody = await response.json();
    expect(responseBody.error).toBeDefined();
    expect(responseBody.error.toLowerCase()).toContain('invalid');
  });

  test('[563] Verify that login fails with empty username', async ({ page }) => {
    // QENTRIX_REQUIREMENT_SIGNATURE:ed6d926493b275d452fc7d2302f1ee3ac5d62aa3ec1a11d793c91f721342c865
    // Send POST request to /login endpoint – Request should be accepted
    // Include empty username field in request body – Empty username should be processed
    // Include valid password in request body – Password should be processed
    // Submit authentication request – Response should return 400 status code
    // Validate error message indicates missing username – Appropriate error message should be returned
    
    const response = await loginPage.loginViaAPI(
      '',
      testData.validCredentials.password
    );
    
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.error).toBeDefined();
    expect(responseBody.error.toLowerCase()).toMatch(/username|required|missing/);
  });

  test('[564] TC_Verify that login fails with empty password', async ({ page }) => {
    // QENTRIX_REQUIREMENT_SIGNATURE:ed6d926493b275d452fc7d2302f1ee3ac5d62aa3ec1a11d793c91f721342c865
    // Send POST request to /login endpoint – Request should be accepted
    // Include valid username in request body – Username should be processed
    // Include empty password field in request body – Empty password should be processed
    // Submit authentication request – Response should return 400 status code
    // Validate error message indicates missing password – Appropriate error message should be returned
    
    const response = await loginPage.loginViaAPI(
      testData.validCredentials.username,
      ''
    );
    
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.error).toBeDefined();
    expect(responseBody.error.toLowerCase()).toMatch(/password|required|missing/);
  });

  test('[21] Verify that login works with valid credentials', async ({ page }) => {
    // QENTRIX_REQUIREMENT_SIGNATURE:27a70992aeca6717876a277becd2a225d2e2e4d6e9cf7dbf01cc905f5442f1f8
    // Open login page – Login page should display
    // Enter valid username – Username accepted
    // Enter valid password – Password accepted
    // Click login button – User should login successfully
    
    await loginPage.navigate();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    
    await loginPage.fillUsername(testData.validCredentials.username);
    await loginPage.fillPassword(testData.validCredentials.password);
    await loginPage.clickLogin();
    
    // Wait for navigation or success indicator
    await page.waitForURL(/dashboard|home|welcome/, { timeout: 10000 }).catch(() => {});
    
    // Verify successful login (adjust selector based on actual application)
    const isLoggedIn = await page.locator('body').evaluate(() => {
      return !window.location.pathname.includes('/login');
    });
    expect(isLoggedIn).toBeTruthy();
  });

  test('[22] To Test Login Form with Invalid Data', async ({ page }) => {
    // Navigate to 192.168.10.124:4001 – System should display a Login Page with the Email, Password fields, Login button and Register Hyperlink
    // enter username and password – system should accept the username and password
    
    await loginPage.navigate();
    
    // Verify login page elements
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.registerLink).toBeVisible();
    
    // Enter invalid credentials
    await loginPage.fillUsername(testData.invalidCredentials.username);
    await loginPage.fillPassword(testData.invalidCredentials.password);
    await loginPage.clickLogin();
    
    // Verify error message or failed login
    await page.waitForTimeout(2000);
    const isStillOnLoginPage = await page.locator('input[name="username"], input[name="email"]').isVisible();
    expect(isStillOnLoginPage).toBeTruthy();
  });

  test('[23] To Test Login Form with Invalid Data', async ({ page }) => {
    // Generic invalid login test
    await loginPage.navigate();
    await loginPage.login(
      testData.invalidCredentials.username,
      testData.invalidCredentials.password
    );
    
    // Verify login failed
    await page.waitForTimeout(2000);
    const currentUrl = page.url();
    expect(currentUrl).toContain('login');
  });

  test('[24] To Test Login Form with Invalid Data', async ({ page }) => {
    // Another invalid login scenario
    await loginPage.navigate();
    await loginPage.login(
      'invalid@test.com',
      'InvalidPassword123'
    );
    
    // Verify still on login page
    await page.waitForTimeout(2000);
    await expect(loginPage.usernameInput).toBeVisible();
  });

  test('[25] test import 01', async ({ page }) => {
    // Generic test case - basic login page validation
    await loginPage.navigate();
    
    // Verify page loaded correctly
    await expect(page).toHaveTitle(/login|sign|auth/i);
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});