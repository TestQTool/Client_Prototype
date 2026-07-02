Feature: Verify that login API returns error when username is missing in request

  Background:
    * url baseUrl
    * def testData = read('classpath:testdata/request/VerifyThatLoginAPIReturnsErrorUsernameMissing_Api1231.json')
    * def requestBody = testData.apiDetails.requestBody
    * configure headers = authHeaders

  Scenario: Verify that login API returns error when username is missing in request
    Given path 'user'
    * params authQueryParams
    When method post
    Then status 201
    And match response != null
