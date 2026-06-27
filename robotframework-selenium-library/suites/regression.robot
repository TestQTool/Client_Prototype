*** Settings ***
Resource    ../resources/common_keywords.robot
Test Tags   regression

*** Test Cases ***
Regression Health
    Framework Scaffold Should Be Ready
