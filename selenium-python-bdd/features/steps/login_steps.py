# features/steps/login_steps.py
# ─────────────────────────────────────────────────────────────────────────────
# Login Feature Step Definitions
# Test Cases: TC-21, TC-22, TC-23, TC-24, TC-25, TC-560, TC-561, TC-562, TC-563, TC-564
# ─────────────────────────────────────────────────────────────────────────────

import os
from behave import given, when, then
from features.pages.login_page import LoginPage


# ── Background / Setup ────────────────────────────────────────────────────────

@given('the user navigates to the login page')
def step_navigate_to_login(context):
    """Navigate to login page and verify it loaded"""
    context.login_page = LoginPage(context.driver)
    context.login_page.navigate_to_login()
    context.login_page.verify_login_page_displayed()


# ── Valid Credentials Actions ─────────────────────────────────────────────────

@when('the user enters valid username')
def step_enter_valid_username(context):
    """Enter valid username from test data"""
    username = os.getenv('TEST_USERNAME', 'admin')
    context.login_page.enter_username(username)


@when('the user enters valid password')
def step_enter_valid_password(context):
    """Enter valid password from test data"""
    password = os.getenv('TEST_PASSWORD', 'admin123')
    context.login_page.enter_password(password)


@when('the user clicks the login button')
def step_click_login_button(context):
    """Click the login/submit button"""
    context.login_page.click_login_button()


# ── Invalid Credentials Actions ───────────────────────────────────────────────

@when('the user enters invalid username')
def step_enter_invalid_username(context):
    """Enter invalid username"""
    context.login_page.enter_username('invalid_user_12345')


@when('the user enters invalid password')
def step_enter_invalid_password(context):
    """Enter invalid password"""
    context.login_page.enter_password('wrong_password_12345')


@when('the user enters invalid credentials')
def step_enter_invalid_credentials(context):
    """Enter both invalid username and password"""
    context.login_page.enter_username('invalid_user')
    context.login_page.enter_password('invalid_pass')


# ── Empty Field Actions ───────────────────────────────────────────────────────

@when('the user leaves username field empty')
def step_leave_username_empty(context):
    """Leave username field empty"""
    context.login_page.enter_username('')


@when('the user leaves password field empty')
def step_leave_password_empty(context):
    """Leave password field empty"""
    context.login_page.enter_password('')


# ── API Request Actions (for TC-560, 561, 562, 563, 564) ──────────────────────

@when('a POST request is sent to /login endpoint')
def step_send_post_request_to_login(context):
    """Prepare POST request to /login endpoint"""
    # In UI context, this is handled by form submission
    # Store state for API-style validation
    context.api_request_sent = True


@when('the request includes valid username')
def step_request_includes_valid_username(context):
    """Include valid username in request body"""
    username = os.getenv('TEST_USERNAME', 'admin')
    context.login_page.enter_username(username)


@when('the request includes valid password')
def step_request_includes_valid_password(context):
    """Include valid password in request body"""
    password = os.getenv('TEST_PASSWORD', 'admin123')
    context.login_page.enter_password(password)


@when('the request includes invalid username')
def step_request_includes_invalid_username(context):
    """Include invalid username in request body"""
    context.login_page.enter_username('invalid_user_api')


@when('the request includes invalid password')
def step_request_includes_invalid_password(context):
    """Include invalid password in request body"""
    context.login_page.enter_password('invalid_pass_api')


@when('the request includes empty username field')
def step_request_includes_empty_username(context):
    """Include empty username in request body"""
    context.login_page.enter_username('')


@when('the request includes empty password field')
def step_request_includes_empty_password(context):
    """Include empty password in request body"""
    context.login_page.enter_password('')


@when('the authentication request is submitted')
def step_submit_authentication_request(context):
    """Submit the authentication request"""
    context.login_page.click_login_button()


# ── Success Assertions ────────────────────────────────────────────────────────

@then('the user should login successfully')
def step_verify_login_success(context):
    """Verify successful login"""
    context.login_page.verify_login_success()


@then('the authentication token should be present')
@then('the authentication token should be present in the response')
def step_verify_auth_token_present(context):
    """Verify authentication token is present"""
    context.login_page.verify_authentication_token_present()


@then('the response should return {status_code:d} status code')
def step_verify_response_status_code(context, status_code):
    """Verify response status code (for API-style validation)"""
    context.login_page.verify_login_failed_with_status(status_code)


# ── Failure Assertions ────────────────────────────────────────────────────────

@then('the login should fail')
def step_verify_login_failed(context):
    """Verify login failed"""
    context.login_page.verify_invalid_credentials_error()


@then('an error message should be displayed')
def step_verify_error_message_displayed(context):
    """Verify error message is visible"""
    context.login_page.verify_invalid_credentials_error()


@then('the error message should indicate invalid credentials')
def step_verify_invalid_credentials_error_message(context):
    """Verify error message indicates invalid credentials"""
    context.login_page.verify_invalid_credentials_error()


@then('the error message should indicate missing username')
def step_verify_missing_username_error(context):
    """Verify error message indicates missing username"""
    context.login_page.verify_empty_username_error()


@then('the error message should indicate missing password')
def step_verify_missing_password_error(context):
    """Verify error message indicates missing password"""
    context.login_page.verify_empty_password_error()


@then('the error message indicates {error_type}')
def step_verify_error_message_type(context, error_type):
    """Verify error message indicates specific error type"""
    context.login_page.verify_error_message_indicates(error_type)
