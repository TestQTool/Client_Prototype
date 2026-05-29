const { expect } = require('@playwright/test');

class IntegrationsPage {
  constructor(page) {
    this.page = page;
    this.integrationsMenu = page.locator('[data-testid="integrations-menu"]');
    this.integrationsList = page.locator('.integrations-list');
    this.addIntegrationButton = page.locator('#add-integration-btn');
    this.integrationNameInput = page.locator('#integration-name');
    this.integrationTypeDropdown = page.locator('#integration-type');
    this.apiKeyInput = page.locator('#api-key');
    this.webhookUrlInput = page.locator('#webhook-url');
    this.saveIntegrationButton = page.locator('#save-integration-btn');
    this.deleteIntegrationButton = page.locator('.delete-integration-btn');
    this.confirmDeleteButton = page.locator('#confirm-delete-btn');
    this.successMessage = page.locator('.success-message');
    this.errorMessage = page.locator('.error-message');
    this.integrationCard = page.locator('.integration-card');
    this.testConnectionButton = page.locator('#test-connection-btn');
    this.connectionStatus = page.locator('.connection-status');
  }

  async navigate(baseUrl) {
    await this.page.goto(`${baseUrl}/integrations`);
  }

  async openIntegrationsPage() {
    await this.integrationsMenu.click();
    await expect(this.integrationsList).toBeVisible();
  }

  async addNewIntegration(integrationData) {
    await this.addIntegrationButton.click();
    await this.integrationNameInput.fill(integrationData.name);
    await this.integrationTypeDropdown.selectOption(integrationData.type);
    if (integrationData.apiKey) {
      await this.apiKeyInput.fill(integrationData.apiKey);
    }
    if (integrationData.webhookUrl) {
      await this.webhookUrlInput.fill(integrationData.webhookUrl);
    }
    await this.saveIntegrationButton.click();
  }

  async verifyIntegrationAdded(integrationName) {
    await expect(this.successMessage).toBeVisible();
    const integrationCard = this.page.locator(`.integration-card:has-text("${integrationName}")`);
    await expect(integrationCard).toBeVisible();
  }

  async deleteIntegration(integrationName) {
    const integrationCard = this.page.locator(`.integration-card:has-text("${integrationName}")`);
    await integrationCard.locator('.delete-integration-btn').click();
    await this.confirmDeleteButton.click();
  }

  async verifyIntegrationDeleted(integrationName) {
    await expect(this.successMessage).toBeVisible();
    const integrationCard = this.page.locator(`.integration-card:has-text("${integrationName}")`);
    await expect(integrationCard).not.toBeVisible();
  }

  async testConnection(integrationName) {
    const integrationCard = this.page.locator(`.integration-card:has-text("${integrationName}")`);
    await integrationCard.locator('#test-connection-btn').click();
  }

  async verifyConnectionStatus(expectedStatus) {
    await expect(this.connectionStatus).toContainText(expectedStatus);
  }

  async getIntegrationCount() {
    return await this.integrationCard.count();
  }
}

module.exports = { IntegrationsPage };
