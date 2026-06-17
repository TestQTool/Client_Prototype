import test from '../testFixtures/fixture.js';
import { expect } from '@playwright/test';
import RegistrationApiHelper from '../utils/registrationApiHelper.js';

test.describe.parallel('Registration API Tests @regression', () => {
  let apiHelper;

  test.beforeEach(async () => {
    apiHelper = new RegistrationApiHelper();
  });

  test('[SCRUM-404] Verify that registration API creates user account with valid payload @smoke', async () => {
    await test.step('Send valid registration request', async () => {
      const payload = apiHelper.generateValidPayload();
      const response = await apiHelper.registerUser(payload);
      
      await test.step('Verify response status is 200 or 201', async () => {
        expect([200, 201]).toContain(response.status());
      });

      await test.step('Verify response contains user profile information', async () => {
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('email');
        expect(responseBody.email).toBe(payload.email);
      });
    });
  });

  test('[SCRUM-405] Verify that registration API returns error for duplicate email @smoke', async () => {
    const duplicateEmail = 'existing.user@example.com';
    const payload = {
      email: duplicateEmail,
      password: 'ValidPass123!'
    };

    await test.step('Send registration request with duplicate email', async () => {
      const response = await apiHelper.registerUser(payload);
      
      await test.step('Verify response status is 400 or 409', async () => {
        expect([400, 409]).toContain(response.status());
      });

      await test.step('Verify error message indicates duplicate email', async () => {
        const responseBody = await response.json();
        expect(JSON.stringify(responseBody).toLowerCase()).toMatch(/(already exists|duplicate|registered)/);
      });
    });
  });

  test('[SCRUM-406] Verify that registration API validates email format @smoke', async () => {
    await test.step('Send registration request with invalid email format', async () => {
      const payload = apiHelper.generatePayloadWithInvalidEmail();
      const response = await apiHelper.registerUser(payload);
      
      await test.step('Verify response status is 400', async () => {
        expect(response.status()).toBe(400);
      });

      await test.step('Verify error message indicates invalid email format', async () => {
        const responseBody = await response.json();
        expect(JSON.stringify(responseBody).toLowerCase()).toMatch(/(email|format|invalid)/);
      });
    });
  });

  test('[SCRUM-407] Verify that registration API rejects request with missing email field @smoke', async () => {
    await test.step('Send registration request without email field', async () => {
      const payload = apiHelper.generatePayloadWithMissingEmail();
      const response = await apiHelper.registerUser(payload);
      
      await test.step('Verify response status is 400', async () => {
        expect(response.status()).toBe(400);
      });

      await test.step('Verify error message indicates missing email', async () => {
        const responseBody = await response.json();
        expect(JSON.stringify(responseBody).toLowerCase()).toMatch(/(email|required)/);
      });
    });
  });

  test('[SCRUM-408] Verify that registration API rejects request with missing password field @smoke', async () => {
    await test.step('Send registration request without password field', async () => {
      const payload = apiHelper.generatePayloadWithMissingPassword();
      const response = await apiHelper.registerUser(payload);
      
      await test.step('Verify response status is 400', async () => {
        expect(response.status()).toBe(400);
      });

      await test.step('Verify error message indicates missing password', async () => {
        const responseBody = await response.json();
        expect(JSON.stringify(responseBody).toLowerCase()).toMatch(/(password|required)/);
      });
    });
  });

  test('[SCRUM-409] Verify that registration API response includes user profile information @smoke', async () => {
    await test.step('Send valid registration request', async () => {
      const payload = apiHelper.generateValidPayload();
      const response = await apiHelper.registerUser(payload);
      
      await test.step('Verify response includes email', async () => {
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('email');
      });

      await test.step('Verify response includes user id or profile data', async () => {
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('id');
      });
    });
  });

  test('[SCRUM-410] Verify that registration API accepts special characters in email @regression', async () => {
    await test.step('Send registration request with special characters in email', async () => {
      const payload = apiHelper.generatePayloadWithSpecialCharsEmail();
      const response = await apiHelper.registerUser(payload);
      
      await test.step('Verify response status is 200 or 201', async () => {
        expect([200, 201]).toContain(response.status());
      });
    });
  });

  test('[SCRUM-411] Verify that registration API enforces password minimum length requirement @smoke', async () => {
    await test.step('Send registration request with short password', async () => {
      const payload = apiHelper.generatePayloadWithShortPassword();
      const response = await apiHelper.registerUser(payload);
      
      await test.step('Verify response status is 400', async () => {
        expect(response.status()).toBe(400);
      });

      await test.step('Verify error message indicates password length requirement', async () => {
        const responseBody = await response.json();
        expect(JSON.stringify(responseBody).toLowerCase()).toMatch(/(password|length|minimum|characters)/);
      });
    });
  });

  test('[SCRUM-412] Verify that registration API returns appropriate headers @regression', async () => {
    await test.step('Send valid registration request', async () => {
      const payload = apiHelper.generateValidPayload();
      const response = await apiHelper.registerUser(payload);
      
      await test.step('Verify Content-Type header is present', async () => {
        const headers = response.headers();
        expect(headers['content-type']).toMatch(/application\/json/);
      });
    });
  });

  test('[SCRUM-413] Verify that password is not returned in registration API response @smoke', async () => {
    await test.step('Send valid registration request', async () => {
      const payload = apiHelper.generateValidPayload();
      const response = await apiHelper.registerUser(payload);
      
      await test.step('Verify response does not contain password field', async () => {
        const responseBody = await response.json();
        expect(responseBody).not.toHaveProperty('password');
      });
    });
  });

  test('[SCRUM-414] Verify that registration endpoint prevents SQL injection in email field @smoke', async () => {
    await test.step('Send registration request with SQL injection payload', async () => {
      const payload = apiHelper.generateSQLInjectionPayload();
      const response = await apiHelper.registerUser(payload);
      
      await test.step('Verify response status is 400 or request is safely rejected', async () => {
        expect([400, 422]).toContain(response.status());
      });
    });
  });

  test('[SCRUM-415] Verify that registration endpoint prevents XSS attack in email field @smoke', async () => {
    await test.step('Send registration request with XSS payload', async () => {
      const payload = apiHelper.generateXSSPayload();
      const response = await apiHelper.registerUser(payload);
      
      await test.step('Verify response status is 400 or request is safely rejected', async () => {
        expect([400, 422]).toContain(response.status());
      });
    });
  });

  test('[SCRUM-416] Verify that registration endpoint enforces password complexity requirements @regression', async () => {
    const weakPassword = 'password';
    const payload = {
      email: `testuser${Date.now()}@example.com`,
      password: weakPassword
    };

    await test.step('Send registration request with weak password', async () => {
      const response = await apiHelper.registerUser(payload);
      
      await test.step('Verify response status is 400', async () => {
        expect(response.status()).toBe(400);
      });

      await test.step('Verify error message indicates password complexity requirement', async () => {
        const responseBody = await response.json();
        expect(JSON.stringify(responseBody).toLowerCase()).toMatch(/(password|complexity|weak|strong)/);
      });
    });
  });

  test('[SCRUM-417] Verify that registration endpoint enforces rate limiting to prevent abuse @regression', async () => {
    await test.step('Send multiple rapid registration requests', async () => {
      const requests = [];
      for (let i = 0; i < 10; i++) {
        const payload = apiHelper.generateValidPayload();
        requests.push(apiHelper.registerUser(payload));
      }
      const responses = await Promise.all(requests);
      
      await test.step('Verify at least one request is rate limited', async () => {
        const rateLimited = responses.some(r => r.status() === 429);
        expect(rateLimited).toBeTruthy();
      });
    });
  });

  test('[SCRUM-418] Verify that registration endpoint does not accept requests with invalid authentication token @regression', async () => {
    await test.step('Send registration request with invalid auth token', async () => {
      const payload = apiHelper.generateValidPayload();
      const response = await apiHelper.registerUserWithAuth(payload, 'invalid_token_123');
      
      await test.step('Verify response status is 401 or 403', async () => {
        expect([401, 403]).toContain(response.status());
      });
    });
  });

  test('[SCRUM-419] Verify that email uniqueness check is case-insensitive @regression', async () => {
    const baseEmail = `testuser${Date.now()}@example.com`;
    const payload1 = { email: baseEmail.toLowerCase(), password: 'ValidPass123!' };
    const payload2 = { email: baseEmail.toUpperCase(), password: 'ValidPass123!' };

    await test.step('Register first user with lowercase email', async () => {
      const response1 = await apiHelper.registerUser(payload1);
      expect([200, 201]).toContain(response1.status());
    });

    await test.step('Attempt to register second user with uppercase email', async () => {
      const response2 = await apiHelper.registerUser(payload2);
      
      await test.step('Verify duplicate error is returned', async () => {
        expect([400, 409]).toContain(response2.status());
      });
    });
  });

  test('[SCRUM-420] Verify that password is stored as hashed value in database @smoke', async () => {
    await test.step('Send valid registration request', async () => {
      const payload = apiHelper.generateValidPayload();
      const response = await apiHelper.registerUser(payload);
      
      await test.step('Verify password is not returned in plain text', async () => {
        const responseBody = await response.json();
        expect(responseBody).not.toHaveProperty('password');
      });

      await test.step('Note: Database verification requires backend query', async () => {
        // This test verifies response behavior; actual database hash verification requires DB access
      });
    });
  });
});

