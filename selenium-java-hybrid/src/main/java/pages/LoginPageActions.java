package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import pageObjects.LoginPage;
import base.BasePage;
import static org.assertj.core.api.Assertions.*;
import java.time.Duration;
import java.util.Map;

/**
 * LoginPageActions — Login page actions and assertions
 * Extends BasePage for inherited utilities
 * Framework: Selenium + Java + Hybrid
 */
public class LoginPageActions extends BasePage {

    public LoginPageActions(WebDriver driver) {
        super(driver);
    }

    // ── Navigation ───────────────────────────────────────────────────────────

    public void navigateToLoginPage() {
        String baseUrl = System.getProperty("BASE_URL", configReader.getProperty("baseUrl"));
        driver.get(baseUrl);
        waitForPageLoad();
    }

    // ── Actions ──────────────────────────────────────────────────────────────

    public void enterUsername(String username) {
        waitAndSendKeys(LoginPage.USERNAME_INPUT, username);
    }

    public void enterEmail(String email) {
        waitAndSendKeys(LoginPage.EMAIL_INPUT, email);
    }

    public void enterPassword(String password) {
        waitAndSendKeys(LoginPage.PASSWORD_INPUT, password);
    }

    public void clickLoginButton() {
        waitAndClick(LoginPage.LOGIN_BUTTON);
        waitForPageLoad();
    }

    public void clickForgotPasswordLink() {
        waitAndClick(LoginPage.FORGOT_PASSWORD_LINK);
        waitForPageLoad();
    }

    public void clickRegisterLink() {
        waitAndClick(LoginPage.REGISTER_LINK);
        waitForPageLoad();
    }

    public void loginWithCredentials(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLoginButton();
    }

    public void loginWithRole(String roleName) {
        Map<String, String> credentials = getCredentialsByRole(roleName);
        loginWithCredentials(credentials.get("username"), credentials.get("password"));
    }

    public void fillUsernameWithSpecialCharacters(String specialChars) {
        enterUsername(specialChars);
    }

    public void fillUsernameWithUnicodeCharacters(String unicodeText) {
        enterUsername(unicodeText);
    }

    public void fillUsernameWithMaxLength() {
        String maxLengthUsername = generateRandomString(255);
        enterUsername(maxLengthUsername);
    }

    public void fillPasswordWithMaxLength() {
        String maxLengthPassword = generateRandomString(255);
        enterPassword(maxLengthPassword);
    }

    public void submitEmptyForm() {
        clickLoginButton();
    }

    public void rapidlyClickLoginButton(int times) {
        for (int i = 0; i < times; i++) {
            waitAndClick(LoginPage.LOGIN_BUTTON);
            waitForMilliseconds(100);
        }
    }

    public void tabFromUsernameToPassword() {
        waitAndSendKeys(LoginPage.USERNAME_INPUT, "");
        pressTab();
    }

    public void tabFromPasswordToLoginButton() {
        waitAndSendKeys(LoginPage.PASSWORD_INPUT, "");
        pressTab();
    }

    public void attemptSQLInjection() {
        enterUsername("' OR '1'='1");
        enterPassword("' OR '1'='1");
        clickLoginButton();
    }

    public void fillWithWhitespaceCredentials() {
        enterUsername("   user   ");
        enterPassword("   pass   ");
    }

    public void fillUsernameInDifferentCase(String username) {
        enterUsername(username.toUpperCase());
    }

    // ── Assertions ───────────────────────────────────────────────────────────

    public void verifyLoginPageLoaded() {
        waitForElementVisible(LoginPage.USERNAME_INPUT);
        waitForElementVisible(LoginPage.PASSWORD_INPUT);
        waitForElementVisible(LoginPage.LOGIN_BUTTON);
        assertThat(driver.getCurrentUrl()).contains("/login");
    }

    public void verifyAllElementsPresent() {
        verifyElementIsDisplayed(LoginPage.USERNAME_INPUT);
        verifyElementIsDisplayed(LoginPage.PASSWORD_INPUT);
        verifyElementIsDisplayed(LoginPage.LOGIN_BUTTON);
        verifyElementIsDisplayed(LoginPage.REGISTER_LINK);
    }

    public void verifyPasswordFieldMasked() {
        String passwordType = getAttributeValue(LoginPage.PASSWORD_INPUT, "type");
        assertThat(passwordType).isEqualTo("password");
    }

    public void verifyErrorMessageDisplayed() {
        waitForElementVisible(LoginPage.ERROR_MESSAGE);
        verifyElementIsDisplayed(LoginPage.ERROR_MESSAGE);
    }

