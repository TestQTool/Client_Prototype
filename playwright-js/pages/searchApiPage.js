import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import { searchApiEndpoints } from '../pageObjects/searchApiPage.js';

class SearchApiPage extends BasePage {
  constructor(page) {
    super(page);
    this.baseApiUrl = process.env.BASE_URL || 'http://localhost:3000';
  }

  // API Request Methods
  async sendSearchRequest(keyword, options = {}) {
    const url = `${this.baseApiUrl}${searchApiEndpoints.searchEndpoint}?${searchApiEndpoints.keywordParam}=${encodeURIComponent(keyword)}`;
    const response = await this.page.request.get(url, {
      headers: options.headers || {},
      timeout: options.timeout || 10000
    });
    return response;
  }

  async sendAuthenticatedSearchRequest(keyword, token) {
    return await this.sendSearchRequest(keyword, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async sendUnauthenticatedSearchRequest(keyword) {
    return await this.sendSearchRequest(keyword);
  }

  async sendSearchRequestWithEmptyQuery() {
    const url = `${this.baseApiUrl}${searchApiEndpoints.searchEndpoint}?${searchApiEndpoints.keywordParam}=`;
    return await this.page.request.get(url);
  }

  async sendMaliciousSearchRequest(payload) {
    return await this.sendSearchRequest(payload);
  }

  // Response Verification Methods
  async verifyResponseStatusCode(response, expectedCode) {
    expect(response.status()).toBe(expectedCode);
  }

  async verifyResponseContainsProducts(response, keyword) {
    const body = await response.json();
    const products = body.products || body.results || body.data || [];
    expect(products.length).toBeGreaterThan(0);
    
    for (const product of products) {
      const name = product.name || product.title || '';
      expect(name.toLowerCase()).toContain(keyword.toLowerCase());
    }
  }

  async verifyResponseContainsExactProduct(response, productName) {
    const body = await response.json();
    const products = body.products || body.results || body.data || [];
    const foundProduct = products.find(p => (p.name || p.title || '').toLowerCase() === productName.toLowerCase());
    expect(foundProduct).toBeDefined();
  }

  async verifyProductAttributes(response) {
    const body = await response.json();
    const products = body.products || body.results || body.data || [];
    expect(products.length).toBeGreaterThan(0);
    
    const firstProduct = products[0];
    expect(firstProduct.name || firstProduct.title).toBeDefined();
    expect(firstProduct.price).toBeDefined();
    expect(firstProduct.description).toBeDefined();
  }

  async verifyEmptyResults(response) {
    const body = await response.json();
    const products = body.products || body.results || body.data || [];
    expect(products.length).toBe(0);
  }

  async verifyResponseTime(response, maxSeconds) {
    const timing = response.headers()['x-response-time'] || '0';
    const responseTime = parseFloat(timing) / 1000;
    expect(responseTime).toBeLessThanOrEqual(maxSeconds);
  }

  async verifyContentTypeHeader(response) {
    const contentType = response.headers()[searchApiEndpoints.contentTypeHeader];
    expect(contentType).toContain('application/json');
  }

  async verifyValidJsonResponse(response) {
    const body = await response.json();
    expect(body).toBeDefined();
  }

  async verifyNoServerError(response) {
    const body = await response.text();
    expect(body.toLowerCase()).not.toContain('error');
    expect(body.toLowerCase()).not.toContain('exception');
    expect(response.status()).not.toBeGreaterThanOrEqual(500);
  }

  async verifyAuthenticationError(response) {
    expect(response.status()).toBe(searchApiEndpoints.statusCodes.unauthorized);
    const body = await response.json();
    expect(body.message || body.error).toBeDefined();
  }

  async verifyInputSanitization(response) {
    const body = await response.text();
    expect(body).not.toContain('/etc/passwd');
    expect(body).not.toContain('../');
  }

  async verifyXssBlocked(response) {
    const body = await response.text();
    expect(body).not.toContain('<script>');
    expect(body).not.toContain('alert(');
  }

  async verifySqlInjectionBlocked(response) {
    const body = await response.text();
    expect(body.toLowerCase()).not.toContain('sql');
    expect(body.toLowerCase()).not.toContain('database error');
  }

  async verifyRateLimitEnforced(response) {
    expect(response.status()).toBe(searchApiEndpoints.statusCodes.tooManyRequests);
  }

  async verifyRoleBasedResults(response, allowedProducts) {
    const body = await response.json();
    const products = body.products || body.results || body.data || [];
    
    for (const product of products) {
      const productId = product.id || product.productId;
      expect(allowedProducts).toContain(productId);
    }
  }

  // Performance Testing Methods
  async measureSingleRequestTime(keyword) {
    const startTime = Date.now();
    const response = await this.sendSearchRequest(keyword);
    const endTime = Date.now();
    const responseTime = (endTime - startTime) / 1000;
    return { response, responseTime };
  }

  async sendConcurrentRequests(keyword, count) {
    const requests = [];
    for (let i = 0; i < count; i++) {
      requests.push(this.sendSearchRequest(keyword));
    }
    return await Promise.all(requests);
  }

  async measureAverageResponseTime(responses, startTimes, endTimes) {
    const responseTimes = responses.map((_, index) => (endTimes[index] - startTimes[index]) / 1000);
    const average = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    const min = Math.min(...responseTimes);
    const max = Math.max(...responseTimes);
    return { average, min, max, responseTimes };
  }

  async verifyConcurrentLoadHandling(responses, expectedSuccessRate = 0.95) {
    const successCount = responses.filter(r => r.status() === 200).length;
    const successRate = successCount / responses.length;
    expect(successRate).toBeGreaterThanOrEqual(expectedSuccessRate);
  }

  async sendSequentialRequests(keyword, count) {
    const results = [];
    for (let i = 0; i < count; i++) {
      const startTime = Date.now();
      const response = await this.sendSearchRequest(keyword);
      const endTime = Date.now();
      results.push({ response, responseTime: (endTime - startTime) / 1000 });
    }
    return results;
  }

  async sendContinuousRequestsForDuration(keyword, durationSeconds) {
    const startTime = Date.now();
    const endTime = startTime + (durationSeconds * 1000);
    let requestCount = 0;
    let successCount = 0;

    while (Date.now() < endTime) {
      const response = await this.sendSearchRequest(keyword);
      requestCount++;
      if (response.status() === 200) {
        successCount++;
      }
    }

    const actualDuration = (Date.now() - startTime) / 1000;
    const throughput = requestCount / actualDuration;
    return { requestCount, successCount, throughput, duration: actualDuration };
  }

  async verifyThroughput(throughput, minRequestsPerSecond) {
    expect(throughput).toBeGreaterThanOrEqual(minRequestsPerSecond);
  }

  async verifySystemRecovery(keyword) {
    const { response, responseTime } = await this.measureSingleRequestTime(keyword);
    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThanOrEqual(3);
  }
}

export default SearchApiPage;

