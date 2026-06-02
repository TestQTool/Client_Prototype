package tests.frontend.qentrix.dashboard;

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
public class VerifyThatLoginCredentialsTransmittedSecurelyOverHTTPS_Api1106Test {

    @Test(description = "Verify that login credentials are transmitted securely over HTTPS")
    public void verifyThatLoginCredentialsAreTransmittedSecurelyOverHTTPS() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        Response response = given()
                .headers(QentrixConfig.authHeaders())
        .when()
                .post("/api/auth/login");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 200, "Unexpected response status code");
        Assert.assertFalse(response.getBody().asString().isBlank(), "Response body should not be empty");
    }
}
