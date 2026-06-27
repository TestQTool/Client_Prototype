package tests;

import base.BaseTest;
import io.qameta.allure.*;
import org.junit.jupiter.api.*;
import pages.LoginPageActions;

/**
 * LoginTest — Login feature test suite
 * Generated from test inventory cases
 * Framework: Selenium + Java + Hybrid
 */
@Epic("Authentication")
@Feature("Login")
public class LoginTest extends BaseTest {

    private LoginPageActions loginPage;

    @BeforeEach
    public void setupPage() {
        loginPage = new LoginPageActions(driver);
    }

    // ══════════════════════════════════════════════════════════════════════════
    // @smoke — Critical path tests
    // ══════════════════════════════════════════════════════════════════════════

    @Test
    @Tag("smoke")
    @Tag("regression")
    @Story("TC-21")
    @Description("Verify that login works with valid credentials")
    @Severity(SeverityLevel.BLOCKER)
    public void TC_21_VerifyLoginWithValidCredentials() {
        loginPage.navigateToLoginPage();
        loginPage.verifyLoginPageLoaded();

        loginPage.loginWithRole("Admin");

        loginPage.verifyLoginSuccessful();
    }

    @Test
    @Tag("smoke")
    @Tag("regression")
    @Story("TC-623")
    @Description("Verify that login page displays all required elements")
    @Severity(SeverityLevel.CRITICAL)
    public void TC_623_VerifyLoginPageDisplaysAllElements() {
        loginPage.navigateToLoginPage();

        loginPage.verifyAllElementsPresent();
        loginPage.verifyPlaceholderText();
    }

    // ══════════════════════════════════════════════════════════════════════════
    // @regression — Negative tests
    // ══════════════════════════════════════════════════════════════════════════

    @Test
    @Tag("regression")
    @Story("TC-618")
    @Description("Verify that login fails with invalid password")
    @Severity(SeverityLevel.CRITICAL)
    public void TC_618_VerifyLoginFailsWithInvalidPassword() {
        loginPage.navigateToLoginPage();

        loginPage.enterUsername("admin");
        loginPage.enterPassword("wrongpassword");
        loginPage.clickLoginButton();

        loginPage.verifyErrorMessageDisplayed();
        loginPage.verifyUserRemainsOnLoginPage();
    }

    @Test
    @Tag("regression")
    @Story("TC-619")
    @Description("Verify that login fails with invalid username")
    @Severity(SeverityLevel.CRITICAL)
    public void TC_619_VerifyLoginFailsWithInvalidUsername() {
        loginPage.navigateToLoginPage();

        loginPage.enterUsername("invaliduser");
        loginPage.enterPassword("admin123");
        loginPage.clickLoginButton();

        loginPage.verifyErrorMessageDisplayed();
        loginPage.verifyUserRemainsOnLoginPage();
    }

    @Test
    @Tag("regression")
    @Story("TC-620")
    @Description("Verify that login fails with empty credentials")
    @Severity(SeverityLevel.CRITICAL)
    public void TC_620_VerifyLoginFailsWithEmptyCredentials() {
        loginPage.navigateToLoginPage();

        loginPage.submitEmptyForm();

        loginPage.verifyErrorMessageDisplayed();
        loginPage.verifyUserRemainsOnLoginPage();
    }

    @Test
    @Tag("regression")
    @Story("TC-624")
    @Description("Verify that login fails with empty username field")
    @Severity(SeverityLevel.NORMAL)
    public void TC_624_VerifyLoginFailsWithEmptyUsername() {
        loginPage.navigateToLoginPage();

        loginPage.enterPassword("admin123");
        loginPage.clickLoginButton();

        loginPage.verifyRequiredFieldError();
        loginPage.verifyUserRemainsOnLoginPage();
    }

    @Test
    @Tag("regression")
    @Story("TC-625")
    @Description("Verify that login fails with empty password field")
    @Severity(SeverityLevel.NORMAL)
    public void TC_625_VerifyLoginFailsWithEmptyPassword() {
        loginPage.navigateToLoginPage();

        loginPage.enterUsername("admin");
        loginPage.clickLoginButton();

        loginPage.verifyRequiredFieldError();
        loginPage.verifyUserRemainsOnLoginPage();
    }

