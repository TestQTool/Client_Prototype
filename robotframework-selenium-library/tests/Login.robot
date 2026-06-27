*** Settings ***
Documentation    Login feature test cases
...              Generated from test inventory cases 21, 22, 23, 24, 25, 560-564
...              Framework: Robot Framework + Selenium Library
Library          SeleniumLibrary
Resource         ../pages/LoginPage.robot
Resource         ../pages/BasePage.robot
Suite Setup      Open Browser To URL    ${BASE_URL}
Suite Teardown   Close All Browsers
Test Tags        Login

*** Test Cases ***

TC-21: Verify that login works with valid credentials
    [Documentation]    Verify successful login with valid username and password
    ...                Expected: User should login successfully and see dashboard
    [Tags]    smoke    regression    TC-21
    Given Open Login Page
    When Login As Role    Admin
    Then Verify Login Successful
    And Verify Authentication Token Present

TC-560: Verify that login works with valid credentials (API)
    [Documentation]    Verify /login endpoint returns 200 with valid credentials
    ...                Expected: Response returns 200 status code and authentication token
    [Tags]    regression    api    TC-560
    Given Open Login Page
    When Login As Role    User
    Then Verify Login Successful
    And Verify Authentication Token Present

TC-22: To Test Login Form with Invalid Data
    [Documentation]    Verify login page accepts username and password input
    ...                Expected: System should accept username and password
    [Tags]    regression    TC-22
    Given Open Login Page
    When Enter Username    testuser
    And Enter Password    testpass
    Then Element Should Be Enabled    ${LOGIN_BUTTON}

TC-23: To Test Login Form with Invalid Data (Duplicate)
    [Documentation]    Verify login form validation with invalid data
    [Tags]    regression    TC-23
    Given Open Login Page
    When Enter Username    invalid@user
    And Enter Password    short
    And Click Login Button
    Then Verify Login Failed With Invalid Credentials

TC-24: To Test Login Form with Invalid Data (Duplicate)
    [Documentation]    Verify login form validation behavior
    [Tags]    regression    TC-24
    Given Open Login Page
    When Login With Credentials    invalid    invalid123
    Then Verify Login Failed With Invalid Credentials

TC-25: test import 01
    [Documentation]    Test case import validation
    [Tags]    regression    TC-25
    Given Open Login Page
    Then Verify Login Page Loaded

TC-561: Verify that login fails with invalid username
    [Documentation]    Verify /login endpoint returns 401 with invalid username
    ...                Expected: Response returns 401 status code with error message
    [Tags]    regression    api    TC-561
    Given Open Login Page
    When Login With Credentials    invaliduser    validPassword123
    Then Verify Login Failed With Invalid Username

TC-562: Verify that login fails with invalid password
    [Documentation]    Verify /login endpoint returns 401 with invalid password
    ...                Expected: Response returns 401 status code with error message
    [Tags]    smoke    regression    api    TC-562
    Given Open Login Page
    ${credentials}=    Get Login Data By Role    Admin
    When Login With Credentials    ${credentials['Username']}    wrongPassword
    Then Verify Login Failed With Invalid Password

TC-563: Verify that login fails with empty username
    [Documentation]    Verify /login endpoint returns 400 with empty username
    ...                Expected: Response returns 400 status code with missing username error
    [Tags]    regression    api    TC-563
    Given Open Login Page
    When Submit Login Form Without Username
    Then Verify Login Failed With Empty Username

TC-564: TC_Verify that login fails with empty password
    [Documentation]    Verify /login endpoint returns 400 with empty password
    ...                Expected: Response returns 400 status code with missing password error
    [Tags]    smoke    regression    api    TC-564
    Given Open Login Page
    When Submit Login Form Without Password
    Then Verify Login Failed With Empty Password
