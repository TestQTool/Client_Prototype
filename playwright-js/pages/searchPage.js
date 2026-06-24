import BasePage from './basePage.js';
import { expect } from '@playwright/test';
import { searchPageLocators } from '../pageObjects/searchPage.js';

class SearchPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Navigation Methods
  async navigateToHomepage() {
    await this.open('/');
    return await super.waitForPageLoad();
  }

  async navigateToProductListingPage() {
    await this.open('/products');
    return await super.waitForPageLoad();
  }

  async navigateToProductDetailPage(productId = '1') {
    await this.open(`/product/${productId}`);
    return await super.waitForPageLoad();
  }

  // Search Bar Visibility Methods
  async verifySearchBarVisible() {
    await this.wait();
    await expect(this.page.locator(searchPageLocators.searchInput).first()).toBeVisible();
  }

  async verifySearchBarAccessible() {
    await this.wait();
    const searchInput = this.page.locator(searchPageLocators.searchInput).first();
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeEnabled();
  }

  async verifySearchBarPlaceholder() {
    await this.wait();
    const searchInput = this.page.locator(searchPageLocators.searchInput).first();
    const placeholder = await searchInput.getAttribute('placeholder');
    expect(placeholder).toBeTruthy();
  }

  async verifySearchBarAcceptsInput() {
    await this.wait();
    const searchInput = this.page.locator(searchPageLocators.searchInput).first();
    await expect(searchInput).toBeEditable();
  }

  // Search Action Methods
  async enterSearchKeyword(keyword) {
    await this.waitAndFill(searchPageLocators.searchInput, keyword);
  }

  async clickSearchButton() {
    await this.waitAndClick(searchPageLocators.searchButton);
    await super.waitforNetworkIdle();
  }

  async performSearch(keyword) {
    await this.enterSearchKeyword(keyword);
    await this.clickSearchButton();
  }

  async performSearchWithEnter(keyword) {
    await this.waitAndFill(searchPageLocators.searchInput, keyword);
    await this.page.locator(searchPageLocators.searchInput).first().press('Enter');
    await super.waitforNetworkIdle();
  }

  // Search Results Verification Methods
  async verifySearchResultsDisplayed() {
    await this.wait();
    await expect(this.page.locator(searchPageLocators.searchResults).first()).toBeVisible();
  }

  async verifyResultsContainKeyword(keyword) {
    await this.wait();
    const results = await this.page.locator(searchPageLocators.resultItems).all();
    expect(results.length).toBeGreaterThan(0);
    
    for (const result of results) {
      const text = await result.textContent();
      expect(text.toLowerCase()).toContain(keyword.toLowerCase());
    }
  }

  async verifyNoResultsMessage() {
    await this.wait();
    await expect(this.page.locator(searchPageLocators.noResultsMessage).first()).toBeVisible();
  }

  async verifyNoProductsDisplayed() {
    await this.wait();
    const resultCount = await this.page.locator(searchPageLocators.resultItems).count();
    expect(resultCount).toBe(0);
  }

  async verifyProductDataAttributes() {
    await this.wait();
    const firstProduct = this.page.locator(searchPageLocators.resultItems).first();
    await expect(firstProduct.locator(searchPageLocators.productName).first()).toBeVisible();
    await expect(firstProduct.locator(searchPageLocators.productPrice).first()).toBeVisible();
    await expect(firstProduct.locator(searchPageLocators.productDescription).first()).toBeVisible();
  }

  // Performance Verification Methods
  async verifyResultsDisplayedWithinTime(maxSeconds) {
    const startTime = Date.now();
    await this.verifySearchResultsDisplayed();
    const endTime = Date.now();
    const elapsedSeconds = (endTime - startTime) / 1000;
    expect(elapsedSeconds).toBeLessThanOrEqual(maxSeconds);
  }

  async measureSearchResponseTime() {
    const startTime = Date.now();
    await this.page.locator(searchPageLocators.searchResults).first().waitFor({ state: 'visible', timeout: 10000 });
    const endTime = Date.now();
    return (endTime - startTime) / 1000;
  }

  // Special Character and Edge Case Methods
  async verifySystemHandlesInputGracefully() {
    await this.wait();
    const hasError = await this.page.locator('text=/error|exception|crash/i').count() > 0;
    expect(hasError).toBe(false);
  }

  async verifyAppropriateResponseDisplayed() {
    await this.wait();
    const hasResults = await this.page.locator(searchPageLocators.searchResults).count() > 0;
    const hasNoResultsMsg = await this.page.locator(searchPageLocators.noResultsMessage).count() > 0;
    expect(hasResults || hasNoResultsMsg).toBe(true);
  }

  // Multi-Page Search Verification
  async verifySearchWorksFromCurrentPage() {
    await this.verifySearchBarVisible();
    await this.verifySearchResultsDisplayed();
  }
}

export default SearchPage;

