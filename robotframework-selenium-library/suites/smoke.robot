*** Settings ***
Resource    ../resources/common_keywords.robot
Test Tags   smoke

*** Test Cases ***
Smoke Health
    Framework Scaffold Should Be Ready
