# robotframework-selenium-library Runbook

## Install and Run
```powershell
powershell -ExecutionPolicy Bypass -File .\run.ps1
```

## Suites
```powershell
robot --include smoke tests
robot --include sanity tests
robot --include regression tests
pabot --processes 4 --include regression tests
```

Generated `.robot` tests and keyword/resource files should be placed inside this framework. Selenium Library setup, suite tags, Allure dependency, and runtime output ignores are already handled.
