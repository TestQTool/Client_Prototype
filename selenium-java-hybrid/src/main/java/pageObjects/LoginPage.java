package pageObjects;

/**
 * LoginPage — Locator constants only
 * RULES: No imports | No logic | No methods
 * Framework: Selenium + Java + Hybrid
 */
public class LoginPage {

    // ── Page elements ────────────────────────────────────────────────────────
    public static final String USERNAME_INPUT = "input[name='username']";
    public static final String EMAIL_INPUT = "input[type='email']";
    public static final String PASSWORD_INPUT = "input[type='password']";
    public static final String LOGIN_BUTTON = "button[type='submit']";
    public static final String LOGIN_BUTTON_TEXT = "//button[contains(text(),'Login')]";
    public static final String REGISTER_LINK = "a[href*='register']";
    public static final String FORGOT_PASSWORD_LINK = "//a[contains(text(),'Forgot')]";

    // ── Validation messages ──────────────────────────────────────────────────
    public static final String ERROR_MESSAGE = "[role='alert']";
    public static final String VALIDATION_ERROR = ".error-message";
    public static final String REQUIRED_FIELD_ERROR = "//span[contains(text(),'Required')]";
    public static final String INVALID_CREDENTIALS_ERROR = "//div[contains(text(),'Invalid credentials')]";
    public static final String ACCOUNT_DISABLED_ERROR = "//div[contains(text(),'disabled')]";
    public static final String SUCCESS_MESSAGE = ".success-message";

    // ── Security indicators ──────────────────────────────────────────────────
    public static final String HTTPS_INDICATOR = "#lock-icon";
    public static final String SSL_CERTIFICATE = "//body[@data-ssl='true']";

    // ── Form state ───────────────────────────────────────────────────────────
    public static final String USERNAME_PLACEHOLDER = "input[placeholder*='Username']";
    public static final String PASSWORD_PLACEHOLDER = "input[placeholder*='Password']";
    public static final String DISABLED_LOGIN_BUTTON = "button[disabled]";

    // TODO: verify selector against live app
    // Update after exploration if login page structure differs
}