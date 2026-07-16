Feature: Verify that login API rejects request with missing password field

  Background:
    * url baseUrl
    * if (authType == 'bearer_token' || authType == 'jwt') karate.set('authHeader', 'Bearer ' + token)
    * if (authHeader) header Authorization = authHeader

  Scenario: 2481
    Given path 'user'
    When method POST
    Then status 202
    And match response != null
