package com.qentrix.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import java.time.Duration;
import java.util.List;

public class LeavePage {
    private WebDriver driver;
    private WebDriverWait wait;

    @FindBy(xpath = "//span[text()='Leave']")
    private WebElement leaveMenu;

    @FindBy(xpath = "//a[text()='Apply']")
    private WebElement applyLeaveLink;

    @FindBy(xpath = "//label[text()='Leave Type']/parent::div/following-sibling::div//div[@class='oxd-select-text-input']")
    private WebElement leaveTypeDropdown;

    @FindBy(xpath = "//label[text()='From Date']/parent::div/following-sibling::div//input")
    private WebElement fromDateField;

    @FindBy(xpath = "//label[text()='To Date']/parent::div/following-sibling::div//input")
    private WebElement toDateField;

    @FindBy(xpath = "//label[text()='Duration']/parent::div/following-sibling::div//div[@class='oxd-select-text-input']")
    private WebElement durationDropdown;

    @FindBy(xpath = "//button[@type='submit']")
    private WebElement submitButton;

    @FindBy(xpath = "//a[text()='My Leave']")
    private WebElement myLeaveLink;

    @FindBy(xpath = "//span[contains(@class,'oxd-text--toast-message')]")
    private WebElement toastMessage;

    @FindBy(xpath = "//span[contains(text(),'Invalid')]")
    private WebElement validationError;

    @FindBy(xpath = "//a[text()='Leave List']")
    private WebElement leaveListLink;

    @FindBy(xpath = "//button[contains(@class,'oxd-button--label-danger')]")
    private WebElement cancelButton;

    public LeavePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        PageFactory.initElements(driver, this);
    }

    public void navigateToLeaveModule() {
        wait.until(ExpectedConditions.elementToBeClickable(leaveMenu));
        leaveMenu.click();
    }

    public void clickApplyLeave() {
        wait.until(ExpectedConditions.elementToBeClickable(applyLeaveLink));
        applyLeaveLink.click();
    }

    public void selectLeaveType(String leaveType) {
        wait.until(ExpectedConditions.elementToBeClickable(leaveTypeDropdown));
        leaveTypeDropdown.click();
        WebElement option = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.xpath("//div[@role='option']//span[contains(text(),'" + leaveType + "')]")))
        ;
        option.click();
    }

    public void enterFromDate(String date) {
        wait.until(ExpectedConditions.visibilityOf(fromDateField));
        fromDateField.clear();
        fromDateField.sendKeys(date);
    }

    public void enterToDate(String date) {
        wait.until(ExpectedConditions.visibilityOf(toDateField));
        toDateField.clear();
        toDateField.sendKeys(date);
    }

    public void selectDuration(String duration) {
        wait.until(ExpectedConditions.elementToBeClickable(durationDropdown));
        durationDropdown.click();
        WebElement option = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.xpath("//div[@role='option']//span[contains(text(),'" + duration + "')]")))
        ;
        option.click();
    }

    public void clickSubmit() {
        wait.until(ExpectedConditions.elementToBeClickable(submitButton));
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", submitButton);
        submitButton.click();
    }

    public void navigateToMyLeave() {
        wait.until(ExpectedConditions.elementToBeClickable(myLeaveLink));
        myLeaveLink.click();
    }

    public boolean isLeaveRequestDisplayed(String days) {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//div[contains(text(),'" + days + "')]")))
            ;
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getLeaveBalanceForRequest() {
        try {
            WebElement balanceElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("(//div[contains(@class,'oxd-table-cell')])[6]")))
            ;
            return balanceElement.getText();
        } catch (Exception e) {
            return "";
        }
    }

    public boolean isValidationErrorDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOf(validationError));
            return validationError.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getValidationErrorMessage() {
        try {
            wait.until(ExpectedConditions.visibilityOf(validationError));
            return validationError.getText();
        } catch (Exception e) {
            return "";
        }
    }

    public boolean isToastMessageDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOf(toastMessage));
            return toastMessage.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public void viewLeaveCalendar() {
        WebElement calendarLink = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//a[text()='Leave List']")))
        ;
        calendarLink.click();
    }

    public boolean isCalendarDisplayed() {
        try {
            WebElement calendar = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//div[contains(@class,'oxd-table')]")));
            return calendar.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public void clickOnDate(String date) {
        WebElement dateElement = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//div[contains(text(),'" + date + "')]")))
        ;
        dateElement.click();
    }

    public boolean isLeaveDetailsDisplayed() {
        try {
            WebElement details = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//div[contains(@class,'oxd-table-card')]")));
            return details.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}