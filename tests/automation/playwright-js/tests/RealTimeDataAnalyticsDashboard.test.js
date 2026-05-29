const { test, expect } = require('@playwright/test');
const { RealTimeDataAnalyticsDashboardPage } = require('../pageObjects/RealTimeDataAnalyticsDashboardPage');

test.describe('Real-Time Data Analytics Dashboard', () => {
  let dashboardPage;
  const baseUrl = process.env.BASE_URL || 'https://qentrix.example.com';

  test.beforeEach(async ({ page }) => {
    dashboardPage = new RealTimeDataAnalyticsDashboardPage(page);
  });

  test('should display analytics dashboard with all widgets', async ({ page }) => {
    await dashboardPage.navigateToDashboard(baseUrl);
    await dashboardPage.waitForDataLoad();
    await dashboardPage.verifyDashboardDisplayed();
    
    const chartsCount = await dashboardPage.getChartWidgetsCount();
    expect(chartsCount).toBeGreaterThan(0);
    
    const metricsCount = await dashboardPage.getMetricsCardsCount();
    expect(metricsCount).toBeGreaterThan(0);
  });

  test('should refresh dashboard data on demand', async ({ page }) => {
    await dashboardPage.navigateToDashboard(baseUrl);
    await dashboardPage.waitForDataLoad();
    
    const initialTimestamp = await dashboardPage.getLastUpdatedTimestamp();
    await dashboardPage.refreshDashboardData();
    const newTimestamp = await dashboardPage.getLastUpdatedTimestamp();
    
    expect(newTimestamp).not.toBe(initialTimestamp);
  });

  test('should filter data by date range', async ({ page }) => {
    await dashboardPage.navigateToDashboard(baseUrl);
    await dashboardPage.waitForDataLoad();
    
    await dashboardPage.selectDateRange('last-7-days');
    await dashboardPage.verifyDataTableDisplayed();
  });

  test('should apply filters to dashboard data', async ({ page }) => {
    await dashboardPage.navigateToDashboard(baseUrl);
    await dashboardPage.waitForDataLoad();
    
    await dashboardPage.applyFilter('category-sales');
    await dashboardPage.verifyDashboardDisplayed();
  });

  test('should display data table with analytics', async ({ page }) => {
    await dashboardPage.navigateToDashboard(baseUrl);
    await dashboardPage.waitForDataLoad();
    
    await dashboardPage.verifyDataTableDisplayed();
  });
});
