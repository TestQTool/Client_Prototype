from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import csv
import json
import os


class BasePage:
    """
    BasePage - Parent class for all page objects.
    Provides common web actions, test data loading, and credential management.
    
    Framework: Selenium + Python + Hybrid
    All page classes should extend this class.
    """

    def __init__(self, driver, timeout=10):
        self.driver = driver
        self.timeout = timeout
        self.wait = WebDriverWait(self.driver, self.timeout)
        
        # Load test data from JSON
        testdata_path = os.path.join(os.path.dirname(__file__), '..', 'test-data', 'testdata.json')
        if os.path.exists(testdata_path):
            with open(testdata_path, 'r') as f:
                self.test_data = json.load(f)
        else:
            self.test_data = {}
        
        # Load credentials from CSV
        credentials_path = os.path.join(os.path.dirname(__file__), '..', 'test-data', 'credentials.csv')
        self.credentials = []
        if os.path.exists(credentials_path):
            with open(credentials_path, 'r') as f:
                reader = csv.DictReader(f)
                self.credentials = [row for row in reader]

    # ── Credential Management ─────────────────────────────────────────────────

    def get_login_data_by_role(self, role_name):
        """
        Get credentials for a given role from credentials.csv.
        
        Args:
            role_name (str): Role name (e.g., 'Admin', 'User')
            
        Returns:
            dict: {username, password, fullName, roleName}
            
        Raises:
            ValueError: If role not found in credentials
        """
        for row in self.credentials:
            if row.get('RoleName', '').strip() == role_name.strip():
                return {
                    'username': row.get('Username', '').strip(),
                    'password': row.get('Password', '').strip(),
                    'fullName': row.get('FullName', '').strip(),
                    'roleName': row.get('RoleName', '').strip()
                }
        raise ValueError(f"No credentials found for role: '{role_name}'. Check test-data/credentials.csv")

    def get_all_users(self):
        """Get all users from credentials CSV."""
        return [
            {
                'username': row.get('Username', '').strip(),
                'password': row.get('Password', '').strip(),
                'fullName': row.get('FullName', '').strip(),
                'roleName': row.get('RoleName', '').strip()
            }
            for row in self.credentials
        ]

    # ── Wait and Action Methods ───────────────────────────────────────────────

    def wait_for_element_visible(self, locator, timeout=None):
        """Wait for element to be visible."""
        wait_time = timeout if timeout else self.timeout
        return WebDriverWait(self.driver, wait_time).until(
            EC.visibility_of_element_located(locator)
        )

    def wait_for_element_clickable(self, locator, timeout=None):
        """Wait for element to be clickable."""
        wait_time = timeout if timeout else self.timeout
        return WebDriverWait(self.driver, wait_time).until(
            EC.element_to_be_clickable(locator)
        )

    def wait_for_element_present(self, locator, timeout=None):
        """Wait for element to be present in DOM."""
        wait_time = timeout if timeout else self.timeout
        return WebDriverWait(self.driver, wait_time).until(
            EC.presence_of_element_located(locator)
        )

    def wait_and_click(self, locator):
        """Wait for element to be clickable and click it."""
        element = self.wait_for_element_clickable(locator)
        element.click()

    def wait_and_fill(self, locator, text):
        """Wait for element to be visible and fill it with text."""
        element = self.wait_for_element_visible(locator)
        element.clear()
        element.send_keys(text)

    def wait_for_page_load(self):
        """Wait for page to load completely."""
        self.wait.until(lambda driver: driver.execute_script('return document.readyState') == 'complete')

    # ── Element State Methods ─────────────────────────────────────────────────

    def is_element_visible(self, locator, timeout=5):
        """Check if element is visible."""
        try:
            self.wait_for_element_visible(locator, timeout=timeout)
            return True
        except TimeoutException:
            return False

    def is_element_present(self, locator):
        """Check if element is present in DOM."""
        try:
            self.driver.find_element(*locator)
            return True
        except NoSuchElementException:
            return False

    def get_element_text(self, locator):
        """Get text from element."""
        element = self.wait_for_element_visible(locator)
        return element.text

    def get_element_attribute(self, locator, attribute):
        """Get attribute value from element."""
        element = self.wait_for_element_visible(locator)
        return element.get_attribute(attribute)

    # ── Navigation Methods ────────────────────────────────────────────────────

    def navigate_to(self, url):
        """Navigate to a URL."""
        self.driver.get(url)
        self.wait_for_page_load()

    def get_current_url(self):
        """Get current page URL."""
        return self.driver.current_url

    def get_page_title(self):
        """Get page title."""
        return self.driver.title

    def refresh_page(self):
        """Refresh the current page."""
        self.driver.refresh()
        self.wait_for_page_load()
