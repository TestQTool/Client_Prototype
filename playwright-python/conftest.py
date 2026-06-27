# conftest.py
# ─────────────────────────────────────────────────────────────────────────────
# Pytest configuration and fixtures
# Updated by: ScriptGenerationAgent for Login feature
# ─────────────────────────────────────────────────────────────────────────────
import pytest
from playwright.sync_api import sync_playwright
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    """Configure browser context arguments"""
    return {
        **browser_context_args,
        "viewport": {"width": 1920, "height": 1080},
        "ignore_https_errors": True,
    }


@pytest.fixture(scope="session")
def playwright_instance():
    """Start Playwright instance for the session"""
    with sync_playwright() as p:
        yield p


@pytest.fixture(scope="function")
def page(playwright_instance):
    """Provide a fresh browser page for each test"""
    browser_type = os.getenv('BROWSER', 'chromium')
    headless = os.getenv('HEADLESS', 'true').lower() == 'true'
    
    if browser_type == 'firefox':
        browser = playwright_instance.firefox.launch(headless=headless)
    elif browser_type == 'webkit':
        browser = playwright_instance.webkit.launch(headless=headless)
    else:
        browser = playwright_instance.chromium.launch(headless=headless)
    
    context = browser.new_context(
        viewport={"width": 1920, "height": 1080},
        ignore_https_errors=True
    )
    page = context.new_page()
    
    yield page
    
    page.close()
    context.close()
    browser.close()
