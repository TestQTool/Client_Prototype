import os

import allure
import pytest

from src.core.webdriver_factory import WebDriverFactory


@pytest.fixture
def driver():
    driver_instance = WebDriverFactory.create_driver()
    yield driver_instance
    driver_instance.quit()


@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()
    if report.when == "call" and report.failed:
        driver_instance = item.funcargs.get("driver")
        if driver_instance:
            allure.attach(
                driver_instance.get_screenshot_as_png(),
                name=item.name,
                attachment_type=allure.attachment_type.PNG,
            )


def pytest_configure(config):
    os.makedirs("reports/allure-results", exist_ok=True)