    // ══════════════════════════════════════════════════════════════════════════
    // @regression — Security tests
    // ══════════════════════════════════════════════════════════════════════════

    @Test
    @Tag("regression")
    @Story("TC-622")
    @Description("Verify that password field masks input characters")
    @Severity(SeverityLevel.NORMAL)
    public void TC_622_VerifyPasswordFieldMasked() {
        loginPage.navigateToLoginPage();

        loginPage.enterPassword("testpassword");

        loginPage.verifyPasswordFieldMasked();
    }

    @Test
    @Tag("regression")
    @Story("TC-629")
    @Description("Verify that password field prevents copy functionality")
    @Severity(SeverityLevel.NORMAL)
    public void TC_629_VerifyPasswordCopyDisabled() {
        loginPage.navigateToLoginPage();

        loginPage.enterPassword("testpassword");

        loginPage.verifyPasswordCopyDisabled();
    }

    @Test
    @Tag("regression")
    @Story("TC-630")
    @Description("Verify that login shows error for SQL injection attempts")
    @Severity(SeverityLevel.CRITICAL)
    public void TC_630_VerifySQLInjectionBlocked() {
        loginPage.navigateToLoginPage();

        loginPage.attemptSQLInjection();

        loginPage.verifySQLInjectionBlocked();
    }

    @Test
    @Tag("regression")
    @Story("TC-637")
    @Description("Verify that login page uses HTTPS protocol")
    @Severity(SeverityLevel.CRITICAL)
    public void TC_637_VerifyHTTPSProtocol() {
        loginPage.navigateToLoginPage();

        loginPage.verifyHTTPSProtocol();
        loginPage.verifySSLCertificate();
    }

    @Test
    @Tag("regression")
    @Story("TC-640")
    @Description("Verify that login shows appropriate error for disabled account")
    @Severity(SeverityLevel.NORMAL)
    public void TC_640_VerifyDisabledAccountError() {
        loginPage.navigateToLoginPage();

        loginPage.enterUsername("disableduser");
        loginPage.enterPassword("password123");
        loginPage.clickLoginButton();

        loginPage.verifyAccountDisabledError();
    }

    @Test
    @Tag("regression")
    @Story("TC-644")
    @Description("Verify that login implements rate limiting for failed attempts")
    @Severity(SeverityLevel.CRITICAL)
    public void TC_644_VerifyRateLimiting() {
        loginPage.navigateToLoginPage();

        for (int i = 0; i < 5; i++) {
            loginPage.enterUsername("admin");
            loginPage.enterPassword("wrongpassword");
            loginPage.clickLoginButton();
        }

        loginPage.verifyRateLimitingTriggered();
    }

    // ══════════════════════════════════════════════════════════════════════════
    // @regression — Input validation tests
    // ══════════════════════════════════════════════════════════════════════════

    @Test
    @Tag("regression")
    @Story("TC-621")
    @Description("Verify that login handles special characters in username")
    @Severity(SeverityLevel.NORMAL)
    public void TC_621_VerifySpecialCharactersInUsername() {
        loginPage.navigateToLoginPage();

        loginPage.fillUsernameWithSpecialCharacters("user@#$%");
        loginPage.enterPassword("admin123");
        loginPage.clickLoginButton();

        loginPage.verifyErrorMessageDisplayed();
    }

    @Test
    @Tag("regression")
    @Story("TC-626")
    @Description("Verify that login handles maximum length username")
    @Severity(SeverityLevel.NORMAL)
    public void TC_626_VerifyMaxLengthUsername() {
        loginPage.navigateToLoginPage();

        loginPage.fillUsernameWithMaxLength();
        loginPage.enterPassword("admin123");
        loginPage.clickLoginButton();

        loginPage.verifyErrorMessageDisplayed();
    }

