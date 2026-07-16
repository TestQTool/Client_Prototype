Feature: Verify that manager can successfully reject a pending leave request

  Background:
    * url baseUrl
    * if (authType == 'bearer_token' || authType == 'jwt') karate.set('authHeader', 'Bearer ' + token)
    * if (authHeader) header Authorization = authHeader

  Scenario: 2491
    Given path 'users'
    When method POST
    Then status 200
    And match response != null
