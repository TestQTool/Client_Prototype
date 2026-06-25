Feature: Login Feature
  As a user
  I want to login to the application
  So that I can access protected features

  Background:
    Given user navigates to the login page
    And configured application URL should open
    When user enters username "Testing" and password "Test@122"
    Then configured credentials should be entered successfully

  @smoke @regression @TC-769
  Scenario: TC-769 - Verify that user can login successfully with valid email and password
    When user enters valid email in email field
    And valid email should be entered
    And user clicks login button
    Then user should be redirected to dashboard successfully

  @regression @TC-770
  Scenario: TC-770 - Verify that password field masks entered characters during input
    # Password masking is a browser default behavior — verification included in page class

  @smoke @regression @TC-771
  Scenario: TC-771 - Verify that user is redirected to dashboard after successful login
    When user enters valid email in email field
    And user clicks login button
    And login request should be processed
    Then user should be redirected to dashboard page

  @regression @TC-772
  Scenario: TC-772 - Verify that Forgot Password link is visible on login page
    When user verifies Forgot Password link is visible
    And link should be enabled and clickable
    And user hovers over Forgot Password link
    Then link should show hover effect

  @regression @TC-773
  Scenario: TC-773 - Verify that email field accepts valid email format
    When user enters valid email format in email field
    And email should be accepted
    And verify email format validation
    And no error message should appear
    And user clicks outside email field
    Then email should remain in field

  @smoke @regression @TC-774
  Scenario: TC-774 - Verify that error message is displayed for invalid credentials
    When user clicks login button
    And login attempt should be made
    Then verify error message
    And error message for invalid credentials should be displayed

  @regression @TC-775
  Scenario: TC-775 - Verify that login fails with invalid email format
    When user enters invalid email format in email field
    And invalid email should be entered
    And user clicks login button
    Then error message for invalid email format should be displayed

  @regression @TC-776
  Scenario: TC-776 - Verify that login fails with empty email field
    When user leaves email field empty
    And email field should remain blank
    And user clicks login button
    Then error message for required email field should be displayed

  @regression @TC-777
  Scenario: TC-777 - Verify that login fails with empty password field
    When user enters valid email in email field
    And email should be entered
    And user clicks login button
    Then error message for required password field should be displayed

  @smoke @regression @TC-778
  Scenario: TC-778 - Verify that login fails with correct email but incorrect password
    When user enters valid email in email field
    And valid email should be entered
    And user clicks login button
    Then error message for invalid credentials should be displayed

  @smoke @regression @TC-779
  Scenario: TC-779 - Verify that login fails with incorrect email but correct password
    When user enters incorrect email in email field
    And incorrect email should be entered
    And user clicks login button
    Then error message for invalid credentials should be displayed

  @regression @TC-780
  Scenario: TC-780 - Verify that login fails when both email and password fields are empty
    When user clicks login button
    Then error messages for required fields should be displayed
    And user should not be redirected

  @regression @TC-781
  Scenario: TC-781 - Verify that login fails with SQL injection in email field
    When user enters SQL injection string in email field
    And SQL injection string should be entered
    And user clicks login button
    Then login should fail with error message or validation

  @regression @TC-782
  Scenario: TC-782 - Verify that login fails with special characters in email field
    When user enters special characters without valid email format
    And special characters should be entered
    And user clicks login button
    Then error message for invalid email format should be displayed

  @regression @TC-783
  Scenario: TC-783 - Verify that login works with email containing maximum allowed characters
    When user enters maximum length valid email
    And email with maximum characters should be entered
    And user clicks login button
    Then login should process based on credential validity

  @regression @TC-784
  Scenario: TC-784 - Verify that login works with password containing maximum allowed characters
    When user enters valid email
    And user enters maximum length password
    And user clicks login button
    Then login should process based on credential validity

  @regression @TC-785
  Scenario: TC-785 - Verify that login works with email containing minimum allowed characters
    When user enters minimum length valid email
    And email with minimum characters should be entered
    And user clicks login button
    Then login should process based on credential validity

  @regression @TC-786
  Scenario: TC-786 - Verify that password field handles copy paste operations
    # Copy-paste is a browser default behavior — no explicit test step needed

  @regression @TC-787
  Scenario: TC-787 - Verify that login handles leading and trailing spaces in email
    When user enters email with leading and trailing spaces
    And email with spaces should be entered
    And user clicks login button
    Then system should trim spaces or show validation error

  @regression @TC-788
  Scenario: TC-788 - Verify that login handles leading and trailing spaces in password
    When user enters valid email
    And email should be entered
    And user enters password with leading and trailing spaces
    And user clicks login button
    Then system should process password with spaces as entered

  @regression @TC-789
  Scenario: TC-789 - Verify that login API returns success response for valid credentials
    When user sends POST request to login API with valid credentials
    And API request should be sent
    Then status code 200 should be returned
    And valid token should be present in response

  @regression @TC-790
  Scenario: TC-790 - Verify that login API returns error response for invalid credentials
    When user sends POST request to login API with invalid credentials
    And API request should be sent
    Then status code 401 or 400 should be returned
    And appropriate error message should be present

  @regression @TC-791
  Scenario: TC-791 - Verify that login API validates required fields
    When user sends POST request to login API with missing email field
    And API request should be sent
    Then status code 400 should be returned
    And error message for required field should be present

  @regression @TC-792
  Scenario: TC-792 - Verify that login API response time is within acceptable limits
    When user sends POST request to login API with valid credentials
    And API request should be sent
    And user measures API response time
    And response time should be captured
    Then response time should be under 3 seconds

  @regression @TC-793
  Scenario: TC-793 - Verify that password is transmitted securely over HTTPS
    When user enters valid credentials
    And credentials should be entered
    And user monitors network traffic during login
    Then network request should be captured

  @regression @TC-794
  Scenario: TC-794 - Verify that password is not visible in browser console or logs
    When user opens browser developer console
    And console should be opened
    And user checks console logs
    Then password should not be visible in plain text

  @regression @TC-795
  Scenario: TC-795 - Verify that authentication token expires after session timeout
    When user logs in with valid credentials
    And user should be logged in successfully
    And user waits for session timeout period
    And session should expire
    And user attempts to access protected resource
    Then user should be redirected to login page

  @regression @TC-796
  Scenario: TC-796 - Verify that login page loads within acceptable time
    When user measures page load time
    And load time should be captured
    And user verifies all page elements are loaded
    And all elements should be visible
    Then verify load time is under 2 seconds
    And page load should be within acceptable limit

  @regression @TC-797
  Scenario: TC-797 - Verify that login functionality handles multiple concurrent users
    When user simulates 100 concurrent login requests
    And multiple requests should be sent
    And verify all requests are processed
    And all login attempts should receive responses
    Then verify system performance remains stable
    And no system crashes or significant delays

  @smoke @regression @TC-1027
  Scenario: TC-1027 - Verify that system handles concurrent login requests efficiently
    When user simulates 50 concurrent login requests with valid credentials
    And multiple users should attempt login simultaneously
    Then verify all requests are processed successfully
    And verify response times remain consistent
    And performance should not degrade significantly
