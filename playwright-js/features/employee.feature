Feature: Employee Management API
  As a QA engineer
  I want to verify employee management API validations
  So that data integrity is maintained

  @api @duplicate-prevention @testcase-1781
  Scenario: Verify that API prevents duplicate Employee ID creation
    Given I navigate to the application login page
    When I login with valid admin credentials
    And I send a POST request to create an employee with the following details:
      | firstName | lastName | employeeId |
      | Lisa      | Anderson | EMP011     |
    Then the employee should be created successfully
    When I send another POST request to create an employee with the following details:
      | firstName | lastName | employeeId |
      | Mark      | Taylor   | EMP011     |
    Then the API should return status code 409
    And the response should contain a conflict error message for duplicate Employee ID
