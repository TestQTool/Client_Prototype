package pageObjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

/**
 * Page Object for Dashboard Page
 * Project: 360GlobalNet
 */
public class DashboardPage {
    private WebDriver driver;
    private WebDriverWait wait;

    // Locators
    private By dashboardHeader = By.xpath("//h6[contains(text(),'Dashboard')]");
    private By dashboardContainer = By.className("oxd-topbar-header-breadcrumb");

    public DashboardPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public boolean isDashboardDisplayed() {
        try {
            WebElement dashboard = wait.until(ExpectedConditions.visibilityOfElementLocated(dashboardHeader));
            return dashboard.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getDashboardHeaderText() {
        WebElement header = wait.until(ExpectedConditions.visibilityOfElementLocated(dashboardHeader));
        return header.getText();
    }
}