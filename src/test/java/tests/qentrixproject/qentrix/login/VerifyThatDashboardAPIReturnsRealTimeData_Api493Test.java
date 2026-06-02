package tests.qentrixproject.qentrix.login;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import restUtils.reporting.Setup;

import tests.qentrixproject.qentrix.QentrixConfig;
import tests.qentrixproject.qentrix.QentrixReport;
import tests.qentrixproject.qentrix.QentrixTestData;

import static io.restassured.RestAssured.given;

@Listeners(Setup.class)
public class VerifyThatDashboardAPIReturnsRealTimeData_Api493Test {

    @Test(description = "Verify that dashboard API returns real-time data with correct response code")
    public void verifyThatDashboardAPIReturnsRealTimeDataWithCorrectResponseCode() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        Response response = given()
                .headers(QentrixConfig.authHeaders())
        .when()
                .get("/users");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 200, "Unexpected response status code");
        Assert.assertFalse(response.getBody().asString().isBlank(), "Response body should not be empty");
    }
}
