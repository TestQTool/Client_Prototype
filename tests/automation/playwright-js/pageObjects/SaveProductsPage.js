const { expect } = require('@playwright/test');

class SaveProductsPage {
  constructor(page) {
    this.page = page;
    this.productCard = page.locator('[data-testid="product-card"]');
    this.saveProductButton = page.locator('[data-testid="save-product-btn"]');
    this.savedProductsLink = page.locator('[data-testid="saved-products-link"]');
    this.savedProductsList = page.locator('[data-testid="saved-products-list"]');
    this.savedProductItem = page.locator('[data-testid="saved-product-item"]');
    this.removeFromSavedButton = page.locator('[data-testid="remove-saved-btn"]');
    this.saveConfirmationMessage = page.locator('[data-testid="save-confirmation"]');
    this.emptyStateMessage = page.locator('[data-testid="empty-saved-products"]');
    this.productTitle = page.locator('[data-testid="product-title"]');
  }

  async navigateToProducts(baseUrl) {
    await this.page.goto(`${baseUrl}/products`);
    await this.productCard.first().waitFor({ state: 'visible' });
  }

  async navigateToSavedProducts(baseUrl) {
    await this.page.goto(`${baseUrl}/saved-products`);
  }

  async saveProductByIndex(index) {
    const saveButton = this.productCard.nth(index).locator('[data-testid="save-product-btn"]');
    await saveButton.click();
  }

  async saveProductByName(productName) {
    const productCard = this.page.locator(`[data-testid="product-card"]:has-text("${productName}")`);
    await productCard.locator('[data-testid="save-product-btn"]').click();
  }

  async verifySaveConfirmation() {
    await expect(this.saveConfirmationMessage).toBeVisible();
  }

  async goToSavedProducts() {
    await this.savedProductsLink.click();
    await this.savedProductsList.waitFor({ state: 'visible' });
  }

  async getSavedProductsCount() {
    return await this.savedProductItem.count();
  }

  async verifyProductInSavedList(productName) {
    const savedProduct = this.savedProductItem.filter({ hasText: productName });
    await expect(savedProduct).toBeVisible();
  }

  async removeProductFromSaved(productName) {
    const savedProduct = this.savedProductItem.filter({ hasText: productName });
    await savedProduct.locator('[data-testid="remove-saved-btn"]').click();
  }

  async verifyProductRemovedFromSaved(productName) {
    const savedProduct = this.savedProductItem.filter({ hasText: productName });
    await expect(savedProduct).not.toBeVisible();
  }

  async verifyEmptyStateDisplayed() {
    await expect(this.emptyStateMessage).toBeVisible();
  }

  async getProductTitleByIndex(index) {
    return await this.productCard.nth(index).locator('[data-testid="product-title"]').textContent();
  }
}

module.exports = { SaveProductsPage };
