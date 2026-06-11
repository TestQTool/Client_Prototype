package restUtils.reporting;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.opencsv.CSVWriter;
import org.testng.*;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Test;

import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.*;



public class Setup implements ITestListener {
//    CreateAirline createAirline = new CreateAirline();

    public static List<CSVReportGenerator.TestResult> testResults = new ArrayList<>();
    public static ExtentReports extentReports;
    public static ThreadLocal<ExtentTest> extentTest = new ThreadLocal<>();


    public static String name = "Bhavya";
    long startTime;
    static  String fileName;
    public static ArrayList<String> passedTests = new ArrayList<String>();
    public static ArrayList<String> failedTests = new ArrayList<String>();
    public static ArrayList<String> totalTestCases = new ArrayList<String>();
    public static ArrayList<String> skippedTestCases = new ArrayList<String>();
    private static ThreadLocal<Integer> statusCode = new ThreadLocal<>();
    private static ThreadLocal<String>  responseBody = new ThreadLocal<>();
    private static ThreadLocal<String>  responseHeaders = new ThreadLocal<>();
    private static final String CSV_FILE = "test-results.csv";
    private CSVWriter csvWriter;

    private void writeResult(String testName, String responseHeaders , long responseTime, String StatusCode,String body,String status,String Exceptions) {
        String[] data = {testName, responseHeaders, String.valueOf(responseTime),StatusCode,body,status,Exceptions};
        csvWriter.writeNext(data);
    }

    private long getResponseTime(ITestResult result) {

        long endTime = System.currentTimeMillis();
        return endTime - startTime;}
    public void onStart(ITestContext contex){
        fileName = ExtentReportManager.getReportNameWithTimeStamp();
        String fullReportPath = System.getProperty("user.dir") + "\\reports\\" + fileName;
        extentReports = ExtentReportManager.createInstance(fullReportPath, "Test API Automation Report", "Test Execution Report");

        if (csvWriter == null) {
            try {
                csvWriter = new CSVWriter(new FileWriter(CSV_FILE));
                String[] ExcelHeader = {"Test Name", "Headers", "Response Time (ms)", "StatusCode", "ResponseBody", "Status", "Exceptions"};
                csvWriter.writeNext(ExcelHeader);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    public void onFinish(ITestContext context) {
        if (extentReports != null)
            extentReports.flush();

        if (csvWriter != null) {
            try {
                csvWriter.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        try {
//            sendEmail_outlook.sendReportByOutlook();
            System.out.println("not sending EMail not configured");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void onTestStart(ITestResult result) {
        totalTestCases.add(result.getMethod().getMethodName());
        startTime = System.currentTimeMillis();

        if (result.getMethod().getMethodName() == "createAirlineAndVerify")
            return;
        ExtentTest test = extentReports.createTest("Test Name:- " + result.getTestClass().getName() + " -" + result.getMethod().getMethodName(),"description : "+result.getMethod().getDescription());
        extentTest.set(test);

        startTime = System.currentTimeMillis();
        if (csvWriter == null) {
            try {
                csvWriter = new CSVWriter(new FileWriter(CSV_FILE));
                String[] ExcelHeader = {"Test Name", "Headers", "Response Time (ms)","StatusCode","ResponseBody","Status","Exceptions"};
                csvWriter.writeNext(ExcelHeader);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        }

    public void onTestSuccess(ITestResult result) {
        passedTests.add(result.getMethod().getMethodName());
        result.setAttribute("testResult", "Pass");
        writeResult(result.getName(), getHeaders(), getResponseTime(result),String.valueOf(getStatusCode()),getBody(),"Pass","");
    }

    public void onTestFailure(ITestResult result) {
        failedTests.add(result.getMethod().getMethodName());
        ExtentReportManager.logFailureDetails(result.getThrowable().getMessage());
        String stackTrace = Arrays.toString(result.getThrowable().getStackTrace());
        stackTrace = stackTrace.replace(",", "<br>");
        String formattedTrace = "<details>\n" +
                "  <summary>Click here to see exception logs</summary>\n" +
                " " + stackTrace + "\n" +
                "</details>";
        ExtentReportManager.logExceptionDetails(formattedTrace);
        result.setAttribute("testResult", "Fail");
    }
    public void onTestSkipped(ITestResult result) {
        failedTests.add(result.getMethod().getMethodName());
        ExtentReportManager.logSkipDetails("This test step is skipped for a specific reason.");
        String stackTrace = Arrays.toString(result.getThrowable().getStackTrace());
        writeResult(result.getName(), getHeaders(),
                getResponseTime(result),String.valueOf(getStatusCode()),getBody(),"Skipped",stackTrace);

    }
    public static void setStatusCode(int code) {
        statusCode.set(code);
    }

    public static int getStatusCode() {
        return statusCode.get();
    }

    public static void setBody(String Body){
        responseBody.set(Body);
    }

    public static String getBody() {
        return responseBody.get();
    }

    public static void setHeaders(String Headers){
        responseHeaders.set(Headers);
    }

    public static String getHeaders() {
        return responseHeaders.get();
    }
    }
