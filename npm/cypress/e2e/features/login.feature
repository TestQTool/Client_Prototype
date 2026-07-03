# TestCase ID: 5
# Priority: 2-Medium
# Type: Functional
Feature: Login Form Validation

  As a user
  I want to test the login form with valid data
  So that I can verify successful authentication

  @priority-medium @functional @testcase-5
  Scenario: Test Login Form with Valid Data
    Given I navigate to the login page
    Then the login page should display email field
    And the login page should display password field
    And the login page should display login button
    And the login page should display register hyperlink
