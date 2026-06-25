package runners;

import io.cucumber.junit.platform.engine.Constants;
import org.junit.platform.suite.api.ConfigurationParameter;
import org.junit.platform.suite.api.IncludeEngines;
import org.junit.platform.suite.api.SelectClasspathResource;
import org.junit.platform.suite.api.Suite;

@Suite
@IncludeEngines("cucumber")
@SelectClasspathResource("features")
@ConfigurationParameter(key = Constants.GLUE_PROPERTY_NAME, value = "stepDefinitions")
@ConfigurationParameter(key = Constants.PLUGIN_PROPERTY_NAME, value = "pretty, html:target/cucumber-reports/regression/cucumber.html, json:target/cucumber-reports/regression/cucumber.json, junit:target/cucumber-reports/regression/cucumber.xml")
@ConfigurationParameter(key = Constants.FILTER_TAGS_PROPERTY_NAME, value = "@regression")
public class RegressionRunner {
}
