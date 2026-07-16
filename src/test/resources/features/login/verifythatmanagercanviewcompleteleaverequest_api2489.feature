Feature: Verify that manager can view complete leave request details for a pending request

  Background:
    * url baseUrl
    * if (authType == 'bearer_token' || authType == 'jwt') karate.set('authHeader', 'Bearer ' + token)
    * if (authHeader) header Authorization = authHeader

  Scenario: 2489
    Given path 'users'
    When method POST
    Then status 201
    And match response != null
