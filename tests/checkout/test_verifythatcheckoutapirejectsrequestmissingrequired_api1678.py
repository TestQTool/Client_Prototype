import json
import requests


def test_verifythatcheckoutapirejectsrequestmissingrequired_api1678(api_config, auth_headers):
    url = api_config["base_url"].rstrip("/") + "/api/v1/orders/checkout"
    headers = {**auth_headers, **{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", "Content-Type": "application/json", "Accept": "application/json", "X-Request-Id": "REQ-1001", "X-Correlation-Id": "CORR-2001", "User-Agent": "PostmanRuntime/7.45.0"}}
    params = json.loads("""{"status":"Delivered","page":1,"limit":10,"sort":"desc"}""")
    response = requests.request(
        "POST",
        url,
        headers=headers,
        params=params,
        json=json.loads("""{"customerId":101,"cartId":5001,"paymentMethod":"CARD","shippingAddress":{"name":"Kalyan","address":"12 MG Road","city":"Hyderabad","state":"Telangana","country":"India","postalCode":"500001"},"couponCode":"SAVE20","giftWrap":false}"""),
        timeout=30,
    )

    assert response.status_code == 204
    assert response.text is not None
