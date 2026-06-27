Feature: Framework health
  Scenario: Framework scaffold is ready
    Given the framework configuration exists
    Then the framework health check should pass
