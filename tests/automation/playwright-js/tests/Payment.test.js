const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { PaymentPage } = require('../pageObjects/PaymentPage');
const loginData = require('../test-data/loginData.json');
const paymentData = require('../test-data/paymentData.json');

test.describe('Payment Test', () => {
  let loginPage;
  let paymentPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    paymentPage = new PaymentPage(page);
    
    const baseUrl = process.env.BASE_URL || loginData.baseUrl;
    await loginPage.navigate(baseUrl);
    await loginPage.loginWithOtp(loginData.validCredentials);
    await loginPage.verifyLoginSuccess();
  });

  test('should complete payment successfully with valid card details', async ({ page }) => {
    const baseUrl = process.env.BASE_URL || paymentData.baseUrl;
    const validPayment = paymentData.validPayment;

    await paymentPage.navigate(baseUrl);
    await paymentPage.makePayment(validPayment);
    await paymentPage.verifyPaymentSuccess();
    
    const transactionId = await paymentPage.getTransactionId();
    expect(transactionId).toBeTruthy();
  });

  test('should show error with invalid card details', async ({ page }) => {
    const baseUrl = process.env.BASE_URL || paymentData.baseUrl;
    const invalidPayment = paymentData.invalidPayment;

    await paymentPage.navigate(baseUrl);
    await paymentPage.makePayment(invalidPayment);
    await paymentPage.verifyPaymentError();
  });

  test('should process payment with different payment methods', async ({ page }) => {
    const baseUrl = process.env.BASE_URL || paymentData.baseUrl;
    
    for (const paymentMethod of paymentData.paymentMethods) {
      await paymentPage.navigate(baseUrl);
      await paymentPage.makePayment(paymentMethod);
      await paymentPage.verifyPaymentSuccess();
    }
  });
});
