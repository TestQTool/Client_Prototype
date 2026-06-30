Feature: Leave Module
  As a user
  I want to manage leave requests
  So that I can handle employee time off

  @priority:high @testcase:764
  Scenario: Leave Module
    Given I am logged in to the application
    When I navigate to the Leave module
    Then I should see the Leave management interface
    And I should be able to view leave requests
    And I should be able to apply for leave
    And I should be able to approve or reject leave requests
