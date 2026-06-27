# features/pages/login_page.py
# ─────────────────────────────────────────────────────────────────────────────
# Login Page Class
# Extends: BasePage
# Purpose: Login page actions and assertions
# ─────────────────────────────────────────────────────────────────────────────

import os
from features.pages.base_page import BasePage
from features.page_objects.login_page_objects import (
    EMAIL_INPUT,
    PASSWORD_INPUT,
    LOGIN_BUTTON,
    REGISTER_LINK,
    LOGIN_PAGE_HEADING,
    ERROR_MESSAGE,
    INVALID_CREDENTIALS_ERROR,
    INVALID_USERNAME_ERROR,
    INVALID_PASSWORD_ERROR,
    EMPTY_USERNAME_ERROR,
    EMPTY_PASSWORD_ERROR,
    SUCCESS_MESSAGE,
    AUTH_TOKEN_ELEMENT
)


class LoginPage(BasePage):
    """Login Page - handles authentication flows and validations"""

    def __init__(self, driver):
        super().__init__(driver)
        self.url = os.getenv('BASE_URL', 'http://192.168.10.124:4001')

    # ── Navigation ────────────────────────────────────────────────────────────

    def navigate_to_login(self):
        """Navigate to login page"""
        self.navigate_to(self.url)
        self.wait_for_page_load()

    # ── Actions ───────────────────────────────────────────────────────────────

    def enter_username(self, username):
        """Enter username/email in login form"""
        self.wait_and_fill(EMAIL_INPUT, username)

    def enter_password(self, password):
        """Enter password in login form"""
        self.wait_and_fill(PASSWORD_INPUT, password)

    def click_login_button(self):
        """Click the login/submit button"""
        self.wait_and_click(LOGIN_BUTTON)
        self.wait_for_page_load()

    def login_with_credentials(self, username, password):
        """Complete login flow with given credentials"""
        self.enter_username(username)
        self.enter_password(password)
        self.click_login_button()

    def submit_empty_form(self):
        """Submit login form without filling fields"""
        self.click_login_button()

    # ── Assertions ────────────────────────────────────────────────────────────

    def verify_login_page_displayed(self):
        """Verify login page loaded with required elements"""
        assert self.is_element_visible(EMAIL_INPUT), "Email input not visible"
        assert self.is_element_visible(PASSWORD_INPUT), "Password input not visible"
        assert self.is_element_visible(LOGIN_BUTTON), "Login button not visible"
        assert self.is_element_visible(REGISTER_LINK), "Register link not visible"

    def verify_login_success(self):
        """Verify successful login - expects status code 200 or success indicator"""
        # For UI: check redirect or success message
        # For API: this would validate response status
        assert self.is_element_visible(SUCCESS_MESSAGE) or \
               self.is_element_visible(AUTH_TOKEN_ELEMENT), \
               "Login success indicator not found"

    def verify_login_failed_with_status(self, expected_status_code):
        """Verify login failed with expected HTTP status code"""
        # This is primarily for API-style validation
        # In UI context, verify error message is shown
        assert self.is_element_visible(ERROR_MESSAGE), \
               f"Expected error message for status {expected_status_code}"

    def verify_invalid_credentials_error(self):
        """Verify invalid credentials error message is displayed"""
        assert self.is_element_visible(ERROR_MESSAGE), "Error message not visible"
        error_text = self.get_element_text(ERROR_MESSAGE)
        assert "invalid" in error_text.lower() or "credentials" in error_text.lower(), \
               f"Expected invalid credentials error, got: {error_text}"

    def verify_invalid_username_error(self):
        """Verify invalid username error message"""
        assert self.is_element_visible(ERROR_MESSAGE), "Error message not visible"
        error_text = self.get_element_text(ERROR_MESSAGE)
        assert "username" in error_text.lower() or "invalid" in error_text.lower(), \
               f"Expected invalid username error, got: {error_text}"

    def verify_invalid_password_error(self):
        """Verify invalid password error message"""
        assert self.is_element_visible(ERROR_MESSAGE), "Error message not visible"
        error_text = self.get_element_text(ERROR_MESSAGE)
        assert "password" in error_text.lower() or "invalid" in error_text.lower(), \
               f"Expected invalid password error, got: {error_text}"

    def verify_empty_username_error(self):
        """Verify error when username field is empty"""
        assert self.is_element_visible(ERROR_MESSAGE), "Error message not visible"
        error_text = self.get_element_text(ERROR_MESSAGE)
        assert "username" in error_text.lower() or "required" in error_text.lower() or \
               "missing" in error_text.lower(), \
               f"Expected empty username error, got: {error_text}"

    def verify_empty_password_error(self):
        """Verify error when password field is empty"""
        assert self.is_element_visible(ERROR_MESSAGE), "Error message not visible"
        error_text = self.get_element_text(ERROR_MESSAGE)
        assert "password" in error_text.lower() or "required" in error_text.lower() or \
               "missing" in error_text.lower(), \
               f"Expected empty password error, got: {error_text}"

    def verify_authentication_token_present(self):
        """Verify authentication token is present in response"""
        assert self.is_element_visible(AUTH_TOKEN_ELEMENT), \
               "Authentication token not found in response"

    def verify_error_message_indicates(self, expected_message_keyword):
        """Verify error message contains expected keyword"""
        assert self.is_element_visible(ERROR_MESSAGE), "Error message not visible"
        error_text = self.get_element_text(ERROR_MESSAGE)
        assert expected_message_keyword.lower() in error_text.lower(), \
               f"Expected '{expected_message_keyword}' in error, got: {error_text}"
