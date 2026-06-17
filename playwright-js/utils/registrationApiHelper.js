import { request } from '@playwright/test';

class RegistrationApiHelper {
  constructor(baseURL) {
    this.baseURL = baseURL || process.env.BASE_URL || 'http://localhost:3000';
    this.endpoint = '/api/register';
  }

  async registerUser(payload) {
    const context = await request.newContext();
    const response = await context.post(`${this.baseURL}${this.endpoint}`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  }

  async registerUserWithAuth(payload, token) {
    const context = await request.newContext();
    const response = await context.post(`${this.baseURL}${this.endpoint}`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  }

  generateValidPayload() {
    const timestamp = Date.now();
    return {
      email: `testuser${timestamp}@example.com`,
      password: 'ValidPass123!'
    };
  }

  generatePayloadWithMissingEmail() {
    return {
      password: 'ValidPass123!'
    };
  }

  generatePayloadWithMissingPassword() {
    const timestamp = Date.now();
    return {
      email: `testuser${timestamp}@example.com`
    };
  }

  generatePayloadWithInvalidEmail() {
    return {
      email: 'invalidemail',
      password: 'ValidPass123!'
    };
  }

  generatePayloadWithShortPassword() {
    const timestamp = Date.now();
    return {
      email: `testuser${timestamp}@example.com`,
      password: '123'
    };
  }

  generatePayloadWithSpecialCharsEmail() {
    const timestamp = Date.now();
    return {
      email: `test+user${timestamp}@example.co.uk`,
      password: 'ValidPass123!'
    };
  }

  generateSQLInjectionPayload() {
    return {
      email: "admin'--@example.com",
      password: 'ValidPass123!'
    };
  }

  generateXSSPayload() {
    return {
      email: '<script>alert(1)</script>@example.com',
      password: 'ValidPass123!'
    };
  }
}

export default RegistrationApiHelper;

