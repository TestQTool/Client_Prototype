Feature: Login Functionality
  As a user
  I want to test the login functionality
  So that I can verify authentication scenarios

  @testcase-1993 @priority-high @functional
  Scenario: Verify that login fails with invalid password
    Given I navigate to the login page
    When I enter username "Admin" and invalid password "admin123"
    And I click the Login button
    Then I should see an error message indicating invalid credentials
    And I should remain on the login page