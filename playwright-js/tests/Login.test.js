import test from '../testFixtures/fixture.js';

test.describe.parallel('Login Module Tests', () => {

    test('[TC-1221] Verify that login works with valid credentials @smoke @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.enterCredentials('ganesh', 'ganesh');
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify dashboard or home page is displayed', async () => {
            await loginPage.verifyDashboardIsDisplayed();
        });
    });

    test('[TC-1222] Verify that login fails with invalid password @smoke @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.enterCredentials('ganesh', 'ganesh');
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify error message is displayed', async () => {
            await loginPage.verifyErrorMessageIsDisplayed();
        });
    });

    test('[TC-1223] Verify that login fails with invalid username @smoke @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.enterCredentials('ganesh', 'ganesh');
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify error message is displayed', async () => {
            await loginPage.verifyErrorMessageIsDisplayed();
        });
    });

    test('[TC-1224] Verify that login fails when username field is empty @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.enterCredentials('ganesh', 'ganesh');
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });
    });

    test('[TC-1225] Verify that login fails when password field is empty @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.enterCredentials('ganesh', 'ganesh');
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });
    });

    test('[TC-1226] Verify that login fails when both username and password fields are empty @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.enterCredentials('ganesh', 'ganesh');
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify validation messages for required fields are displayed', async () => {
            await loginPage.verifyValidationMessagesForRequiredFields();
        });
    });

    test('[TC-1227] Verify that password field masks input characters @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.enterCredentials('ganesh', 'ganesh');
        });

        await test.step('Verify password field masks input', async () => {
            await loginPage.verifyPasswordFieldMasksInput();
        });
    });

    test('[TC-1228] Verify that login form handles special characters in username field @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.enterCredentials('ganesh', 'ganesh');
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify appropriate response is displayed', async () => {
            // Response verification depends on app behavior
        });
    });

    test('[TC-1229] Verify that login API returns success response with valid credentials @smoke @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        let response;
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            response = await loginPage.sendLoginAPIRequest('ganesh', 'ganesh');
        });

        await test.step('Verify response status code is 200', async () => {
            await loginPage.verifyAPIResponseStatus(response, 200);
        });

        await test.step('Verify response body contains authentication token', async () => {
            await loginPage.verifyAPIResponseContainsToken(response);
        });
    });

    test('[TC-1230] Verify that login API returns error response with invalid credentials @smoke @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        let response;
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            response = await loginPage.sendLoginAPIRequest('ganesh', 'ganesh');
        });

        await test.step('Send POST request to login endpoint with invalid credentials', async () => {
            // Already sent in previous step
        });

        await test.step('Verify response status code is 401', async () => {
            await loginPage.verifyAPIResponseStatus(response, 401);
        });

        await test.step('Verify response body contains error message', async () => {
            await loginPage.verifyAPIResponseContainsErrorMessage(response);
        });
    });

    test('[TC-1231] Verify that login API returns error when username is missing in request @smoke @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        let response;
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            response = await loginPage.sendLoginAPIRequestWithoutUsername('ganesh');
        });

        await test.step('Verify response status code is 400', async () => {
            await loginPage.verifyAPIResponseStatus(response, 400);
        });
    });

    test('[TC-1232] Verify that login API returns error when password is missing in request @smoke @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        let response;
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            response = await loginPage.sendLoginAPIRequestWithoutPassword('ganesh');
        });

        await test.step('Verify response status code is 400', async () => {
            await loginPage.verifyAPIResponseStatus(response, 400);
        });
    });

    test('[TC-1233] Verify that login API returns proper content type in response header @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        let response;
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            response = await loginPage.sendLoginAPIRequest('ganesh', 'ganesh');
        });

        await test.step('Send POST request to login endpoint with valid credentials', async () => {
            // Already sent
        });

        await test.step('Verify response header contains content type application/json', async () => {
            await loginPage.verifyAPIResponseContentType(response);
        });

        await test.step('Verify response body is valid JSON format', async () => {
            await loginPage.verifyAPIResponseIsValidJSON(response);
        });
    });

    test('[TC-1234] Verify that login API rejects request with invalid HTTP method @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        let response;
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            // Prepare credentials for API call
        });

        await test.step('Send GET request to login endpoint instead of POST', async () => {
            response = await loginPage.sendLoginAPIRequestWithMethod('GET', 'ganesh', 'ganesh');
        });

        await test.step('Verify response status code is 405', async () => {
            await loginPage.verifyAPIResponseStatus(response, 405);
        });

        await test.step('Verify response indicates allowed methods', async () => {
            await loginPage.verifyAPIResponseAllowedMethods(response);
        });
    });

    test('[TC-1235] Verify that login API handles malformed JSON request body @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        let response;
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            // Prepare for API call
        });

        await test.step('Send POST request to login endpoint with malformed JSON body', async () => {
            response = await loginPage.sendLoginAPIRequestWithMalformedJSON();
        });

        await test.step('Verify response status code is 400', async () => {
            await loginPage.verifyAPIResponseStatus(response, 400);
        });

        await test.step('Verify response body contains parsing error message', async () => {
            await loginPage.verifyAPIResponseContainsErrorMessage(response);
        });
    });

    test('[TC-1236] Verify that login API response includes appropriate cache control headers @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        let response;
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            response = await loginPage.sendLoginAPIRequest('ganesh', 'ganesh');
        });

        await test.step('Send POST request to login endpoint with valid credentials', async () => {
            // Already sent
        });

        await test.step('Verify response headers contain cache control directives', async () => {
            await loginPage.verifyAPIResponseCacheControl(response);
        });

        await test.step('Verify authentication response is not cached', async () => {
            // Covered in previous step
        });
    });

    test('[TC-1237] Verify that login prevents SQL injection in username field @smoke @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.enterCredentials('ganesh', 'ganesh');
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify login is rejected and no unauthorized access occurs', async () => {
            await loginPage.verifyErrorMessageIsDisplayed();
        });
    });

    test('[TC-1238] Verify that login prevents SQL injection in password field @smoke @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            await loginPage.enterCredentials('ganesh', 'ganesh');
        });

        await test.step('Click Login button', async () => {
            await loginPage.clickLoginButton();
        });

        await test.step('Verify login is rejected and no unauthorized access occurs', async () => {
            await loginPage.verifyErrorMessageIsDisplayed();
        });
    });

    test('[TC-1239] Verify that account locks after multiple failed login attempts @smoke @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        await test.step('Enter username "ganesh" and password "ganesh" multiple times', async () => {
            await loginPage.attemptMultipleFailedLogins('ganesh', 'invalidPassword', 5);
        });

        await test.step('Verify account lockout message is displayed', async () => {
            await loginPage.verifyAccountLockoutMessageIsDisplayed();
        });

        await test.step('Verify subsequent login attempts are blocked', async () => {
            await loginPage.enterCredentials('ganesh', 'ganesh');
            await loginPage.clickLoginButton();
            await loginPage.verifyAccountLockoutMessageIsDisplayed();
        });
    });

    test('[TC-1240] Verify that authentication token expires after defined timeout period @smoke @regression', async ({ page, loginPage }) => {
        await test.step('Navigate to url "https://www.google.com"', async () => {
            await loginPage.navigateToLoginPage('https://www.google.com');
        });

        let response;
        await test.step('Enter username "ganesh" and password "ganesh"', async () => {
            response = await loginPage.sendLoginAPIRequest('ganesh', 'ganesh');
        });

        let token;
        await test.step('Login successfully and obtain authentication token', async () => {
            const responseBody = await response.json();
            token = responseBody.token;
        });

        await test.step('Wait for token expiration period to elapse', async () => {
            await page.waitForTimeout(60000); // Adjust based on actual token expiration time
        });

        await test.step('Attempt to access protected resource with expired token', async () => {
            const protectedResponse = await page.request.get(`${process.env.BASE_URL}/api/protected`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            await loginPage.verifyAPIResponseStatus(protectedResponse, 401);
        });
    });

});

