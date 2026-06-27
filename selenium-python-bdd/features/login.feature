# features/login.feature
# ─────────────────────────────────────────────────────────────────────────────
# Login Feature - Authentication scenarios
# Generated from: AG-Helix test inventory
# Framework: Selenium + Python + BDD
# ─────────────────────────────────────────────────────────────────────────────

Feature: Login Authentication
  As a user
  I want to authenticate with the system
  So that I can access protected features

  Background:
    Given the user navigates to the login page

  @smoke @regression @TC-21
  Scenario: TC-21 - Verify that login works with valid credentials
    When the user enters valid username
    And the user enters valid password
    And the user clicks the login button
    Then the user should login successfully
    And the authentication token should be present

  @regression @TC-562
  Scenario: TC-562 - Verify that login fails with invalid password
    When the user enters valid username
    And the user enters invalid password
    And the user clicks the login button
    Then the response should return 401 status code
    And the error message should indicate invalid credentials

  @regression @TC-561
  Scenario: TC-561 - Verify that login fails with invalid username
    When the user enters invalid username
    And the user enters valid password
    And the user clicks the login button
    Then the response should return 401 status code
    And the error message should indicate invalid credentials

  @regression @TC-563
  Scenario: TC-563 - Verify that login fails with empty username
    When the user leaves username field empty
    And the user enters valid password
    And the user clicks the login button
    Then the response should return 400 status code
    And the error message should indicate missing username

  @regression @TC-564
  Scenario: TC-564 - Verify that login fails with empty password
    When the user enters valid username
    And the user leaves password field empty
    And the user clicks the login button
    Then the response should return 400 status code
    And the error message should indicate missing password

  @smoke @regression @TC-22 @TC-23 @TC-24
  Scenario: TC-22/23/24 - Test login form with invalid data
    When the user enters invalid credentials
    And the user clicks the login button
    Then the login should fail
    And an error message should be displayed

  @regression @TC-560
  Scenario: TC-560 - Verify that login works with valid credentials (API)
    When a POST request is sent to /login endpoint
    And the request includes valid username
    And the request includes valid password
    And the authentication request is submitted
    Then the response should return 200 status code
    And the authentication token should be present in the response
