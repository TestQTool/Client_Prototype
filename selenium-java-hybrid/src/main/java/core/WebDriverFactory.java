package core;

import org.openqa.selenium.WebDriver;

public final class WebDriverFactory {
    private WebDriverFactory() {
    }

    public static WebDriver createDriver() {
        return DriverFactory.initDriver();
    }

    public static WebDriver createDriver(String browser) {
        if (browser != null && !browser.isBlank()) {
            System.setProperty("BROWSER", browser);
        }
        return DriverFactory.initDriver();
    }
}
