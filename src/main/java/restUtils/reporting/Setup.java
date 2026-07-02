package restUtils.reporting;

import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

public class Setup implements ITestListener {
    private static final ThreadLocal<Integer> STATUS_CODE = new ThreadLocal<>();
    private static final ThreadLocal<String> BODY = new ThreadLocal<>();
    private static final ThreadLocal<String> HEADERS = new ThreadLocal<>();

    public static void setStatusCode(int statusCode) {
        STATUS_CODE.set(statusCode);
    }

    public static void setBody(String body) {
        BODY.set(body);
    }

    public static void setHeaders(String headers) {
        HEADERS.set(headers);
    }

    @Override
    public void onTestStart(ITestResult result) {
        STATUS_CODE.remove();
        BODY.remove();
        HEADERS.remove();
    }

    @Override
    public void onFinish(ITestContext context) {
        STATUS_CODE.remove();
        BODY.remove();
        HEADERS.remove();
    }

    public static Integer statusCode() {
        return STATUS_CODE.get();
    }

    public static String body() {
        return BODY.get();
    }

    public static String headers() {
        return HEADERS.get();
    }
}
