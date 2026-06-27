# features/environment.py
# ─────────────────────────────────────────────────────────────────────────────
# Behave environment hooks - setup and teardown for test execution
# ─────────────────────────────────────────────────────────────────────────────

import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.edge.service import Service as EdgeService
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.firefox import GeckoDriverManager
from webdriver_manager.microsoft import EdgeChromiumDriverManager


def before_all(context):
    """Execute before all tests - setup test context"""
    context.browser = os.getenv('BROWSER', 'chrome').lower()
    context.headless = os.getenv('HEADLESS', 'false').lower() == 'true'
    context.base_url = os.getenv('BASE_URL', 'http://192.168.10.124:4001')


def before_scenario(context, scenario):
    """Execute before each scenario - initialize WebDriver"""
    browser = context.browser
    headless = context.headless

    if browser == 'chrome':
        options = webdriver.ChromeOptions()
        if headless:
            options.add_argument('--headless')
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')
        context.driver = webdriver.Chrome(
            service=ChromeService(ChromeDriverManager().install()),
            options=options
        )
    elif browser == 'firefox':
        options = webdriver.FirefoxOptions()
        if headless:
            options.add_argument('--headless')
        context.driver = webdriver.Firefox(
            service=FirefoxService(GeckoDriverManager().install()),
            options=options
        )
    elif browser == 'edge':
        options = webdriver.EdgeOptions()
        if headless:
            options.add_argument('--headless')
        context.driver = webdriver.Edge(
            service=EdgeService(EdgeChromiumDriverManager().install()),
            options=options
        )
    else:
        raise ValueError(f"Unsupported browser: {browser}")

    context.driver.maximize_window()
    context.driver.implicitly_wait(10)


def after_scenario(context, scenario):
    """Execute after each scenario - cleanup WebDriver"""
    if hasattr(context, 'driver'):
        context.driver.quit()


def after_all(context):
    """Execute after all tests - final cleanup"""
    pass
