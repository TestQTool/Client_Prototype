import { test, expect } from '../fixtures/test.js';
import RegistrationPage from '../pageObjects/RegistrationPage.js';
import testData from '../test-data/testdata.json' assert { type: 'json' };

test.describe('User Registration', () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
  });

  test('[2695] Verify that user can register with all fields including optional fields filled @Regression', async () => {
    // Test case metadata
    test.info().annotations.push(
      { type: 'testcase_id', description: '2695' },
      { type: 'priority', description: '2-Medium' }
    );

    const userData = testData.registration.validUser;
    const expectedMessage = testData.registration.expectedMessages.successConfirmation;

    await test.step('Navigate to registration page from url', async () => {
      await registrationPage.navigateToRegistrationPage();
      await registrationPage.verifyRegistrationPageDisplayed();
    });

    await test.step('Enter valid username, email, password, and confirm password', async () => {
      await registrationPage.enterValidCredentials(
        userData.username,
        userData.email,
        userData.password,
        userData.confirmPassword
      );
      await registrationPage.verifyRequiredFieldsFilled();
    });

    await test.step('Enter optional fields including phone number and address', async () => {
      await registrationPage.enterOptionalFields(
        userData.phone,
        userData.address
      );
      await registrationPage.verifyOptionalFieldsFilled();
    });

    await test.step('Submit the registration form', async () => {
      await registrationPage.submitRegistrationForm();
      await registrationPage.verifyRegistrationSubmitted();
    });

    await test.step('Verify successful registration message is displayed', async () => {
      await registrationPage.verifySuccessMessageDisplayed(expectedMessage);
    });

    await test.step('Verify all entered data is saved correctly', async () => {
      await registrationPage.verifyUserDataSaved(userData);
    });
  });
});

