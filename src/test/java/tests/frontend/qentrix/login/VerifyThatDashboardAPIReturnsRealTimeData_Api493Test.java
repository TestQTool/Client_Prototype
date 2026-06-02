package tests.frontend.qentrix.login;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import restUtils.reporting.Setup;

import tests.frontend.qentrix.QentrixConfig;
import tests.frontend.qentrix.QentrixReport;
import tests.frontend.qentrix.QentrixTestData;

import static io.restassured.RestAssured.given;

@Listeners(Setup.class)
public class VerifyThatDashboardAPIReturnsRealTimeData_Api493Test {

    @Test(description = "Verify that dashboard API returns real-time data with correct response code")
    public void verifyThatDashboardAPIReturnsRealTimeDataWithCorrectResponseCode() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        Response response = given()
                .headers(QentrixConfig.authHeaders())
        .when()
                .post("/user");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 200, "Unexpected response status code");
        Assert.assertEquals(String.valueOf(response.jsonPath().get("id")), "", "Unexpected JSON value for id");
    }
}
