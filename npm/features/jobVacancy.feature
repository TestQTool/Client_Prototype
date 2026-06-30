Feature: Job Vacancy Management
  As an HR recruiter
  I want to manage job vacancies
  So that I can post and track open positions

  Background:
    Given I am logged in as HR recruiter

  @id:1800 @smoke @positive
  Scenario: HR recruiter can successfully create a new job vacancy with all mandatory fields
    When I navigate to add job vacancy page
    And I enter Job Title "Software Engineer"
    And I enter Vacancy Name "SE-2024-001"
    And I select a Hiring Manager
    And I enter Number of Positions "3"
    And I click Save button
    Then the vacancy should appear in vacancy list

  @id:1801 @validation @negative
  Scenario: System validates mandatory Job Title field when creating a job vacancy
    When I navigate to add job vacancy page
    And I leave Job Title field empty
    And I enter Vacancy Name "SE-2024-002"
    And I select a Hiring Manager
    And I enter Number of Positions "2"
    And I click Save button
    Then I should see validation error for Job Title

  @id:1802 @validation @negative
  Scenario: System validates mandatory Vacancy Name field when creating a job vacancy
    When I navigate to add job vacancy page
    And I enter Job Title "QA Engineer"
    And I leave Vacancy Name field empty
    And I select a Hiring Manager
    And I enter Number of Positions "1"
    And I click Save button
    Then I should see validation error for Vacancy Name

  @id:1803 @validation @negative
  Scenario: System validates mandatory Hiring Manager field when creating a job vacancy
    When I navigate to add job vacancy page
    And I enter Job Title "DevOps Engineer"
    And I enter Vacancy Name "DO-2024-001"
    And I leave Hiring Manager unselected
    And I enter Number of Positions "2"
    And I click Save button
    Then I should see validation error for Hiring Manager

  @id:1804 @validation @negative
  Scenario: System validates mandatory Number of Positions field when creating a job vacancy
    When I navigate to add job vacancy page
    And I enter Job Title "Product Manager"
    And I enter Vacancy Name "PM-2024-001"
    And I select a Hiring Manager
    And I leave Number of Positions empty
    And I click Save button
    Then I should see validation error for Number of Positions

  @id:1805 @boundary @positive
  Scenario: Job vacancy can be created with maximum character length in Job Title field
    When I navigate to add job vacancy page
    And I enter Job Title with 255 characters
    And I enter Vacancy Name "MAX-2024-001"
    And I select a Hiring Manager
    And I enter Number of Positions "1"
    And I click Save button
    Then the vacancy should be saved successfully
    And the vacancy should appear in vacancy list

  @id:1806 @positive
  Scenario: Job vacancy can be created with special characters in Job Title field
    When I navigate to add job vacancy page
    And I enter Job Title "Senior C++ Developer & Team Lead"
    And I enter Vacancy Name "CPP-2024-001"
    And I select a Hiring Manager
    And I enter Number of Positions "1"
    And I click Save button
    Then the vacancy should be saved successfully
    And the vacancy should appear in vacancy list with special characters

  @id:1807 @validation @negative
  Scenario: System rejects invalid Number of Positions value when creating a job vacancy
    When I navigate to add job vacancy page
    And I enter Job Title "Data Analyst"
    And I enter Vacancy Name "DA-2024-001"
    And I select a Hiring Manager
    And I enter Number of Positions "-5"
    And I click Save button
    Then I should see validation error for invalid Number of Positions

  @id:1818 @security @negative
  Scenario: Non-HR user cannot create a job vacancy
    Given I am logged in as non-HR user
    When I attempt to access Add Job Vacancy functionality
    Then the system should deny access
    And I should see authorization error

  @id:1820 @security @negative
  Scenario: SQL injection attempt in Job Title field is prevented
    When I navigate to add job vacancy page
    And I enter Job Title with SQL injection payload "Engineer'; DROP TABLE vacancies;--"
    And I enter Vacancy Name "SQL-2024-001"
    And I select a Hiring Manager
    And I enter Number of Positions "1"
    And I click Save button
    Then the system should sanitize or reject the input
    And no SQL injection should occur

  @id:1821 @security @negative
  Scenario: XSS script injection in Vacancy Name field is prevented
    When I navigate to add job vacancy page
    And I enter Job Title "Test Engineer"
    And I enter Vacancy Name with XSS payload "<script>alert('XSS')</script>"
    And I select a Hiring Manager
    And I enter Number of Positions "1"
    And I click Save button
    Then the system should sanitize the input
    And the script should not execute

  @id:1822 @security @negative
  Scenario: Session is invalidated after logout and cannot create job vacancy
    Given I am logged in as HR recruiter
    And I logout from the system
    When I attempt to create job vacancy with previous session
    Then the system should reject the request
    And I should see session invalid error

  @id:1823 @security @positive
  Scenario: HTTPS protocol is enforced for job vacancy creation requests
    When I attempt to access job vacancy creation over HTTP
    Then the system should redirect to HTTPS or reject the request
    And vacancy creation should only succeed over HTTPS

  @id:1830 @performance @positive
  Scenario: UI remains responsive during job vacancy creation under moderate user load
    When 20 concurrent users create job vacancies through UI
    And I measure page load time and form submission response time
    Then average UI response time should be less than 3 seconds
    And no user should experience timeout

  @id:1831 @performance @positive
  Scenario: Vacancy list page load time meets performance requirements after multiple vacancy creations
    Given 100 job vacancies exist in the system
    When I navigate to vacancy list page
    Then page load time should be less than 4 seconds
    And all vacancies should be displayed correctly
