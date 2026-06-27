# pages/base_page.py
# ─────────────────────────────────────────────────────────────────────────────
# Base Page - Foundation for all page classes
# All page classes must extend this class
# ─────────────────────────────────────────────────────────────────────────────
import os
import json
import csv
from pathlib import Path
from playwright.sync_api import Page, expect


class BasePage:
    """Base page class with common actions and test data loading"""

    def __init__(self, page: Page):
        self.page = page
        self.base_url = os.getenv('BASE_URL', 'http://192.168.10.124:4001')
        
        # Load static test data
        testdata_path = Path(__file__).parent.parent / 'utils' / 'testdata.json'
        if testdata_path.exists():
            with open(testdata_path, 'r') as f:
                self.testdata = json.load(f)
        else:
            self.testdata = {}
        
        # Load credentials
        credentials_path = Path(__file__).parent.parent / 'test-data' / 'credentials.csv'
        self.credentials = []
        if credentials_path.exists():
            with open(credentials_path, 'r') as f:
                reader = csv.DictReader(f)
                self.credentials = list(reader)

    # ── Test Data Methods ─────────────────────────────────────────────────────

    def get_login_data_by_role(self, role_name: str) -> dict:
        """Get credentials for a given role from credentials.csv"""
        for row in self.credentials:
            if row.get('RoleName', '').strip() == role_name.strip():
                return {
                    'username': row.get('Username', '').strip(),
                    'password': row.get('Password', '').strip(),
                    'fullName': row.get('FullName', '').strip(),
                    'roleName': row.get('RoleName', '').strip()
                }
        raise ValueError(f"No credentials found for role: '{role_name}'")

    def get_all_users(self) -> list:
        """Get all users from credentials.csv"""
        return [
            {
                'username': row.get('Username', '').strip(),
                'password': row.get('Password', '').strip(),
                'fullName': row.get('FullName', '').strip(),
                'roleName': row.get('RoleName', '').strip()
            }
            for row in self.credentials
        ]

    # ── Navigation ────────────────────────────────────────────────────────────

    def open(self, url: str):
        """Navigate to the specified URL"""
        self.page.goto(url)

    def refresh(self):
        """Reload the current page"""
        self.page.reload()

    def get_url(self) -> str:
        """Get the current page URL"""
        return self.page.url

    def get_title(self) -> str:
        """Get the current page title"""
        return self.page.title()

    # ── Waits ─────────────────────────────────────────────────────────────────

    def wait(self, milliseconds: int = 1000):
        """Wait for specified milliseconds"""
        self.page.wait_for_timeout(milliseconds)

    def wait_for_page_load(self):
        """Wait for DOM content to load"""
        self.page.wait_for_load_state('domcontentloaded')

    def wait_for_network_idle(self):
        """Wait for network to be idle"""
        self.page.wait_for_load_state('networkidle')

    # ── Element Actions ───────────────────────────────────────────────────────

    def wait_and_click(self, selector: str, timeout: int = 30000):
        """Wait for element and click it"""
        self.page.locator(selector).click(timeout=timeout)

    def wait_and_fill(self, selector: str, text: str, timeout: int = 30000):
        """Wait for input element and fill it with text"""
        self.page.locator(selector).fill(text, timeout=timeout)

    def wait_and_select(self, selector: str, value: str, timeout: int = 30000):
        """Wait for select element and choose option"""
        self.page.locator(selector).select_option(value, timeout=timeout)

    def wait_and_check(self, selector: str, timeout: int = 30000):
        """Wait for checkbox/radio and check it"""
        self.page.locator(selector).check(timeout=timeout)

    def wait_and_uncheck(self, selector: str, timeout: int = 30000):
        """Wait for checkbox and uncheck it"""
        self.page.locator(selector).uncheck(timeout=timeout)

    # ── Element State ─────────────────────────────────────────────────────────

    def is_element_visible(self, selector: str, error_msg: str = None, timeout: int = 5000) -> bool:
        """Check if element is visible"""
        try:
            expect(self.page.locator(selector)).to_be_visible(timeout=timeout)
            return True
        except Exception as e:
            if error_msg:
                raise AssertionError(error_msg) from e
            return False

    def is_element_hidden(self, selector: str, timeout: int = 5000) -> bool:
        """Check if element is hidden"""
        try:
            expect(self.page.locator(selector)).to_be_hidden(timeout=timeout)
            return True
        except:
            return False

    def is_element_enabled(self, selector: str, timeout: int = 5000) -> bool:
        """Check if element is enabled"""
        try:
            expect(self.page.locator(selector)).to_be_enabled(timeout=timeout)
            return True
        except:
            return False

    def is_element_disabled(self, selector: str, timeout: int = 5000) -> bool:
        """Check if element is disabled"""
        try:
            expect(self.page.locator(selector)).to_be_disabled(timeout=timeout)
            return True
        except:
            return False

    # ── Text & Content ────────────────────────────────────────────────────────

    def get_text(self, selector: str, timeout: int = 30000) -> str:
        """Get text content of an element"""
        return self.page.locator(selector).text_content(timeout=timeout)

    def get_value(self, selector: str, timeout: int = 30000) -> str:
        """Get value of an input element"""
        return self.page.locator(selector).input_value(timeout=timeout)

    def verify_element_text(self, selector: str, expected_text: str, timeout: int = 5000):
        """Verify element has exact text"""
        expect(self.page.locator(selector)).to_have_text(expected_text, timeout=timeout)

    def verify_element_contains_text(self, selector: str, expected_text: str, timeout: int = 5000):
        """Verify element contains text"""
        expect(self.page.locator(selector)).to_contain_text(expected_text, timeout=timeout)

    # ── Counts ────────────────────────────────────────────────────────────────

    def get_count(self, selector: str) -> int:
        """Get count of elements matching selector"""
        return self.page.locator(selector).count()
