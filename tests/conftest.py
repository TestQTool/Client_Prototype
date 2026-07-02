import json
from pathlib import Path

import pytest


@pytest.fixture(scope="session")
def qentrix_api_config():
    config_path = Path(__file__).resolve().parents[1] / "config" / "qentrix_config.json"
    config = json.loads(config_path.read_text(encoding="utf-8"))
    auth_type = (config.get("auth_type") or "").lower().replace("-", "_")
    headers = dict(config.get("auth_headers") or {})
    query_params = dict(config.get("auth_query_params") or {})
    basic_auth = None
    if auth_type == "basic_auth":
        basic_auth = (config.get("username") or "", config.get("password") or "")
    config["auth_headers"] = headers
    config["auth_query_params"] = query_params
    config["basic_auth"] = basic_auth
    return config
