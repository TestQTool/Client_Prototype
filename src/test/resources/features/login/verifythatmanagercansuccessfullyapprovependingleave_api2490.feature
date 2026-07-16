Feature: Verify that manager can successfully approve a pending leave request

  Background:
    * url baseUrl
    * if (authType == 'bearer_token' || authType == 'jwt') karate.set('authHeader', 'Bearer ' + token)
    * if (authHeader) header Authorization = authHeader

  Scenario: 2490
    Given path 'user'
    When method POST
    Then status 202
    And match response != null
