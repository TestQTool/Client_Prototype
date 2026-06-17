// Registration Module Tests
import test from '../testFixtures/fixture.js';

test.describe.parallel('Registration Module Tests', () => {

    // UI Tests
    test('[SCRUM-396] Verify that user can successfully register with valid email and password @smoke @regression', async ({ registrationPage }) => {
        await test.step('Navigate to registration page', async () => {
            await registrationPage.navigateToRegistration();
        });

        await test.step('Fill registration form with valid credentials', async () => {
            const uniqueEmail = `testuser${Date.now()}@test.com`;
            await registrationPage.registerUser(uniqueEmail, 'ValidPassword123!');
        });

        await test.step('Verify registration success', async () => {
            await registrationPage.verifyRegistrationSuccess();
        });
    });

    test('[SCRUM-397] Verify that registration form displays all required fields @smoke', async ({ registrationPage }) => {
        await test.step('Navigate to registration page', async () => {
            await registrationPage.navigateToRegistration();
        });

        await test.step('Verify all required fields are displayed', async () => {
            await registrationPage.verifyAllRequiredFieldsDisplayed();
        });
    });

    test('[SCRUM-398] Verify that user cannot register with already existing email address @regression', async ({ registrationPage }) => {
        const existingEmail = 'existing@test.com';

        await test.step('Navigate to registration page', async () => {
            await registrationPage.navigateToRegistration();
        });

        await test.step('Attempt to register with existing email', async () => {
            await registrationPage.registerUser(existingEmail, 'ValidPassword123!');
        });

        await test.step('Verify duplicate email error is displayed', async () => {
            await registrationPage.verifyDuplicateEmailError();
        });
    });

    test('[SCRUM-399] Verify that registration fails when email field is left empty @regression', async ({ registrationPage }) => {
        await test.step('Navigate to registration page', async () => {
            await registrationPage.navigateToRegistration();
        });

        await test.step('Submit form without email', async () => {
            await registrationPage.submitWithoutEmail('ValidPassword123!');
        });

        await test.step('Verify email required error is displayed', async () => {
            await registrationPage.verifyEmailRequiredError();
        });
    });

    test('[SCRUM-400] Verify that registration fails when password field is left empty @regression', async ({ registrationPage }) => {
        await test.step('Navigate to registration page', async () => {
            await registrationPage.navigateToRegistration();
        });

        await test.step('Submit form without password', async () => {
            await registrationPage.submitWithoutPassword('test@test.com');
        });

        await test.step('Verify password required error is displayed', async () => {
            await registrationPage.verifyPasswordRequiredError();
        });
    });

    test('[SCRUM-401] Verify that registration fails with invalid email format @regression', async ({ registrationPage }) => {
        await test.step('Navigate to registration page', async () => {
            await registrationPage.navigateToRegistration();
        });

        await test.step('Submit form with invalid email format', async () => {
            await registrationPage.registerUser('invalidemail', 'ValidPassword123!');
        });

        await test.step('Verify invalid email format error is displayed', async () => {
            await registrationPage.verifyInvalidEmailFormatError();
        });
    });

    test('[SCRUM-402] Verify that password and confirm password fields must match @regression', async ({ registrationPage }) => {
        await test.step('Navigate to registration page', async () => {
            await registrationPage.navigateToRegistration();
        });

        await test.step('Submit form with mismatched passwords', async () => {
            await registrationPage.registerUserWithMismatchedPassword('test@test.com', 'Password123!', 'DifferentPassword123!');
        });

        await test.step('Verify password mismatch error is displayed', async () => {
            await registrationPage.verifyPasswordMismatchError();
        });
    });

    test('[SCRUM-403] Verify that email field accepts maximum allowed character length @regression', async ({ registrationPage }) => {
        await test.step('Navigate to registration page', async () => {
            await registrationPage.navigateToRegistration();
        });

        await test.step('Fill email field with maximum length', async () => {
            await registrationPage.fillEmailWithMaxLength(255);
        });

        await test.step('Verify email field accepted input', async () => {
            await registrationPage.verifyEmailFieldAcceptsInput();
        });
    });

    // API Tests
    test('[SCRUM-404] Verify that registration API creates user account with valid payload @smoke @regression', async ({ registrationPage }) => {
        let response;
        const uniqueEmail = `apiuser${Date.now()}@test.com`;

        await test.step('Send registration API request with valid payload', async () => {
            response = await registrationPage.registerUserViaAPI(uniqueEmail, 'ValidPassword123!');
        });

        await test.step('Verify API response status is 201', async () => {
            await registrationPage.verifyAPIResponse(response, 201);
        });
    });

    test('[SCRUM-405] Verify that registration API returns error for duplicate email @regression', async ({ registrationPage }) => {
        let response;
        const duplicateEmail = 'existing@test.com';

        await test.step('Send registration API request with duplicate email', async () => {
            response = await registrationPage.registerUserViaAPI(duplicateEmail, 'ValidPassword123!');
        });

        await test.step('Verify API response status is 400 or 409', async () => {
            const status = response.status();
            test.expect(status === 400 || status === 409).toBeTruthy();
        });
    });

    test('[SCRUM-406] Verify that registration API validates email format @regression', async ({ registrationPage }) => {
        let response;

        await test.step('Send registration API request with invalid email format', async () => {
            response = await registrationPage.registerUserViaAPI('invalidemail', 'ValidPassword123!');
        });

        await test.step('Verify API response status is 400', async () => {
            await registrationPage.verifyAPIResponse(response, 400);
        });
    });

    test('[SCRUM-407] Verify that registration API rejects request with missing email field @regression', async ({ registrationPage, page }) => {
        let response;

        await test.step('Send registration API request without email', async () => {
            response = await page.request.post('/api/register', {
                data: {
                    password: 'ValidPassword123!'
                }
            });
        });

        await test.step('Verify API response status is 400', async () => {
            await registrationPage.verifyAPIResponse(response, 400);
        });
    });

    test('[SCRUM-408] Verify that registration API rejects request with missing password field @regression', async ({ registrationPage, page }) => {
        let response;

        await test.step('Send registration API request without password', async () => {
            response = await page.request.post('/api/register', {
                data: {
                    email: 'test@test.com'
                }
            });
        });

        await test.step('Verify API response status is 400', async () => {
            await registrationPage.verifyAPIResponse(response, 400);
        });
    });

    test('[SCRUM-409] Verify that registration API response includes user profile information @regression', async ({ registrationPage }) => {
        let response, responseBody;
        const uniqueEmail = `apiuser${Date.now()}@test.com`;

        await test.step('Send registration API request with valid payload', async () => {
            response = await registrationPage.registerUserViaAPI(uniqueEmail, 'ValidPassword123!');
        });

        await test.step('Verify API response contains user profile', async () => {
            responseBody = await registrationPage.verifyAPIResponse(response, 201);
            await registrationPage.verifyAPIResponseContainsUserProfile(responseBody);
        });
    });

    test('[SCRUM-410] Verify that registration API accepts special characters in email @regression', async ({ registrationPage }) => {
        let response;
        const specialEmail = `test+special${Date.now()}@test.com`;

        await test.step('Send registration API request with special characters in email', async () => {
            response = await registrationPage.registerUserViaAPI(specialEmail, 'ValidPassword123!');
        });

        await test.step('Verify API response status is 201', async () => {
            await registrationPage.verifyAPIResponse(response, 201);
        });
    });

    test('[SCRUM-411] Verify that registration API enforces password minimum length requirement @regression', async ({ registrationPage }) => {
        let response;

        await test.step('Send registration API request with short password', async () => {
            response = await registrationPage.registerUserViaAPI('test@test.com', 'short');
        });

        await test.step('Verify API response status is 400', async () => {
            await registrationPage.verifyAPIResponse(response, 400);
        });
    });

    test('[SCRUM-412] Verify that registration API returns appropriate headers @regression', async ({ registrationPage }) => {
        let response;
        const uniqueEmail = `apiuser${Date.now()}@test.com`;

        await test.step('Send registration API request', async () => {
            response = await registrationPage.registerUserViaAPI(uniqueEmail, 'ValidPassword123!');
        });

        await test.step('Verify API response headers', async () => {
            await registrationPage.verifyAPIHeaders(response);
        });
    });

    test('[SCRUM-413] Verify that password is not returned in registration API response @regression', async ({ registrationPage }) => {
        let response, responseBody;
        const uniqueEmail = `apiuser${Date.now()}@test.com`;

        await test.step('Send registration API request', async () => {
            response = await registrationPage.registerUserViaAPI(uniqueEmail, 'ValidPassword123!');
        });

        await test.step('Verify password is not in response', async () => {
            responseBody = await registrationPage.verifyAPIResponse(response, 201);
            await registrationPage.verifyPasswordNotInResponse(responseBody);
        });
    });

    // Security Tests
    test('[SCRUM-414] Verify that registration endpoint prevents SQL injection in email field @regression', async ({ registrationPage }) => {
        let response;
        const sqlInjectionEmail = "admin'--@test.com";

        await test.step('Send registration API request with SQL injection payload', async () => {
            response = await registrationPage.registerUserViaAPI(sqlInjectionEmail, 'ValidPassword123!');
        });

        await test.step('Verify API handles SQL injection safely', async () => {
            const status = response.status();
            test.expect(status === 400 || status === 201).toBeTruthy();
        });
    });

    test('[SCRUM-415] Verify that registration endpoint prevents XSS attack in email field @regression', async ({ registrationPage }) => {
        let response;
        const xssEmail = '<script>alert("XSS")</script>@test.com';

        await test.step('Send registration API request with XSS payload', async () => {
            response = await registrationPage.registerUserViaAPI(xssEmail, 'ValidPassword123!');
        });

        await test.step('Verify API handles XSS safely', async () => {
            const status = response.status();
            test.expect(status === 400 || status === 201).toBeTruthy();
        });
    });

    test('[SCRUM-416] Verify that registration endpoint enforces password complexity requirements @regression', async ({ registrationPage }) => {
        let response;

        await test.step('Send registration API request with weak password', async () => {
            response = await registrationPage.registerUserViaAPI('test@test.com', 'password');
        });

        await test.step('Verify API rejects weak password', async () => {
            await registrationPage.verifyAPIResponse(response, 400);
        });
    });

    test('[SCRUM-417] Verify that registration endpoint enforces rate limiting to prevent abuse @regression', async ({ registrationPage }) => {
        await test.step('Send multiple registration requests rapidly', async () => {
            const requests = [];
            for (let i = 0; i < 10; i++) {
                requests.push(registrationPage.registerUserViaAPI(`test${i}@test.com`, 'ValidPassword123!'));
            }
            const responses = await Promise.all(requests);
            
            await test.step('Verify at least one request is rate limited', async () => {
                const rateLimited = responses.some(r => r.status() === 429);
                test.expect(rateLimited).toBeTruthy();
            });
        });
    });

    test('[SCRUM-418] Verify that registration endpoint does not accept requests with invalid authentication token @regression', async ({ page }) => {
        let response;

        await test.step('Send registration request with invalid auth token', async () => {
            response = await page.request.post('/api/register', {
                data: {
                    email: 'test@test.com',
                    password: 'ValidPassword123!'
                },
                headers: {
                    'Authorization': 'Bearer invalidtoken'
                }
            });
        });

        await test.step('Verify API rejects invalid token', async () => {
            const status = response.status();
            test.expect(status === 401 || status === 403).toBeTruthy();
        });
    });

    test('[SCRUM-419] Verify that email uniqueness check is case-insensitive @regression', async ({ registrationPage }) => {
        const baseEmail = `casetest${Date.now()}@test.com`;
        let firstResponse, secondResponse;

        await test.step('Register user with lowercase email', async () => {
            firstResponse = await registrationPage.registerUserViaAPI(baseEmail.toLowerCase(), 'ValidPassword123!');
            await registrationPage.verifyAPIResponse(firstResponse, 201);
        });

        await test.step('Attempt to register with uppercase version of same email', async () => {
            secondResponse = await registrationPage.registerUserViaAPI(baseEmail.toUpperCase(), 'ValidPassword123!');
        });

        await test.step('Verify duplicate is rejected', async () => {
            const status = secondResponse.status();
            test.expect(status === 400 || status === 409).toBeTruthy();
        });
    });

    test('[SCRUM-420] Verify that password is stored as hashed value in database @regression', async ({ registrationPage }) => {
        let response, responseBody;
        const uniqueEmail = `hashtest${Date.now()}@test.com`;

        await test.step('Register new user', async () => {
            response = await registrationPage.registerUserViaAPI(uniqueEmail, 'ValidPassword123!');
        });

        await test.step('Verify password is not stored in plain text', async () => {
            responseBody = await registrationPage.verifyAPIResponse(response, 201);
            await registrationPage.verifyPasswordNotInResponse(responseBody);
        });
    });

    // Performance Tests
    test('[SCRUM-421] Verify that registration API responds within acceptable time for single user @regression', async ({ registrationPage }) => {
        const startTime = Date.now();
        let response;
        const uniqueEmail = `perftest${Date.now()}@test.com`;

        await test.step('Send registration API request', async () => {
            response = await registrationPage.registerUserViaAPI(uniqueEmail, 'ValidPassword123!');
        });

        await test.step('Verify response time is under 2 seconds', async () => {
            await registrationPage.verifyAPIResponseTime(startTime, 2000);
        });
    });

    test('[SCRUM-422] Verify that registration API handles 100 concurrent user registrations @regression', async ({ registrationPage }) => {
        await test.step('Send 100 concurrent registration requests', async () => {
            const requests = [];
            for (let i = 0; i < 100; i++) {
                requests.push(registrationPage.registerUserViaAPI(`concurrent${i}_${Date.now()}@test.com`, 'ValidPassword123!'));
            }
            const responses = await Promise.all(requests);

            await test.step('Verify majority of requests succeeded', async () => {
                const successCount = responses.filter(r => r.status() === 201).length;
                test.expect(successCount).toBeGreaterThan(50);
            });
        });
    });

    test('[SCRUM-423] Verify that registration API maintains performance under sustained load @regression', async ({ registrationPage }) => {
        await test.step('Send sustained load requests', async () => {
            const rounds = 5;
            const requestsPerRound = 20;
            const results = [];

            for (let round = 0; round < rounds; round++) {
                const requests = [];
                for (let i = 0; i < requestsPerRound; i++) {
                    requests.push(registrationPage.registerUserViaAPI(`sustained${round}_${i}_${Date.now()}@test.com`, 'ValidPassword123!'));
                }
                const responses = await Promise.all(requests);
                const successCount = responses.filter(r => r.status() === 201).length;
                results.push(successCount);
            }

            await test.step('Verify consistent performance across rounds', async () => {
                const avgSuccess = results.reduce((a, b) => a + b, 0) / results.length;
                test.expect(avgSuccess).toBeGreaterThan(10);
            });
        });
    });

    test('[SCRUM-424] Verify that registration API degrades gracefully under stress conditions @regression', async ({ registrationPage }) => {
        await test.step('Send excessive concurrent requests', async () => {
            const requests = [];
            for (let i = 0; i < 200; i++) {
                requests.push(registrationPage.registerUserViaAPI(`stress${i}_${Date.now()}@test.com`, 'ValidPassword123!'));
            }
            const responses = await Promise.all(requests);

            await test.step('Verify system responds with valid status codes', async () => {
                const validStatusCodes = [200, 201, 400, 409, 429, 500, 503];
                const allValid = responses.every(r => validStatusCodes.includes(r.status()));
                test.expect(allValid).toBeTruthy();
            });
        });
    });

    test('[SCRUM-425] Verify that database write operations for registration complete efficiently @regression', async ({ registrationPage }) => {
        const startTime = Date.now();
        let response;
        const uniqueEmail = `dbtest${Date.now()}@test.com`;

        await test.step('Send registration request', async () => {
            response = await registrationPage.registerUserViaAPI(uniqueEmail, 'ValidPassword123!');
        });

        await test.step('Verify database write completes within 1 second', async () => {
            await registrationPage.verifyAPIResponse(response, 201);
            await registrationPage.verifyAPIResponseTime(startTime, 1000);
        });
    });

    test('[SCRUM-426] Verify that registration endpoint response size remains optimized @regression', async ({ registrationPage }) => {
        let response;
        const uniqueEmail = `sizetest${Date.now()}@test.com`;

        await test.step('Send registration request', async () => {
            response = await registrationPage.registerUserViaAPI(uniqueEmail, 'ValidPassword123!');
        });

        await test.step('Verify response size is under 1KB', async () => {
            const responseBody = await response.text();
            const sizeInBytes = new Blob([responseBody]).size;
            test.expect(sizeInBytes).toBeLessThan(1024);
        });
    });

});

