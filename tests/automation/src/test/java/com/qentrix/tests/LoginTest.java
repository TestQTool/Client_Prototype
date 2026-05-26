package com.qentrix.tests;

import com.qentrix.pages.LoginPage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.time.Duration;

public class LoginTest {

    private WebDriver driver;
    private LoginPage loginPage;
    private static final String BASE_URL = "https://qentrix.com/login";

    @BeforeMethod
    public void setUp() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        options.addArguments("--disable-notifications");
        driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.get(BASE_URL);
        loginPage = new LoginPage(driver);
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test(priority = 1, description = "Verify successful login with valid credentials")
    public void testValidLogin() {
        loginPage.login("validuser@qentrix.com", "ValidPassword123");
        Assert.assertTrue(loginPage.isLogoutButtonDisplayed(), "Login should be successful and logout button should be visible");
    }

    @Test(priority = 2, description = "Verify login fails with invalid username")
    public void testInvalidUsername() {
        loginPage.login("invaliduser@qentrix.com", "ValidPassword123");
        String errorMsg = loginPage.getErrorMessage();
        Assert.assertTrue(errorMsg.contains("Invalid") || errorMsg.contains("incorrect"), "Error message should indicate invalid credentials");
    }

    @Test(priority = 3, description = "Verify login fails with invalid password")
    public void testInvalidPassword() {
        loginPage.login("validuser@qentrix.com", "WrongPassword");
        String errorMsg = loginPage.getErrorMessage();
        Assert.assertTrue(errorMsg.contains("Invalid") || errorMsg.contains("incorrect"), "Error message should indicate invalid credentials");
    }

    @Test(priority = 4, description = "Verify login fails with empty username")
    public void testEmptyUsername() {
        loginPage.login("", "ValidPassword123");
        Assert.assertTrue(loginPage.isLoginPageDisplayed(), "User should remain on login page");
    }

    @Test(priority = 5, description = "Verify login fails with empty password")
    public void testEmptyPassword() {
        loginPage.login("validuser@qentrix.com", "");
        Assert.assertTrue(loginPage.isLoginPageDisplayed(), "User should remain on login page");
    }

    @Test(priority = 6, description = "Verify login fails with both empty fields")
    public void testEmptyCredentials() {
        loginPage.login("", "");
        Assert.assertTrue(loginPage.isLoginPageDisplayed(), "User should remain on login page");
    }

    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        return new Object[][]{
                {"user1@qentrix.com", "Password1", true},
                {"user2@qentrix.com", "Password2", true},
                {"invalid@qentrix.com", "wrongpass", false}
        };
    }

    @Test(priority = 7, dataProvider = "loginData", description = "Data-driven login test")
    public void testLoginWithDataProvider(String username, String password, boolean expectedResult) {
        loginPage.login(username, password);
        if (expectedResult) {
            Assert.assertTrue(loginPage.isLogoutButtonDisplayed(), "Login should be successful");
        } else {
            Assert.assertTrue(loginPage.isLoginPageDisplayed() || loginPage.getErrorMessage() != null, "Login should fail");
        }
    }
}