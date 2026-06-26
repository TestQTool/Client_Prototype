package utils;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public final class WaitUtils {
    private WaitUtils() {}

    public static WebDriverWait wait(WebDriver driver) {
        return new WebDriverWait(driver, Duration.ofSeconds(ConfigReader.getInt("EXPLICIT_WAIT", 20)));
    }

    public static FluentWait<WebDriver> fluentWait(WebDriver driver, int timeoutSeconds, int pollingMillis) {
        return new FluentWait<>(driver)
                .withTimeout(Duration.ofSeconds(timeoutSeconds))
                .pollingEvery(Duration.ofMillis(pollingMillis))
                .ignoring(Exception.class);
    }

    public static WebElement visible(WebDriver driver, By locator) {
        return wait(driver).until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public static WebElement clickable(WebDriver driver, By locator) {
        return wait(driver).until(ExpectedConditions.elementToBeClickable(locator));
    }

    public static boolean invisible(WebDriver driver, By locator) {
        return wait(driver).until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    public static void pageLoaded(WebDriver driver) {
        wait(driver).until(webDriver -> "complete".equals(
                ((org.openqa.selenium.JavascriptExecutor) webDriver).executeScript("return document.readyState")));
    }
}
