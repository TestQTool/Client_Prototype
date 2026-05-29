const { BasePage } = require('./BasePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    
    // Locators
    this.dashboardHeader = page.locator('[data-testid="dashboard-header"]');
    this.userProfileMenu = page.locator('[data-testid="user-profile-menu"]');
    this.logoutButton = page.locator('[data-testid="logout-button"]');
    this.welcomeMessage = page.locator('[data-testid="welcome-message"]');
  }

  async isDashboardVisible() {
    return await this.dashboardHeader.isVisible();
  }

  async waitForDashboard() {
    await this.dashboardHeader.waitFor({ state: 'visible', timeout: 15000 });
  }

  async getWelcomeMessage() {
    return await this.welcomeMessage.textContent();
  }

  async clickUserProfileMenu() {
    await this.userProfileMenu.click();
  }

  async logout() {
    await this.clickUserProfileMenu();
    await this.logoutButton.click();
  }
}

module.exports = { DashboardPage };
