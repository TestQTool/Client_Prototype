# HR Application Test Automation - Selenium Java BDD

## Test Case Coverage

### TC1800 - Verify HR recruiter can successfully create a new job vacancy with all mandatory fields
- **Priority**: High
- **Type**: Functional
- **Tags**: @TC1800, @High, @Functional, @Recruitment

## Project Structure

```
maven/
├── src/test/java/
│   ├── pageObjects/
│   │   ├── LoginPage.java
│   │   ├── DashboardPage.java
│   │   └── RecruitmentPage.java
│   ├── stepDefinitions/
│   │   ├── Hooks.java
│   │   └── RecruitmentSteps.java
│   └── runners/
│       └── TestRunner.java
├── src/test/resources/
│   └── features/
│       └── Recruitment.feature
├── pom.xml
├── testng.xml
└── README.md
```

## Prerequisites

- Java 11 or higher
- Maven 3.6+
- Chrome/Firefox/Edge browser installed

## Setup Instructions

1. Clone the repository
2. Navigate to the maven directory
3. Install dependencies:
   ```bash
   mvn clean install -DskipTests
   ```

## Running Tests

### Run all tests:
```bash
mvn clean test
```

### Run specific test by tag:
```bash
mvn clean test -Dcucumber.filter.tags="@TC1800"
```

### Run with specific browser:
```bash
mvn clean test -Dbrowser=chrome
mvn clean test -Dbrowser=firefox
mvn clean test -Dbrowser=edge
```

### Run with TestNG XML:
```bash
mvn clean test -DsuiteXmlFile=testng.xml
```

## Test Reports

After test execution, reports are generated in:
- **HTML Report**: `target/cucumber-reports/cucumber.html`
- **JSON Report**: `target/cucumber-reports/cucumber.json`
- **XML Report**: `target/cucumber-reports/cucumber.xml`

## Framework Features

- **BDD with Cucumber**: Gherkin syntax for readable test scenarios
- **Page Object Model**: Organized page objects for maintainability
- **TestNG Integration**: Test execution and reporting
- **Cross-browser Support**: Chrome, Firefox, Edge
- **Selenium 4**: Latest Selenium WebDriver features
- **Hooks**: Centralized browser setup and teardown
- **Multiple Report Formats**: HTML, JSON, XML

## Test Credentials

- **URL**: https://hr.quality-matrix.us/web/index.php/auth/login
- **Username**: adminhrqa
- **Password**: Adminhrqa@321

## Notes

- Browser drivers are managed automatically via WebDriverManager
- Implicit wait is set to 10 seconds
- Page load timeout is set to 30 seconds
- Tests run sequentially (parallel execution can be enabled in testng.xml)
