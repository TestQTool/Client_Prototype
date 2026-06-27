# conftest.py
# ─────────────────────────────────────────────────────────────────────────────
# PyTest configuration and shared fixtures
# ─────────────────────────────────────────────────────────────────────────────
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import os


@pytest.fixture(scope='function')
def driver():
    """WebDriver fixture - creates a new browser instance for each test."""
    chrome_options = Options()
    
    # Headless mode based on environment variable
    if os.getenv('HEADLESS', 'false').lower() == 'true':
        chrome_options.add_argument('--headless')
    
    # Additional Chrome options for stability
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1920,1080')
    
    # Initialize WebDriver
    driver = webdriver.Chrome(options=chrome_options)
    driver.maximize_window()
    driver.implicitly_wait(10)
    
    yield driver
    
    # Teardown
    driver.quit()


@pytest.fixture(scope='session')
def base_url():
    """Base URL fixture - returns the application base URL from environment."""
    return os.getenv('BASE_URL', 'http://192.168.10.124:4001')


def pytest_configure(config):
    """PyTest configuration hook - register custom markers."""
    config.addinivalue_line(
        "markers", "smoke: mark test as part of smoke test suite"
    )
    config.addinivalue_line(
        "markers", "regression: mark test as part of regression test suite"
    )
    config.addinivalue_line(
        "markers", "sanity: mark test as part of sanity test suite"
    )
