package core;

import org.assertj.core.api.Assertions;
import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Select;
import utils.WaitUtils;

public class WebActions {
    protected final WebDriver driver;

    public WebActions(WebDriver driver) {
        this.driver = driver;
    }

    public void open(String url) {
        driver.get(url);
        WaitUtils.pageLoaded(driver);
    }

    public void click(By locator) {
        WaitUtils.clickable(driver, locator).click();
    }

    public void type(By locator, String value) {
        WebElement element = WaitUtils.visible(driver, locator);
        element.clear();
        element.sendKeys(value == null ? "" : value);
    }

    public void clear(By locator) {
        WaitUtils.visible(driver, locator).clear();
    }

    public String text(By locator) {
        return WaitUtils.visible(driver, locator).getText().trim();
    }

    public String attribute(By locator, String attributeName) {
        return WaitUtils.visible(driver, locator).getAttribute(attributeName);
    }

    public boolean isDisplayed(By locator) {
        try {
            return WaitUtils.visible(driver, locator).isDisplayed();
        } catch (Exception ignored) {
            return false;
        }
    }

    public void selectByVisibleText(By locator, String text) {
        new Select(WaitUtils.visible(driver, locator)).selectByVisibleText(text);
    }

    public void selectByValue(By locator, String value) {
        new Select(WaitUtils.visible(driver, locator)).selectByValue(value);
    }

    public void hover(By locator) {
        new Actions(driver).moveToElement(WaitUtils.visible(driver, locator)).perform();
    }

    public void scrollIntoView(By locator) {
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({block:'center'});", WaitUtils.visible(driver, locator));
    }

    public void jsClick(By locator) {
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", WaitUtils.visible(driver, locator));
    }

    public void assertVisible(By locator) {
        Assertions.assertThat(isDisplayed(locator)).isTrue();
    }

    public void assertTextContains(By locator, String expected) {
        Assertions.assertThat(text(locator)).contains(expected);
    }
}
