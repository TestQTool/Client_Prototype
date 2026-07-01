package restUtils.reporting;

import com.opencsv.CSVWriter;
import org.testng.ITestListener;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class CSVReportGenerator implements ITestListener {

    public static void generateCSVReport(List<TestResult> results, String reportPath) {
        try (CSVWriter writer = new CSVWriter(new FileWriter(reportPath))) {
            String[] header = {"Test Name", "Status", "Time","StatusCode"};
            writer.writeNext(header);

            for (TestResult result : results) {
                String[] data = {result.getTestName(), String.valueOf(result.getStatus()), String.valueOf(result.getResponseTime()), String.valueOf(result.getStatusCode())};
                writer.writeNext(data);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Define a class to store test results (e.g., test name and status)
    public static class TestResult {

        private String testName;
        private String status;
        private long responseTime;
        private int statusCode;

        public TestResult(String testName, String status, long responseTIME,int statusCode) {
            this.testName = testName;
            this.status = status;
            this.responseTime = responseTIME;
            this.statusCode=statusCode;
        }

        public TestResult(String testName, long responseTIME) {
            this.testName = testName;

            this.responseTime = responseTIME;
        }
        public String getTestName() {
            return testName;
        }

        public String getStatus() {
            return status;
        }
        public long getResponseTime(){return responseTime;}
        public int getStatusCode(){return statusCode;}
    }
}
