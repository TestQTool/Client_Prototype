package restUtils;

import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

import java.util.Map;

import static io.restassured.RestAssured.given;

public final class RestUtils {
    private RestUtils() {
    }

    public static RequestSpecification request() {
        return given();
    }

    public static RequestSpecification withHeaders(RequestSpecification request, Map<String, String> headers) {
        if (headers == null || headers.isEmpty()) {
            return request;
        }
        return request.headers(headers);
    }

    public static Response execute(RequestSpecification request, String method, String path) {
        String normalizedMethod = method == null ? "GET" : method.trim().toUpperCase();
        return switch (normalizedMethod) {
            case "POST" -> request.when().post(path);
            case "PUT" -> request.when().put(path);
            case "PATCH" -> request.when().patch(path);
            case "DELETE" -> request.when().delete(path);
            default -> request.when().get(path);
        };
    }
}
