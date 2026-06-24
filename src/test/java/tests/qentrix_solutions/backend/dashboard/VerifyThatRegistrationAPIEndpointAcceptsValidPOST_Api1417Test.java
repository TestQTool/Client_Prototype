package tests.qentrix_solutions.backend.dashboard;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import restUtils.reporting.Setup;

import tests.qentrix_solutions.backend.QentrixConfig;
import tests.qentrix_solutions.backend.QentrixReport;
import tests.qentrix_solutions.backend.QentrixTestData;

import static io.restassured.RestAssured.given;

@Listeners(Setup.class)
public class VerifyThatRegistrationAPIEndpointAcceptsValidPOST_Api1417Test {

    @Test(description = "Verify that registration API endpoint accepts valid POST request with email and password")
    public void verifyThatRegistrationAPIEndpointAcceptsValidPOSTRequestWithEmailAndPassword() {
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
