import pytest


@pytest.fixture(scope="session")
def api_config():
    return {
        "base_url": "https://opensource-demo.orangehrmlive.com",
        "auth_type": "bearer_token",
        "token": "udPzp5tmK1qJ8SD5ih5TmI9iNvVEpV1lqd0luA2ddBE=",
        "username": "",
        "password": "",
        "api_key_name": "",
        "api_key_value": "",
        "api_key_location": "",
    }


@pytest.fixture()
def auth_headers(api_config):
    if api_config["auth_type"] in ("bearer_token", "jwt") and api_config["token"]:
        return {"Authorization": f"Bearer {api_config['token']}"}
    return {}
