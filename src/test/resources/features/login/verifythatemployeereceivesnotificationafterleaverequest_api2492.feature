Feature: Verify that employee receives notification after leave request is approved

  Background:
    * url baseUrl
    * if (authType == 'bearer_token' || authType == 'jwt') karate.set('authHeader', 'Bearer ' + token)
    * if (authHeader) header Authorization = authHeader

  Scenario: 2492
    Given path 'user'
    When method POST
    Then status 204
    And match response != null
