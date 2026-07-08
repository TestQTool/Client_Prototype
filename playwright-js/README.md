# Playwright Hybrid Test Automation Framework

## Overview
This is a Playwright-based hybrid test automation framework for testing web applications.

## Test Cases

### TC-1994: Verify that login fails with invalid username
- **Priority**: 1-High
- **Type**: Functional
- **Description**: Verifies that login fails when invalid credentials are provided and user remains on login page

## Framework Structure

```
npm/
├── pageObjects/          # Page object models with selectors and actions
│   └── loginPageObjects.js
├── tests/                # Test specifications
│   └── login.spec.js
├── testData/            # Test data files
│   └── loginTestData.js
├── test-results/        # Test execution results (generated)
├── playwright.config.js # Playwright configuration
├── package.json         # NPM dependencies and scripts
└── README.md           # This file
```

## Installation

```bash
npm install
pnpm install playwright
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run login tests only
npm run test:login

# Debug tests
npm run test:debug

# Open test UI
npm run test:ui

# View test report
npm run test:report
```

## Configuration

### Environment Variables
- `BASE_URL`: Base URL of the application (default: https://opensource-demo.orangehrmlive.com)
- `CI`: Set to true when running in CI environment

### Browser Configuration
The framework is configured to run tests on:
- Chromium
- Firefox
- WebKit

You can specify a specific browser:
```bash
pnpm playwright test --project=chromium
```

## Page Objects

Page objects are located in `pageObjects/` directory and contain:
- Element selectors
- Page actions
- Helper methods

## Test Data

Test data is centralized in `testData/` directory for easy maintenance and reusability.

## Reports

Test execution generates multiple report formats:
- HTML Report: `test-results/html-report/index.html`
- JSON Report: `test-results/test-results.json`
- JUnit XML: `test-results/junit.xml`

## Best Practices

1. Use page objects for element selectors and actions
2. Keep test data separate from test logic
3. Use meaningful test descriptions and step names
4. Follow the AAA pattern (Arrange, Act, Assert)
5. Use Playwright's built-in waiting mechanisms
6. Take screenshots and videos on failure
7. Run tests in parallel when possible

## Troubleshooting

### Tests failing due to timeout
- Increase timeout values in `playwright.config.js`
- Check network connectivity
- Verify selectors are correct

### Element not found
- Verify the selector is correct
- Add explicit waits if needed
- Check if page has loaded completely

## Contributing

1. Create feature branch
2. Add/modify tests
3. Run tests locally
4. Submit pull request

## License
ISC
