package pageObjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class RecruitmentPage {
    private WebDriver driver;
    private WebDriverWait wait;

    @FindBy(xpath = "//a[text()='Vacancies']")
    private WebElement vacanciesMenu;

    @FindBy(xpath = "//button[normalize-space()='Add']")
    private WebElement addButton;

    @FindBy(xpath = "(//input[@class='oxd-input oxd-input--active'])[2]")
    private WebElement vacancyNameField;

    @FindBy(xpath = "//label[text()='Job Title']/parent::div/following-sibling::div//div[@class='oxd-select-text-input']")
    private WebElement jobTitleDropdown;

    @FindBy(xpath = "//label[text()='Hiring Manager']/parent::div/following-sibling::div//input")
    private WebElement hiringManagerField;

    @FindBy(xpath = "//label[text()='Number of Positions']/parent::div/following-sibling::div//input")
    private WebElement numberOfPositionsField;

    @FindBy(xpath = "//button[@type='submit']")
    private WebElement saveButton;

    @FindBy(xpath = "//div[@class='oxd-table-body']//div[@role='row']")
    private List<WebElement> vacancyRows;

    @FindBy(xpath = "//h6[text()='Add Job Vacancy']")
    private WebElement addVacancyHeader;

    @FindBy(xpath = "//p[@class='oxd-text oxd-text--p oxd-text--toast-message oxd-toast-content-text']")
    private WebElement successMessage;

    public RecruitmentPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        PageFactory.initElements(driver, this);
    }

    public void clickVacanciesMenu() {
        wait.until(ExpectedConditions.elementToBeClickable(vacanciesMenu));
        vacanciesMenu.click();
    }

    public void clickAddButton() {
        wait.until(ExpectedConditions.elementToBeClickable(addButton));
        addButton.click();
    }

    public void enterVacancyName(String vacancyName) {
        wait.until(ExpectedConditions.visibilityOf(vacancyNameField));
        vacancyNameField.clear();
        vacancyNameField.sendKeys(vacancyName);
    }

    public void selectJobTitle(String jobTitle) {
        wait.until(ExpectedConditions.elementToBeClickable(jobTitleDropdown));
        jobTitleDropdown.click();
        WebElement jobTitleOption = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//div[@role='listbox']//span[text()='" + jobTitle + "']")
        ));
        jobTitleOption.click();
    }

    public void selectHiringManager() {
        wait.until(ExpectedConditions.elementToBeClickable(hiringManagerField));
        hiringManagerField.sendKeys("a");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        WebElement firstManager = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//div[@role='listbox']//div[@role='option'][1]")
        ));
        firstManager.click();
    }

    public void enterNumberOfPositions(String numberOfPositions) {
        wait.until(ExpectedConditions.visibilityOf(numberOfPositionsField));
        numberOfPositionsField.clear();
        numberOfPositionsField.sendKeys(numberOfPositions);
    }

    public void clickSaveButton() {
        wait.until(ExpectedConditions.elementToBeClickable(saveButton));
        saveButton.click();
    }

    public boolean isAddVacancyFormDisplayed() {
        return addVacancyHeader.isDisplayed();
    }

    public boolean isSuccessMessageDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOf(successMessage));
            return successMessage.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isVacancyInList(String vacancyName) {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        for (WebElement row : vacancyRows) {
            if (row.getText().contains(vacancyName)) {
                return true;
            }
        }
        return false;
    }
}
