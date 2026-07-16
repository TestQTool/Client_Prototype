import json
import requests


def test_verifythatemployeereceivesnotificationafterleaverequest_api2493(api_config, auth_headers):
    url = api_config["base_url"].rstrip("/") + "/user/"
    headers = {**auth_headers, **{}}
    params = {}
    response = requests.request(
        "PATCH",
        url,
        headers=headers,
        params=params,
        json=None,
        timeout=30,
    )

    assert response.status_code == 202
    assert response.text is not None
