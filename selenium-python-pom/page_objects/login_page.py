# page_objects/login_page.py
# ─────────────────────────────────────────────────────────────────────────────
# Locator constants for Login page
# RULES: Constants only | Zero logic | Zero imports | Zero methods
# ─────────────────────────────────────────────────────────────────────────────

# ── Login form elements ───────────────────────────────────────────────────────
EMAIL_INPUT = "input[name='email']"
PASSWORD_INPUT = "input[type='password']"
LOGIN_BUTTON = "button[type='submit']"
REGISTER_LINK = "a[href*='register']"

# ── Page heading ──────────────────────────────────────────────────────────────
LOGIN_PAGE_HEADING = "h1"

# ── Validation messages ───────────────────────────────────────────────────────
ERROR_MESSAGE = ".error-message"
INVALID_CREDENTIALS_MESSAGE = ".alert-danger"
EMPTY_FIELD_ERROR = ".field-error"

# ── Post-login landing ────────────────────────────────────────────────────────
DASHBOARD_INDICATOR = "[data-testid='dashboard']"
USER_PROFILE_MENU = ".user-profile"
