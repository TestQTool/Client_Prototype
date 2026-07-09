from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class DashboardPage:
    """
    Page Object for Dashboard Page
    """

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)

    # Locators
    DASHBOARD_HEADER = (By.XPATH, "//h1[contains(text(),'Dashboard')]") 
    DASHBOARD_CONTAINER = (By.CLASS_NAME, "dashboard")
    USER_PROFILE = (By.ID, "user-profile")

    def is_dashboard_displayed(self):
        """
        Verify if dashboard page is displayed
        """
        try:
            self.wait.until(EC.presence_of_element_located(self.DASHBOARD_CONTAINER))
            return True
        except:
            return False

    def get_dashboard_title(self):
        """
        Get the dashboard page title
        """
        return self.driver.title
