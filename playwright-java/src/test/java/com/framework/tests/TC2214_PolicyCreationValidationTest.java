package com.framework.tests;

import com.framework.pages.LoginPage;
import com.framework.pages.PolicyPage;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Playwright;
import org.testng.Assert;
import org.testng.annotations.*;

/**
 * Test Case ID: 2214
 * Title: Verify that policy creation fails when mandatory customer name field is left empty
 * Priority: 1-High
 * Type: Functional
 */
public class TC2214_PolicyCreationValidationTest {
    private Playwright playwright;
    private Browser browser;
    private Page page;
    private LoginPage loginPage;
    private PolicyPage policyPage;

    @BeforeClass
    public void setupClass() {
        playwright = Playwright.create();
    }

    @BeforeMethod
    public void setup() {
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        loginPage = new LoginPage(page);
        policyPage = new PolicyPage(page);
    }

    @AfterMethod
    public void tearDown() {
        if (page != null) {
            page.close();
        }
        if (browser != null) {
            browser.close();
        }
    }

    @AfterClass
    public void tearDownClass() {
        if (playwright != null) {
            playwright.close();
        }
    }

    @Test(priority = 1, description = "TC2214: Verify that policy creation fails when mandatory customer name field is left empty")
    public void testPolicyCreationFailsWithEmptyCustomerName() {
        // STEP 1: Navigate to url "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
        // Expected: Configured application URL should open
        String baseUrl = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
        loginPage.navigateToLoginPage(baseUrl);
        Assert.assertTrue(page.url().contains("orangehrmlive.com"), "Application URL should open successfully");

        // STEP 2: Enter username "Admin" and password "admin123"
        // Expected: Configured credentials should be entered successfully
        String username = "Admin";
        String password = "admin123";
        loginPage.enterCredentials(username, password);
        loginPage.clickLoginButton();
        
        // Wait for successful login
        page.waitForTimeout(2000);
        Assert.assertFalse(page.url().contains("/auth/login"), "User should be logged in successfully");

        // STEP 3: Leave customer name field empty and fill all other mandatory fields with valid data
        // Expected: Customer name field should remain empty
        policyPage.leaveCustomerNameEmpty();
        policyPage.fillOtherMandatoryFields();

        // STEP 4: Click Submit button and verify validation error message is displayed for customer name
        // Expected: Error message should indicate customer name is required
        policyPage.clickSubmitButton();
        page.waitForTimeout(1000);
        
        Assert.assertTrue(policyPage.isValidationErrorDisplayed(), 
            "Validation error message should be displayed");
        Assert.assertTrue(policyPage.isCustomerNameErrorDisplayed(), 
            "Error message should indicate customer name is required");
    }
}