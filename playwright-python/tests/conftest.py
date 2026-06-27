import os

import pytest


def pytest_configure(config):
    os.makedirs("reports/allure-results", exist_ok=True)


@pytest.fixture
def browser_factory():
    from src.core.webdriver_factory import PlaywrightBrowserFactory

    return PlaywrightBrowserFactory
