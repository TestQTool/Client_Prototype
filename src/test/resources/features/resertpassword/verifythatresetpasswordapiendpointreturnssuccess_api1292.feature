Feature: Verify that reset password API endpoint returns success response for valid user

  Background:
    * url baseUrl
    * if (authType == 'bearer_token' || authType == 'jwt') karate.set('authHeader', 'Bearer ' + token)
    * if (authHeader) header Authorization = authHeader

  Scenario: 1292
    And header Content-Type = 'application/json'
    Given path 'api'
    Given path 'auth'
    Given path 'resetpassword'
    And request {"email":"hithaadmin@yopmail.com","password":"Test@123"}
    When method POST
    Then status 200
    And match response != null
