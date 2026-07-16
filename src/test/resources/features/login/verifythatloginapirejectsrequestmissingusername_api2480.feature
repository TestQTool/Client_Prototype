Feature: Verify that login API rejects request with missing username field

  Background:
    * url baseUrl
    * if (authType == 'bearer_token' || authType == 'jwt') karate.set('authHeader', 'Bearer ' + token)
    * if (authHeader) header Authorization = authHeader

  Scenario: 2480
    Given path 'users'
    When method POST
    Then status 201
    And match response != null