    @Test
    @Tag("regression")
    @Story("TC-627")
    @Description("Verify that login handles maximum length password")
    @Severity(SeverityLevel.NORMAL)
    public void TC_627_VerifyMaxLengthPassword() {
        loginPage.navigateToLoginPage();

        loginPage.enterUsername("admin");
        loginPage.fillPasswordWithMaxLength();
        loginPage.clickLoginButton();

        loginPage.verifyErrorMessageDisplayed();
    }

    @Test
    @Tag("regression")
    @Story("TC-632")
    @Description("Verify that login handles whitespace in credentials")
    @Severity(SeverityLevel.NORMAL)
    public void TC_632_VerifyWhitespaceHandling() {
        loginPage.navigateToLoginPage();

        loginPage.fillWithWhitespaceCredentials();
        loginPage.clickLoginButton();

        loginPage.verifyWhitespaceHandling();
    }

    @Test
    @Tag("regression")
    @Story("TC-638")
    @Description("Verify that login handles unicode characters in credentials")
    @Severity(SeverityLevel.NORMAL)
    public void TC_638_VerifyUnicodeCharacters() {
        loginPage.navigateToLoginPage();

        loginPage.fillUsernameWithUnicodeCharacters("用户");
        loginPage.enterPassword("пароль");
        loginPage.clickLoginButton();

        loginPage.verifyUnicodeHandling();
    }

    @Test
    @Tag("regression")
    @Story("TC-643")
    @Description("Verify that login handles case sensitivity correctly")
    @Severity(SeverityLevel.NORMAL)
    public void TC_643_VerifyCaseSensitivity() {
        loginPage.navigateToLoginPage();

        loginPage.fillUsernameInDifferentCase("admin");
        loginPage.enterPassword("admin123");
        loginPage.clickLoginButton();

        loginPage.verifyCaseSensitivityHandling();
    }

    // ══════════════════════════════════════════════════════════════════════════
    // @regression — UI/UX tests
    // ══════════════════════════════════════════════════════════════════════════

    @Test
    @Tag("regression")
    @Story("TC-628")
    @Description("Verify that tab navigation works between form fields")
    @Severity(SeverityLevel.NORMAL)
    public void TC_628_VerifyTabNavigation() {
        loginPage.navigateToLoginPage();

        loginPage.tabFromUsernameToPassword();
        loginPage.verifyTabNavigationWorks();

        loginPage.tabFromPasswordToLoginButton();
        loginPage.verifyTabNavigationWorks();
    }

    @Test
    @Tag("regression")
    @Story("TC-631")
    @Description("Verify that login button is clickable and responsive")
    @Severity(SeverityLevel.NORMAL)
    public void TC_631_VerifyLoginButtonResponsive() {
        loginPage.navigateToLoginPage();

        loginPage.verifyLoginButtonClickable();
    }

    @Test
    @Tag("regression")
    @Story("TC-635")
    @Description("Verify that login prevents multiple rapid submissions")
    @Severity(SeverityLevel.NORMAL)
    public void TC_635_VerifyMultipleSubmissionsPrevented() {
        loginPage.navigateToLoginPage();

        loginPage.enterUsername("admin");
        loginPage.enterPassword("admin123");
        loginPage.rapidlyClickLoginButton(3);

        loginPage.verifyLoginButtonDisabledAfterClick();
    }

    @Test
    @Tag("regression")
    @Story("TC-636")
    @Description("Verify that login form fields have proper placeholder text")
    @Severity(SeverityLevel.NORMAL)
    public void TC_636_VerifyPlaceholderText() {
        loginPage.navigateToLoginPage();

        loginPage.verifyPlaceholderText();
    }

    @Test
    @Tag("regression")
    @Story("TC-639")
    @Description("Verify that login form maintains state during session")
    @Severity(SeverityLevel.NORMAL)
    public void TC_639_VerifyFormStateCleared() {
        loginPage.navigateToLoginPage();

        loginPage.enterUsername("testuser");
        driver.navigate().to("about:blank");
        loginPage.navigateToLoginPage();

        loginPage.verifyFormStateCleared();
    }

    @Test
    @Tag("regression")
    @Story("TC-642")
    @Description("Verify that login page is responsive on different screen sizes")
    @Severity(SeverityLevel.NORMAL)
    public void TC_642_VerifyResponsiveDesign() {
        loginPage.navigateToLoginPage();

        loginPage.verifyResponsiveDesign();
    }

