*** Settings ***
Library    SeleniumLibrary

*** Keywords ***
Open Application
    [Arguments]    ${base_url}
    Run Keyword If    '${base_url}' != ''    Open Browser    ${base_url}    chrome
