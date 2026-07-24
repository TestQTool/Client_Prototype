package restUtils;

import java.util.Map;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import io.restassured.specification.QueryableRequestSpecification;
import io.restassured.specification.RequestSpecification;
import io.restassured.specification.SpecificationQuerier;
import restUtils.reporting.ExtentReportManager;

public class RestUtils {

    private static RequestSpecification getRequestSpecification(String endpoint, Object requestPayload, Map<String, String> headers) {
        return RestAssured.given()
                .baseUri(endpoint)
                .headers(headers)
                .contentType(ContentType.JSON)
                .body(requestPayload);
    }

    private static RequestSpecification getRequestSpecification(String endpoint, Map<String, String> headers) {
        return RestAssured.given()
                .baseUri(endpoint)
                .headers(headers)
                .contentType(ContentType.JSON);
    }

    private static RequestSpecification getRequestSpecification(String endpoint, String requestPayload, Map<String, String> headers) {
        return RestAssured.given()
                .baseUri(endpoint)
                .headers(headers)
                .contentType(ContentType.JSON)
                .body(requestPayload);
    }

    private static void printRequestLogInReport(RequestSpecification requestSpecification) {
        QueryableRequestSpecification queryableRequestSpecification = SpecificationQuerier.query(requestSpecification);
        ExtentReportManager.logInfoDetails("Endpoint is " + queryableRequestSpecification.getBaseUri());
        ExtentReportManager.logInfoDetails("Method is " + queryableRequestSpecification.getMethod());
        ExtentReportManager.logInfoDetails("Headers are ");
        ExtentReportManager.logHeaders(queryableRequestSpecification.getHeaders().asList());
        ExtentReportManager.logInfoDetails("Request body is ");
        if (!queryableRequestSpecification.getMethod().equalsIgnoreCase("GET")) {
            ExtentReportManager.logInfoDetails("Request body is ");
            ExtentReportManager.logJson(queryableRequestSpecification.getBody());
        }
    }
    private static void printRequestLogInConsole(RequestSpecification requestSpecification) {
        QueryableRequestSpecification queryableRequestSpecification = SpecificationQuerier.query(requestSpecification);
        System.out.println("Endpoint is " + queryableRequestSpecification.getBaseUri());
        System.out.println("Method is " + queryableRequestSpecification.getMethod());
        System.out.println("Headers are ");
        System.out.println(queryableRequestSpecification.getHeaders().asList());
        System.out.println("Request body is ");
//        if (!queryableRequestSpecification.getMethod().equalsIgnoreCase("GET")) {
//            System.out.println("Request body is ");
//            System.out.println(String.valueOf(queryableRequestSpecification.getBody()));
        }


    private static void printResponseLogInReport(Response response) {
        ExtentReportManager.logInfoDetails("Response status is " + response.getStatusCode());
        ExtentReportManager.logInfoDetails("Response Headers are ");
        ExtentReportManager.logHeaders(response.getHeaders().asList());
        ExtentReportManager.logInfoDetails("Response body is ");
        ExtentReportManager.logJson(response.getBody().prettyPrint());
    }
    private static void printResponseLogInConsole(Response response) {
        System.out.println("Response status is " + response.getStatusCode());
        System.out.println("Response Headers are ");
        System.out.println(response.getHeaders().asList());
        System.out.println("Response body is ");
        System.out.println(response.getBody().prettyPrint());
    }

    public static Response performPost(String endpoint, String requestPayload, Map<String, String> headers) {
        RequestSpecification requestSpecification = getRequestSpecification(endpoint, requestPayload, headers);
        Response response = requestSpecification.post();
        printRequestLogInReport(requestSpecification);
        printResponseLogInReport(response);
        printRequestLogInConsole(requestSpecification);
        printResponseLogInReport(response);
        return response;
    }

    public static Response performPost(String endpoint, Map<String, Object> requestPayload, Map<String, String> headers) {
        RequestSpecification requestSpecification = getRequestSpecification(endpoint, requestPayload, headers);
        Response response = requestSpecification.post();
        printRequestLogInReport(requestSpecification);
        printResponseLogInReport(response);
        return response;
    }

    public static Response performPost(String endpoint, Object requestPayloadAsPojo, Map<String, String> headers) {
        RequestSpecification requestSpecification = getRequestSpecification(endpoint, requestPayloadAsPojo, headers);
        Response response = requestSpecification.post();
        printRequestLogInReport(requestSpecification);
        printResponseLogInReport(response);
        return response;
    }

    public static Response performGet(String endpoint, Map<String, String> headers) {
        RequestSpecification requestSpecification = getRequestSpecification(endpoint, null, headers);
        Response response = requestSpecification.get();
        printRequestLogInReport(requestSpecification);
        printResponseLogInReport(response);
        return response;
    }

    public static Response performPut(String endpoint, Object requestPayloadAsPojo, Map<String, String> headers, String id) {
        // Append the extracted 'id' to the endpoint
        String endpointWithId = endpoint + "/" + id;
        RequestSpecification requestSpecification = getRequestSpecification(endpointWithId, requestPayloadAsPojo, headers);
        Response response = requestSpecification.put();
        printRequestLogInReport(requestSpecification);
        printResponseLogInReport(response);
        return response;
    }

    public static Response performDelete(String endpoint, Map<String, String> headers) {
        RequestSpecification requestSpecification = getRequestSpecification(endpoint, null, headers);
        Response response = requestSpecification.delete();
        printRequestLogInReport(requestSpecification);
        printResponseLogInReport(response);
        return response;
    }

    public static String performPostAndGetId(String endpoint, Object requestPayload, Map<String, String> headers, String jsonPath) {
        RequestSpecification requestSpecification = getRequestSpecification(endpoint, requestPayload, headers);
        Response response = requestSpecification.post();
        printRequestLogInReport(requestSpecification);
        printResponseLogInReport(response);

        // Assuming the response contains the 'id' field as a JSON attribute
        String id = response.jsonPath().getString(jsonPath);

        return id;
    }

    public static Response performGetWithId(String endpoint, String id, Map<String, String> headers) {
        // Append the extracted 'id' to the endpoint
        String endpointWithId = endpoint + "/" + id;
        System.out.println(endpointWithId);
        RequestSpecification requestSpecification = getRequestSpecification(endpointWithId, headers);
        Response response = requestSpecification.get();
        printRequestLogInReport(requestSpecification);
        printResponseLogInReport(response);
        return response;
    }

    public static Response performGetWithIdPathParams(String endpoint, String id, Map<String, String> headers) {
        // Append the extracted 'id' to the endpoint
        String endpointWithId = endpoint + "?" + id;
        RequestSpecification requestSpecification = getRequestSpecification(endpointWithId, headers);
        Response response = requestSpecification.get();
        printRequestLogInReport(requestSpecification);
        printResponseLogInReport(response);
        return response;
    }

}
