Feature: Employee API Validation
  As a QA Engineer
  I want to validate employee API endpoints
  So that data integrity is maintained

  @API @Priority:High @TestCase:1781
  Scenario: Verify that API prevents duplicate Employee ID creation
    Given I navigate to the HR application login page
    When I login with valid credentials
    And I send a POST request to create employee with firstName "Lisa" lastName "Anderson" and employeeId "EMP011"
    Then the first employee record should be created successfully
    When I send another POST request with firstName "Mark" lastName "Taylor" and same employeeId "EMP011"
    Then the API should respond with status code 409
    And the response should contain a conflict error message for duplicate Employee ID
