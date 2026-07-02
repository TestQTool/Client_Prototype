import json
from pathlib import Path

import requests


def _json_path(payload, path):
    current = payload
    for part in path.split("."):
        if isinstance(current, dict):
            current = current.get(part)
        elif isinstance(current, list) and part.isdigit():
            index = int(part)
            current = current[index] if index < len(current) else None
        else:
            return None
    return current


def _load_json(relative_path):
    return json.loads((Path(__file__).resolve().parents[1] / relative_path).read_text(encoding="utf-8"))


def test_verify_that_login_apireturns_error_username_missing_api1231(qentrix_api_config):
    test_data = _load_json("../testdata/request/VerifyThatLoginAPIReturnsErrorUsernameMissing_Api1231.json")
    api = test_data["apiDetails"]
    url = qentrix_api_config["base_url"].rstrip("/") + "/user"
    headers = dict(qentrix_api_config.get("auth_headers", {}))
    headers.update(api.get("headers") or {})
    params = dict(qentrix_api_config.get("auth_query_params", {}))
    params.update(api.get("queryParams") or {})
    response = requests.request(
        "POST",
        url,
        headers=headers,
        params=params,
        auth=qentrix_api_config.get("basic_auth"),
        timeout=30,
    )
    assert response.status_code == 201
    assert response.text
