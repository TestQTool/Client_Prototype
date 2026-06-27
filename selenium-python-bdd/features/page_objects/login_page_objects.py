# features/page_objects/login_page_objects.py
# ─────────────────────────────────────────────────────────────────────────────
# Login Page Object Locators
# RULES: Named constants ONLY | Zero logic | Zero imports | Zero methods
# ─────────────────────────────────────────────────────────────────────────────

# ── Login Form Elements ───────────────────────────────────────────────────────
EMAIL_INPUT = "input[name='email']"
PASSWORD_INPUT = "input[type='password']"
LOGIN_BUTTON = "button:has-text('Login')"
REGISTER_LINK = "a:has-text('Register')"

# ── Page Elements ─────────────────────────────────────────────────────────────
LOGIN_PAGE_HEADING = "h1"
LOGIN_FORM = "form"

# ── Validation Messages ───────────────────────────────────────────────────────
ERROR_MESSAGE = "[role='alert']"
INVALID_CREDENTIALS_ERROR = "text='Invalid credentials'"
INVALID_USERNAME_ERROR = "text='Invalid username'"
INVALID_PASSWORD_ERROR = "text='Invalid password'"
EMPTY_USERNAME_ERROR = "text='Username is required'"
EMPTY_PASSWORD_ERROR = "text='Password is required'"

# ── Success Indicators ────────────────────────────────────────────────────────
SUCCESS_MESSAGE = ".success-message"
AUTH_TOKEN_ELEMENT = "[data-testid='auth-token']"

# ── Response Status (for API-style tests if needed) ──────────────────────────
# These would be used in step definitions for API validation
# No selectors needed - kept as constants for test data reference
