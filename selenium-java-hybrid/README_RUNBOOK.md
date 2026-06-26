# selenium-java-hybrid Runbook

## Default
`mvn test`

## Suites
`mvn test -Psmoke`
`mvn test -Psanity`
`mvn test -Pregression`
`mvn test -Pparallel`
`mvn test -Psequential`

## Direct Suite File
`mvn test -DsuiteXmlFile=suites/smoke.xml`

## Allure
`mvn allure:report`

Framework-owned files include driver factory, utilities, TestNG listeners, root suites, reporting, and configuration. Users should add tests, pages, and test data only.
