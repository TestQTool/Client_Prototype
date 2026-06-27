package com.automation.base;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

/**
 * BasePage — Shared wait and action methods for all page classes
 * NextGenAI: This class is framework-level. Do NOT modify for client-specific logic.
 */
public class BasePage {

    protected WebDriver driver;
    protected WebDriverWait wait;
    private static final int DEFAULT_TIMEOUT = 10;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_TIMEOUT));
    }

    // ── Wait methods ──────────────────────────────────────────────────────────

    protected void waitForPageLoad() {
        wait.until(webDriver -> 
            ((org.openqa.selenium.JavascriptExecutor) webDriver)
                .executeScript("return document.readyState").equals("complete")
        );
    }

    protected void waitForElementVisible(By locator) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    protected void waitForElementClickable(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    protected void waitForElementInvisible(By locator) {
        wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    // ── Visibility checks ─────────────────────────────────────────────────────

    protected boolean isElementVisible(By locator) {
        try {
            return driver.findElement(locator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    protected boolean isElementPresent(By locator) {
        try {
            driver.findElement(locator);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // ── Action methods ────────────────────────────────────────────────────────

    protected void clickElement(By locator) {
        waitForElementClickable(locator);
        driver.findElement(locator).click();
    }

    protected void enterText(By locator, String text) {
        waitForElementVisible(locator);
        WebElement element = driver.findElement(locator);
        element.clear();
        element.sendKeys(text);
    }

    protected String getText(By locator) {
        waitForElementVisible(locator);
        return driver.findElement(locator).getText();
    }

    protected List<WebElement> getElements(By locator) {
        return driver.findElements(locator);
    }

    protected String getAttribute(By locator, String attribute) {
        waitForElementVisible(locator);
        return driver.findElement(locator).getAttribute(attribute);
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    protected void navigateTo(String url) {
        driver.get(url);
        waitForPageLoad();
    }

    protected String getCurrentUrl() {
        return driver.getCurrentUrl();
    }

    protected String getPageTitle() {
        return driver.getTitle();
    }
}