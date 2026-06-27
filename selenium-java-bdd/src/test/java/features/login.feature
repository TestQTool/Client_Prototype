Feature: Login Functionality
  As a user
  I want to authenticate with the system
  So that I can access protected features

  Background:
    Given user navigates to the login page

  @smoke @regression @TC-560-001
  Scenario: TC-560-001 - Verify that login works with valid credentials
    When user enters valid username "user"
    And user enters valid password "user123"
    And user submits authentication request
    Then response should return status code 200
    And authentication token should be present in response

  @regression @TC-561-001
  Scenario: TC-561-001 - Verify that login fails with invalid username
    When user enters invalid username "invaliduser"
    And user enters valid password "user123"
    And user submits authentication request
    Then response should return status code 401
    And error message should indicate invalid credentials

  @regression @TC-562-001
  Scenario: TC-562-001 - Verify that login fails with invalid password
    When user enters valid username "user"
    And user enters invalid password "wrongpassword"
    And user submits authentication request
    Then response should return status code 401
    And error message should indicate invalid credentials

  @regression @TC-563-001
  Scenario: TC-563-001 - Verify that login fails with empty username
    When user enters empty username
    And user enters valid password "user123"
    And user submits authentication request
    Then response should return status code 400
    And error message should indicate missing username

  @regression @TC-564-001
  Scenario: TC-564-001 - Verify that login fails with empty password
    When user enters valid username "user"
    And user enters empty password
    And user submits authentication request
    Then response should return status code 400
    And error message should indicate missing password

  @smoke @regression @TC-021-001
  Scenario: TC-021-001 - Verify that login works with valid credentials (UI)
    Given the login page is displayed
    When user enters username and password
    And user clicks the login button
    Then user should login successfully

  @regression @TC-022-001
  Scenario: TC-022-001 - Test login form with invalid data
    Given the login page is displayed
    When user enters username and password
    Then system should accept the username and password
    And login page should display all UI elements
