from pathlib import Path

from behave import given, then


@given("the framework configuration exists")
def framework_configuration_exists(context):
    context.config_file = Path("config") / "config.properties"
    assert context.config_file.exists(), "config/config.properties is missing"


@then("the framework health check should pass")
def framework_health_check_should_pass(context):
    assert context.config_file.is_file(), "framework health check failed"
