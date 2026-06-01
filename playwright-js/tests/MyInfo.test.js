const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { MyInfoPage } = require('../pageObjects/MyInfoPage');
const testData = require('../test-data/myInfoTestData.json');

test.describe('OrangeHRM My Information Tests', () => {
  let loginPage;
  let myInfoPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    myInfoPage = new MyInfoPage(page);
    
    await loginPage.navigate(process.env.BASE_URL || testData.baseUrl);
    await loginPage.login(
      process.env.USERNAME || testData.credentials.username,
      process.env.PASSWORD || testData.credentials.password
    );
  });

  test('TC001 - Verify user can navigate to My Info page', async ({ page }) => {
    await myInfoPage.navigateToMyInfo();
    await expect(myInfoPage.personalDetailsHeader).toBeVisible();
  });

  test('TC002 - Verify user can update first name', async ({ page }) => {
    await myInfoPage.navigateToMyInfo();
    await myInfoPage.updateFirstName(testData.personalDetails.firstName);
    await myInfoPage.savePersonalDetails();
    
    const isSuccess = await myInfoPage.isSuccessToastVisible();
    expect(isSuccess).toBeTruthy();
  });

  test('TC003 - Verify user can update personal details', async ({ page }) => {
    await myInfoPage.navigateToMyInfo();
    await myInfoPage.updatePersonalDetails(testData.personalDetails);
    await myInfoPage.savePersonalDetails();
    
    const isSuccess = await myInfoPage.isSuccessToastVisible();
    expect(isSuccess).toBeTruthy();
  });

  test('TC004 - Verify first name field retains updated value', async ({ page }) => {
    await myInfoPage.navigateToMyInfo();
    const newFirstName = testData.personalDetails.firstName;
    await myInfoPage.updateFirstName(newFirstName);
    await myInfoPage.savePersonalDetails();
    await myInfoPage.isSuccessToastVisible();
    
    await page.reload();
    await myInfoPage.personalDetailsHeader.waitFor({ state: 'visible' });
    
    const currentFirstName = await myInfoPage.getFirstNameValue();
    expect(currentFirstName).toBe(newFirstName);
  });

  test('TC005 - Verify user can update last name', async ({ page }) => {
    await myInfoPage.navigateToMyInfo();
    await myInfoPage.updateLastName(testData.personalDetails.lastName);
    await myInfoPage.savePersonalDetails();
    
    const isSuccess = await myInfoPage.isSuccessToastVisible();
    expect(isSuccess).toBeTruthy();
  });

  test('TC006 - Verify user can update middle name', async ({ page }) => {
    await myInfoPage.navigateToMyInfo();
    await myInfoPage.updateMiddleName(testData.personalDetails.middleName);
    await myInfoPage.savePersonalDetails();
    
    const isSuccess = await myInfoPage.isSuccessToastVisible();
    expect(isSuccess).toBeTruthy();
  });
});