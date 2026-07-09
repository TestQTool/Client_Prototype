# 360GlobalNet - Playwright Java Hybrid Framework

## Project Overview
This is a Playwright-based test automation framework for the 360GlobalNet project using Java and TestNG.

## Framework Structure
```
maven/
├── src/
│   └── test/
│       ├── java/
│       │   └── com/
│       │       └── framework/
│       │           ├── pages/           # Page Object classes
│       │           │   ├── LoginPage.java
│       │           │   └── PolicyPage.java
│       │           └── tests/           # Test classes
│       │               └── TC2214_PolicyCreationValidationTest.java
│       └── resources/
│           └── testdata/                # Test data files
│               └── TC2214_TestData.json
├── pom.xml                              # Maven dependencies
├── testng.xml                           # TestNG suite configuration
└── README.md
```

## Test Cases Implemented

### TC2214: Verify that policy creation fails when mandatory customer name field is left empty
- **Priority**: 1-High
- **Type**: Functional
- **Description**: Validates that leaving the customer name field empty triggers appropriate validation error

## Prerequisites
- Java 11 or higher
- Maven 3.6+
- Playwright browsers installed

## Setup Instructions

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   mvn clean install
   ```

3. **Install Playwright browsers**
   ```bash
   mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
   ```

## Running Tests

### Run all tests
```bash
mvn test
```

### Run specific test class
```bash
mvn test -Dtest=TC2214_PolicyCreationValidationTest
```

### Run with TestNG XML
```bash
mvn test -DsuiteXmlFile=testng.xml
```

## Configuration

### Browser Configuration
Browser settings can be modified in the test setup methods. Default is Chromium in headed mode.

### Test Data
Test data is stored in JSON format under `src/test/resources/testdata/`

## Reporting
TestNG HTML reports are generated in `target/surefire-reports/` after test execution.

## Page Object Model
The framework follows Page Object Model (POM) design pattern:
- **LoginPage**: Handles login functionality
- **PolicyPage**: Handles policy creation and validation

## Best Practices
- Each test case maintains its original ID, title, and steps
- Test data is externalized in JSON format
- Page objects encapsulate element locators and actions
- Tests contain only test logic and assertions
- Framework uses TestNG annotations for test lifecycle management

## Contact
Project: 360GlobalNet
Framework: Playwright / Java / Hybrid