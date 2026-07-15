/**
 * Login Test Data
 * Test Case: [2339] Verify that login fails when password field is empty
 */

module.exports = {
  loginUrl: 'https://parabank.parasoft.com/parabank/index.htm?utm_source=chatgpt.com',
  
  emptyPasswordTest: {
    username: 'john',
    password: '',
    expectedError: 'password'
  },
  
  // Additional test data can be added here for other login scenarios
  validCredentials: {
    username: process.env.TEST_USERNAME || 'john',
    password: process.env.TEST_PASSWORD || 'demo'
  }
};

