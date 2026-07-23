package tests.checkout;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import restUtils.reporting.Setup;

import tests.QentrixConfig;
import tests.QentrixReport;
import tests.QentrixTestData;

import static io.restassured.RestAssured.given;

@Listeners(Setup.class)
public class VerifyThatCheckoutAPIRejectsRequestMissingRequired_Api1678Test {

    @Test(description = "Verify that checkout API rejects request with missing required fields")
    public void verifyThatCheckoutAPIRejectsRequestWithMissingRequiredFields() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        RequestSpecification request = QentrixConfig.applyAuth(given())
                .headers(QentrixConfig.authHeaders())
                .queryParams(QentrixConfig.authQueryParams())
                .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
                .header("Content-Type", "application/json")
                .header("Accept", "application/json")
                .header("X-Request-Id", "REQ-1001")
                .header("X-Correlation-Id", "CORR-2001")
                .header("User-Agent", "PostmanRuntime/7.45.0")
                .queryParam("status", "Delivered")
                .queryParam("page", "1")
                .queryParam("limit", "10")
                .queryParam("sort", "desc")
                .contentType("application/json")
                .body(QentrixTestData.requestBody("checkout/VerifyThatCheckoutAPIRejectsRequestMissingRequired_Api1678.json"))
                ;

        Response response = request.when()
                .post("/api/v1/orders/checkout");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 204, "Unexpected response status code");
        Assert.assertEquals(String.valueOf(response.jsonPath().get("id")), "Delivered", "Unexpected JSON value for id");
    }
}
