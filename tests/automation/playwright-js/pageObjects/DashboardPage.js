const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardContainer = page.locator('[data-testid="dashboard-container"]');
    this.analyticsWidget = page.locator('[data-testid="analytics-widget"]');
    this.realTimeDataSection = page.locator('[data-testid="real-time-data"]');
    this.refreshButton = page.locator('[data-testid="refresh-btn"]');
    this.dataLoadingSpinner = page.locator('[data-testid="loading-spinner"]');
    this.chartContainer = page.locator('[data-testid="chart-container"]');
    this.dataMetrics = page.locator('[data-testid="data-metrics"]');
    this.filterDropdown = page.locator('[data-testid="filter-dropdown"]');
    this.dateRangePicker = page.locator('[data-testid="date-range-picker"]');
    this.exportButton = page.locator('[data-testid="export-btn"]');
    this.lastUpdatedTimestamp = page.locator('[data-testid="last-updated"]');
  }

  async navigate(baseUrl) {
    await this.page.goto(`${baseUrl}/dashboard`);
  }

  async verifyDashboardLoaded() {
    await expect(this.dashboardContainer).toBeVisible();
  }

  async verifyRealTimeDataSectionVisible() {
    await expect(this.realTimeDataSection).toBeVisible();
  }

  async verifyAnalyticsWidgetDisplayed() {
    await expect(this.analyticsWidget).toBeVisible();
  }

  async clickRefreshData() {
    await this.refreshButton.click();
  }

  async waitForDataLoad() {
    await this.dataLoadingSpinner.waitFor({ state: 'hidden', timeout: 30000 });
  }

  async verifyChartContainerVisible() {
    await expect(this.chartContainer).toBeVisible();
  }

  async verifyDataMetricsDisplayed() {
    await expect(this.dataMetrics).toBeVisible();
  }

  async selectFilter(filterOption) {
    await this.filterDropdown.click();
    await this.page.locator(`[data-testid="filter-option-${filterOption}"]`).click();
  }

  async selectDateRange(startDate, endDate) {
    await this.dateRangePicker.click();
    await this.page.locator('[data-testid="start-date-input"]').fill(startDate);
    await this.page.locator('[data-testid="end-date-input"]').fill(endDate);
    await this.page.locator('[data-testid="apply-date-range"]').click();
  }

  async clickExport() {
    await this.exportButton.click();
  }

  async getLastUpdatedTimestamp() {
    return await this.lastUpdatedTimestamp.textContent();
  }

  async verifyDataRefreshed(previousTimestamp) {
    const currentTimestamp = await this.getLastUpdatedTimestamp();
    expect(currentTimestamp).not.toBe(previousTimestamp);
  }
}

module.exports = { DashboardPage };
