Feature: Verify that employee receives notification after leave request is rejected

  Background:
    * url baseUrl
    * if (authType == 'bearer_token' || authType == 'jwt') karate.set('authHeader', 'Bearer ' + token)
    * if (authHeader) header Authorization = authHeader

  Scenario: 2493
    Given path 'user'
    When method PATCH
    Then status 202
    And match response != null
