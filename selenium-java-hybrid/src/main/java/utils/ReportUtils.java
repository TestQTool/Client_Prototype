package utils;

import io.qameta.allure.Allure;
import org.openqa.selenium.WebDriver;

import java.io.ByteArrayInputStream;
import java.nio.file.Files;
import java.nio.file.Path;

public final class ReportUtils {
    private ReportUtils() {}

    public static void attachText(String name, String content) {
        Allure.addAttachment(name, "text/plain", content == null ? "" : content);
    }

    public static void attachJson(String name, String json) {
        Allure.addAttachment(name, "application/json", json == null ? "{}" : json);
    }

    public static void attachScreenshot(WebDriver driver, String name) {
        Allure.addAttachment(name, "image/png", new ByteArrayInputStream(ScreenshotUtils.screenshotBytes(driver)), ".png");
    }

    public static void attachFile(String name, Path file) {
        try {
            Allure.addAttachment(name, Files.probeContentType(file), Files.newInputStream(file), file.getFileName().toString());
        } catch (Exception ex) {
            attachText(name + " attachment error", ex.getMessage());
        }
    }
}
