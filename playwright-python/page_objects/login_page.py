# page_objects/login_page.py
# ─────────────────────────────────────────────────────────────────────────────
# Login Page Object - Locator constants only
# Rules: No logic | No imports | No methods | Grouped by section
# ─────────────────────────────────────────────────────────────────────────────

# ── Page identification ───────────────────────────────────────────────────────
PAGE_HEADING = "h1"
PAGE_TITLE = "title"

# ── Form inputs ───────────────────────────────────────────────────────────────
EMAIL_INPUT = "input[name='email']"
USERNAME_INPUT = "input[name='username']"
PASSWORD_INPUT = "input[name='password']"

# ── Buttons ───────────────────────────────────────────────────────────────────
LOGIN_BUTTON = "button[type='submit']"
SUBMIT_BUTTON = "//button[contains(., 'Login')]"
REGISTER_LINK = "a:has-text('Register')"

# ── Validation messages ───────────────────────────────────────────────────────
ERROR_MESSAGE = "[role='alert']"
VALIDATION_ERROR = ".error-message"
INVALID_CREDENTIALS_MSG = "//div[contains(text(), 'Invalid credentials')]"
MISSING_USERNAME_MSG = "//div[contains(text(), 'missing username')]"
MISSING_PASSWORD_MSG = "//div[contains(text(), 'missing password')]"
REQUIRED_FIELD_ERROR = "span:has-text('Required')"

# ── Success indicators ────────────────────────────────────────────────────────
SUCCESS_MESSAGE = ".success-message"
AUTH_TOKEN_RESPONSE = "[data-testid='auth-token']"

# ── Navigation ────────────────────────────────────────────────────────────────
DASHBOARD_INDICATOR = "[data-testid='dashboard']"
LOGOUT_BUTTON = "button:has-text('Logout')"
