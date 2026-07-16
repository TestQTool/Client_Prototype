package pageObjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class PIMPage {
    private WebDriver driver;
    private WebDriverWait wait;

    // Locators
    private By pimMenu = By.xpath("//span[text()='PIM']");
    private By addEmployeeMenu = By.xpath("//a[text()='Add Employee']");
    private By firstNameField = By.name("firstName");
    private By lastNameField = By.name("lastName");
    private By employeeIdField = By.xpath("//label[text()='Employee Id']/parent::div/following-sibling::div/input");
    private By saveButton = By.xpath("//button[@type='submit']");
    private By requiredFieldError = By.xpath("//span[contains(@class,'error-message') or text()='Required']");
    private By employeeListPage = By.xpath("//h6[contains(text(),'Personal Details')] | //h5[text()='Employee Information']");

    public PIMPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void navigateToPIM() {
        wait.until(ExpectedConditions.elementToBeClickable(pimMenu));
        driver.findElement(pimMenu).click();
    }

    public void clickAddEmployee() {
        wait.until(ExpectedConditions.elementToBeClickable(addEmployeeMenu));
        driver.findElement(addEmployeeMenu).click();
    }

    public void enterFirstName(String firstName) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(firstNameField));
        driver.findElement(firstNameField).clear();
        if (firstName != null && !firstName.isEmpty()) {
            driver.findElement(firstNameField).sendKeys(firstName);
        }
    }

    public void enterLastName(String lastName) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(lastNameField));
        driver.findElement(lastNameField).clear();
        driver.findElement(lastNameField).sendKeys(lastName);
    }

    public void enterEmployeeId(String employeeId) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(employeeIdField));
        WebElement empIdElement = driver.findElement(employeeIdField);
        empIdElement.clear();
        empIdElement.sendKeys(employeeId);
    }

    public void clickSaveButton() {
        wait.until(ExpectedConditions.elementToBeClickable(saveButton));
        driver.findElement(saveButton).click();
    }

    public boolean isRequiredFieldErrorDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(requiredFieldError));
            return driver.findElements(requiredFieldError).size() > 0;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isEmployeeListOrDetailsDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(employeeListPage));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getFirstNameValue() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(firstNameField));
        return driver.findElement(firstNameField).getAttribute("value");
    }

    public boolean isScriptExecuted() {
        // Check if any alert is present (XSS would trigger alert)
        try {
            driver.switchTo().alert();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}