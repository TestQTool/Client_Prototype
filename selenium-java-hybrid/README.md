# 360GlobalNet Test Automation Framework

## Project Details
- **Project Name**: 360GlobalNet
- **Framework**: Selenium Java Hybrid
- **Build Tool**: Maven
- **Testing Framework**: TestNG

## Framework Structure
```
maven/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── pageObjects/
│   │           ├── LoginPage.java
│   │           └── DashboardPage.java
│   └── test/
│       └── java/
│           └── tests/
│               ├── BaseTest.java
│               └── LoginTest.java
├── testng.xml
├── pom.xml
└── README.md
```

## Test Cases

### TC-2183: Verify that login works with valid credentials
- **Priority**: High
- **Type**: Functional
- **Steps**:
  1. Navigate to OrangeHRM login page
  2. Enter valid username and password
  3. Click Login button
  4. Verify dashboard is displayed

## Prerequisites
- Java JDK 11 or higher
- Maven 3.6+
- Chrome/Firefox/Edge browser installed

## Setup Instructions

1. Clone the repository
2. Navigate to the maven folder
3. Install dependencies:
   ```bash
   mvn clean install
   ```

## Running Tests

### Run all tests:
```bash
mvn clean test
```

### Run with specific browser:
```bash
mvn clean test -Dbrowser=chrome
mvn clean test -Dbrowser=firefox
mvn clean test -Dbrowser=edge
```

### Run specific test suite:
```bash
mvn clean test -DsuiteXmlFile=testng.xml
```

## Configuration

- **Browser**: Configure in `testng.xml` or pass as parameter
- **Timeouts**: Configured in `BaseTest.java`
- **Test Data**: Managed within test methods

## Page Object Model

The framework follows Page Object Model (POM) design pattern:
- **Page Objects**: Located in `src/main/java/pageObjects/`
- **Tests**: Located in `src/test/java/tests/`
- **Base Test**: Common setup/teardown in `BaseTest.java`

## Reports

Test execution reports are generated using TestNG's default reporting mechanism.
Reports can be found in `target/surefire-reports/` after test execution.

## Support

For issues or questions, please contact the test automation team.