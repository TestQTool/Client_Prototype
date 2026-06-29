Feature: Login Functionality

  Background:
    Given I am on the login page

  @TC-640 @error-handling @disabled-account
  Scenario: Verify that login shows appropriate error for disabled account
    When I enter a disabled account username
    And I enter the correct password for disabled account
    And I click the login button
    Then I should see an account disabled error message
    And I should remain on the login page

  @TC-638 @unicode @character-encoding
  Scenario: Verify that login handles unicode characters in credentials
    When I enter username with unicode characters
    And I enter password with unicode characters
    And I click the login button
    Then the system should handle unicode characters correctly

  @TC-621 @special-characters @input-validation
  Scenario: Verify that login handles special characters in username
    When I enter username with special characters
    And I enter a valid password
    And I click the login button
    Then the system should handle special characters appropriately

  @TC-628 @accessibility @keyboard-navigation
  Scenario: Verify that tab navigation works between form fields
    When I focus on the username field
    And I press the tab key
    Then the password field should be focused
    When I press the tab key again
    Then the login button should be focused
    When I press the enter key
    Then the login attempt should be triggered

  @TC-29 @invalid-data @negative-testing
  Scenario: To Test Login Form with Invalid Data
    When I enter invalid login credentials
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  @TC-635 @security @rate-limiting
  Scenario: Verify that login prevents multiple rapid submissions
    When I enter valid credentials
    And I click the login button multiple times rapidly
    Then only the first click should be processed
    And the login button should be disabled temporarily
    And only one login request should be sent

  @TC-28 @invalid-data @negative-testing
  Scenario: To Test Login Form with Invalid Data - Scenario 2
    When I enter invalid login credentials
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  @TC-637 @security @https @ssl
  Scenario: Verify that login page uses HTTPS protocol
    Then the page URL should start with "https://"
    And a valid SSL certificate should be present
    And no security warnings should appear
    And the connection should be encrypted

  @TC-30 @import-test
  Scenario: test import 01
    When I perform test import validation
    Then the import should be successful

  @TC-624 @validation @empty-fields
  Scenario: Verify that login fails with empty username field
    When I leave the username field empty
    And I enter a valid password
    And I click the login button
    Then I should see a username required error
    And I should remain on the login page

  @TC-641 @performance @response-time
  Scenario: Verify that login response time is acceptable
    When I enter valid credentials
    And I click the login button
    Then the login response should be received within 2 seconds

  @TC-630 @security @sql-injection
  Scenario: Verify that login shows error for SQL injection attempts
    When I enter SQL injection string in username field
    And I enter a valid password
    And I click the login button
    Then the system should reject the malicious input
    And I should see an appropriate error message

  @TC-626 @validation @max-length
  Scenario: Verify that login handles maximum length username
    When I enter a maximum length username
    And I enter a valid password
    And I click the login button
    Then the system should process the request appropriately

  @TC-21 @smoke @positive-test @valid-credentials
  Scenario: Verify that login works with valid credentials
    When I enter a valid username
    And I enter a valid password
    And I click the login button
    Then I should be logged in successfully

  @TC-639 @session-management @state
  Scenario: Verify that login form maintains state during session
    When I enter a username
    And I navigate away from the login page
    And I return to the login page
    Then the username field should be cleared for security

  @TC-636 @ui @placeholder-text
  Scenario: Verify that login form fields have proper placeholder text
    Then the username field should have appropriate placeholder text
    And the password field should have appropriate placeholder text
    When I focus on the username field
    Then the placeholder should disappear
    When I blur the username field without entering data
    Then the placeholder should reappear

  @TC-644 @security @rate-limiting @brute-force
  Scenario: Verify that login implements rate limiting for failed attempts
    When I attempt login with invalid credentials multiple times rapidly
    Then the system should detect the failed attempt pattern
    And the account should be temporarily locked or delayed

  @TC-631 @ui @button-interaction
  Scenario: Verify that login button is clickable and responsive
    When I hover over the login button
    Then the button should show a hover state
    When I click the login button
    Then the button should respond immediately
    And the login process should be triggered

  @TC-646 @api @request-format
  Scenario: Verify that login sends correct API request format
    When I enter valid credentials
    And I click the login button
    Then the API request should be sent with correct format
    And the request payload should contain properly formatted username and password

  @TC-633 @performance @page-load
  Scenario: Verify that login page loads within acceptable time
    Given I clear the browser cache
    When I navigate to the login page
    Then the page should fully load within 3 seconds

  @TC-27 @invalid-data @negative-testing
  Scenario: To Test Login Form with Invalid Data - Scenario 3
    When I enter username and password
    And I click the login button
    Then the system should validate the credentials

  @TC-634 @accessibility @keyboard-input
  Scenario: Verify that login form accepts keyboard input properly
    When I use keyboard to navigate to the username field
    And I type the username using keyboard
    Then the characters should appear correctly
    When I navigate to the password field using keyboard
    And I type the password using keyboard
    Then the masked characters should appear

  @TC-622 @security @password-masking
  Scenario: Verify that password field masks input characters
    When I click on the password field
    And I type password characters
    Then the characters should be masked with dots or asterisks
    And all characters should remain masked throughout typing

  @TC-625 @validation @empty-fields
  Scenario: Verify that login fails with empty password field
    When I enter a valid username
    And I leave the password field empty
    And I click the login button
    Then I should see a password required error
    And I should remain on the login page

  @TC-629 @security @copy-prevention
  Scenario: Verify that password field prevents copy functionality
    When I enter a password in the password field
    And I select the password text
    And I attempt to copy the password
    Then the copy functionality should be disabled

  @TC-643 @validation @case-sensitivity
  Scenario: Verify that login handles case sensitivity correctly
    When I enter username in different case
    And I enter a valid password
    And I click the login button
    Then the system should handle case according to requirements

  @TC-619 @validation @invalid-username
  Scenario: Verify that login fails with invalid username
    When I enter an invalid username
    And I enter a valid password
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  @TC-627 @validation @max-length
  Scenario: Verify that login handles maximum length password
    When I enter a valid username
    And I enter a maximum length password
    And I click the login button
    Then the system should process the request appropriately

  @TC-642 @responsive @ui
  Scenario: Verify that login page is responsive on different screen sizes
    Given I open the login page on desktop
    When I resize the browser to tablet size
    Then the layout should adjust appropriately
    When I resize to mobile size
    Then all elements should remain accessible
    And all inputs should work properly

  @TC-620 @validation @empty-credentials
  Scenario: Verify that login fails with empty credentials
    When I leave both username and password fields empty
    And I click the login button
    Then I should see a validation error
    And I should remain on the login page

  @TC-623 @ui @page-elements
  Scenario: Verify that login page displays all required elements
    Then the username field should be visible
    And the password field should be visible
    And the login button should be visible
    And the page title and branding should be displayed

  @TC-645 @ui @validation-styling
  Scenario: Verify that login form has proper field validation styling
    When I enter invalid data in the username field
    And I move focus away from the field
    Then the field should show error styling
    When I enter valid data
    Then the error styling should be removed

  @TC-618 @validation @invalid-password
  Scenario: Verify that login fails with invalid password
    When I enter a valid username
    And I enter an invalid password
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  @TC-26 @valid-data @positive-test
  Scenario: To Test Login Form with Valid Data
    When I enter username and password
    And I click the login button
    Then the system should accept the credentials

  @TC-632 @validation @whitespace
  Scenario: Verify that login handles whitespace in credentials
    When I enter username with leading or trailing spaces
    And I enter password with spaces
    And I click the login button
    Then the system should handle whitespace appropriately
