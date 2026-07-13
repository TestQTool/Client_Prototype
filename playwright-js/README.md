# Playwright Hybrid Framework

## Test Case Coverage

### Test Case ID: 1802
**Title:** Verify that system validates mandatory Vacancy Name field when creating a job vacancy

**Priority:** 1-High

**Type:** Functional

**Steps:**
1. Navigate to url "https://hr.quality-matrix.us/web/index.php/auth/login" -> Configured application URL should open
2. Enter username "adminhrqa" and password "Adminhrqa@321" -> Configured credentials should be entered successfully
3. Enter Job Title "QA Engineer", leave Vacancy Name empty, select Hiring Manager, and enter Number of Positions "1" -> Vacancy Name field should remain empty
4. Click Save button and verify validation error is displayed -> System should display required field validation error for Vacancy Name

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run vacancy validation tests:
```bash
npm run test:vacancy
```

### Run tests in headed mode:
```bash
npm run test:headed
```

### Debug tests:
```bash
npm run test:debug
```

### View test report:
```bash
npm run report
```

## Project Structure

```
npm/
├── pageObjects/          # Page Object classes
│   ├── LoginPage.js
│   └── VacancyPage.js
├── tests/                # Test specifications
│   └── vacancy.spec.js
├── testData/             # Test data files
│   └── vacancyTestData.js
├── playwright.config.js  # Playwright configuration
├── package.json          # Node.js dependencies
└── README.md            # This file
```

## Framework Features

- **Hybrid Framework Architecture**: Separation of page objects, tests, and test data
- **Page Object Model**: Encapsulated page interactions
- **Configurable**: Browser, timeouts, and URLs configured in playwright.config.js
- **Multiple Reporters**: HTML, JSON, and List reporters
- **Cross-browser Testing**: Chromium, Firefox, and WebKit support
- **Screenshots & Videos**: Captured on failure for debugging
- **Trace Viewer**: Available on first retry for detailed debugging

## Test Data Management

Test data is managed in the `testData/` directory and can be imported into test specifications as needed.

## Configuration

Environment-specific configuration can be set via environment variables:
- `BASE_URL`: Application base URL (default: https://hr.quality-matrix.us)
- `CI`: Set to true for CI/CD pipeline execution

## Best Practices

1. Keep page objects focused on element interactions only
2. Put assertions in test specifications, not in page objects
3. Use meaningful test descriptions matching test case titles
4. Maintain test case IDs in test descriptions for traceability
5. Use framework-provided fixtures and configurations
6. Avoid hardcoding credentials, URLs, or test data in tests