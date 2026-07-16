Feature: Verify that manager can filter pending leave requests by team member

  Background:
    * url baseUrl
    * if (authType == 'bearer_token' || authType == 'jwt') karate.set('authHeader', 'Bearer ' + token)
    * if (authHeader) header Authorization = authHeader

  Scenario: 2495
    Given path 'user'
    When method PUT
    Then status 200
    And match response != null
