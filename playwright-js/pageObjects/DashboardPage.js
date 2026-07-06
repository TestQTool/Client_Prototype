class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardHeader = page.locator('h6:has-text("Dashboard")');
    this.dashboardContainer = page.locator('.oxd-topbar-header-breadcrumb');
  }

  async isDashboardDisplayed() {
    await this.dashboardHeader.waitFor({ state: 'visible', timeout: 10000 });
    return await this.dashboardHeader.isVisible();
  }

  async verifyDashboardPage() {
    const isDisplayed = await this.isDashboardDisplayed();
    return isDisplayed;
  }
}

module.exports = DashboardPage;