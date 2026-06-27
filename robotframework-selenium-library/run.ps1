$ErrorActionPreference = "Stop"
$venv = Join-Path $PSScriptRoot ".venv"

if (!(Test-Path -LiteralPath $venv)) {
    python -m venv $venv
}

$python = Join-Path $venv "Scripts\python.exe"
& $python -m pip install --upgrade pip
& $python -m pip install -r (Join-Path $PSScriptRoot "requirements.txt")

Push-Location $PSScriptRoot
try {
    & $python -m robot --exclude template tests
    exit $LASTEXITCODE
} finally {
    Pop-Location
}
