const { BasePage } = require('./BasePage');

class ADOIntegrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    
    // Locators for ADO Integration
    this.integrationsMenu = page.locator('[data-testid="integrations-menu"]');
    this.adoIntegrationOption = page.locator('[data-testid="ado-integration-option"]');
    this.adoConfigSection = page.locator('[data-testid="ado-config-section"]');
    this.organizationUrlInput = page.locator('[data-testid="organization-url-input"]');
    this.projectNameInput = page.locator('[data-testid="project-name-input"]');
    this.patTokenInput = page.locator('[data-testid="pat-token-input"]');
    this.connectButton = page.locator('[data-testid="connect-ado-btn"]');
    this.disconnectButton = page.locator('[data-testid="disconnect-ado-btn"]');
    this.syncButton = page.locator('[data-testid="sync-ado-btn"]');
    this.connectionStatus = page.locator('[data-testid="ado-connection-status"]');
    this.successMessage = page.locator('[data-testid="success-message"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
    this.workItemsTable = page.locator('[data-testid="work-items-table"]');
    this.saveConfigButton = page.locator('[data-testid="save-config-btn"]');
    this.testConnectionButton = page.locator('[data-testid="test-connection-btn"]');
  }

  async navigateToIntegrations() {
    await this.click(this.integrationsMenu);
    await this.waitForElement(this.adoIntegrationOption);
  }

  async selectADOIntegration() {
    await this.click(this.adoIntegrationOption);
    await this.waitForElement(this.adoConfigSection);
  }

  async configureADOConnection(organizationUrl, projectName, patToken) {
    await this.fill(this.organizationUrlInput, organizationUrl);
    await this.fill(this.projectNameInput, projectName);
    await this.fill(this.patTokenInput, patToken);
  }

  async testConnection() {
    await this.click(this.testConnectionButton);
    await this.waitForElement(this.connectionStatus);
  }

  async connectToADO() {
    await this.click(this.connectButton);
    await this.waitForElement(this.connectionStatus);
  }

  async disconnectFromADO() {
    await this.click(this.disconnectButton);
    await this.waitForElement(this.successMessage);
  }

  async syncWorkItems() {
    await this.click(this.syncButton);
    await this.waitForElement(this.workItemsTable);
  }

  async saveConfiguration() {
    await this.click(this.saveConfigButton);
    await this.waitForElement(this.successMessage);
  }

  async getConnectionStatus() {
    return await this.getText(this.connectionStatus);
  }

  async getSuccessMessage() {
    return await this.getText(this.successMessage);
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async isWorkItemsTableVisible() {
    return await this.isVisible(this.workItemsTable);
  }
}

module.exports = { ADOIntegrationPage };
