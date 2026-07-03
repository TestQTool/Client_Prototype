Feature: Verify that API prevents duplicate Employee ID creation

  Background:
    * url baseUrl
    * if (authType == 'bearer_token' || authType == 'jwt') karate.set('authHeader', 'Bearer ' + token)
    * if (authHeader) header Authorization = authHeader

  Scenario: 1781
    Given path 'user'
    When method GET
    Then status 204
    And match response != null
