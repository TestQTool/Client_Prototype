package stepDefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;
import pageObjects.DashboardPage;
import pageObjects.LoginPage;
import pageObjects.RecruitmentPage;

public class RecruitmentSteps {
    private WebDriver driver;
    private LoginPage loginPage;
    private DashboardPage dashboardPage;
    private RecruitmentPage recruitmentPage;

    public RecruitmentSteps() {
        this.driver = Hooks.getDriver();
    }

    @Given("I navigate to the application login page")
    public void iNavigateToTheApplicationLoginPage() {
        driver.get("https://hr.quality-matrix.us/web/index.php/auth/login");
        loginPage = new LoginPage(driver);
        Assert.assertTrue(loginPage.isLoginPageDisplayed(), "Login page should be displayed");
    }

    @When("I login with username {string} and password {string}")
    public void iLoginWithUsernameAndPassword(String username, String password) {
        loginPage.login(username, password);
        dashboardPage = new DashboardPage(driver);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        Assert.assertTrue(dashboardPage.isDashboardDisplayed(), "Dashboard should be displayed after login");
    }

    @And("I navigate to Recruitment section")
    public void iNavigateToRecruitmentSection() {
        dashboardPage.clickRecruitmentMenu();
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @And("I click on Vacancies menu")
    public void iClickOnVacanciesMenu() {
        recruitmentPage = new RecruitmentPage(driver);
        recruitmentPage.clickVacanciesMenu();
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @And("I click on Add button to create new vacancy")
    public void iClickOnAddButtonToCreateNewVacancy() {
        recruitmentPage.clickAddButton();
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        Assert.assertTrue(recruitmentPage.isAddVacancyFormDisplayed(), "Add vacancy form should be displayed");
    }

    @And("I enter Job Title {string}")
    public void iEnterJobTitle(String jobTitle) {
        recruitmentPage.selectJobTitle(jobTitle);
    }

    @And("I enter Vacancy Name {string}")
    public void iEnterVacancyName(String vacancyName) {
        recruitmentPage.enterVacancyName(vacancyName);
    }

    @And("I select a Hiring Manager")
    public void iSelectAHiringManager() {
        recruitmentPage.selectHiringManager();
    }

    @And("I enter Number of Positions {string}")
    public void iEnterNumberOfPositions(String numberOfPositions) {
        recruitmentPage.enterNumberOfPositions(numberOfPositions);
    }

    @And("I click Save button")
    public void iClickSaveButton() {
        recruitmentPage.clickSaveButton();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("the new job vacancy should be saved successfully")
    public void theNewJobVacancyShouldBeSavedSuccessfully() {
        Assert.assertTrue(recruitmentPage.isSuccessMessageDisplayed() || recruitmentPage.isVacancyInList("SE-2024-001"), 
            "New job vacancy should be saved successfully");
    }

    @And("the vacancy {string} should appear in the vacancy list")
    public void theVacancyShouldAppearInTheVacancyList(String vacancyName) {
        Assert.assertTrue(recruitmentPage.isVacancyInList(vacancyName), 
            "Vacancy " + vacancyName + " should appear in the vacancy list");
    }
}
