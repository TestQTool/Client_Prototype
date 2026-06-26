package listeners;

import core.DriverFactory;
import io.qameta.allure.Attachment;
import org.openqa.selenium.WebDriver;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import utils.ReportUtils;
import utils.ScreenshotUtils;

public class AllureTestNgListener implements ITestListener {
    @Override
    public void onTestFailure(ITestResult result) {
        WebDriver driver = DriverFactory.getDriver();
        if (driver != null) {
            saveScreenshot(ScreenshotUtils.screenshotBytes(driver));
            ReportUtils.attachText("Failure", result.getThrowable() == null ? "Test failed" : result.getThrowable().toString());
        }
    }

    @Override
    public void onStart(ITestContext context) {
        ReportUtils.attachText("Suite", context.getSuite().getName());
    }

    @Attachment(value = "Failure screenshot", type = "image/png")
    private byte[] saveScreenshot(byte[] screenshot) {
        return screenshot;
    }
}
