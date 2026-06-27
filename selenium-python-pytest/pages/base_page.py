# pages/base_page.py
# ─────────────────────────────────────────────────────────────────────────────
# Base Page - Common actions and test data loading
# Framework-level file - do NOT modify for client-specific logic
# ─────────────────────────────────────────────────────────────────────────────
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import json
import csv
import os


class BasePage:
    """Base page class with common actions and test data loading."""

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)
        self.test_data = self._load_test_data()
        self.credentials = self._load_credentials()

    # ── Test Data Loading ─────────────────────────────────────────────────────

    def _load_test_data(self):
        """Load static test data from utils/testdata.json."""
        testdata_path = os.path.join(os.path.dirname(__file__), '..', 'utils', 'testdata.json')
        if os.path.exists(testdata_path):
            with open(testdata_path, 'r') as f:
                return json.load(f)
        return {}

    def _load_credentials(self):
        """Load credentials from test-data/credentials.csv."""
        creds_path = os.path.join(os.path.dirname(__file__), '..', 'test-data', 'credentials.csv')
        credentials = []
        if os.path.exists(creds_path):
            with open(creds_path, 'r') as f:
                reader = csv.DictReader(f)
                credentials = list(reader)
        return credentials

    def get_credentials_by_role(self, role_name):
        """Get credentials for a specific role from test data."""
        for cred in self.credentials:
            if cred.get('RoleName', '').strip().lower() == role_name.strip().lower():
                return {
                    'username': cred.get('Username', '').strip(),
                    'password': cred.get('Password', '').strip(),
                    'full_name': cred.get('FullName', '').strip()
                }
        raise ValueError(f"No credentials found for role: {role_name}")

    # ── Common Actions ────────────────────────────────────────────────────────

    def wait_for_page_load(self, timeout=10):
        """Wait for page to be fully loaded."""
        self.wait_for_ready_state('complete', timeout)

    def wait_for_ready_state(self, state='complete', timeout=10):
        """Wait for document ready state."""
        WebDriverWait(self.driver, timeout).until(
            lambda d: d.execute_script('return document.readyState') == state
        )

    def wait_for_element_visible(self, locator, timeout=10):
        """Wait for element to be visible."""
        by, value = self._parse_locator(locator)
        return WebDriverWait(self.driver, timeout).until(
            EC.visibility_of_element_located((by, value))
        )

    def wait_for_element_clickable(self, locator, timeout=10):
        """Wait for element to be clickable."""
        by, value = self._parse_locator(locator)
        return WebDriverWait(self.driver, timeout).until(
            EC.element_to_be_clickable((by, value))
        )

    def click_element(self, locator, timeout=10):
        """Click an element after waiting for it to be clickable."""
        element = self.wait_for_element_clickable(locator, timeout)
        element.click()

    def fill_input(self, locator, text, timeout=10):
        """Fill input field with text after waiting for visibility."""
        element = self.wait_for_element_visible(locator, timeout)
        element.clear()
        element.send_keys(text)

    def get_element_text(self, locator, timeout=10):
        """Get text from element after waiting for visibility."""
        element = self.wait_for_element_visible(locator, timeout)
        return element.text

    def is_element_visible(self, locator, timeout=5):
        """Check if element is visible without throwing exception."""
        try:
            self.wait_for_element_visible(locator, timeout)
            return True
        except (TimeoutException, NoSuchElementException):
            return False

    def get_current_url(self):
        """Get current page URL."""
        return self.driver.current_url

    def get_page_title(self):
        """Get current page title."""
        return self.driver.title

    # ── Locator Parsing ───────────────────────────────────────────────────────

    def _parse_locator(self, locator):
        """Parse CSS/XPath/text locator string into (By, value) tuple."""
        if locator.startswith('//'):
            return (By.XPATH, locator)
        elif locator.startswith('text='):
            text = locator.replace('text=', '')
            return (By.XPATH, f"//*[contains(text(), '{text}')]")
        elif ':has-text(' in locator:
            # Simple conversion for Playwright-style has-text
            parts = locator.split(':has-text(')
            selector = parts[0]
            text = parts[1].rstrip(')')
            return (By.XPATH, f"//{selector}[contains(., {text})]")
        else:
            return (By.CSS_SELECTOR, locator)
