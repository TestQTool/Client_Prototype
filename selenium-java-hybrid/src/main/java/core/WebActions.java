package core;

import org.assertj.core.api.Assertions;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class WebActions {
    protected final WebDriver driver;
    protected final WebDriverWait wait;
    public WebActions(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }
    public void open(String url) { driver.get(url); }
    public void click(By locator) { wait.until(ExpectedConditions.elementToBeClickable(locator)).click(); }
    public void type(By locator, String value) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        element.clear();
        element.sendKeys(value);
    }
    public String text(By locator) { return wait.until(ExpectedConditions.visibilityOfElementLocated(locator)).getText().trim(); }
    public void assertVisible(By locator) { Assertions.assertThat(driver.findElement(locator).isDisplayed()).isTrue(); }
}
