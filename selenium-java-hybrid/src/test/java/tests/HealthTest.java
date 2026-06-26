package tests;

import core.DriverFactory;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

public class HealthTest {
    @Test(groups = {"smoke"})
    public void frameworkLoadsDriverFactory() {
        DriverFactory.initDriver();
    }

    @AfterMethod(alwaysRun = true)
    public void tearDown() {
        DriverFactory.quitDriver();
    }
}
