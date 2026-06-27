# conftest.py
# ─────────────────────────────────────────────────────────────────────────────
# Pytest fixtures and configuration for AG-Helix Selenium Python POM framework
# ─────────────────────────────────────────────────────────────────────────────
import pytest
import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options as ChromeOptions
from webdriver_manager.chrome import ChromeDriverManager


def pytest_addoption(parser):
    """Add custom command line options"""
    parser.addoption(
        "--browser",
        action="store",
        default="chrome",
        help="Browser to run tests: chrome, firefox, edge"
    )
    parser.addoption(
        "--headless",
        action="store_true",
        default=False,
        help="Run browser in headless mode"
    )


@pytest.fixture(scope="function")
def driver(request):
    """Initialize WebDriver for each test"""
    browser = request.config.getoption("--browser")
    headless = request.config.getoption("--headless")

    driver_instance = None

    if browser.lower() == "chrome":
        chrome_options = ChromeOptions()
        if headless:
            chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--window-size=1920,1080")
        
        service = ChromeService(ChromeDriverManager().install())
        driver_instance = webdriver.Chrome(service=service, options=chrome_options)

    elif browser.lower() == "firefox":
        from selenium.webdriver.firefox.service import Service as FirefoxService
        from selenium.webdriver.firefox.options import Options as FirefoxOptions
        from webdriver_manager.firefox import GeckoDriverManager

        firefox_options = FirefoxOptions()
        if headless:
            firefox_options.add_argument("--headless")
        
        service = FirefoxService(GeckoDriverManager().install())
        driver_instance = webdriver.Firefox(service=service, options=firefox_options)

    else:
        raise ValueError(f"Unsupported browser: {browser}")

    driver_instance.maximize_window()
    driver_instance.implicitly_wait(10)

    yield driver_instance

    driver_instance.quit()
