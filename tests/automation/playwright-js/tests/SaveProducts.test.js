const { test, expect } = require('@playwright/test');
const { SaveProductsPage } = require('../pageObjects/SaveProductsPage');

test.describe('Save Products Feature', () => {
  let saveProductsPage;
  const baseUrl = process.env.BASE_URL || 'https://qentrix.example.com';

  test.beforeEach(async ({ page }) => {
    saveProductsPage = new SaveProductsPage(page);
  });

  test('should allow registered customer to save a product', async ({ page }) => {
    await saveProductsPage.navigateToProducts(baseUrl);
    
    const productName = await saveProductsPage.getProductTitleByIndex(0);
    await saveProductsPage.saveProductByIndex(0);
    await saveProductsPage.verifySaveConfirmation();
    
    await saveProductsPage.goToSavedProducts();
    await saveProductsPage.verifyProductInSavedList(productName);
  });

  test('should display saved products in saved list', async ({ page }) => {
    await saveProductsPage.navigateToProducts(baseUrl);
    
    await saveProductsPage.saveProductByIndex(0);
    await saveProductsPage.saveProductByIndex(1);
    
    await saveProductsPage.goToSavedProducts();
    const savedCount = await saveProductsPage.getSavedProductsCount();
    expect(savedCount).toBeGreaterThanOrEqual(2);
  });

  test('should allow customer to remove product from saved list', async ({ page }) => {
    await saveProductsPage.navigateToProducts(baseUrl);
    
    const productName = await saveProductsPage.getProductTitleByIndex(0);
    await saveProductsPage.saveProductByIndex(0);
    
    await saveProductsPage.goToSavedProducts();
    await saveProductsPage.verifyProductInSavedList(productName);
    
    await saveProductsPage.removeProductFromSaved(productName);
    await saveProductsPage.verifyProductRemovedFromSaved(productName);
  });

  test('should display empty state when no products are saved', async ({ page }) => {
    await saveProductsPage.navigateToSavedProducts(baseUrl);
    await saveProductsPage.verifyEmptyStateDisplayed();
  });

  test('should save product by product name', async ({ page }) => {
    await saveProductsPage.navigateToProducts(baseUrl);
    
    const productName = await saveProductsPage.getProductTitleByIndex(2);
    await saveProductsPage.saveProductByName(productName);
    await saveProductsPage.verifySaveConfirmation();
    
    await saveProductsPage.goToSavedProducts();
    await saveProductsPage.verifyProductInSavedList(productName);
  });
});
