# 360GlobalNet Test Automation Framework

## Overview
Selenium/Python/PyTest test automation framework for the 360GlobalNet project.

## Framework Structure
```
pip/
├── config/
│   └── config.json          # Configuration file for BASE_URL, browser, credentials
├── pageObjects/
│   ├── LoginPage.py         # Login page object
│   └── PolicyCreationPage.py # Policy creation page object
├── tests/
│   └── test_policy_creation_validation.py  # Test cases
├── testdata/
│   └── testdata.json        # Test data
├── conftest.py              # PyTest fixtures and configuration
├── pytest.ini               # PyTest configuration
├── requirements.txt         # Python dependencies
└── README.md
```

## Setup Instructions

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure test settings:**
   - Edit `config/config.json` to set BASE_URL, browser, credentials, and timeouts
   - Or use environment variables to override configuration

## Running Tests

**Run all tests:**
```bash
pytest
```

**Run specific test:**
```bash
pytest tests/test_policy_creation_validation.py::TestPolicyCreationValidation::test_2215_verify_policy_creation_fails_with_non_numeric_premium
```

**Run by marker:**
```bash
pytest -m priority_medium
pytest -m functional
pytest -m testcase_2215
```

**Run with specific browser:**
```bash
BROWSER=firefox pytest
BROWSER=edge pytest
```

**Run in headless mode:**
```bash
HEADLESS=true pytest
```

**Generate HTML report:**
```bash
pytest --html=reports/report.html --self-contained-html
```

**Generate Allure report:**
```bash
pytest --alluredir=reports/allure
allure serve reports/allure
```

## Configuration Options

### config.json
- `BASE_URL`: Application URL
- `BROWSER`: Browser type (chrome, firefox, edge)
- `USERNAME`: Default username for login
- `PASSWORD`: Default password for login
- `IMPLICIT_WAIT`: Implicit wait timeout in seconds
- `EXPLICIT_WAIT`: Explicit wait timeout in seconds
- `HEADLESS`: Run browser in headless mode (true/false)

### Environment Variables
All configuration can be overridden using environment variables:
- `BASE_URL`
- `BROWSER`
- `USERNAME`
- `PASSWORD`
- `IMPLICIT_WAIT`
- `EXPLICIT_WAIT`
- `HEADLESS`

## Test Cases

### [2215] Verify that policy creation fails when premium amount field contains non-numeric characters
- **Priority:** 2-Medium
- **Type:** Functional
- **Location:** `tests/test_policy_creation_validation.py`
- **Marker:** `@pytest.mark.testcase_2215`

## Page Objects

### LoginPage
- Methods: `navigate_to()`, `enter_username()`, `enter_password()`, `click_login()`, `login()`

### PolicyCreationPage
- Methods: `enter_customer_name()`, `enter_customer_email()`, `enter_customer_phone()`, `enter_premium_amount()`, `click_submit()`, `get_premium_amount_error_message()`, `is_validation_error_displayed()`

## Framework Features

- **Page Object Model (POM):** Separation of page elements and test logic
- **Configuration Management:** Centralized config file and environment variable support
- **Fixture-based Browser Management:** Automatic driver initialization and cleanup
- **Test Data Management:** JSON-based test data storage
- **Custom Markers:** Priority and test type markers for selective execution
- **Cross-browser Support:** Chrome, Firefox, and Edge
- **Headless Execution:** Support for CI/CD environments
- **Reporting:** HTML and Allure report generation
