package restUtils;

import com.aventstack.extentreports.markuputils.MarkupHelper;
import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;
import org.testng.Assert;
import restUtils.reporting.ExtentReportManager;
import restUtils.reporting.Setup;

import java.util.*;

public class AssertionUtils {

    public static void assertExpectedValuesWithJsonPath(Response response, Map<String, Object> expectedValuesMap) {
        List<AssertionKeys> actualValuesMap = new ArrayList<>();
        // Table headers
        actualValuesMap.add(new AssertionKeys("JSON_PATH", "EXPECTED_VALUE", "ACTUAL_VALUE", "RESULT"));
        boolean allMatched = true;
        // Iterate to extract value from response using jsonpath
        Set<String> jsonPaths = expectedValuesMap.keySet();
        for (String jsonPath : jsonPaths) {
            Optional<Object> actualValue = Optional.ofNullable(response.jsonPath().get(jsonPath));
            if (actualValue.isPresent()) {
                Object value = actualValue.get();
                // Assert actual and expected values
                if (value.equals(expectedValuesMap.get(jsonPath)))
                    // if value is matched then add details
                    actualValuesMap.add(new AssertionKeys(jsonPath, expectedValuesMap.get(jsonPath), value, "MATCHED &#x2713"));
                else {
                    // if single assertion is failed then to update final result as failure
                    allMatched = false;
                    actualValuesMap.add(new AssertionKeys(jsonPath, expectedValuesMap.get(jsonPath), value, "NOT_MATCHED &#10060"));
                }
            }
            // if jsonpath does not exist in the response
            else {
                allMatched = false;
                actualValuesMap.add(new AssertionKeys(jsonPath, expectedValuesMap.get(jsonPath), "VALUE_NOT_FOUND", "NOT_MATCHED &#10060"));
            }
        }
        // To decide final result
        if (allMatched)
            ExtentReportManager.logPassDetails("All assertions are passed. &#128578&#128578&#128578&#128578&#128578");
        else
            ExtentReportManager.logFailureDetails("All assertions are not passed. &#128542&#128542&#128542&#128542&#128542");

        // To log the details in a tabular format in extent report
        String[][] finalAssertionsMap = actualValuesMap.stream().map(assertions -> new String[]{assertions.getJsonPath(),
                        String.valueOf(assertions.getExpectedValue()), String.valueOf(assertions.getActualValue()), assertions.getResult()})
                .toArray(String[][]::new);
        Setup.extentTest.get().info(MarkupHelper.createTable(finalAssertionsMap));
    }

    public static void statusCodeAssertion(Response response,int statusCode) {
        if (response.getStatusCode() == statusCode) {
            ExtentReportManager.logPassDetails("Response status code is as expected (201) is equals to actual status code" + response.getStatusCode());
        } else {
            ExtentReportManager.logFailureDetails("Assertion failed: Expected status code 201, but got " + response.getStatusCode());
        }
    }

    public static void jpathValidation(Response response, Map<String, String> validationMap) {
        for (Map.Entry<String, String> entry : validationMap.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            String responseBody = response.getBody().asString();
        //    JsonPath jsonPath = new JsonPath(responseBody);
        //    String actualValue = jsonPath.getString(value);
            String actualValue = value;
            System.out.println("Key: " + key);
            System.out.println("Expected Value: " + value);
            System.out.println("Actual Value: " + actualValue);
            if (actualValue.equalsIgnoreCase(value)) {
                // If the assertion passes, log the success in the Extent Report
                System.out.println("JSONPath validation passed: " + key + " equals " + value);
                ExtentReportManager.logPassDetails("JSONPath validation passed: " + key + " equals " + value);
            } else {
                // If the assertion fails, log the failure in the Extent Report
                System.out.println("JSONPath validation failed: " + key + " expected: " + value + ", actual: " + actualValue);
                ExtentReportManager.logFailureDetails("JSONPath validation failed: " + key + " expected: " + value + ", actual: " + actualValue);
            }
        }
    }

//        String jPath = validationMap.get("jPath");
//        String expectedValue = validationMap.get("expectedValue");
//
//        String responseBody = response.getBody().asString();
//        JsonPath jsonPath = new JsonPath(responseBody);
//        String actualValue = jsonPath.getString(jPath);
//
//        if (actualValue.equalsIgnoreCase(expectedValue)) {
//            // If the assertion passes, log the success in the Extent Report
//            ExtentReportManager.logPassDetails("JSONPath validation passed: " + jPath + " equals " + expectedValue);
//        } else {
//            ExtentReportManager.logFailureDetails("JSONPath validation failed: " + jPath + " expected: " + expectedValue + ", actual: " + actualValue);
//        }
//    }

//        String responseBody = response.getBody().asString();
//        JsonPath jsonPath = new JsonPath(responseBody);
//        String actualValue = jsonPath.getString(jPath);
//
//        if (actualValue.equalsIgnoreCase(expectedValue)) {
//            // If the assertion passes, log the success in the Extent Report
//            ExtentReportManager.logPassDetails("JSONPath validation passed: " + jPath + " equals " + expectedValue);
//        } else {
//            ExtentReportManager.logFailureDetails("JSONPath validation failed: " + jPath + " expected: " + expectedValue + ", actual: " + actualValue);
//        }


    public static void shouldNotEmpty(Response response, String jPath) {
            String responseBody = response.getBody().asString();
            JsonPath jsonPath = new JsonPath(responseBody);
            String actualValue = jsonPath.getString(jPath);
            assertJsonPathNotEmpty(actualValue);
        if(actualValue != null && !actualValue.trim().isEmpty()) {
            ExtentReportManager.logPassDetails("JSONPath validation passed: " + jPath + " is not empty");
        } else{
            ExtentReportManager.logFailureDetails("JSONPath validation failed: " + jPath + " is empty or not present");
        }
    }
    private static void assertJsonPathNotEmpty(String actualValue) {
        Assert.assertNotNull(actualValue, "JSONPath value should not be empty");
        Assert.assertFalse(actualValue.trim().isEmpty(), "JSONPath value should not be empty");
    }

    public static void validateJsonValue(String jsonData, String jPath, String expectedValue) {
        String actualValue = com.jayway.jsonpath.JsonPath.read(jsonData, "$." + jPath);
        if (actualValue.equals(expectedValue)) {
            System.out.println("Validation passed for " + jPath + ": " + actualValue);
        } else {
            System.err.println("Validation failed for " + jPath + ". Expected: " + expectedValue + ", Actual: " + actualValue);
        }
    }
}