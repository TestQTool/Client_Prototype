# Employee API Test Automation - Playwright BDD

## Test Case Coverage

### TestCase ID: 1781
**Title:** Verify that API prevents duplicate Employee ID creation

**Priority:** High

**Type:** API Test

**Steps:**
1. Navigate to HR application login page
2. Login with valid credentials (adminhrqa / Adminhrqa@321)
3. Send POST request to create employee with firstName "Lisa", lastName "Anderson", employeeId "EMP011"
4. Verify first employee record is created successfully
5. Send another POST request with firstName "Mark", lastName "Taylor", same employeeId "EMP011"
6. Verify API responds with status code 409
7. Verify response contains conflict error message for duplicate Employee ID

**Expected Results:**
- First employee creation succeeds
- Duplicate Employee ID request is rejected with 409 status
- Error message indicates conflict/duplicate ID

**QENTRIX_REQUIREMENT_SIGNATURE:** c93d8a60f77ea392b25a8f93a93e67faf3c2c9e836133f8c43bdd9f121274639

## Setup

```bash
npm install
```

## Configuration

Environment variables can be set in `.env` file:

```
BASE_URL=https://hr.quality-matrix.us/web/index.php/auth/login
API_BASE_URL=https://hr.quality-matrix.us
USERNAME=adminhrqa
PASSWORD=Adminhrqa@321
DEFAULT_TIMEOUT=30000
HEADLESS=true
```

## Running Tests

```bash
# Run all tests
npm test

# Run specific feature
npm run test:api

# Run by tags
npm run test:tags "@API"
npm run test:tags "@Priority:High"
npm run test:tags "@TestCase:1781"
```

## Project Structure

```
npm/
├── features/           # BDD feature files
├── step-definitions/   # Step definition implementations
├── pages/             # Page Object Models
├── api/               # API helper classes
├── config/            # Configuration and test data
├── support/           # Hooks and world setup
├── test-results/      # Test execution reports
└── cucumber.js        # Cucumber configuration
```

## Framework Features

- Browser lifecycle managed in hooks (support/hooks.js)
- Credentials and URLs read from config (config/test-config.js)
- API context shared across steps
- Page Object Model for UI interactions
- Reusable API helper classes
- BDD feature files with Gherkin syntax
- HTML and JSON reporting
