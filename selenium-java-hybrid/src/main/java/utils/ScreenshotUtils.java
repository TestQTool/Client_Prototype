package utils;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public final class ScreenshotUtils {
    private ScreenshotUtils() {}

    public static Path takeScreenshot(WebDriver driver, String name) {
        try {
            Path dir = Path.of("Reports", "screenshots");
            Files.createDirectories(dir);
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss_SSS"));
            Path target = dir.resolve(safeName(name) + "_" + timestamp + ".png");
            byte[] bytes = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
            Files.write(target, bytes);
            return target;
        } catch (Exception ex) {
            throw new RuntimeException("Unable to capture screenshot", ex);
        }
    }

    public static byte[] screenshotBytes(WebDriver driver) {
        return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
    }

    private static String safeName(String name) {
        String value = name == null || name.isBlank() ? "screenshot" : name;
        return value.replaceAll("[^a-zA-Z0-9._-]", "_");
    }
}
