package tests.qm_testing.qentrix.login;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import restUtils.reporting.Setup;

import tests.qm_testing.qentrix.QentrixConfig;
import tests.qm_testing.qentrix.QentrixReport;
import tests.qm_testing.qentrix.QentrixTestData;

import static io.restassured.RestAssured.given;

@Listeners(Setup.class)
public class VerifyThatLoginAPIReturnsErrorUsernameMissing_Api1231Test {

    @Test(description = "Verify that login API returns error when username is missing in request")
    public void verifyThatLoginAPIReturnsErrorWhenUsernameIsMissingInRequest() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        RequestSpecification request = QentrixConfig.applyAuth(given())
                .headers(QentrixConfig.authHeaders())
                .queryParams(QentrixConfig.authQueryParams())
                ;

        Response response = request.when()
                .get("/users");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 201, "Unexpected response status code");
        Assert.assertFalse(response.getBody().asString().isBlank(), "Response body should not be empty");
    }
}
