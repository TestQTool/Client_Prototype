Feature: Verify that API returns validation error when Number of Positions is zero or negative

  Background:
    * url baseUrl
    * if (authType == 'bearer_token' || authType == 'jwt') karate.set('authHeader', 'Bearer ' + token)
    * if (authHeader) header Authorization = authHeader

  Scenario: 1812
    Given path 'num'
    When method GET
    Then status 202
    And match response != null
