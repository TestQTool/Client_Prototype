# Selenium Java Framework

Production-ready static framework scaffold for Selenium Java automation.

## What users add
- Page classes under `src/main/java/pages`
- Test classes under `src/test/java`
- Test data under `test-data`

## What the framework owns
- WebDriver factory
- Config loading
- Smoke, sanity, regression suite placeholders
- Allure reporting
- Runtime output ignore rules

## Run
```powershell
mvn test
```

## Suites
```powershell
mvn test -Psmoke
mvn test -Psanity
mvn test -Pregression
```

## Report
```powershell
mvn allure:report
```

Reports and local execution output are ignored by Git.
