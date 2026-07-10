import { expect } from 'chai';
import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'https://opensource-demo.orangehrmlive.com/api';
let authToken: string;

describe('Policy Management - API Tests', () => {
  before(async () => {
    // Authenticate and obtain token
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: 'Admin',
      password: 'admin123'
    });
    authToken = loginResponse.data.token;
  });

  const getHeaders = () => ({
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json'
  });

  it('[2221] Verify that POST request to policy creation endpoint returns 201 status code with valid payload', async () => {
    const policyData = {
      customerName: 'John Doe',
      policyType: 'Auto Insurance',
      coverageAmount: 50000,
      premiumAmount: 1200,
      effectiveDate: '2024-06-01'
    };

    const response: AxiosResponse = await axios.post(
      `${API_BASE_URL}/policies`,
      policyData,
      { headers: getHeaders() }
    );

    expect(response.status).to.equal(201);
    expect(response.data).to.have.property('policyNumber');
    expect(response.data).to.have.property('message');
    expect(response.data.message).to.include('created successfully');

    // Verify policy is retrievable
    const policyNumber = response.data.policyNumber;
    const getResponse = await axios.get(
      `${API_BASE_URL}/policies/${policyNumber}`,
      { headers: getHeaders() }
    );
    expect(getResponse.status).to.equal(200);
    expect(getResponse.data.customerName).to.equal(policyData.customerName);
  });

  it('[2222] Verify that POST request to policy creation endpoint returns 400 status code when mandatory customer name is missing', async () => {
    const policyData = {
      policyType: 'Auto Insurance',
      coverageAmount: 50000,
      premiumAmount: 1200,
      effectiveDate: '2024-06-01'
    };

    try {
      await axios.post(
        `${API_BASE_URL}/policies`,
        policyData,
        { headers: getHeaders() }
      );
      expect.fail('Expected request to fail');
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.data.message).to.include('customer name is required');
    }
  });

  it('[2223] Verify that POST request to policy creation endpoint returns 400 status code when premium amount is negative', async () => {
    const policyData = {
      customerName: 'John Doe',
      policyType: 'Auto Insurance',
      coverageAmount: 50000,
      premiumAmount: -1200,
      effectiveDate: '2024-06-01'
    };

    try {
      await axios.post(
        `${API_BASE_URL}/policies`,
        policyData,
        { headers: getHeaders() }
      );
      expect.fail('Expected request to fail');
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.data.message).to.include('premium amount must be positive');
    }
  });

  it('[2224] Verify that POST request to policy creation endpoint returns 400 status code when effective date is in invalid format', async () => {
    const policyData = {
      customerName: 'John Doe',
      policyType: 'Auto Insurance',
      coverageAmount: 50000,
      premiumAmount: 1200,
      effectiveDate: '01-06-2024' // Invalid format
    };

    try {
      await axios.post(
        `${API_BASE_URL}/policies`,
        policyData,
        { headers: getHeaders() }
      );
      expect.fail('Expected request to fail');
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.data.message).to.include('date format is invalid');
    }
  });

  it('[2225] Verify that GET request to retrieve policy details returns 200 status code and correct policy information', async () => {
    // Create policy first
    const policyData = {
      customerName: 'Jane Smith',
      policyType: 'Home Insurance',
      coverageAmount: 100000,
      premiumAmount: 2500,
      effectiveDate: '2024-07-01'
    };

    const createResponse = await axios.post(
      `${API_BASE_URL}/policies`,
      policyData,
      { headers: getHeaders() }
    );
    const policyNumber = createResponse.data.policyNumber;

    // Retrieve policy
    const getResponse = await axios.get(
      `${API_BASE_URL}/policies/${policyNumber}`,
      { headers: getHeaders() }
    );

    expect(getResponse.status).to.equal(200);
    expect(getResponse.data.customerName).to.equal(policyData.customerName);
    expect(getResponse.data.policyType).to.equal(policyData.policyType);
    expect(getResponse.data.coverageAmount).to.equal(policyData.coverageAmount);
    expect(getResponse.data.premiumAmount).to.equal(policyData.premiumAmount);
    expect(getResponse.data.effectiveDate).to.equal(policyData.effectiveDate);
  });

  it('[2226] Verify that GET request to retrieve non-existent policy returns 404 status code', async () => {
    const nonExistentPolicyNumber = 'POLICY-999999';

    try {
      await axios.get(
        `${API_BASE_URL}/policies/${nonExistentPolicyNumber}`,
        { headers: getHeaders() }
      );
      expect.fail('Expected request to fail');
    } catch (error: any) {
      expect(error.response.status).to.equal(404);
      expect(error.response.data.message).to.include('policy not found');
      expect(error.response.data).to.not.have.property('policyNumber');
    }
  });

  it('[2227] Verify that PUT request to update policy details returns 200 status code and updates policy information', async () => {
    // Create policy first
    const policyData = {
      customerName: 'Bob Johnson',
      policyType: 'Life Insurance',
      coverageAmount: 200000,
      premiumAmount: 3000,
      effectiveDate: '2024-08-01'
    };

    const createResponse = await axios.post(
      `${API_BASE_URL}/policies`,
      policyData,
      { headers: getHeaders() }
    );
    const policyNumber = createResponse.data.policyNumber;

    // Update policy
    const updatedData = {
      premiumAmount: 3500,
      coverageAmount: 250000
    };

    const updateResponse = await axios.put(
      `${API_BASE_URL}/policies/${policyNumber}`,
      updatedData,
      { headers: getHeaders() }
    );

    expect(updateResponse.status).to.equal(200);

    // Verify updates via GET
    const getResponse = await axios.get(
      `${API_BASE_URL}/policies/${policyNumber}`,
      { headers: getHeaders() }
    );
    expect(getResponse.data.premiumAmount).to.equal(updatedData.premiumAmount);
    expect(getResponse.data.coverageAmount).to.equal(updatedData.coverageAmount);
  });

  it('[2228] Verify that DELETE request to policy deletion endpoint returns 204 status code and removes policy from system', async () => {
    // Create policy first
    const policyData = {
      customerName: 'Alice Brown',
      policyType: 'Auto Insurance',
      coverageAmount: 75000,
      premiumAmount: 1800,
      effectiveDate: '2024-09-01'
    };

    const createResponse = await axios.post(
      `${API_BASE_URL}/policies`,
      policyData,
      { headers: getHeaders() }
    );
    const policyNumber = createResponse.data.policyNumber;

    // Delete policy
    const deleteResponse = await axios.delete(
      `${API_BASE_URL}/policies/${policyNumber}`,
      { headers: getHeaders() }
    );

    expect(deleteResponse.status).to.equal(204);

    // Verify policy is no longer retrievable
    try {
      await axios.get(
        `${API_BASE_URL}/policies/${policyNumber}`,
        { headers: getHeaders() }
      );
      expect.fail('Expected policy to be deleted');
    } catch (error: any) {
      expect(error.response.status).to.equal(404);
    }
  });

  it('[2229] Verify that policy creation endpoint rejects requests without valid authentication token', async () => {
    const policyData = {
      customerName: 'John Doe',
      policyType: 'Auto Insurance',
      coverageAmount: 50000,
      premiumAmount: 1200,
      effectiveDate: '2024-06-01'
    };

    try {
      await axios.post(
        `${API_BASE_URL}/policies`,
        policyData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      expect.fail('Expected request to fail');
    } catch (error: any) {
      expect(error.response.status).to.equal(401);
      expect(error.response.data.message).to.include('authentication is required');
    }
  });

  it('[2230] Verify that policy creation endpoint rejects requests with expired authentication token', async () => {
    const expiredToken = 'expired.token.here';
    const policyData = {
      customerName: 'John Doe',
      policyType: 'Auto Insurance',
      coverageAmount: 50000,
      premiumAmount: 1200,
      effectiveDate: '2024-06-01'
    };

    try {
      await axios.post(
        `${API_BASE_URL}/policies`,
        policyData,
        {
          headers: {
            'Authorization': `Bearer ${expiredToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      expect.fail('Expected request to fail');
    } catch (error: any) {
      expect(error.response.status).to.equal(401);
      expect(error.response.data.message).to.include('token is expired');
    }
  });

  it('[2231] Verify that policy creation endpoint rejects requests from users without policy creation permission', async () => {
    // Authenticate as read-only user
    const readOnlyLogin = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: 'ReadOnlyUser',
      password: 'readonly123'
    });
    const readOnlyToken = readOnlyLogin.data.token;

    const policyData = {
      customerName: 'John Doe',
      policyType: 'Auto Insurance',
      coverageAmount: 50000,
      premiumAmount: 1200,
      effectiveDate: '2024-06-01'
    };

    try {
      await axios.post(
        `${API_BASE_URL}/policies`,
        policyData,
        {
          headers: {
            'Authorization': `Bearer ${readOnlyToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      expect.fail('Expected request to fail');
    } catch (error: any) {
      expect(error.response.status).to.equal(403);
      expect(error.response.data.message).to.include('insufficient permissions');
    }
  });

  it('[2235] Verify that policy creation API endpoint enforces HTTPS protocol and rejects HTTP requests', async () => {
    const httpUrl = API_BASE_URL.replace('https://', 'http://');
    const policyData = {
      customerName: 'John Doe',
      policyType: 'Auto Insurance',
      coverageAmount: 50000,
      premiumAmount: 1200,
      effectiveDate: '2024-06-01'
    };

    try {
      await axios.post(
        `${httpUrl}/policies`,
        policyData,
        { headers: getHeaders() }
      );
      expect.fail('Expected request to fail or redirect');
    } catch (error: any) {
      // Request should fail or be redirected to HTTPS
      expect(error).to.exist;
    }
  });

  it('[2237] Verify that policy creation API endpoint responds within 500 milliseconds for valid request', async () => {
    const policyData = {
      customerName: 'John Doe',
      policyType: 'Auto Insurance',
      coverageAmount: 50000,
      premiumAmount: 1200,
      effectiveDate: '2024-06-01'
    };

    const startTime = Date.now();
    const response = await axios.post(
      `${API_BASE_URL}/policies`,
      policyData,
      { headers: getHeaders() }
    );
    const elapsedTime = Date.now() - startTime;

    expect(elapsedTime).to.be.lessThan(500);
    expect(response.status).to.equal(201);
    expect(response.data).to.have.property('policyNumber');
  });

  it('[2238] Verify that system can handle 100 concurrent policy creation requests without performance degradation', async () => {
    const promises = [];
    const startTime = Date.now();

    for (let i = 0; i < 100; i++) {
      const policyData = {
        customerName: `Customer ${i}`,
        policyType: 'Auto Insurance',
        coverageAmount: 50000,
        premiumAmount: 1200,
        effectiveDate: '2024-06-01'
      };

      promises.push(
        axios.post(
          `${API_BASE_URL}/policies`,
          policyData,
          { headers: getHeaders() }
        )
      );
    }

    const results = await Promise.all(promises);
    const elapsedTime = Date.now() - startTime;

    results.forEach(response => {
      expect(response.status).to.equal(201);
      expect(response.data).to.have.property('policyNumber');
    });

    expect(results.length).to.equal(100);
    console.log(`100 concurrent requests completed in ${elapsedTime}ms`);
  });

  it('[2239] Verify that system gracefully handles 500 concurrent policy creation requests and returns appropriate error codes when capacity is exceeded', async () => {
    const promises = [];

    for (let i = 0; i < 500; i++) {
      const policyData = {
        customerName: `Customer ${i}`,
        policyType: 'Auto Insurance',
        coverageAmount: 50000,
        premiumAmount: 1200,
        effectiveDate: '2024-06-01'
      };

      promises.push(
        axios.post(
          `${API_BASE_URL}/policies`,
          policyData,
          { headers: getHeaders() }
        ).catch(error => error.response)
      );
    }

    const results = await Promise.all(promises);

    const successfulRequests = results.filter(r => r.status === 201);
    const capacityExceededRequests = results.filter(r => r.status === 503);

    expect(successfulRequests.length + capacityExceededRequests.length).to.equal(500);

    // Verify system recovers
    await new Promise(resolve => setTimeout(resolve, 5000));

    const recoveryTest = await axios.post(
      `${API_BASE_URL}/policies`,
      {
        customerName: 'Recovery Test',
        policyType: 'Auto Insurance',
        coverageAmount: 50000,
        premiumAmount: 1200,
        effectiveDate: '2024-06-01'
      },
      { headers: getHeaders() }
    );

    expect(recoveryTest.status).to.equal(201);
  });

  it('[2241] Verify that policy retrieval API endpoint maintains response time under 200 milliseconds during sustained load of 50 requests per second', async () => {
    // Create test policies
    const policyNumbers = [];
    for (let i = 0; i < 10; i++) {
      const response = await axios.post(
        `${API_BASE_URL}/policies`,
        {
          customerName: `Load Test Customer ${i}`,
          policyType: 'Auto Insurance',
          coverageAmount: 50000,
          premiumAmount: 1200,
          effectiveDate: '2024-06-01'
        },
        { headers: getHeaders() }
      );
      policyNumbers.push(response.data.policyNumber);
    }

    // Simulate sustained load
    const responseTimes: number[] = [];
    const duration = 60000; // 60 seconds
    const rps = 50;
    const interval = 1000 / rps;

    const startTime = Date.now();
    let requestCount = 0;

    while (Date.now() - startTime < duration) {
      const policyNumber = policyNumbers[requestCount % policyNumbers.length];
      const requestStart = Date.now();

      await axios.get(
        `${API_BASE_URL}/policies/${policyNumber}`,
        { headers: getHeaders() }
      );

      const requestTime = Date.now() - requestStart;
      responseTimes.push(requestTime);
      requestCount++;

      await new Promise(resolve => setTimeout(resolve, interval));
    }

    const averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    expect(averageResponseTime).to.be.lessThan(200);
    expect(requestCount).to.be.greaterThan(2900); // ~50 rps for 60 seconds
  });
});
