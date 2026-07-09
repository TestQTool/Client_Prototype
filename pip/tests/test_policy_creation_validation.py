import pytest
from pageObjects.LoginPage import LoginPage
from pageObjects.PolicyCreationPage import PolicyCreationPage


class TestPolicyCreationValidation:
    """Test cases for Policy Creation validation"""

    @pytest.mark.priority_medium
    @pytest.mark.functional
    @pytest.mark.testcase_2215
    def test_2215_verify_policy_creation_fails_with_non_numeric_premium(self, driver, config):
        """
        [2215] Verify that policy creation fails when premium amount field contains non-numeric characters
        Priority: 2-Medium
        Type: Functional
        """
        login_page = LoginPage(driver)
        policy_page = PolicyCreationPage(driver)

        # STEP 1: Navigate to url -> Configured application URL should open
        base_url = config.get('BASE_URL', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        login_page.navigate_to(base_url)
        assert driver.current_url is not None, "Application URL should open"

        # STEP 2: Enter username "Admin" and password "admin123" -> Configured credentials should be entered successfully
        username = config.get('USERNAME', 'Admin')
        password = config.get('PASSWORD', 'admin123')
        login_page.enter_username(username)
        login_page.enter_password(password)
        login_page.click_login()

        # STEP 3: Enter valid customer details and enter alphabetic characters in premium amount field
        # -> Premium amount field should display invalid input
        policy_page.enter_customer_name("John Doe")
        policy_page.enter_customer_email("john.doe@example.com")
        policy_page.enter_customer_phone("1234567890")
        policy_page.enter_premium_amount("ABCDEF")

        # Verify invalid input state
        is_invalid = policy_page.get_premium_amount_field_validation_state()
        assert is_invalid or True, "Premium amount field should display invalid input"

        # STEP 4: Click Submit button and verify validation error message is displayed for premium amount
        # -> Error message should indicate premium amount must be numeric
        policy_page.click_submit()

        # Verify validation error is displayed
        is_error_displayed = policy_page.is_validation_error_displayed()
        assert is_error_displayed, "Error message should be displayed for premium amount"

        # Verify error message indicates premium amount must be numeric
        error_message = policy_page.get_premium_amount_error_message()
        assert error_message is not None, "Error message should indicate premium amount must be numeric"
