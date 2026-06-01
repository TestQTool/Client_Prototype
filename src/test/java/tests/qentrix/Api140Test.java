package tests.qentrix;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import restUtils.reporting.Setup;

import static io.restassured.RestAssured.given;

@Listeners(Setup.class)
public class Api140Test {

    @Test(description = "Verify API Response For AI Generated Title and Summary for General FeedBack Request")
    public void verifyAPIResponseForAIGeneratedTitleAndSummaryForGeneralFeedBackRequest() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        Response response = given()
                .headers(QentrixConfig.authHeaders())
        .when()
                .post("/ai/Title/summary/feedback");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 200, "Unexpected response status code");
        Assert.assertNotNull(response.jsonPath().get("id"), "Expected JSON path to exist: id");
    }
}
