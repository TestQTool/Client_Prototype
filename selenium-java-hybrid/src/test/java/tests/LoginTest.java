package tests;

import org.testng.annotations.Test;
import org.testng.annotations.BeforeMethod;
import org.testng.Assert;
import pageObjects.LoginPage;
import pageObjects.DashboardPage;

/**
 * Test Case ID: 2183
 * Test Case: Verify that login works with valid credentials
 * Priority: 1-High
 * Type: Functional
 * Project: 360GlobalNet
 */
public class LoginTest extends BaseTest {
    
    private LoginPage loginPage;
    private DashboardPage dashboardPage;
    
    @BeforeMethod
    public void setupPageObjects() {
        loginPage = new LoginPage(driver);
        dashboardPage = new DashboardPage(driver);
    }
    
    /**
     * Test Case ID: 2183
     * Verify that login works with valid credentials
     * Priority: 1-High
     */
    @Test(priority = 1, description = "Verify that login works with valid credentials")
    public void testCase2183_VerifyLoginWithValidCredentials() {
        try {
            // STEP 1: Navigate to url "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
            // Expected: Configured application URL should open
            driver.get("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
            String currentUrl = driver.getCurrentUrl();
            Assert.assertTrue(currentUrl.contains("orangehrmlive.com"), 
                "Application URL should open - Current URL: " + currentUrl);
            
            // STEP 2: Enter username "Admin" and password "Admin"
            // Expected: Configured credentials should be entered successfully
            loginPage.enterUsername("Admin");
            loginPage.enterPassword("admin123");
            
            // STEP 3: Click Login button
            // Expected: User should login successfully
            loginPage.clickLoginButton();
            
            // Wait for navigation
            Thread.sleep(2000);
            
            // STEP 4: Verify dashboard page is displayed
            // Expected: Dashboard should be visible to the user
            boolean isDashboardVisible = dashboardPage.isDashboardDisplayed();
            Assert.assertTrue(isDashboardVisible, 
                "Dashboard should be visible to the user after successful login");
            
            String dashboardText = dashboardPage.getDashboardHeaderText();
            Assert.assertEquals(dashboardText, "Dashboard", 
                "Dashboard header should display 'Dashboard'");
            
        } catch (InterruptedException e) {
            Assert.fail("Test interrupted: " + e.getMessage());
        }
    }
}