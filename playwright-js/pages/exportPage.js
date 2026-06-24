import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import { EXPORT_PAGE } from '../pageObjects/exportPage.js';
import * as fs from 'fs';
import * as path from 'path';

class ExportPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async verifyExportButtonVisible() {
    await this.wait();
    const isVisible = await this.isElementVisible(EXPORT_PAGE.exportButton);
    expect(isVisible).toBeTruthy();
  }

  async verifyExportButtonDisabled() {
    await this.wait();
    const exportButton = this.page.locator(EXPORT_PAGE.exportButton);
    await expect(exportButton).toBeDisabled();
  }

  async clickExportButton() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.waitAndClick(EXPORT_PAGE.exportButton);
    return downloadPromise;
  }

  async clickExportButtonWithTiming() {
    const startTime = Date.now();
    const download = await this.clickExportButton();
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    return { download, duration };
  }

  async verifyDownloadedFileExtension(download, expectedExtension) {
    const fileName = download.suggestedFilename();
    const fileExtension = path.extname(fileName);
    expect(fileExtension).toBe(expectedExtension);
  }

  async verifyDownloadedFileNameContains(download, ...expectedParts) {
    const fileName = download.suggestedFilename();
    for (const part of expectedParts) {
      expect(fileName.toLowerCase()).toContain(part.toLowerCase());
    }
  }

  async saveDownloadedFile(download, savePath) {
    await download.saveAs(savePath);
    expect(fs.existsSync(savePath)).toBeTruthy();
    return savePath;
  }

  async verifyFileIsValidXlsx(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    expect(fileBuffer.length).toBeGreaterThan(0);
    // Verify XLSX file signature (PK header for ZIP-based format)
    const header = fileBuffer.slice(0, 4).toString('hex');
    expect(header).toBe('504b0304'); // PK ZIP signature
  }

  async getReportColumnHeaders() {
    await this.wait();
    const headers = await this.page.locator(EXPORT_PAGE.reportTableHeaders).allTextContents();
    return headers.filter(h => h.trim().length > 0);
  }

  async getReportRowCount() {
    await this.wait();
    const count = await this.getCount(EXPORT_PAGE.reportTableRows);
    return count;
  }

  async verifyNoRecordsMessage() {
    await this.wait();
    const message = await this.page.locator(EXPORT_PAGE.noRecordsMessage).textContent();
    expect(message).toContain('No Records Found');
  }

  async fillDateFilter(fromDate, toDate) {
    if (fromDate) {
      await this.waitAndFill(EXPORT_PAGE.dateFromInput, fromDate);
    }
    if (toDate) {
      await this.waitAndFill(EXPORT_PAGE.dateToInput, toDate);
    }
  }

  async clickSearchButton() {
    await this.waitAndClick(EXPORT_PAGE.searchButton);
    await super.waitforNetworkIdle();
  }

  async performMultipleExports(count, intervalMs = 5000) {
    const downloads = [];
    for (let i = 0; i < count; i++) {
      const download = await this.clickExportButton();
      downloads.push(download);
      if (i < count - 1) {
        await this.page.waitForTimeout(intervalMs);
      }
    }
    return downloads;
  }

  async verifyDownloadCompletionTime(duration, maxSeconds) {
    expect(duration).toBeLessThanOrEqual(maxSeconds);
  }

  async makeApiExportRequest(endpoint, authToken, method = 'GET', body = null) {
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };
    
    if (body && method === 'POST') {
      headers['Content-Type'] = 'application/json';
    }

    const response = await this.page.request[method.toLowerCase()](endpoint, {
      headers,
      data: body
    });

    return response;
  }

  async verifyApiResponseStatus(response, expectedStatus) {
    expect(response.status()).toBe(expectedStatus);
  }

  async verifyApiResponseContentType(response, expectedContentType) {
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain(expectedContentType);
  }

  async verifyApiResponseContentDisposition(response) {
    const contentDisposition = response.headers()['content-disposition'];
    expect(contentDisposition).toBeDefined();
    expect(contentDisposition).toContain('attachment');
    expect(contentDisposition).toContain('.xlsx');
  }

  async verifyApiResponseBinaryData(response) {
    const buffer = await response.body();
    expect(buffer.length).toBeGreaterThan(0);
  }

  async makeConcurrentApiRequests(endpoint, authToken, count, method = 'GET') {
    const requests = [];
    for (let i = 0; i < count; i++) {
      requests.push(this.makeApiExportRequest(endpoint, authToken, method));
    }
    const responses = await Promise.all(requests);
    return responses;
  }

  async measureApiResponseTime(endpoint, authToken, method = 'GET') {
    const startTime = Date.now();
    const response = await this.makeApiExportRequest(endpoint, authToken, method);
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    return { response, duration };
  }

  async verifyApiRateLimitResponse(response) {
    expect(response.status()).toBe(429);
  }

  async verifyApiUnauthorizedResponse(response) {
    expect(response.status()).toBe(401);
  }

  async verifyApiForbiddenResponse(response) {
    expect(response.status()).toBe(403);
  }

  async verifyApiBadRequestResponse(response) {
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty('error');
  }

  async navigateToOtherPage(url) {
    await this.page.goto(url);
    await super.waitForPageLoad();
  }

  async verifyPageResponsive() {
    await this.wait();
    const isVisible = await this.isElementVisible(EXPORT_PAGE.reportContainer);
    expect(isVisible).toBeTruthy();
  }
}

export default ExportPage;

