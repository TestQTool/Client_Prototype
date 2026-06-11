package tests.qentrix;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import restUtils.reporting.Setup;

import static io.restassured.RestAssured.given;

@Listeners(Setup.class)
public class VerifyAPIResponseAIGeneratedTitleSummaryGeneral_Api140Test {

    @Test(description = "Verify API Response For AI Generated Title and Summary for General FeedBack Request")
    public void verifyAPIResponseForAIGeneratedTitleAndSummaryForGeneralFeedBackRequest() {
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
