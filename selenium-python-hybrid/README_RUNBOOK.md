# selenium-python-hybrid Runbook

## Install and Run
```powershell
powershell -ExecutionPolicy Bypass -File .\run.ps1
```

The runner creates a local `.venv`, installs `requirements.txt`, and runs the health/test suite.

## Suites
```powershell
Get-Content .\suites\smoke.txt
Get-Content .\suites\sanity.txt
Get-Content .\suites\regression.txt
Get-Content .\suites\parallel.txt
Get-Content .\suites\sequential.txt
```

Generated pages, tests, steps, and test-data should be placed inside this framework. Driver/browser factory, hooks, reporting, and output ignores are already handled.
