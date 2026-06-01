const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pageObjects/RegistrationPage');
const registrationTestData = require('../test-data/registrationData.json');

test.describe('Registration Functionality', () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigate(process.env.BASE_URL);
  });

  test('TC001 - Verify registration form is displayed', async () => {
    await registrationPage.verifyRegistrationFormDisplayed();
  });

  test('TC002 - Successful user registration with valid data', async () => {
    const userData = registrationTestData.validUser;
    await registrationPage.submitRegistration(userData);
    await registrationPage.verifySuccessMessage(registrationTestData.messages.registrationSuccess);
  });

  test('TC003 - Registration fails with existing email', async () => {
    const userData = registrationTestData.existingUser;
    await registrationPage.submitRegistration(userData);
    await registrationPage.verifyErrorMessage(registrationTestData.messages.emailExists);
  });

  test('TC004 - Registration fails with invalid email format', async () => {
    const userData = registrationTestData.invalidEmailUser;
    await registrationPage.submitRegistration(userData);
    await registrationPage.verifyErrorMessage(registrationTestData.messages.invalidEmail);
  });

  test('TC005 - Registration fails with password mismatch', async () => {
    const userData = registrationTestData.passwordMismatchUser;
    await registrationPage.submitRegistration(userData);
    await registrationPage.verifyErrorMessage(registrationTestData.messages.passwordMismatch);
  });

  test('TC006 - Registration fails with weak password', async () => {
    const userData = registrationTestData.weakPasswordUser;
    await registrationPage.submitRegistration(userData);
    await registrationPage.verifyErrorMessage(registrationTestData.messages.weakPassword);
  });

  test('TC007 - Registration fails without accepting terms', async () => {
    const userData = { ...registrationTestData.validUser, acceptTerms: false };
    await registrationPage.submitRegistration(userData);
    await registrationPage.verifyErrorMessage(registrationTestData.messages.termsRequired);
  });

  test('TC008 - Registration fails with empty required fields', async () => {
    await registrationPage.clickRegisterButton();
    await registrationPage.verifyErrorMessage(registrationTestData.messages.requiredFields);
  });

  test('TC009 - Registration with valid phone number', async () => {
    const userData = registrationTestData.userWithPhone;
    await registrationPage.submitRegistration(userData);
    await registrationPage.verifySuccessMessage(registrationTestData.messages.registrationSuccess);
  });

  test('TC010 - Registration fails with invalid phone number format', async () => {
    const userData = registrationTestData.invalidPhoneUser;
    await registrationPage.submitRegistration(userData);
    await registrationPage.verifyErrorMessage(registrationTestData.messages.invalidPhone);
  });
});

test.describe('Registration - Data Driven Tests', () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigate(process.env.BASE_URL);
  });

  const dataDrivenTestCases = registrationTestData.dataDrivenCases || [];

  for (const testCase of dataDrivenTestCases) {
    test(`Data Driven - ${testCase.description}`, async () => {
      await registrationPage.submitRegistration(testCase.userData);
      if (testCase.expectedResult === 'success') {
        await registrationPage.verifySuccessMessage(testCase.expectedMessage);
      } else {
        await registrationPage.verifyErrorMessage(testCase.expectedMessage);
      }
    });
  }
});
