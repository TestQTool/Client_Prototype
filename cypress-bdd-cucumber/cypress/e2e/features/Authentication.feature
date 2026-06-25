Feature: User Authentication
  As a user
  I want to be able to register, login, and manage my account
  So that I can access the application securely

  @smoke @TC-38
  Scenario: Verify that user can successfully register with valid credentials
    Given I navigate to registration page
    When I enter valid username
    And I enter valid email address
    And I enter valid password
    And I click register button
    Then User account should be created successfully

  @smoke @TC-590
  Scenario: Verify that user can login with valid credentials
    Given I open login page
    When I enter valid username
    And I enter valid password
    And I click login button
    Then User should login successfully
    And User dashboard should be visible

  @regression @TC-591
  Scenario: Verify that login fails with invalid password
    Given I open login page
    When I enter valid username
    And I enter invalid password
    And I click login button
    Then Error message should display
    And User should remain on login page

  @regression @TC-589
  Scenario: Verify that registration fails with duplicate username
    Given I navigate to registration page
    When I enter existing username
    And I enter valid email and password
    And I click register button
    Then Error message should display
    And Error message should indicate username already exists

  @regression @TC-592
  Scenario: Verify that login handles empty username field
    Given I open login page
    When I leave username field empty
    And I enter valid password
    And I click login button
    Then Validation error should appear
    And Error message should indicate username is required

  @smoke @TC-593
  Scenario: Verify that user can logout successfully
    Given I login with valid credentials
    When I navigate to user menu
    And I click logout option
    And I confirm logout action
    Then User should be logged out
    And Login page should display

  @smoke @TC-594
  Scenario: Verify that user authentication API returns correct response
    When I send POST request to auth endpoint
    And I include valid credentials in payload
    Then Response status code should return 200 OK
    And Response should contain auth token
    And Token format should be valid

  @regression @TC-595
  Scenario: Verify that API returns error for invalid credentials
    When I send POST request to auth endpoint
    And I include invalid credentials in payload
    Then Response status code should return 401 Unauthorized
    And Error message should indicate invalid credentials
    And No auth token should be returned

  @smoke @TC-596
  Scenario: Verify that user can update profile information
    Given I login and navigate to profile page
    When I update first name field
    And I update email address
    And I click save changes button
    Then Save operation should execute
    And Success message should display

  @regression @TC-597
  Scenario: Verify that profile update fails with invalid email format
    Given I login and navigate to profile page
    When I enter invalid email format
    And I keep other fields valid
    And I click save changes button
    Then Validation should trigger
    And Error message for email should indicate invalid email format

  @regression @TC-598
  Scenario: Verify that password is encrypted during transmission
    Given I open network monitoring tool
    When I navigate to login page
    And I enter credentials and submit
    And I capture network traffic
    Then Password should not be visible in plain text
    And Password should be encrypted

  @regression @TC-599
  Scenario: Verify that system handles maximum character limit in username
    Given I navigate to registration page
    When I enter username with maximum allowed characters
    And I fill other required fields
    And I submit registration form
    Then Form should be submitted
    And Account should be created

  @regression @TC-600
  Scenario: Verify that login response time is within acceptable limits
    Given I prepare performance monitoring tools
    When I navigate to login page
    And I enter valid credentials
    And I click login and measure response time
    Then Response time should be recorded
    And Response time should be under 3 seconds

  @smoke @TC-601
  Scenario: Verify that user can reset password successfully
    Given I navigate to forgot password page
    When I enter registered email address
    And I click send reset link button
    Then Reset request should be submitted
    And Reset email should be received
    And I click reset link and set new password
    And Password should be updated

  @regression @TC-602
  Scenario: Verify that password reset fails for unregistered email
    Given I navigate to forgot password page
    When I enter unregistered email address
    And I click send reset link button
    Then Reset request should be submitted
    And Error message should indicate email not found
    And No reset email should be sent

  @regression @TC-603
  Scenario: Verify that user data API returns complete user information
    Given I authenticate user via API
    When I send GET request to user data endpoint
    And I include auth token in headers
    Then Response should contain all user fields
    And Data format should match specification

  @regression @TC-604
  Scenario: Verify that session expires after inactivity timeout
    Given I login with valid credentials
    When I remain inactive for configured timeout period
    And I attempt to access protected resource
    Then Session should have expired
    And I should be redirected to login page

  @regression @TC-605
  Scenario: Verify that system handles special characters in password
    Given I navigate to registration page
    When I enter username and email
    And I enter password with special characters
    And I submit registration form
    Then Form should be submitted successfully
    And Account should be created with special character password

  @smoke @TC-606
  Scenario: Verify that user can change password from profile settings
    Given I login and navigate to profile settings
    When I click change password option
    And I enter current password
    And I enter new password and confirm
    And I save password changes
    Then Password should be updated successfully

  @regression @TC-607
  Scenario: Verify that password change fails with incorrect current password
    Given I login and navigate to profile settings
    When I click change password option
    And I enter incorrect current password
    And I enter new password and confirm
    Then Error message should indicate current password is incorrect

  @regression @TC-608
  Scenario: Verify that system handles concurrent user logins efficiently
    Given I prepare multiple user accounts
    And I configure load testing tool
    When I execute simultaneous login requests
    And I monitor system response times
    Then Response times should be recorded
    And All users should authenticate

  @regression @TC-609
  Scenario: Verify that API rate limiting works correctly
    Given I configure API client for rapid requests
    When I send requests exceeding rate limit
    And I monitor response status codes
    Then Rate limit error should be returned with 429 Too Many Requests
    And I wait for rate limit reset
    And I should be able to make requests again

  @smoke @TC-610
  Scenario: Verify that user can view account information
    Given I login with valid credentials
    When I navigate to account information page
    Then Username should be visible
    And Email address should be displayed
    And Account creation date should be present

  @regression @TC-611
  Scenario: Verify that system handles minimum password length requirement
    Given I navigate to registration page
    When I enter valid username and email
    And I enter password below minimum length
    And I attempt to submit form
    Then Validation should trigger
    And Minimum length error message should indicate password too short

  @regression @TC-612
  Scenario: Verify that system prevents SQL injection in login form
    Given I navigate to login page
    When I enter SQL injection code in username field
    And I enter any value in password field
    And I submit login form
    Then Form should be processed securely
    And No database error should occur

  @regression @TC-613
  Scenario: Verify that session expires after inactivity timeout
    Given I login with valid credentials
    When I remain inactive for configured timeout period
    And I attempt to access protected resource
    Then I should be redirected to login
    And Appropriate timeout message should indicate session expired

  @smoke @TC-614
  Scenario: Verify that user can access dashboard after successful login
    Given I navigate to login page
    When I enter valid credentials
    And I click login button
    Then Authentication should process
    And Dashboard page should load
    And All dashboard components should display

  @regression @TC-615
  Scenario: Verify that user registration API validates required fields
    When I send POST request to registration endpoint
    And I include payload missing required username field
    Then Response status code should return 400 Bad Request
    And Error message should specify username required
    And Registration should fail

  @regression @TC-616
  Scenario: Verify that system handles concurrent login attempts for same user
    Given I open two browser sessions
    And I navigate to login page in both sessions
    When I enter same valid credentials in both
    And I submit login simultaneously
    Then Both login attempts should process
    And System should manage multiple sessions appropriately

  @regression @TC-617
  Scenario: Verify that system maintains performance under load
    Given I configure load testing tool for 100 concurrent users
    When I execute load test on login functionality
    And I monitor system response times
    Then Performance metrics should be collected
    And Response times should stay within performance thresholds
    And All requests should complete successfully

  @smoke @TC-647
  Scenario: Verify that user can view account activity history
    Given I login with user credentials
    When I navigate to account activity section
    Then Activity page should load
    And Previous logins should be shown
    And Dates and times should be accurate
    And All relevant information should be present
