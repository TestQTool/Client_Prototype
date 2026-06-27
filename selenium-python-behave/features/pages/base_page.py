# features/pages/base_page.py
# Base Page for all page objects
# Provides common browser actions and test data loading

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import csv
import json
import os


class BasePage:
    """
    BasePage - Foundation class for all page objects.
    Provides reusable browser actions, test data loading, and credential management.
    """

    def __init__(self, driver):
        self.driver = driver
        self.timeout = 10
        self.test_data = self._load_test_data()
        self.credentials = self._load_credentials()

    # ── Test Data Loading ─────────────────────────────────────────────────

    def _load_test_data(self):
        """Load static test data from JSON file."""
        testdata_path = os.path.join(os.path.dirname(__file__), '..', '..', 'test-data', 'testdata.json')
        if os.path.exists(testdata_path):
            with open(testdata_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}

    def _load_credentials(self):
        """Load credentials from CSV file."""
        creds_path = os.path.join(os.path.dirname(__file__), '..', '..', 'test-data', 'credentials.csv')
        credentials = []
        if os.path.exists(creds_path):
            with open(creds_path, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                credentials = list(reader)
        return credentials

    def get_credentials_by_role(self, role_name):
        """Get credentials for a specific role."""
        for cred in self.credentials:
            if cred.get('RoleName', '').strip().lower() == role_name.strip().lower():
                return {
                    'username': cred.get('Username', '').strip(),
                    'password': cred.get('Password', '').strip(),
                    'fullName': cred.get('FullName', '').strip(),
                    'roleName': cred.get('RoleName', '').strip()
                }
        raise ValueError(f"No credentials found for role: {role_name}")

    # ── Navigation ────────────────────────────────────────────────────────

    def open(self, url):
        """Navigate to the specified URL."""
        self.driver.get(url)

    def refresh(self):
        """Refresh the current page."""
        self.driver.refresh()

    def get_url(self):
        """Get the current page URL."""
        return self.driver.current_url

    def get_title(self):
        """Get the current page title."""
        return self.driver.title

    # ── Wait Strategies ───────────────────────────────────────────────────

    def wait_for_element(self, locator, timeout=None):
        """Wait for element to be present."""
        timeout = timeout or self.timeout
        return WebDriverWait(self.driver, timeout).until(
            EC.presence_of_element_located(locator)
        )

    def wait_for_element_visible(self, locator, timeout=None):
        """Wait for element to be visible."""
        timeout = timeout or self.timeout
        return WebDriverWait(self.driver, timeout).until(
            EC.visibility_of_element_located(locator)
        )

    def wait_for_element_clickable(self, locator, timeout=None):
        """Wait for element to be clickable."""
        timeout = timeout or self.timeout
        return WebDriverWait(self.driver, timeout).until(
            EC.element_to_be_clickable(locator)
        )

    def wait_for_page_load(self, timeout=None):
        """Wait for page to finish loading."""
        timeout = timeout or self.timeout
        WebDriverWait(self.driver, timeout).until(
            lambda d: d.execute_script('return document.readyState') == 'complete'
        )

    # ── Element Actions ───────────────────────────────────────────────────

    def wait_and_click(self, locator, timeout=None):
        """Wait for element and click it."""
        element = self.wait_for_element_clickable(locator, timeout)
        element.click()

    def wait_and_fill(self, locator, text, timeout=None):
        """Wait for element and fill it with text."""
        element = self.wait_for_element_visible(locator, timeout)
        element.clear()
        element.send_keys(text)

    def wait_and_select_dropdown(self, locator, value, timeout=None):
        """Wait for dropdown and select by visible text."""
        from selenium.webdriver.support.select import Select
        element = self.wait_for_element_visible(locator, timeout)
        select = Select(element)
        select.select_by_visible_text(value)

    # ── Element State Checks ──────────────────────────────────────────────

    def is_element_visible(self, locator, timeout=2):
        """Check if element is visible."""
        try:
            WebDriverWait(self.driver, timeout).until(
                EC.visibility_of_element_located(locator)
            )
            return True
        except:
            return False

    def is_element_present(self, locator, timeout=2):
        """Check if element is present in DOM."""
        try:
            WebDriverWait(self.driver, timeout).until(
                EC.presence_of_element_located(locator)
            )
            return True
        except:
            return False

    def is_element_enabled(self, locator, timeout=None):
        """Check if element is enabled."""
        element = self.wait_for_element(locator, timeout)
        return element.is_enabled()

    # ── Element Retrieval ─────────────────────────────────────────────────

    def get_element_text(self, locator, timeout=None):
        """Get text from element."""
        element = self.wait_for_element_visible(locator, timeout)
        return element.text

    def get_element_attribute(self, locator, attribute, timeout=None):
        """Get attribute value from element."""
        element = self.wait_for_element(locator, timeout)
        return element.get_attribute(attribute)

    def get_elements_count(self, locator):
        """Get count of matching elements."""
        elements = self.driver.find_elements(*locator)
        return len(elements)

    # ── JavaScript Execution ──────────────────────────────────────────────

    def execute_script(self, script, *args):
        """Execute JavaScript."""
        return self.driver.execute_script(script, *args)

    def scroll_to_element(self, locator, timeout=None):
        """Scroll element into view."""
        element = self.wait_for_element(locator, timeout)
        self.driver.execute_script("arguments[0].scrollIntoView(true);", element)

    # ── Screenshot ────────────────────────────────────────────────────────

    def take_screenshot(self, filename):
        """Take a screenshot and save it."""
        screenshots_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'screenshots')
        os.makedirs(screenshots_dir, exist_ok=True)
        filepath = os.path.join(screenshots_dir, filename)
        self.driver.save_screenshot(filepath)
        return filepath
