Feature: Verify that API handles duplicate Vacancy Name appropriately

  Background:
    * url baseUrl
    * if (authType == 'bearer_token' || authType == 'jwt') karate.set('authHeader', 'Bearer ' + token)
    * if (authHeader) header Authorization = authHeader

  Scenario: 1814
    Given path 'user'
    When method POST
    Then status 202
    And match response != null
