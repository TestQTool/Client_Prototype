const { expect } = require('@playwright/test');

class RealTimeDataAnalyticsDashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardContainer = page.locator('[data-testid="analytics-dashboard"]');
    this.refreshButton = page.locator('[data-testid="refresh-data-btn"]');
    this.dateRangeSelector = page.locator('[data-testid="date-range-selector"]');
    this.chartWidgets = page.locator('[data-testid="chart-widget"]');
    this.dataTable = page.locator('[data-testid="data-table"]');
    this.loadingIndicator = page.locator('[data-testid="loading-indicator"]');
    this.exportButton = page.locator('[data-testid="export-btn"]');
    this.filterDropdown = page.locator('[data-testid="filter-dropdown"]');
    this.metricsCards = page.locator('[data-testid="metrics-card"]');
    this.lastUpdatedTimestamp = page.locator('[data-testid="last-updated"]');
  }

  async navigateToDashboard(baseUrl) {
    await this.page.goto(`${baseUrl}/analytics/dashboard`);
    await this.dashboardContainer.waitFor({ state: 'visible' });
  }

  async waitForDataLoad() {
    await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 });
  }

  async refreshDashboardData() {
    await this.refreshButton.click();
    await this.waitForDataLoad();
  }

  async selectDateRange(range) {
    await this.dateRangeSelector.click();
    await this.page.locator(`[data-testid="date-option-${range}"]`).click();
    await this.waitForDataLoad();
  }

  async getChartWidgetsCount() {
    return await this.chartWidgets.count();
  }

  async getMetricsCardsCount() {
    return await this.metricsCards.count();
  }

  async verifyDashboardDisplayed() {
    await expect(this.dashboardContainer).toBeVisible();
  }

  async verifyDataTableDisplayed() {
    await expect(this.dataTable).toBeVisible();
  }

  async applyFilter(filterOption) {
    await this.filterDropdown.click();
    await this.page.locator(`[data-testid="filter-option-${filterOption}"]`).click();
    await this.waitForDataLoad();
  }

  async exportData(format) {
    await this.exportButton.click();
    await this.page.locator(`[data-testid="export-${format}"]`).click();
  }

  async getLastUpdatedTimestamp() {
    return await this.lastUpdatedTimestamp.textContent();
  }

  async verifyRealTimeUpdate() {
    const initialTimestamp = await this.getLastUpdatedTimestamp();
    await this.page.waitForTimeout(5000);
    const updatedTimestamp = await this.getLastUpdatedTimestamp();
    return initialTimestamp !== updatedTimestamp;
  }
}

module.exports = { RealTimeDataAnalyticsDashboardPage };
