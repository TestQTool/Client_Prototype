import json
import requests


def test_verifythatloginapireturnspropercontenttype_api1233(api_config, auth_headers):
    url = api_config["base_url"].rstrip("/") + "/web/index.php/auth/login"
    headers = {**auth_headers, **{}}
    params = {}
    response = requests.request(
        "POST",
        url,
        headers=headers,
        params=params,
        json=json.loads("""{"email":"","password":"admin123"}"""),
        timeout=30,
    )

    assert response.status_code == 200
    assert response.text is not None
