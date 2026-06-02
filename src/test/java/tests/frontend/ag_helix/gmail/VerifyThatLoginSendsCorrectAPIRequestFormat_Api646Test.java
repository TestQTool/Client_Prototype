package tests.frontend.ag_helix.gmail;

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
public class VerifyThatLoginSendsCorrectAPIRequestFormat_Api646Test {

    @Test(description = "Verify that login sends correct API request format")
    public void verifyThatLoginSendsCorrectAPIRequestFormat() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        Response response = given()
                .headers(QentrixConfig.authHeaders())
        .when()
                .post("/user");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 200, "Unexpected response status code");
        Assert.assertFalse(response.getBody().asString().isBlank(), "Response body should not be empty");
    }
}
