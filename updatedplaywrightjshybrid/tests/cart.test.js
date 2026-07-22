import { test, expect } from '../fixtures/test.js';
import LoginPage from '../pageObjects/LoginPage.js';
import CartPage from '../pageObjects/CartPage.js';

test.describe('Cart Consistency Tests', () => {
  test('[3203] Verify that cart remains consistent when one tab is closed and reopened after cart modification @Regression', async ({ page, context }) => {
    test.info().annotations.push(
      { type: 'testcase_id', description: '3203' },
      { type: 'priority', description: '2-Medium' }
    );

    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page, context);
    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;

    await test.step('Navigate to url and verify login page opens', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.expectLoginPageOpen();
    });

    await test.step('Enter username and password and verify valid credentials entered', async () => {
      await loginPage.enterCredentials(username, password);
      await loginPage.expectCredentialsEntered();
    });

    await test.step('Submit the login form and navigate to DemoBlaze application', async () => {
      await loginPage.submitLoginForm();
      await loginPage.expectAuthenticated();
      await cartPage.navigateToDemoBlaze();
      await cartPage.expectDemoBlazeHomePageLoaded();
    });

    await test.step('Add a product to cart', async () => {
      await cartPage.addProductToCart();
      await cartPage.expectProductAddedToCart();
    });

    let secondTab;
    await test.step('Open DemoBlaze cart in a second browser tab', async () => {
      secondTab = await cartPage.openCartInNewTab();
      const secondCartPage = new CartPage(secondTab, context);
      await secondCartPage.expectCartDisplaysProduct(secondTab);
    });

    await test.step('Close the second tab', async () => {
      await cartPage.closeTab(secondTab);
      await cartPage.expectTabClosed();
    });

    await test.step('In first tab, delete the product from cart', async () => {
      await cartPage.navigateToCart();
      await cartPage.deleteProductFromCart();
      await cartPage.expectProductRemovedFromCart();
    });

    await test.step('Reopen DemoBlaze in a new tab and navigate to cart', async () => {
      const newTab = await cartPage.openCartInNewTab();
      const newCartPage = new CartPage(newTab, context);
      await newCartPage.expectCartUpdatedWithoutDeletedProduct();
      await newTab.close();
    });
  });
});

