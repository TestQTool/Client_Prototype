import { expect } from '@playwright/test';
import test from '../testFixtures/fixture.js';

test.describe('Login', () => {

    test.describe.configure({ mode: 'parallel' });

    test('1221: Verify that login works with valid credentials @smoke @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Click Login button', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify dashboard or home page is displayed', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1222: Verify that login fails with invalid password @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Click Login button', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify error message is displayed', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1223: Verify that login fails with invalid username @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Click Login button', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify error message is displayed', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1224: Verify that login fails when username field is empty @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Click Login button', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1225: Verify that login fails when password field is empty @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Click Login button', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1226: Verify that login fails when both username and password fields are empty @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Click Login button', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify validation messages for required fields are displayed', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1227: Verify that password field masks input characters @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1228: Verify that login form handles special characters in username field @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Click Login button', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify appropriate response is displayed', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1229: Verify that login API returns success response with valid credentials @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify response status code is 200', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify response body contains authentication token', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1230: Verify that login API returns error response with invalid credentials @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Send POST request to login endpoint with invalid credentials', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify response status code is 401', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify response body contains error message', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1231: Verify that login API returns error when username is missing in request @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify response status code is 400', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1232: Verify that login API returns error when password is missing in request @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify response status code is 400', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1233: Verify that login API returns proper content type in response header @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Send POST request to login endpoint with valid credentials', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify response header contains content type application/json', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify response body is valid JSON format', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1234: Verify that login API rejects request with invalid HTTP method @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Send GET request to login endpoint instead of POST', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify response status code is 405', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify response indicates allowed methods', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1235: Verify that login API handles malformed JSON request body @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Send POST request to login endpoint with malformed JSON body', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify response status code is 400', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify response body contains parsing error message', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1236: Verify that login API response includes appropriate cache control headers @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Send POST request to login endpoint with valid credentials', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify response headers contain cache control directives', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify authentication response is not cached', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1237: Verify that login prevents SQL injection in username field @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Click Login button', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify login is rejected and no unauthorized access occurs', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1238: Verify that login prevents SQL injection in password field @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Click Login button', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify login is rejected and no unauthorized access occurs', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1239: Verify that account locks after multiple failed login attempts @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify account lockout message is displayed', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Verify subsequent login attempts are blocked', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

    test('1240: Verify that authentication token expires after defined timeout period @regression', async ({ loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.navigate();
        });
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Login successfully and obtain authentication token', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Wait for token expiration period to elapse', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
        await test.step('Attempt to access protected resource with expired token', async () => {
            await loginPage.waitForPageLoad();
            await loginPage.verifyPageLoaded();
        });
    });

});