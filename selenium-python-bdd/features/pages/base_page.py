# features/pages/base_page.py
# ─────────────────────────────────────────────────────────────────────────────
# Base Page - Parent class for all page objects
# Purpose: Common web actions, waits, and test data loading
# ─────────────────────────────────────────────────────────────────────────────

import os
import json
import csv
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException, NoSuchElementException


class BasePage:
    """Base page class with common actions and test data loading"""

    def __init__(self, driver, timeout=10):
        self.driver = driver
        self.timeout = timeout
        self.wait = WebDriverWait(driver, timeout)
        self.test_data = self._load_test_data()
        self.credentials = self._load_credentials()

    # ── Test Data Loading ─────────────────────────────────────────────────────

    def _load_test_data(self):
        """Load static test data from utils/testdata.json"""
        testdata_path = os.path.join(os.path.dirname(__file__), '../../utils/testdata.json')
        if os.path.exists(testdata_path):
            with open(testdata_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}

    def _load_credentials(self):
        """Load credentials from test-data/credentials.csv"""
        credentials_path = os.path.join(os.path.dirname(__file__), '../../test-data/credentials.csv')
        credentials = []
        if os.path.exists(credentials_path):
            with open(credentials_path, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                credentials = list(reader)
        return credentials

    def get_credentials_by_role(self, role_name):
        """Get credentials for a specific role from credentials.csv"""
        for cred in self.credentials:
            if cred.get('RoleName', '').strip() == role_name.strip():
                return {
                    'username': cred.get('Username', '').strip(),
                    'password': cred.get('Password', '').strip(),
                    'full_name': cred.get('FullName', '').strip()
                }
        raise ValueError(f"No credentials found for role: {role_name}")

    # ── Navigation ────────────────────────────────────────────────────────────

    def navigate_to(self, url):
        """Navigate to given URL"""
        self.driver.get(url)

    def refresh_page(self):
        """Refresh the current page"""
        self.driver.refresh()

    def get_current_url(self):
        """Get current page URL"""
        return self.driver.current_url

    def get_page_title(self):
        """Get current page title"""
        return self.driver.title

    # ── Waits ─────────────────────────────────────────────────────────────────

    def wait_for_page_load(self, timeout=None):
        """Wait for page to load (document ready state)"""
        timeout = timeout or self.timeout
        WebDriverWait(self.driver, timeout).until(
            lambda d: d.execute_script('return document.readyState') == 'complete'
        )

    def wait_for_element_visible(self, locator, timeout=None):
        """Wait for element to be visible"""
        timeout = timeout or self.timeout
        by, value = self._parse_locator(locator)
        return WebDriverWait(self.driver, timeout).until(
            EC.visibility_of_element_located((by, value))
        )

    def wait_for_element_clickable(self, locator, timeout=None):
        """Wait for element to be clickable"""
        timeout = timeout or self.timeout
        by, value = self._parse_locator(locator)
        return WebDriverWait(self.driver, timeout).until(
            EC.element_to_be_clickable((by, value))
        )

    # ── Element Actions ───────────────────────────────────────────────────────

    def wait_and_click(self, locator):
        """Wait for element and click it"""
        element = self.wait_for_element_clickable(locator)
        element.click()

    def wait_and_fill(self, locator, text):
        """Wait for element and fill it with text"""
        element = self.wait_for_element_visible(locator)
        element.clear()
        element.send_keys(text)

    def get_element_text(self, locator):
        """Get text content of element"""
        element = self.wait_for_element_visible(locator)
        return element.text

    def is_element_visible(self, locator, timeout=5):
        """Check if element is visible within timeout"""
        try:
            self.wait_for_element_visible(locator, timeout)
            return True
        except TimeoutException:
            return False

    def is_element_present(self, locator):
        """Check if element exists in DOM"""
        try:
            by, value = self._parse_locator(locator)
            self.driver.find_element(by, value)
            return True
        except NoSuchElementException:
            return False

    # ── Locator Parsing ───────────────────────────────────────────────────────

    def _parse_locator(self, locator):
        """Parse locator string into Selenium By strategy"""
        if locator.startswith('id='):
            return By.ID, locator[3:]
        elif locator.startswith('name='):
            return By.NAME, locator[5:]
        elif locator.startswith('class='):
            return By.CLASS_NAME, locator[6:]
        elif locator.startswith('xpath='):
            return By.XPATH, locator[6:]
        elif locator.startswith('//'):
            return By.XPATH, locator
        elif locator.startswith('text='):
            text = locator[5:]
            return By.XPATH, f"//*[contains(text(), '{text}')]"
        elif ':has-text(' in locator:
            # Playwright-style selector conversion
            parts = locator.split(':has-text(')
            base = parts[0]
            text = parts[1].rstrip(')')
            return By.XPATH, f"//{base}[contains(text(), {text})]"
        elif locator.startswith('['):
            return By.CSS_SELECTOR, locator
        elif locator.startswith('input[') or locator.startswith('button[') or locator.startswith('a['):
            return By.CSS_SELECTOR, locator
        else:
            # Default to CSS selector
            return By.CSS_SELECTOR, locator

    # ── Utility Methods ───────────────────────────────────────────────────────

    def wait(self, seconds=1):
        """Explicit wait in seconds"""
        time.sleep(seconds)
