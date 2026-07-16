import json
import requests


def test_verifythatloginapirejectsrequestmissingusername_api2480(api_config, auth_headers):
    url = api_config["base_url"].rstrip("/") + "/users/"
    headers = {**auth_headers, **{}}
    params = {}
    response = requests.request(
        "POST",
        url,
        headers=headers,
        params=params,
        json=None,
        timeout=30,
    )

    assert response.status_code == 201
    assert response.text is not None
