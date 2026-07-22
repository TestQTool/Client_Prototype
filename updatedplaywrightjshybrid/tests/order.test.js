import { test, expect } from '../fixtures/test.js';
import LoginPage from '../pageObjects/LoginPage.js';
import ProductPage from '../pageObjects/ProductPage.js';
import CartPage from '../pageObjects/CartPage.js';
import OrderPage from '../pageObjects/OrderPage.js';
import testData from '../test-data/testdata.json' assert { type: 'json' };

test('[3249] Verify that authenticated user can place an order after login @Regression', async ({ page }) => {
  test.info().annotations.push(
    { type: 'testcase_id', description: '3249' },
    { type: 'priority', description: '2-Medium' }
  );

  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const orderPage = new OrderPage(page);

  const username = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;
  const orderDetails = testData.order.tc3249;

  await test.step('Navigate to url and log in with username and password', async () => {
    await loginPage.navigateToHome();
    await loginPage.login(username, password);
  });

  await test.step('User should be authenticated successfully', async () => {
    await loginPage.verifyAuthenticationSuccessful();
  });

  await test.step('Add a product to cart and navigate to Cart page', async () => {
    await productPage.selectFirstProduct();
    await productPage.addProductToCart();
    await cartPage.navigateToCart();
  });

  await test.step('Cart should display the selected product', async () => {
    await cartPage.verifyProductInCart();
  });

  await test.step('Click Place Order button', async () => {
    await cartPage.clickPlaceOrder();
  });

  await test.step('Order form modal should open', async () => {
    await orderPage.verifyOrderFormOpen();
  });

  await test.step('Fill in required order details including name, country, city, credit card, month, and year', async () => {
    await orderPage.fillOrderDetails(orderDetails);
  });

  await test.step('All order fields should be populated with valid data', async () => {
    await orderPage.verifyAllOrderFieldsPopulated();
  });

  await test.step('Click Purchase button', async () => {
    await orderPage.clickPurchase();
  });

  await test.step('Order should be processed successfully', async () => {
    await orderPage.verifyOrderProcessedSuccessfully();
  });

  await test.step('Verify order confirmation message is displayed with purchase details', async () => {
    await orderPage.verifyOrderConfirmationWithDetails();
  });

  await test.step('Confirmation modal should show order ID and amount', async () => {
    await orderPage.verifyOrderConfirmationWithDetails();
  });
});

