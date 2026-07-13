# Playwright Python Hybrid Framework

## Project Structure
```
├── config/
│   └── config.json          # Test configuration
├── pageObjects/
│   ├── loginPage.py         # Login page object
│   └── vacancyPage.py       # Vacancy page object
├── tests/
│   └── test_vacancy_hiring_manager_validation.py  # Test case 1803
├── reports/                 # Test execution reports
├── conftest.py             # Pytest fixtures and configuration
├── pytest.ini              # Pytest configuration
├── requirements.txt        # Python dependencies
└── README.md
```

## Setup Instructions

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Install Playwright browsers:
   ```bash
   playwright install
   ```

## Running Tests

### Run all tests:
```bash
pytest
```

### Run specific test case:
```bash
pytest -m testcase_1803
```

### Run by priority:
```bash
pytest -m priority_medium
```

### Run with specific browser:
```bash
pytest --browser=chromium
```

### Run in headless mode:
Update `config/config.json` and set `"headless": true`

## Test Case Coverage

- **Test Case 1803**: Verify that system validates mandatory Hiring Manager field when creating a job vacancy
  - Priority: Medium
  - Type: Functional
  - Steps: Login → Navigate to Vacancy → Fill form without Hiring Manager → Verify validation error

## Configuration

Test configuration is managed in `config/config.json`:
- `base_url`: Application URL
- `username`: Test user credentials
- `password`: Test user password
- `browser`: Browser type (chromium, firefox, webkit)
- `headless`: Run in headless mode
- `timeout`: Default timeout in milliseconds

## Reports

HTML test reports are generated in the `reports/` directory after each test run.
