import { test, expect } from '../fixtures/test.js';
import HomePage from '../pageObjects/HomePage.js';
import LoginPage from '../pageObjects/LoginPage.js';
import ProductPage from '../pageObjects/ProductPage.js';
import CartPage from '../pageObjects/CartPage.js';

test.describe('Cart Functionality', () => {
  test('[3248] Verify that authenticated user can access cart functionality after login @Smoke', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;

    await test.step('Navigate to application home page', async () => {
      await homePage.navigateToHome();
      await homePage.expectHomePageLoaded();
    });

    await test.step('Click on the Login link and enter credentials', async () => {
      await loginPage.clickLoginLink();
      await loginPage.expectLoginModalOpen();
      await loginPage.enterCredentials(username, password);
    });

    await test.step('Submit login form', async () => {
      await loginPage.submitLogin();
      await loginPage.expectUserAuthenticated();
    });

    await test.step('Select product from the catalog', async () => {
      await homePage.selectFirstProduct();
      await productPage.expectProductDetailPageOpen();
    });

    await test.step('Click Add to cart button', async () => {
      await productPage.clickAddToCart();
      await page.waitForEvent('dialog', { timeout: 5000 }).then(async dialog => {
        expect(dialog.message()).toContain('Product added');
        await dialog.accept();
      });
    });

    await test.step('Navigate to Cart page', async () => {
      await cartPage.navigateToCart();
      await cartPage.expectCartPageDisplayed();
      await cartPage.expectProductInCart();
    });
  });
});

