package tests.qm_testing.qentrix.login;

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
public class VerifyThatLoginAPIReturnsSuccessResponseValid_Api1229Test {

    @Test(description = "Verify that login API returns success response with valid credentials")
    public void verifyThatLoginAPIReturnsSuccessResponseWithValidCredentials() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        RequestSpecification request = QentrixConfig.applyAuth(given())
                .headers(QentrixConfig.authHeaders())
                .queryParams(QentrixConfig.authQueryParams())
                ;

        Response response = request.when()
                .get("/users");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 201, "Unexpected response status code");
        Assert.assertNotNull(response.jsonPath().get("id"), "Expected JSON path to exist: id");
    }
}
