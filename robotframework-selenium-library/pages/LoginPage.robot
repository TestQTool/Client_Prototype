*** Settings ***
Documentation    Login page actions and assertions
Library          SeleniumLibrary
Library          String
Resource         BasePage.robot
Variables        ../pageObjects/LoginPage.py
Variables        ../test-data/testdata.py

*** Keywords ***

# ── Navigation ────────────────────────────────────────────────────────────────

Open Login Page
    [Documentation]    Navigate to login page and verify page loaded
    ${base_url}=    Get Base URL
    Go To    ${base_url}
    Wait Until Page Contains Element    ${EMAIL_INPUT}    timeout=10s
    Wait Until Page Contains Element    ${USERNAME_INPUT}    timeout=10s
    Wait Until Page Contains Element    ${PASSWORD_INPUT}    timeout=10s
    Wait Until Page Contains Element    ${LOGIN_BUTTON}    timeout=10s

# ── Actions ───────────────────────────────────────────────────────────────────

Enter Username
    [Arguments]    ${username}
    [Documentation]    Fill username field
    Wait Until Element Is Visible    ${USERNAME_INPUT}    timeout=10s
    Input Text    ${USERNAME_INPUT}    ${username}

Enter Email
    [Arguments]    ${email}
    [Documentation]    Fill email field
    Wait Until Element Is Visible    ${EMAIL_INPUT}    timeout=10s
    Input Text    ${EMAIL_INPUT}    ${email}

Enter Password
    [Arguments]    ${password}
    [Documentation]    Fill password field
    Wait Until Element Is Visible    ${PASSWORD_INPUT}    timeout=10s
    Input Password    ${PASSWORD_INPUT}    ${password}

Click Login Button
    [Documentation]    Submit login form
    Wait Until Element Is Visible    ${LOGIN_BUTTON}    timeout=10s
    Click Element    ${LOGIN_BUTTON}

Login With Credentials
    [Arguments]    ${username}    ${password}
    [Documentation]    Complete login flow with given credentials
    Enter Username    ${username}
    Enter Password    ${password}
    Click Login Button

Login As Role
    [Arguments]    ${role_name}
    [Documentation]    Login using credentials from CSV by role name
    ${credentials}=    Get Login Data By Role    ${role_name}
    Login With Credentials    ${credentials['Username']}    ${credentials['Password']}

Submit Login Form Without Username
    [Documentation]    Submit form with empty username
    Enter Password    validpassword123
    Click Login Button

Submit Login Form Without Password
    [Documentation]    Submit form with empty password
    Enter Username    validuser
    Click Login Button

Submit Empty Login Form
    [Documentation]    Submit form without filling any fields
    Click Login Button

# ── Assertions ────────────────────────────────────────────────────────────────

Verify Login Page Loaded
    [Documentation]    Verify login page displays all required UI elements
    Wait Until Page Contains Element    ${EMAIL_INPUT}    timeout=10s
    Wait Until Page Contains Element    ${PASSWORD_INPUT}    timeout=10s
    Wait Until Page Contains Element    ${LOGIN_BUTTON}    timeout=10s
    Wait Until Page Contains Element    ${REGISTER_LINK}    timeout=10s
    Element Should Be Visible    ${EMAIL_INPUT}
    Element Should Be Visible    ${PASSWORD_INPUT}
    Element Should Be Visible    ${LOGIN_BUTTON}
    Element Should Be Visible    ${REGISTER_LINK}

Verify Login Successful
    [Documentation]    Verify user logged in successfully - 200 status or dashboard visible
    Wait Until Location Contains    dashboard    timeout=10s
    Wait Until Page Contains Element    ${DASHBOARD_INDICATOR}    timeout=10s
    Element Should Be Visible    ${DASHBOARD_INDICATOR}

Verify Authentication Token Present
    [Documentation]    Verify auth token exists in storage
    ${token}=    Execute Javascript    return localStorage.getItem('authToken');
    Should Not Be Empty    ${token}

Verify Login Failed With Invalid Credentials
    [Documentation]    Verify 401 status or invalid credentials error message
    Wait Until Page Contains Element    ${ERROR_MESSAGE}    timeout=10s
    Element Should Contain    ${ERROR_MESSAGE}    Invalid credentials

Verify Login Failed With Invalid Username
    [Documentation]    Verify 401 status or invalid username error
    Wait Until Page Contains Element    ${ERROR_MESSAGE}    timeout=10s
    Element Should Contain    ${ERROR_MESSAGE}    Invalid

Verify Login Failed With Invalid Password
    [Documentation]    Verify 401 status or invalid password error
    Wait Until Page Contains Element    ${ERROR_MESSAGE}    timeout=10s
    Element Should Contain    ${ERROR_MESSAGE}    Invalid

Verify Login Failed With Empty Username
    [Documentation]    Verify 400 status or missing username error
    Wait Until Page Contains Element    ${ERROR_MESSAGE}    timeout=10s
    Element Should Contain    ${ERROR_MESSAGE}    required

Verify Login Failed With Empty Password
    [Documentation]    Verify 400 status or missing password error
    Wait Until Page Contains Element    ${ERROR_MESSAGE}    timeout=10s
    Element Should Contain    ${ERROR_MESSAGE}    required
