import pytest
from playwright.sync_api import Page
from pageObjects.loginPage import LoginPage
from pageObjects.vacancyPage import VacancyPage

# Test Case ID: 1803
# Title: Verify that system validates mandatory Hiring Manager field when creating a job vacancy
# Priority: 2-Medium
# Type: Functional

class TestVacancyHiringManagerValidation:
    
    @pytest.mark.functional
    @pytest.mark.priority_medium
    @pytest.mark.testcase_1803
    def test_verify_hiring_manager_field_validation(self, page: Page, config: dict):
        """
        Test Case 1803: Verify that system validates mandatory Hiring Manager field when creating a job vacancy
        
        Steps:
        1. Navigate to application URL
        2. Enter username and password
        3. Enter Job Title, Vacancy Name, leave Hiring Manager unselected, and enter Number of Positions
        4. Click Save button and verify validation error is displayed
        """
        
        # Get test data from config
        base_url = config.get('base_url', 'https://hr.quality-matrix.us/web/index.php/auth/login')
        username = config.get('username', 'adminhrqa')
        password = config.get('password', 'Adminhrqa@321')
        
        # Initialize page objects
        login_page = LoginPage(page)
        vacancy_page = VacancyPage(page)
        
        # STEP 1: Navigate to url "https://hr.quality-matrix.us/web/index.php/auth/login"
        # Expected: Configured application URL should open
        login_page.navigate(base_url)
        assert page.url == base_url or base_url in page.url, "Application URL should open successfully"
        
        # STEP 2: Enter username "adminhrqa" and password "Adminhrqa@321"
        # Expected: Configured credentials should be entered successfully
        login_page.login(username, password)
        page.wait_for_load_state('networkidle')
        assert "dashboard" in page.url.lower(), "User should be logged in successfully"
        
        # Navigate to Vacancies section
        vacancy_page.navigate_to_vacancies()
        page.wait_for_load_state('networkidle')
        vacancy_page.click_add_vacancy()
        page.wait_for_load_state('networkidle')
        
        # STEP 3: Enter Job Title "DevOps Engineer", Vacancy Name "DO-2024-001", 
        # leave Hiring Manager unselected, and enter Number of Positions "2"
        # Expected: Hiring Manager field should remain empty
        vacancy_page.select_job_title("DevOps Engineer")
        vacancy_page.enter_vacancy_name("DO-2024-001")
        vacancy_page.leave_hiring_manager_empty()
        vacancy_page.enter_number_of_positions("2")
        
        # STEP 4: Click Save button and verify validation error is displayed
        # Expected: System should display required field validation error for Hiring Manager
        vacancy_page.click_save()
        page.wait_for_timeout(1000)  # Wait for validation to appear
        
        assert vacancy_page.is_validation_error_displayed(), "Validation error should be displayed for Hiring Manager field"
        error_message = vacancy_page.get_validation_error()
        assert "required" in error_message.lower(), f"Expected required field error, but got: {error_message}"
