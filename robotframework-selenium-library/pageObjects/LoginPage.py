# pageObjects/LoginPage.py
# ─────────────────────────────────────────────────────────────────────────────
# Locator constants for Login feature
# RULES: No imports | No logic | No methods | Constants only
# ─────────────────────────────────────────────────────────────────────────────

# ── Login form elements ───────────────────────────────────────────────────────
EMAIL_INPUT = 'input[name="email"]'
USERNAME_INPUT = 'input[name="username"]'
PASSWORD_INPUT = 'input[type="password"]'
LOGIN_BUTTON = 'button[type="submit"]'
REGISTER_LINK = 'a:has-text("Register")'

# ── Page heading ──────────────────────────────────────────────────────────────
PAGE_HEADING = 'h1'
LOGIN_PAGE_TITLE = 'Login'

# ── Validation messages ───────────────────────────────────────────────────────
ERROR_MESSAGE = '[role="alert"]'
INVALID_CREDENTIALS_MSG = 'text=Invalid credentials'
MISSING_USERNAME_MSG = 'text=Username is required'
MISSING_PASSWORD_MSG = 'text=Password is required'

# ── Post-login elements ───────────────────────────────────────────────────────
DASHBOARD_INDICATOR = 'text=Dashboard'
AUTH_TOKEN_STORAGE = 'localStorage.getItem("authToken")'

# ── Additional UI elements ────────────────────────────────────────────────────
FORGOT_PASSWORD_LINK = 'a:has-text("Forgot")'
