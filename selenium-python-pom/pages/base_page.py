# pages/base_page.py
# ─────────────────────────────────────────────────────────────────────────────
# Base page class with common web actions and test data loading
# All page classes extend this
# ─────────────────────────────────────────────────────────────────────────────
import os
import json
import csv
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


class BasePage:
    """Base page class with common Selenium actions and test data management"""

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)
        self.test_data = self._load_test_data()
        self.credentials = self._load_credentials()

    # ── Test Data Loading ─────────────────────────────────────────────────────

    def _load_test_data(self):
        """Load static test data from JSON file"""
        test_data_path = os.path.join(
            os.path.dirname(__file__), "..", "test_data", "testdata.json"
        )
        if os.path.exists(test_data_path):
            with open(test_data_path, 'r') as f:
                return json.load(f)
        return {}

    def _load_credentials(self):
        """Load credentials from CSV file"""
        credentials_path = os.path.join(
            os.path.dirname(__file__), "..", "test_data", "credentials.csv"
        )
        credentials = []
        if os.path.exists(credentials_path):
            with open(credentials_path, 'r') as f:
                reader = csv.DictReader(f)
                credentials = list(reader)
        return credentials

    def get_credentials_by_role(self, role_name):
        """Get credentials for specific role"""
        for cred in self.credentials:
            if cred.get('RoleName', '').strip().lower() == role_name.strip().lower():
                return {
                    'username': cred.get('Username', '').strip(),
                    'password': cred.get('Password', '').strip(),
                    'full_name': cred.get('FullName', '').strip()
                }
        raise ValueError(f"No credentials found for role: {role_name}")

    def get_base_url(self):
        """Get base URL from environment or test data"""
        return os.getenv('BASE_URL', self.test_data.get('base_url', 'http://192.168.10.124:4001'))

    # ── Common Web Actions ────────────────────────────────────────────────────

    def wait_for_element_visible(self, by, locator, timeout=10):
        """Wait for element to be visible and return it"""
        return WebDriverWait(self.driver, timeout).until(
            EC.visibility_of_element_located((by, locator))
        )

    def wait_for_element_clickable(self, by, locator, timeout=10):
        """Wait for element to be clickable and return it"""
        return WebDriverWait(self.driver, timeout).until(
            EC.element_to_be_clickable((by, locator))
        )

    def wait_for_page_load(self, timeout=10):
        """Wait for page to finish loading"""
        WebDriverWait(self.driver, timeout).until(
            lambda driver: driver.execute_script('return document.readyState') == 'complete'
        )

    def is_element_visible(self, by, locator, timeout=5):
        """Check if element is visible"""
        try:
            WebDriverWait(self.driver, timeout).until(
                EC.visibility_of_element_located((by, locator))
            )
            return True
        except:
            return False

    def get_element_text(self, by, locator):
        """Get text content of element"""
        element = self.wait_for_element_visible(by, locator)
        return element.text

    def click_element(self, by, locator):
        """Click element after waiting for it to be clickable"""
        element = self.wait_for_element_clickable(by, locator)
        element.click()

    def enter_text(self, by, locator, text):
        """Enter text into input field"""
        element = self.wait_for_element_visible(by, locator)
        element.clear()
        element.send_keys(text)
