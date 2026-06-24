package tests.team_qentrix.qentrix.billing;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import restUtils.reporting.Setup;

import tests.team_qentrix.qentrix.QentrixConfig;
import tests.team_qentrix.qentrix.QentrixReport;
import tests.team_qentrix.qentrix.QentrixTestData;

import static io.restassured.RestAssured.given;

@Listeners(Setup.class)
public class VerifyThatLoginAPIReturnsSuccessResponseValid_Api1229Test {

    @Test(description = "Verify that login API returns success response with valid credentials")
    public void verifyThatLoginAPIReturnsSuccessResponseWithValidCredentials() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        Response response = given()
                .headers(QentrixConfig.authHeaders())
        .when()
                .post("/user");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 200, "Unexpected response status code");
        Assert.assertNotNull(response.jsonPath().get("id"), "Expected JSON path to exist: id");
    }
}
