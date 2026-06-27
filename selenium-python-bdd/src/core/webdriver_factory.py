import os

from selenium import webdriver


class WebDriverFactory:
    @staticmethod
    def create_driver(browser: str | None = None):
        browser_name = (browser or os.getenv("BROWSER") or "chrome").lower()
        headless = os.getenv("HEADLESS", "true").lower() == "true"

        if browser_name == "firefox":
            options = webdriver.FirefoxOptions()
            if headless:
                options.add_argument("-headless")
            return webdriver.Firefox(options=options)

        options = webdriver.ChromeOptions()
        if headless:
            options.add_argument("--headless=new")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        return webdriver.Chrome(options=options)