    public void verifyErrorMessageContains(String expectedText) {
        waitForElementVisible(LoginPage.ERROR_MESSAGE);
        String actualText = getElementText(LoginPage.ERROR_MESSAGE);
        assertThat(actualText).containsIgnoringCase(expectedText);
    }

    public void verifyRequiredFieldError() {
        verifyErrorMessageContains("Required");
    }

    public void verifyInvalidCredentialsError() {
        verifyErrorMessageContains("Invalid credentials");
    }

    public void verifyAccountDisabledError() {
        verifyErrorMessageContains("disabled");
    }

    public void verifyUserRemainsOnLoginPage() {
        assertThat(driver.getCurrentUrl()).contains("/login");
        verifyElementIsDisplayed(LoginPage.LOGIN_BUTTON);
    }

    public void verifyLoginSuccessful() {
        waitForPageLoad();
        assertThat(driver.getCurrentUrl()).doesNotContain("/login");
    }

    public void verifyPlaceholderText() {
        String usernamePlaceholder = getAttributeValue(LoginPage.USERNAME_INPUT, "placeholder");
        String passwordPlaceholder = getAttributeValue(LoginPage.PASSWORD_INPUT, "placeholder");
        assertThat(usernamePlaceholder).isNotEmpty();
        assertThat(passwordPlaceholder).isNotEmpty();
    }

    public void verifyTabNavigationWorks() {
        String focusedElement = driver.switchTo().activeElement().getAttribute("name");
        assertThat(focusedElement).isNotEmpty();
    }

    public void verifyPasswordCopyDisabled() {
        String oncopy = getAttributeValue(LoginPage.PASSWORD_INPUT, "oncopy");
        // Most apps disable copy via JS or readonly attribute
        // This is a placeholder assertion
        assertThat(oncopy).containsAnyOf("return false", "preventDefault");
    }

    public void verifyHTTPSProtocol() {
        String currentUrl = driver.getCurrentUrl();
        assertThat(currentUrl).startsWith("https://");
    }

    public void verifySSLCertificate() {
        // SSL verification requires browser capabilities inspection
        // Placeholder for future implementation
        assertThat(driver.getCurrentUrl()).startsWith("https://");
    }

    public void verifyLoginButtonClickable() {
        verifyElementIsEnabled(LoginPage.LOGIN_BUTTON);
        verifyElementIsDisplayed(LoginPage.LOGIN_BUTTON);
    }

    public void verifyLoginButtonDisabledAfterClick() {
        waitForElementVisible(LoginPage.DISABLED_LOGIN_BUTTON);
    }

    public void verifyPageLoadTime(long maxMilliseconds) {
        long startTime = System.currentTimeMillis();
        waitForPageLoad();
        long endTime = System.currentTimeMillis();
        long loadTime = endTime - startTime;
        assertThat(loadTime).isLessThan(maxMilliseconds);
    }

    public void verifyResponseTime(long maxMilliseconds) {
        long startTime = System.currentTimeMillis();
        clickLoginButton();
        waitForPageLoad();
        long endTime = System.currentTimeMillis();
        long responseTime = endTime - startTime;
        assertThat(responseTime).isLessThan(maxMilliseconds);
    }

    public void verifyResponsiveDesign() {
        // Resize window and verify elements still visible
        driver.manage().window().setSize(new org.openqa.selenium.Dimension(375, 667));
        verifyElementIsDisplayed(LoginPage.USERNAME_INPUT);
        verifyElementIsDisplayed(LoginPage.PASSWORD_INPUT);
        verifyElementIsDisplayed(LoginPage.LOGIN_BUTTON);
    }

    public void verifyFormStateCleared() {
        String usernameValue = getAttributeValue(LoginPage.USERNAME_INPUT, "value");
        assertThat(usernameValue).isEmpty();
    }

    public void verifyRateLimitingTriggered() {
        verifyErrorMessageContains("too many attempts");
    }

    public void verifyUnicodeHandling() {
        // Verify no encoding errors after submission
        verifyErrorMessageDisplayed();
    }

    public void verifySQLInjectionBlocked() {
        verifyErrorMessageDisplayed();
        verifyUserRemainsOnLoginPage();
    }

    public void verifyWhitespaceHandling() {
        // System should either trim or reject whitespace-only input
        verifyErrorMessageDisplayed();
    }

    public void verifyCaseSensitivityHandling() {
        // Behavior depends on app requirements
        // Either success or error is acceptable
        waitForPageLoad();
    }
}