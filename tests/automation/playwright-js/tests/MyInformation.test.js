const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { MyInformationPage } = require('../pageObjects/MyInformationPage');
const loginData = require('../test-data/loginData.json');
const myInfoData = require('../test-data/myInformationData.json');

test.describe('My Information Functionality', () => {
  let loginPage;
  let myInformationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    myInformationPage = new MyInformationPage(page);
    
    await loginPage.navigate(process.env.BASE_URL || loginData.baseUrl);
    await loginPage.login(loginData.validCredentials.username, loginData.validCredentials.password);
    await loginPage.verifyLoginSuccess();
  });

  test('TC001 - Verify navigation to My Information page', async ({ page }) => {
    await myInformationPage.navigateToMyInformation();
    await myInformationPage.verifyMyInformationPageLoaded();
  });

  test('TC002 - Verify personal details are displayed', async ({ page }) => {
    await myInformationPage.navigateToMyInformation();
    await myInformationPage.verifyMyInformationPageLoaded();
    
    const personalDetails = await myInformationPage.getPersonalDetails();
    expect(personalDetails.firstName).toBeDefined();
    expect(personalDetails.lastName).toBeDefined();
  });

  test('TC003 - Verify updating first name', async ({ page }) => {
    await myInformationPage.navigateToMyInformation();
    await myInformationPage.verifyMyInformationPageLoaded();
    
    const updateData = myInfoData.updatePersonalDetails;
    await myInformationPage.updateFirstName(updateData.firstName);
    await myInformationPage.saveChanges();
    await myInformationPage.verifySaveSuccess();
    
    const updatedFirstName = await myInformationPage.getFirstName();
    expect(updatedFirstName).toBe(updateData.firstName);
  });

  test('TC004 - Verify updating last name', async ({ page }) => {
    await myInformationPage.navigateToMyInformation();
    await myInformationPage.verifyMyInformationPageLoaded();
    
    const updateData = myInfoData.updatePersonalDetails;
    await myInformationPage.updateLastName(updateData.lastName);
    await myInformationPage.saveChanges();
    await myInformationPage.verifySaveSuccess();
    
    const updatedLastName = await myInformationPage.getLastName();
    expect(updatedLastName).toBe(updateData.lastName);
  });

  test('TC005 - Verify updating complete personal details', async ({ page }) => {
    await myInformationPage.navigateToMyInformation();
    await myInformationPage.verifyMyInformationPageLoaded();
    
    const updateData = myInfoData.updatePersonalDetails;
    await myInformationPage.updatePersonalDetails(updateData);
    await myInformationPage.saveChanges();
    await myInformationPage.verifySaveSuccess();
  });

  test('TC006 - Verify profile picture section is visible', async ({ page }) => {
    await myInformationPage.navigateToMyInformation();
    await myInformationPage.verifyMyInformationPageLoaded();
    await myInformationPage.verifyProfilePictureVisible();
  });
});
