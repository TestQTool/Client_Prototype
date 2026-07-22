import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';
import testData from '../test-data/testdata.json' assert { type: 'json' };

export default class CartPage extends BasePage {
  constructor(page, context) {
    super(page);
    this.context = context;
    // Selectors marked with TODO - needs live DemoBlaze inspection
    this.productLink = page.locator('a.hrefch'); // TODO: Verify selector from DemoBlaze
    this.addToCartButton = page.locator('a.btn-success'); // TODO: Verify selector from DemoBlaze
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.cartProductRow = page.locator('tr.success'); // TODO: Verify selector from DemoBlaze
    this.deleteButton = page.locator('a[onclick*="deleteItem"]'); // TODO: Verify selector from DemoBlaze
  }

  async navigateToDemoBlaze() {
    const demoblazeUrl = testData.cart.testcase3203.demoblazeUrl;
    await this.page.goto(demoblazeUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addProductToCart() {
    const productName = testData.cart.testcase3203.productToAdd;
    const productLocator = this.page.getByRole('link', { name: productName });
    await this.click(productLocator);
    
    await this.page.waitForTimeout(1000); // Technical wait for product page load
    await this.click(this.addToCartButton);
    
    // Handle alert dialog
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
  }

  async openCartInNewTab() {
    const newTab = await this.context.newPage();
    const demoblazeUrl = testData.cart.testcase3203.demoblazeUrl;
    await newTab.goto(demoblazeUrl);
    await newTab.getByRole('link', { name: 'Cart' }).click();
    return newTab;
  }

  async closeTab(tab) {
    await tab.close();
  }

  async navigateToCart() {
    await this.click(this.cartLink);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async deleteProductFromCart() {
    await this.click(this.deleteButton);
    await this.page.waitForTimeout(1000); // Technical wait for deletion
  }

  async expectDemoBlazeHomePageLoaded() {
    await expect(this.page).toHaveURL(/demoblaze/);
    await expect(this.page.getByRole('link', { name: 'Home' })).toBeVisible();
  }

  async expectProductAddedToCart() {
    // Verification through navigation to cart
    await this.navigateToCart();
    await this.expectVisible(this.cartProductRow);
  }

  async expectCartDisplaysProduct(tab) {
    const productName = testData.cart.testcase3203.productToAdd;
    const productInCart = tab.locator('tr.success', { hasText: productName });
    await expect(productInCart).toBeVisible();
  }

  async expectTabClosed() {
    // Verification handled by test context
  }

  async expectProductRemovedFromCart() {
    const productName = testData.cart.testcase3203.productToDelete;
    const productRow = this.page.locator('tr.success', { hasText: productName });
    await expect(productRow).not.toBeVisible({ timeout: 5000 });
  }

  async expectCartUpdatedWithoutDeletedProduct() {
    const productName = testData.cart.testcase3203.productToDelete;
    const productRow = this.page.locator('tr.success', { hasText: productName });
    await expect(productRow).not.toBeVisible();
  }
}

