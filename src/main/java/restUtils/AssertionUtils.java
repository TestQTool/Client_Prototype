package restUtils;

import io.restassured.response.Response;
import org.testng.Assert;

public final class AssertionUtils {
    private AssertionUtils() {
    }

    public static void assertStatusCode(Response response, int expectedStatusCode) {
        Assert.assertEquals(response.getStatusCode(), expectedStatusCode, "Unexpected response status code");
    }

    public static void assertBodyNotEmpty(Response response) {
        Assert.assertFalse(response.getBody().asString().isBlank(), "Response body should not be empty");
    }

    public static void assertJsonPathExists(Response response, String path) {
        Assert.assertNotNull(response.jsonPath().get(path), "Expected JSON path to exist: " + path);
    }
}
