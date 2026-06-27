*** Settings ***
Resource    ../resources/common_keywords.robot
Test Tags   sanity

*** Test Cases ***
Sanity Health
    Framework Scaffold Should Be Ready
