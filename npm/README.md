# AG-Helix - Cypress BDD Test Automation

## Test Cases Generated

This test suite contains 35 test cases covering login functionality:

### Test Coverage
- **Valid Login Scenarios**: Test cases 2, 9, 33, 652, 658
- **Invalid Credentials**: Test cases 4, 35, 36, 648, 649, 650, 651
- **Security Tests**: Test cases 655, 657, 667, 674
- **Validation Tests**: Test cases 656, 672, 675
- **API Tests**: Test cases 663, 664, 675
- **Accessibility Tests**: Test cases 660, 661
- **Edge Cases**: Test cases 653, 654, 665, 666, 671
- **Session Management**: Test cases 668, 669, 670, 673
- **Performance Tests**: Test case 662
- **Special Cases**: Test cases 34, 37

## Page Objects

### LoginPage
Location: `cypress/support/pages/LoginPage.js`

Provides reusable methods for interacting with the login page:
- `visit()` - Navigate to login page
- `enterUsername(username)` - Enter username
- `enterPassword(password)` - Enter password
- `clickLoginButton()` - Click login button
- `login(username, password)` - Complete login flow
- Element getters for assertions

## Test Data

Location: `cypress/fixtures/loginData.json`

Contains test data for all scenarios including:
- Valid credentials
- Invalid credentials
- Edge cases (max length, special characters, unicode)
- Security test payloads
- Empty field scenarios

## Running Tests

### Run all tests
```bash
npm run cypress:open
```

### Run headless
```bash
npm run cypress:run
```

### Run specific feature
```bash
npx cypress run --spec "cypress/e2e/features/login.feature"
```

### Run tests by tag
```bash
npx cypress run --env tags="@security"
```

## Configuration

- Test environment settings: `cypress.config.js`
- Environment variables: `cypress.env.json`
- Base URL and credentials should be configured in `cypress.env.json`:

```json
{
  "username": "your-test-username",
  "password": "your-test-password",
  "baseUrl": "https://your-app-url.com"
}
```

## Framework Features

### BDD with Cucumber
- Feature files in Gherkin syntax
- Step definitions with reusable steps
- Page Object Model for maintainability

### Test Organization
- Scenarios tagged by test case ID
- Functional tags for filtering
- Clear separation of concerns

### Best Practices
- Fixtures for test data management
- Page objects for UI abstraction
- Reusable step definitions
- Framework handles browser lifecycle
- Configuration-driven test execution

## Test Case Mapping

Each scenario is tagged with its original test case ID for traceability:
- `@test-case-35` - To Test Login Form with Invalid Data
- `@test-case-669` - Verify redirect after authentication
- `@test-case-656` - Verify password field masking
- ... and so on

## Support

For issues or questions about the test framework, refer to:
- Cypress documentation: https://docs.cypress.io
- Cucumber preprocessor: https://github.com/badeball/cypress-cucumber-preprocessor
