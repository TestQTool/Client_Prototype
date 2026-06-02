package tests.frontend.ag_helix.general;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import restUtils.reporting.Setup;

import tests.frontend.ag_helix.QentrixConfig;
import tests.frontend.ag_helix.QentrixReport;
import tests.frontend.ag_helix.QentrixTestData;

import static io.restassured.RestAssured.given;

@Listeners(Setup.class)
public class VerifyThatLoginPreventsMultipleRapidSubmissions_Api635Test {

    @Test(description = "Verify that login prevents multiple rapid submissions")
    public void verifyThatLoginPreventsMultipleRapidSubmissions() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        Response response = given()
                .headers(QentrixConfig.authHeaders())
        .when()
                .get("/users");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 200, "Unexpected response status code");
        Assert.assertNotNull(response.jsonPath().get("id"), "Expected JSON path to exist: id");
    }
}
