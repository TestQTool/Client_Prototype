package tests.super_admin_organization.orangehrm.login;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import restUtils.reporting.Setup;

import tests.super_admin_organization.orangehrm.QentrixConfig;
import tests.super_admin_organization.orangehrm.QentrixReport;
import tests.super_admin_organization.orangehrm.QentrixTestData;

import static io.restassured.RestAssured.given;

@Listeners(Setup.class)
public class VerifyThatAPIReturnsListApplicationConfigurationsAuthenticated_SCRUM_T1446Test {

    @Test(description = "Verify that API returns list of application configurations for authenticated admin user")
    public void verifyThatAPIReturnsListOfApplicationConfigurationsForAuthenticatedAdminUser() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        Response response = given()
                .headers(QentrixConfig.authHeaders())
                .contentType("application/json")
                .body(QentrixTestData.requestBody("login/VerifyThatAPIReturnsListApplicationConfigurationsAuthenticated_SCRUM_T1446.json"))
        .when()
                .post("/api/login");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 200, "Unexpected response status code");
        Assert.assertFalse(response.getBody().asString().isBlank(), "Response body should not be empty");
    }
}
