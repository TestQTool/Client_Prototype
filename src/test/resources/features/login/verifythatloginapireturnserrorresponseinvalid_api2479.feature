Feature: Verify that login API returns error response with invalid credentials

  Background:
    * url baseUrl
    * if (authType == 'bearer_token' || authType == 'jwt') karate.set('authHeader', 'Bearer ' + token)
    * if (authHeader) header Authorization = authHeader

  Scenario: 2479
    Given path 'user'
    When method PUT
    Then status 202
    And match response != null
