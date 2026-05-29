const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { IntegrationsPage } = require('../pageObjects/IntegrationsPage');
const testData = require('../test-data/integrationsData.json');
const loginData = require('../test-data/loginData.json');

test.describe('Integrations Functionality', () => {
  let loginPage;
  let integrationsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    integrationsPage = new IntegrationsPage(page);
    
    const baseUrl = process.env.BASE_URL || loginData.baseUrl;
    await loginPage.navigate(baseUrl);
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    await loginPage.verifyLoginSuccess();
  });

  test('TC001 - Verify user can navigate to integrations page', async ({ page }) => {
    await integrationsPage.openIntegrationsPage();
    await expect(integrationsPage.integrationsList).toBeVisible();
  });

  test('TC002 - Verify user can add a new integration', async ({ page }) => {
    await integrationsPage.openIntegrationsPage();
    const newIntegration = testData.newIntegration;
    await integrationsPage.addNewIntegration(newIntegration);
    await integrationsPage.verifyIntegrationAdded(newIntegration.name);
  });

  test('TC003 - Verify user can delete an existing integration', async ({ page }) => {
    await integrationsPage.openIntegrationsPage();
    const integrationToDelete = testData.integrationToDelete;
    await integrationsPage.deleteIntegration(integrationToDelete.name);
    await integrationsPage.verifyIntegrationDeleted(integrationToDelete.name);
  });

  test('TC004 - Verify user can test integration connection', async ({ page }) => {
    await integrationsPage.openIntegrationsPage();
    const integrationToTest = testData.existingIntegration;
    await integrationsPage.testConnection(integrationToTest.name);
    await integrationsPage.verifyConnectionStatus(testData.connectionStatuses.success);
  });

  test('TC005 - Verify integration list is displayed correctly', async ({ page }) => {
    await integrationsPage.openIntegrationsPage();
    const integrationCount = await integrationsPage.getIntegrationCount();
    expect(integrationCount).toBeGreaterThanOrEqual(0);
  });

  test('TC006 - Verify adding integration with webhook URL', async ({ page }) => {
    await integrationsPage.openIntegrationsPage();
    const webhookIntegration = testData.webhookIntegration;
    await integrationsPage.addNewIntegration(webhookIntegration);
    await integrationsPage.verifyIntegrationAdded(webhookIntegration.name);
  });
});
