Feature: Verify that login API returns success response with valid credentials

  Background:
    * url baseUrl
    * if (authType == 'bearer_token' || authType == 'jwt') karate.set('authHeader', 'Bearer ' + token)
    * if (authHeader) header Authorization = authHeader

  Scenario: 2478
    Given path 'users'
    When method PUT
    Then status 201
    And match response != null
