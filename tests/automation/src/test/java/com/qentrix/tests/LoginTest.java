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
import java.time.Duration;
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
        
        driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.get(config.getProperty("baseUrl"));
        
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
        loginPage.login(config.getProperty("validUsername"), config.getProperty("validPassword"));
        Assert.assertTrue(loginPage.isLogoutButtonDisplayed(), "User should be logged in successfully");
    }

    @Test(priority = 2, description = "Verify login fails with invalid username")
    public void testInvalidUsername() {
        loginPage.login("invaliduser", config.getProperty("validPassword"));
        String errorMsg = loginPage.getErrorMessage();
        Assert.assertTrue(errorMsg.contains("Invalid"), "Error message should be displayed for invalid username");
    }

    @Test(priority = 3, description = "Verify login fails with invalid password")
    public void testInvalidPassword() {
        loginPage.login(config.getProperty("validUsername"), "wrongpassword");
        String errorMsg = loginPage.getErrorMessage();
        Assert.assertTrue(errorMsg.contains("Invalid"), "Error message should be displayed for invalid password");
    }

    @Test(priority = 4, description = "Verify login fails with empty credentials")
    public void testEmptyCredentials() {
        loginPage.clickLoginButton();
        Assert.assertTrue(loginPage.isLoginButtonDisplayed(), "User should remain on login page");
    }

    @Test(priority = 5, description = "Verify user can logout successfully")
    public void testLogout() {
        loginPage.login(config.getProperty("validUsername"), config.getProperty("validPassword"));
        Assert.assertTrue(loginPage.isLogoutButtonDisplayed(), "User should be logged in");
        loginPage.clickLogoutButton();
        Assert.assertTrue(loginPage.isLoginButtonDisplayed(), "User should be logged out and see login button");
    }

    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        return new Object[][] {
            {"user1", "pass1", false},
            {"admin", "admin123", true},
            {"", "password", false},
            {"username", "", false}
        };
    }

    @Test(priority = 6, dataProvider = "loginData", description = "Data driven login test")
    public void testDataDrivenLogin(String username, String password, boolean expectedResult) {
        loginPage.login(username, password);
        if (expectedResult) {
            Assert.assertTrue(loginPage.isLogoutButtonDisplayed(), "Login should be successful");
        } else {
            Assert.assertTrue(loginPage.isLoginButtonDisplayed(), "Login should fail");
        }
    }
}