import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.edge.service import Service as EdgeService
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.firefox import GeckoDriverManager
from webdriver_manager.microsoft import EdgeChromiumDriverManager
import json
import os


@pytest.fixture(scope="session")
def config():
    """Load configuration from config file or environment variables"""
    config_data = {}
    config_file = os.path.join(os.path.dirname(__file__), 'config', 'config.json')
    
    if os.path.exists(config_file):
        with open(config_file, 'r') as f:
            config_data = json.load(f)
    
    # Override with environment variables if present
    config_data['BASE_URL'] = os.getenv('BASE_URL', config_data.get('BASE_URL', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'))
    config_data['BROWSER'] = os.getenv('BROWSER', config_data.get('BROWSER', 'chrome'))
    config_data['USERNAME'] = os.getenv('USERNAME', config_data.get('USERNAME', 'Admin'))
    config_data['PASSWORD'] = os.getenv('PASSWORD', config_data.get('PASSWORD', 'admin123'))
    config_data['IMPLICIT_WAIT'] = int(os.getenv('IMPLICIT_WAIT', config_data.get('IMPLICIT_WAIT', 10)))
    config_data['EXPLICIT_WAIT'] = int(os.getenv('EXPLICIT_WAIT', config_data.get('EXPLICIT_WAIT', 10)))
    config_data['HEADLESS'] = os.getenv('HEADLESS', config_data.get('HEADLESS', 'false')).lower() == 'true'
    
    return config_data


@pytest.fixture(scope="function")
def driver(config):
    """Initialize WebDriver based on configuration"""
    browser = config.get('BROWSER', 'chrome').lower()
    headless = config.get('HEADLESS', False)
    implicit_wait = config.get('IMPLICIT_WAIT', 10)
    
    driver_instance = None
    
    if browser == 'chrome':
        options = webdriver.ChromeOptions()
        if headless:
            options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        driver_instance = webdriver.Chrome(
            service=ChromeService(ChromeDriverManager().install()),
            options=options
        )
    elif browser == 'firefox':
        options = webdriver.FirefoxOptions()
        if headless:
            options.add_argument('--headless')
        driver_instance = webdriver.Firefox(
            service=FirefoxService(GeckoDriverManager().install()),
            options=options
        )
    elif browser == 'edge':
        options = webdriver.EdgeOptions()
        if headless:
            options.add_argument('--headless')
        driver_instance = webdriver.Edge(
            service=EdgeService(EdgeChromiumDriverManager().install()),
            options=options
        )
    else:
        raise ValueError(f"Unsupported browser: {browser}")
    
    driver_instance.maximize_window()
    driver_instance.implicitly_wait(implicit_wait)
    
    yield driver_instance
    
    driver_instance.quit()


@pytest.fixture(scope="session")
def test_data():
    """Load test data from JSON file"""
    test_data_file = os.path.join(os.path.dirname(__file__), 'testdata', 'testdata.json')
    
    if os.path.exists(test_data_file):
        with open(test_data_file, 'r') as f:
            return json.load(f)
    
    return {}


def pytest_configure(config):
    """Configure pytest with custom markers"""
    config.addinivalue_line(
        "markers", "priority_high: High priority test cases"
    )
    config.addinivalue_line(
        "markers", "priority_medium: Medium priority test cases"
    )
    config.addinivalue_line(
        "markers", "priority_low: Low priority test cases"
    )
    config.addinivalue_line(
        "markers", "functional: Functional test cases"
    )
    config.addinivalue_line(
        "markers", "regression: Regression test cases"
    )
    config.addinivalue_line(
        "markers", "smoke: Smoke test cases"
    )
