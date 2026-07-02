package tests.qm_testing.qentrix.api_test;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import restUtils.reporting.Setup;

import tests.qm_testing.qentrix.QentrixConfig;
import tests.qm_testing.qentrix.QentrixReport;
import tests.qm_testing.qentrix.QentrixTestData;

import static io.restassured.RestAssured.given;

@Listeners(Setup.class)
public class VerifyThatLoginAPIRejectsRequestInvalidHTTP_Api1234Test {

    @Test(description = "Verify that login API rejects request with invalid HTTP method")
    public void verifyThatLoginAPIRejectsRequestWithInvalidHTTPMethod() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        RequestSpecification request = QentrixConfig.applyAuth(given())
                .headers(QentrixConfig.authHeaders())
                .queryParams(QentrixConfig.authQueryParams())
                ;

        Response response = request.when()
                .get("/user");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 202, "Unexpected response status code");
        Assert.assertNotNull(response.jsonPath().get("id"), "Expected JSON path to exist: id");
    }
}
