package pages;

import core.ConfigReader;
import core.WebActions;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class _TemplatePage extends WebActions {
    private static final By PAGE_HEADING = By.cssSelector("h1");
    private static final By PRIMARY_INPUT = By.cssSelector("input[name='primary']");
    private static final By SUBMIT_BUTTON = By.cssSelector("button[type='submit']");
    public _TemplatePage(WebDriver driver) { super(driver); }
    public void navigate() { open(ConfigReader.get("BASE_URL", "")); }
    public void fillPrimaryField(String value) { type(PRIMARY_INPUT, value); }
    public void submit() { click(SUBMIT_BUTTON); }
    public void verifyPageLoaded() { assertVisible(PAGE_HEADING); }
}
