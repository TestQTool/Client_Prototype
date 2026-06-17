import test from '../testFixtures/fixture.js';
import { expect } from '@playwright/test';
import RegistrationApiHelper from '../utils/registrationApiHelper.js';

test.describe.parallel('Registration Performance Tests @regression', () => {
  let apiHelper;

  test.beforeEach(async () => {
    apiHelper = new RegistrationApiHelper();
  });

  test('[SCRUM-421] Verify that registration API responds within acceptable time for single user @smoke', async () => {
    await test.step('Send registration request and measure response time', async () => {
      const payload = apiHelper.generateValidPayload();
      const startTime = Date.now();
      const response = await apiHelper.registerUser(payload);
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      await test.step('Verify response time is under 2000ms', async () => {
        expect(responseTime).toBeLessThan(2000);
      });

      await test.step('Verify response status is successful', async () => {
        expect([200, 201]).toContain(response.status());
      });
    });
  });

  test('[SCRUM-422] Verify that registration API handles 100 concurrent user registrations @regression', async () => {
    await test.step('Send 100 concurrent registration requests', async () => {
      const requests = [];
      for (let i = 0; i < 100; i++) {
        const payload = apiHelper.generateValidPayload();
        requests.push(apiHelper.registerUser(payload));
      }
      
      const startTime = Date.now();
      const responses = await Promise.all(requests);
      const endTime = Date.now();
      const totalTime = endTime - startTime;
      
      await test.step('Verify at least 90% of requests succeed', async () => {
        const successCount = responses.filter(r => [200, 201].includes(r.status())).length;
        const successRate = (successCount / responses.length) * 100;
        expect(successRate).toBeGreaterThanOrEqual(90);
      });

      await test.step('Verify total time is reasonable', async () => {
        expect(totalTime).toBeLessThan(10000); // 10 seconds for 100 concurrent requests
      });
    });
  });

  test('[SCRUM-423] Verify that registration API maintains performance under sustained load @regression', async () => {
    await test.step('Send sustained load of registration requests', async () => {
      const batchSize = 20;
      const batches = 5;
      const responseTimes = [];

      for (let batch = 0; batch < batches; batch++) {
        const requests = [];
        for (let i = 0; i < batchSize; i++) {
          const payload = apiHelper.generateValidPayload();
          requests.push(apiHelper.registerUser(payload));
        }
        
        const startTime = Date.now();
        await Promise.all(requests);
        const endTime = Date.now();
        responseTimes.push(endTime - startTime);
        
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      await test.step('Verify response times remain consistent', async () => {
        const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
        const maxResponseTime = Math.max(...responseTimes);
        const degradation = (maxResponseTime / avgResponseTime) * 100;
        
        // Performance should not degrade more than 50%
        expect(degradation).toBeLessThan(150);
      });
    });
  });

  test('[SCRUM-424] Verify that registration API degrades gracefully under stress conditions @regression', async () => {
    await test.step('Send stress load beyond normal capacity', async () => {
      const requests = [];
      for (let i = 0; i < 200; i++) {
        const payload = apiHelper.generateValidPayload();
        requests.push(apiHelper.registerUser(payload));
      }
      
      const responses = await Promise.all(requests);
      
      await test.step('Verify no 500 errors occur', async () => {
        const serverErrors = responses.filter(r => r.status() >= 500).length;
        expect(serverErrors).toBe(0);
      });

      await test.step('Verify rate limiting or queuing is in place', async () => {
        const rateLimited = responses.some(r => r.status() === 429);
        const accepted = responses.some(r => r.status() === 202);
        const isGraceful = rateLimited || accepted;
        expect(isGraceful).toBeTruthy();
      });
    });
  });

  test('[SCRUM-425] Verify that database write operations for registration complete efficiently @regression', async () => {
    await test.step('Send multiple registration requests sequentially', async () => {
      const iterations = 10;
      const writeTimes = [];

      for (let i = 0; i < iterations; i++) {
        const payload = apiHelper.generateValidPayload();
        const startTime = Date.now();
        await apiHelper.registerUser(payload);
        const endTime = Date.now();
        writeTimes.push(endTime - startTime);
      }
      
      await test.step('Verify average write time is under 1000ms', async () => {
        const avgWriteTime = writeTimes.reduce((a, b) => a + b, 0) / writeTimes.length;
        expect(avgWriteTime).toBeLessThan(1000);
      });

      await test.step('Verify write times are consistent', async () => {
        const maxWriteTime = Math.max(...writeTimes);
        const minWriteTime = Math.min(...writeTimes);
        const variance = maxWriteTime - minWriteTime;
        expect(variance).toBeLessThan(2000);
      });
    });
  });

  test('[SCRUM-426] Verify that registration endpoint response size remains optimized @regression', async () => {
    await test.step('Send registration request and measure response size', async () => {
      const payload = apiHelper.generateValidPayload();
      const response = await apiHelper.registerUser(payload);
      const responseBody = await response.json();
      const responseSize = JSON.stringify(responseBody).length;
      
      await test.step('Verify response size is under 5KB', async () => {
        expect(responseSize).toBeLessThan(5000);
      });

      await test.step('Verify response contains only necessary fields', async () => {
        expect(responseBody).toHaveProperty('email');
        expect(responseBody).toHaveProperty('id');
        expect(responseBody).not.toHaveProperty('password');
      });
    });
  });
});

