# AG-Helix Playwright Test Automation Framework

## Project Structure

```
npm/
├── config/
│   ├── config.js          # Global configuration
│   └── testData.js        # Test data and credentials
├── pages/
│   └── LoginPage.js       # Login page object
├── tests/
│   └── login.spec.js      # Login test specifications
├── playwright.config.js    # Playwright configuration
├── package.json
└── README.md
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Configuration

Set environment variables (optional):
```bash
export BASE_URL=http://192.168.10.124:4001
export TEST_USERNAME=your_username
export TEST_PASSWORD=your_password
export BROWSER=chromium
export HEADLESS=true
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in headed mode:
```bash
npm run test:headed
```

Run tests in debug mode:
```bash
npm run test:debug
```

Run tests in UI mode:
```bash
npm run test:ui
```

Run tests on specific browser:
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

## View Reports

```bash
npm run report
```

## Test Cases

This framework includes the following test cases:

- [560] Verify that login works with valid credentials (API)
- [561] Verify that login fails with invalid username (API)
- [562] Verify that login fails with invalid password (API)
- [563] Verify that login fails with empty username (API)
- [564] Verify that login fails with empty password (API)
- [21] Verify that login works with valid credentials (UI)
- [22-25] Login form validation tests

## Framework Features

- Page Object Model (POM) pattern
- Configuration management
- Test data management
- Multiple browser support
- Parallel test execution
- HTML, JSON, and JUnit reports
- Screenshots and video recording on failure
- API and UI testing capabilities
