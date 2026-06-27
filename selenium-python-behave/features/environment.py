# features/environment.py
# Behave environment hooks
# Manages WebDriver lifecycle and test context

from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.firefox import GeckoDriverManager
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def before_all(context):
    """Executed once before all features."""
    context.config.setup_logging()


def before_scenario(context, scenario):
    """Executed before each scenario - initialize WebDriver."""
    browser = os.getenv('BROWSER', 'chrome').lower()
    headless = os.getenv('HEADLESS', 'false').lower() == 'true'

    if browser == 'chrome':
        options = ChromeOptions()
        if headless:
            options.add_argument('--headless=new')
        options.add_argument('--disable-gpu')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--window-size=1920,1080')
        service = ChromeService(ChromeDriverManager().install())
        context.driver = webdriver.Chrome(service=service, options=options)
    elif browser == 'firefox':
        options = FirefoxOptions()
        if headless:
            options.add_argument('--headless')
        options.add_argument('--width=1920')
        options.add_argument('--height=1080')
        service = FirefoxService(GeckoDriverManager().install())
        context.driver = webdriver.Firefox(service=service, options=options)
    else:
        raise ValueError(f"Unsupported browser: {browser}")

    context.driver.maximize_window()
    context.driver.implicitly_wait(5)


def after_scenario(context, scenario):
    """Executed after each scenario - take screenshot on failure and quit driver."""
    if scenario.status == 'failed':
        screenshot_dir = 'screenshots'
        os.makedirs(screenshot_dir, exist_ok=True)
        screenshot_name = f"{scenario.name.replace(' ', '_')}_{scenario.status}.png"
        screenshot_path = os.path.join(screenshot_dir, screenshot_name)
        context.driver.save_screenshot(screenshot_path)
        print(f"Screenshot saved: {screenshot_path}")

    if hasattr(context, 'driver'):
        context.driver.quit()


def after_all(context):
    """Executed once after all features."""
    pass
