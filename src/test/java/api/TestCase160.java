package api;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;

public class TestCase160 {

    @BeforeClass
    public void setup() {
        RestAssured.baseURI = ConfigReader.get("base.url");
    }

    @Test(description = "Check system response when data is empty")
    public void checkSystemResponseWhenDataIsEmpty() {
        String authToken = ConfigReader.get("auth.token");

        Response response = given()
                .header("Authorization", "Bearer " + authToken)
                .log().all()
                .when()
                .get("/users")
                .then()
                .log().all()
                .statusCode(200)
                .extract()
                .response();

        // Assertion: body-not-empty
        String responseBody = response.getBody().asString();
        Assert.assertNotNull(responseBody, "Response body is null");
        Assert.assertFalse(responseBody.trim().isEmpty(), "Response body is empty");
    }
}