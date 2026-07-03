# AG-Helix Playwright Test Automation

## Project Structure
```
npm/
├── config/
│   └── testData.js          # Test data and configuration
├── pageObjects/
│   └── loginPage.js         # Login page object model
├── tests/
│   └── login.spec.js        # Login test specifications
├── playwright.config.js     # Playwright configuration
├── package.json
└── README.md
```

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

### Run tests in headed mode:
```bash
npm run test:headed
```

### Run tests in debug mode:
```bash
npm run test:debug
```

### Run tests with UI mode:
```bash
npm run test:ui
```

### Run tests on specific browser:
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### View test report:
```bash
npm run report
```

## Environment Variables

Create a `.env` file in the root directory (optional):
```
BASE_URL=http://192.168.10.124:4001
TEST_EMAIL=testuser@example.com
TEST_PASSWORD=Test@1234
```

## Test Cases

### TC-5: To Test Login Form with Valid Data
- **Priority:** 2-Medium
- **Type:** Functional
- **Description:** Verifies that the login page displays all required elements (Email field, Password field, Login button, and Register hyperlink)

## Framework Features

- **Page Object Model:** Organized page objects for maintainability
- **Configuration Management:** Centralized test data and configuration
- **Multiple Browser Support:** Chrome, Firefox, Safari
- **Reporting:** HTML, JSON, and console reporters
- **Screenshots & Videos:** Captured on test failure
- **Retry Logic:** Automatic retry on failure in CI environments