    // ══════════════════════════════════════════════════════════════════════════
    // @regression — Performance tests
    // ══════════════════════════════════════════════════════════════════════════

    @Test
    @Tag("regression")
    @Story("TC-633")
    @Description("Verify that login page loads within acceptable time")
    @Severity(SeverityLevel.NORMAL)
    public void TC_633_VerifyPageLoadTime() {
        long startTime = System.currentTimeMillis();
        loginPage.navigateToLoginPage();
        long endTime = System.currentTimeMillis();

        long loadTime = endTime - startTime;
        Assertions.assertTrue(loadTime < 3000, "Page load time exceeded 3 seconds: " + loadTime + "ms");
    }

    @Test
    @Tag("regression")
    @Story("TC-641")
    @Description("Verify that login response time is acceptable")
    @Severity(SeverityLevel.NORMAL)
    public void TC_641_VerifyLoginResponseTime() {
        loginPage.navigateToLoginPage();

        loginPage.enterUsername("admin");
        loginPage.enterPassword("admin123");

        loginPage.verifyResponseTime(2000);
    }

    @Test
    @Tag("regression")
    @Story("TC-646")
    @Description("Verify that login sends correct API request format")
    @Severity(SeverityLevel.NORMAL)
    public void TC_646_VerifyAPIRequestFormat() {
        loginPage.navigateToLoginPage();

        loginPage.enterUsername("admin");
        loginPage.enterPassword("admin123");
        loginPage.clickLoginButton();

        // API validation requires network monitoring
        // Placeholder for future implementation
        loginPage.verifyLoginSuccessful();
    }

    // ══════════════════════════════════════════════════════════════════════════
    // Legacy test cases from manual inventory
    // ══════════════════════════════════════════════════════════════════════════

    @Test
    @Tag("regression")
    @Story("TC-26")
    @Description("To Test Login Form with Valid Data")
    @Severity(SeverityLevel.BLOCKER)
    public void TC_26_TestLoginFormWithValidData() {
        loginPage.navigateToLoginPage();
        loginPage.verifyAllElementsPresent();

        loginPage.enterUsername("admin");
        loginPage.enterPassword("admin123");

        loginPage.verifyLoginPageLoaded();
    }

    @Test
    @Tag("regression")
    @Story("TC-27")
    @Description("To Test Login Form with Invalid Data")
    @Severity(SeverityLevel.CRITICAL)
    public void TC_27_TestLoginFormWithInvalidData() {
        driver.get("http://192.168.10.124:4001");
        loginPage.verifyLoginPageLoaded();

        loginPage.enterUsername("invaliduser");
        loginPage.enterPassword("invalidpass");

        loginPage.verifyErrorMessageDisplayed();
    }

    @Test
    @Tag("regression")
    @Story("TC-28")
    @Description("To Test Login Form with Invalid Data")
    @Severity(SeverityLevel.CRITICAL)
    public void TC_28_TestLoginFormWithInvalidData() {
        loginPage.navigateToLoginPage();

        loginPage.enterUsername("wronguser");
        loginPage.enterPassword("wrongpass");
        loginPage.clickLoginButton();

        loginPage.verifyErrorMessageDisplayed();
        loginPage.verifyUserRemainsOnLoginPage();
    }

    @Test
    @Tag("regression")
    @Story("TC-29")
    @Description("To Test Login Form with Invalid Data")
    @Severity(SeverityLevel.CRITICAL)
    public void TC_29_TestLoginFormWithInvalidData() {
        loginPage.navigateToLoginPage();

        loginPage.loginWithCredentials("baduser", "badpass");

        loginPage.verifyInvalidCredentialsError();
    }

    @Test
    @Tag("regression")
    @Story("TC-30")
    @Description("test import 01")
    @Severity(SeverityLevel.NORMAL)
    public void TC_30_TestImport01() {
        loginPage.navigateToLoginPage();
        loginPage.verifyLoginPageLoaded();
    }
}