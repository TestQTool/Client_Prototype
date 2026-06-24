package tests.team_qentrix.backend.login;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import restUtils.reporting.Setup;

import tests.team_qentrix.backend.QentrixConfig;
import tests.team_qentrix.backend.QentrixReport;
import tests.team_qentrix.backend.QentrixTestData;

import static io.restassured.RestAssured.given;

@Listeners(Setup.class)
public class VerifyThatRegistrationAPIEndpointAcceptsValidPOST_Api1417Test {

    @Test(description = "Verify that registration API endpoint accepts valid POST request with email and password")
    public void verifyThatRegistrationAPIEndpointAcceptsValidPOSTRequestWithEmailAndPassword() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        Response response = given()
                .headers(QentrixConfig.authHeaders())
        .when()
                .post("/user");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 202, "Unexpected response status code");
        Assert.assertFalse(response.getBody().asString().isBlank(), "Response body should not be empty");
    }
}
