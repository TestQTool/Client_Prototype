package tests.frontend_quality_engineering.ag_helix.login;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import restUtils.reporting.Setup;

import tests.frontend_quality_engineering.ag_helix.QentrixConfig;
import tests.frontend_quality_engineering.ag_helix.QentrixReport;
import tests.frontend_quality_engineering.ag_helix.QentrixTestData;

import static io.restassured.RestAssured.given;

@Listeners(Setup.class)
public class VerifyThatUserDataAPIReturnsCompleteUser_Api603Test {

    @Test(description = "Verify that user data API returns complete user information")
    public void verifyThatUserDataAPIReturnsCompleteUserInformation() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        Response response = given()
                .headers(QentrixConfig.authHeaders())
                .contentType("application/json")
                .body(QentrixTestData.requestBody("login/VerifyThatUserDataAPIReturnsCompleteUser_Api603.json"))
        .when()
                .post("/web/index.php/auth/login");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 200, "Unexpected response status code");
        Assert.assertFalse(response.getBody().asString().isBlank(), "Response body should not be empty");
    }
}
