import os


class PlaywrightBrowserFactory:
    @staticmethod
    def browser_name() -> str:
        return os.getenv("BROWSER", "chromium").lower()

    @staticmethod
    def headless() -> bool:
        return os.getenv("HEADLESS", "true").lower() == "true"

    @staticmethod
    def launch(playwright):
        browser_name = PlaywrightBrowserFactory.browser_name()
        headless = PlaywrightBrowserFactory.headless()

        if browser_name == "firefox":
            return playwright.firefox.launch(headless=headless)
        if browser_name == "webkit":
            return playwright.webkit.launch(headless=headless)
        return playwright.chromium.launch(headless=headless)


class WebDriverFactory:
    @staticmethod
    def create_driver():
        raise RuntimeError("Use PlaywrightBrowserFactory.launch(playwright) for Playwright Python frameworks.")
