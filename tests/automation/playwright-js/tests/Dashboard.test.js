const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');
const loginData = require('../test-data/loginData.json');
const dashboardData = require('../test-data/dashboardData.json');

test.describe('Real-Time Data Analytics Dashboard', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    const baseUrl = process.env.BASE_URL || loginData.baseUrl;
    await loginPage.navigate(baseUrl);
    await loginPage.loginWithOtp(loginData.validUser.email, loginData.validUser.otp);
    await loginPage.verifyLoginSuccess();
  });

  test('Should display dashboard after successful login', async ({ page }) => {
    await dashboardPage.verifyDashboardLoaded();
  });

  test('Should display real-time data analytics section', async ({ page }) => {
    await dashboardPage.verifyDashboardLoaded();
    await dashboardPage.verifyRealTimeDataSectionVisible();
    await dashboardPage.verifyAnalyticsWidgetDisplayed();
  });

  test('Should display charts and data metrics', async ({ page }) => {
    await dashboardPage.verifyDashboardLoaded();
    await dashboardPage.verifyChartContainerVisible();
    await dashboardPage.verifyDataMetricsDisplayed();
  });

  test('Should refresh real-time data on button click', async ({ page }) => {
    await dashboardPage.verifyDashboardLoaded();
    const previousTimestamp = await dashboardPage.getLastUpdatedTimestamp();
    await dashboardPage.clickRefreshData();
    await dashboardPage.waitForDataLoad();
    await dashboardPage.verifyDataRefreshed(previousTimestamp);
  });

  test('Should filter analytics data by selected filter', async ({ page }) => {
    await dashboardPage.verifyDashboardLoaded();
    await dashboardPage.selectFilter(dashboardData.filters.daily);
    await dashboardPage.waitForDataLoad();
    await dashboardPage.verifyDataMetricsDisplayed();
  });

  test('Should filter data by date range', async ({ page }) => {
    await dashboardPage.verifyDashboardLoaded();
    await dashboardPage.selectDateRange(
      dashboardData.dateRange.startDate,
      dashboardData.dateRange.endDate
    );
    await dashboardPage.waitForDataLoad();
    await dashboardPage.verifyDataMetricsDisplayed();
  });

  test('Should export analytics data', async ({ page }) => {
    await dashboardPage.verifyDashboardLoaded();
    const downloadPromise = page.waitForEvent('download');
    await dashboardPage.clickExport();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain(dashboardData.exportFileName);
  });
});
