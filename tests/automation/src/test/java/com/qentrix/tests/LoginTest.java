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

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class LoginTest {

    private WebDriver driver;
    private LoginPage loginPage;
    private Properties config;

    @BeforeMethod
    public void setUp() throws IOException {
        config = new Properties();
        FileInputStream fis = new FileInputStream("src/test/resources/config.properties");
        config.load(fis);

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        if (Boolean.parseBoolean(config.getProperty("headless", "false"))) {
            options.addArguments("--headless");
        }

        driver = new ChromeDriver(options);
        driver.get(config.getProperty("baseUrl"));
        loginPage = new LoginPage(driver);
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test(description = "Verify successful login with valid credentials")
    public void testValidLogin() {
        loginPage.login(config.getProperty("validUsername"), config.getProperty("validPassword"));
        Assert.assertTrue(loginPage.isLogoutButtonDisplayed(), "User should be logged in successfully");
    }

    @Test(description = "Verify login fails with invalid username")
    public void testInvalidUsername() {
        loginPage.login("invalidUser", config.getProperty("validPassword"));
        String errorMsg = loginPage.getErrorMessage();
        Assert.assertTrue(errorMsg.contains("Invalid") || errorMsg.contains("incorrect"), 
            "Error message should be displayed for invalid username");
    }

    @Test(description = "Verify login fails with invalid password")
    public void testInvalidPassword() {
        loginPage.login(config.getProperty("validUsername"), "wrongPassword");
        String errorMsg = loginPage.getErrorMessage();
        Assert.assertTrue(errorMsg.contains("Invalid") || errorMsg.contains("incorrect"), 
            "Error message should be displayed for invalid password");
    }

    @Test(description = "Verify login fails with empty credentials")
    public void testEmptyCredentials() {
        loginPage.clickLoginButton();
        Assert.assertTrue(loginPage.isLoginButtonDisplayed(), 
            "User should remain on login page with empty credentials");
    }

    @Test(description = "Verify login fails with empty username")
    public void testEmptyUsername() {
        loginPage.enterPassword(config.getProperty("validPassword"));
        loginPage.clickLoginButton();
        Assert.assertTrue(loginPage.isLoginButtonDisplayed(), 
            "User should remain on login page with empty username");
    }

    @Test(description = "Verify login fails with empty password")
    public void testEmptyPassword() {
        loginPage.enterUsername(config.getProperty("validUsername"));
        loginPage.clickLoginButton();
        Assert.assertTrue(loginPage.isLoginButtonDisplayed(), 
            "User should remain on login page with empty password");
    }

    @DataProvider(name = "loginData")
    public Object[][] loginDataProvider() {
        return new Object[][] {
            {"user1", "pass1", false},
            {"user2", "pass2", false},
            {config.getProperty("validUsername"), config.getProperty("validPassword"), true}
        };
    }

    @Test(dataProvider = "loginData", description = "Data-driven login test")
    public void testLoginWithDataProvider(String username, String password, boolean expectedResult) {
        loginPage.login(username, password);
        if (expectedResult) {
            Assert.assertTrue(loginPage.isLogoutButtonDisplayed(), 
                "Login should be successful for valid credentials");
        } else {
            Assert.assertTrue(loginPage.isLoginButtonDisplayed() || 
                loginPage.getErrorMessage() != null, 
                "Login should fail for invalid credentials");
        }
    }

    @Test(description = "Verify user can logout after successful login")
    public void testLogout() {
        loginPage.login(config.getProperty("validUsername"), config.getProperty("validPassword"));
        Assert.assertTrue(loginPage.isLogoutButtonDisplayed(), "User should be logged in");
        loginPage.clickLogoutButton();
        Assert.assertTrue(loginPage.isLoginButtonDisplayed(), "User should be logged out");
    }
}