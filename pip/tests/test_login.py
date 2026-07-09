import pytest
from pageObjects.LoginPage import LoginPage
from pageObjects.DashboardPage import DashboardPage


class TestLogin:
    """
    Test suite for Login functionality
    """

    @pytest.mark.priority_high
    @pytest.mark.functional
    @pytest.mark.testcase_2243
    def test_verify_login_with_valid_credentials(self, setup):
        """
        [2243] Verify that login works with valid credentials
        Priority: 1-High
        Type: Functional
        
        Steps:
        STEP 1: Navigate to url "https://demo.guru99.com/insurance/v1/index.php" -> Configured application URL should open
        STEP 2: Enter username "demoinsurance@yopmail.com" and password "admin123" -> Configured credentials should be entered successfully
        STEP 3: Click Login button -> User should login successfully
        STEP 4: Verify dashboard page is displayed -> Dashboard should be visible to the user
        """
        driver = setup
        
        # STEP 1: Navigate to url "https://demo.guru99.com/insurance/v1/index.php"
        driver.get("https://demo.guru99.com/insurance/v1/index.php")
        assert "Insurance" in driver.title, "Configured application URL should open"
        
        # STEP 2: Enter username "demoinsurance@yopmail.com" and password "admin123"
        login_page = LoginPage(driver)
        login_page.enter_username("demoinsurance@yopmail.com")
        login_page.enter_password("admin123")
        
        # STEP 3: Click Login button
        login_page.click_login_button()
        
        # STEP 4: Verify dashboard page is displayed
        dashboard_page = DashboardPage(driver)
        assert dashboard_page.is_dashboard_displayed(), "Dashboard should be visible to the user"
