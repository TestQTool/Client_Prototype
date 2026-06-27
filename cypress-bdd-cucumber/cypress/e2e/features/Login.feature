Feature: Login Authentication
  As a user of the application
  I want to authenticate with valid and invalid credentials
  So that I can access the system securely

  Background:
    Given I am on the login page

  @smoke @TC-560
  Scenario: TC-560 Verify that login works with valid credentials
    When I send a POST request to "/login" endpoint
    And I include valid username in request body
    And I include valid password in request body
    And I submit the authentication request
    Then the response should return 200 status code
    And the response should contain authentication token

  @regression @TC-561
  Scenario: TC-561 Verify that login fails with invalid username
    When I send a POST request to "/login" endpoint
    And I include invalid username in request body
    And I include valid password in request body
    And I submit the authentication request
    Then the response should return 401 status code
    And the response should indicate invalid credentials

  @regression @TC-562
  Scenario: TC-562 Verify that login fails with invalid password
    When I send a POST request to "/login" endpoint
    And I include valid username in request body
    And I include invalid password in request body
    And I submit the authentication request
    Then the response should return 401 status code
    And the response should indicate invalid credentials

  @regression @TC-563
  Scenario: TC-563 Verify that login fails with empty username
    When I send a POST request to "/login" endpoint
    And I include empty username field in request body
    And I include valid password in request body
    And I submit the authentication request
    Then the response should return 400 status code
    And the error message should indicate missing username

  @regression @TC-564
  Scenario: TC-564 Verify that login fails with empty password
    When I send a POST request to "/login" endpoint
    And I include valid username in request body
    And I include empty password field in request body
    And I submit the authentication request
    Then the response should return 400 status code
    And the error message should indicate missing password

  @smoke @regression @TC-21
  Scenario: TC-21 Verify that login works with valid credentials (UI)
    When I enter valid username
    And I enter valid password
    And I click the login button
    Then I should be logged in successfully

  @regression @TC-22
  Scenario: TC-22 Test Login Form with Invalid Data
    Given the system displays a Login Page with Email, Password fields, Login button and Register Hyperlink
    When I enter username and password
    Then the system should accept the username and password
