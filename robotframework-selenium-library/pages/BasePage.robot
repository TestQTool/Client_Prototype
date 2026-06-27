*** Settings ***
Documentation    Base page with common actions and test data loading
Library          SeleniumLibrary
Library          OperatingSystem
Library          Collections
Library          String

*** Variables ***
${BROWSER}              chrome
${BASE_URL}             %{BASE_URL=http://192.168.10.124:4001}
${HEADLESS}             %{HEADLESS=False}
${CREDENTIALS_FILE}     ${CURDIR}/../test-data/credentials.csv

*** Keywords ***

# ── Browser management ────────────────────────────────────────────────────────

Open Browser To URL
    [Arguments]    ${url}
    [Documentation]    Open browser and navigate to URL
    Run Keyword If    '${HEADLESS}' == 'True'
    ...    Open Browser    ${url}    ${BROWSER}    options=add_argument("--headless")
    ...    ELSE
    ...    Open Browser    ${url}    ${BROWSER}
    Maximize Browser Window

Get Base URL
    [Documentation]    Return base URL from environment or default
    [Return]    ${BASE_URL}

# ── Credential management ─────────────────────────────────────────────────────

Get Login Data By Role
    [Arguments]    ${role_name}
    [Documentation]    Load credentials from CSV by role name
    ${credentials}=    Load Credentials CSV
    FOR    ${row}    IN    @{credentials}
        ${row_role}=    Get From Dictionary    ${row}    RoleName
        ${row_role_stripped}=    Strip String    ${row_role}
        ${role_name_stripped}=    Strip String    ${role_name}
        Run Keyword If    '${row_role_stripped}' == '${role_name_stripped}'
        ...    Return From Keyword    ${row}
    END
    Fail    No credentials found for role: ${role_name}

Load Credentials CSV
    [Documentation]    Parse credentials CSV into list of dictionaries
    ${csv_content}=    Get File    ${CREDENTIALS_FILE}
    @{lines}=    Split To Lines    ${csv_content}
    ${header}=    Get From List    ${lines}    0
    @{headers}=    Split String    ${header}    ,
    @{credentials}=    Create List
    ${line_count}=    Get Length    ${lines}
    FOR    ${i}    IN RANGE    1    ${line_count}
        ${line}=    Get From List    ${lines}    ${i}
        @{values}=    Split String    ${line}    ,
        &{row}=    Create Dictionary
        FOR    ${j}    IN RANGE    0    4
            ${key}=    Get From List    ${headers}    ${j}
            ${value}=    Get From List    ${values}    ${j}
            Set To Dictionary    ${row}    ${key}=${value}
        END
        Append To List    ${credentials}    ${row}
    END
    [Return]    @{credentials}

# ── Wait helpers ──────────────────────────────────────────────────────────────

Wait For Page Load
    [Documentation]    Wait for page to finish loading
    Wait Until Element Is Visible    tag:body    timeout=10s

Wait For Network Idle
    [Documentation]    Wait for network activity to settle
    Sleep    2s
