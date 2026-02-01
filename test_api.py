import requests
import json
import sys

BASE_URL = "http://localhost:8000/api/v1"

endpoints = [
    ("GET", "/services"),
    ("GET", "/portfolios"),
    ("GET", "/posts"),
    ("GET", "/team"),
    ("GET", "/clients"),
    ("GET", "/faqs"),
    ("GET", "/settings"),
    ("GET", "/pages"),
]

def test_api():
    print(f"--- Testing Afasya Projects API at {BASE_URL} ---")
    
    # 1. Test Public GET Endpoints
    for method, path in endpoints:
        url = f"{BASE_URL}{path}"
        try:
            response = requests.request(method, url, timeout=5)
            if response.status_code == 200:
                print(f"[SUCCESS] {method} {path} - Status: {response.status_code}")
            else:
                print(f"[FAILED] {method} {path} - Status: {response.status_code}")
                # print(response.text[:100])
        except Exception as e:
            print(f"[ERROR] {method} {path} - Could not connect: {e}")

    # 2. Test Login
    print("\n--- Testing Authentication ---")
    login_url = f"{BASE_URL}/login"
    login_data = {
        "email": "admin@afasya.com",
        "password": "password",
        "device_name": "PythonTestScript"
    }
    try:
        resp = requests.post(login_url, json=login_data, timeout=5)
        if resp.status_code == 200:
            json_data = resp.json()
            token = json_data.get('data', {}).get('token')
            print(f"[SUCCESS] Login successful. Token obtained.")
            
            # Test Auth Route (Me)
            me_url = f"{BASE_URL}/me"
            headers = {"Authorization": f"Bearer {token}", "Accept": "application/json"}
            me_resp = requests.get(me_url, headers=headers, timeout=5)
            if me_resp.status_code == 200:
                user_name = me_resp.json().get('data', {}).get('name')
                print(f"[SUCCESS] GET /me - Authenticated as: {user_name}")
            else:
                print(f"[FAILED] GET /me - Status: {me_resp.status_code}")
        else:
            print(f"[FAILED] Login - Status: {resp.status_code}")
            print(resp.text)
    except Exception as e:
        print(f"[ERROR] Login - Could not connect: {e}")

    # 3. Test Contact Submission
    print("\n--- Testing POST Endpoints ---")
    contact_url = f"{BASE_URL}/contact"
    contact_data = {
        "name": "Tester Otomatis",
        "email": "test@afasya.com",
        "message": "Testing dari script python"
    }
    try:
        c_resp = requests.post(contact_url, json=contact_data, timeout=5)
        if c_resp.status_code in [200, 201]:
            print(f"[SUCCESS] POST /contact - Message sent.")
        else:
            print(f"[FAILED] POST /contact - Status: {c_resp.status_code}")
    except Exception as e:
        print(f"[ERROR] POST /contact - Could not connect: {e}")

if __name__ == "__main__":
    test_api()
