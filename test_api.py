import requests
import json
import sys
import time

BASE_URL = "http://localhost:8000/api/v1"
TIMEOUT = 15 # Increased timeout to prevent local server lag
DELAY = 0.5 # Small delay between requests for php artisan serve stability

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
    public_endpoints = [
        ("GET", "/services"),
        ("GET", "/service-packages"),
        ("GET", "/payment-methods"),
        ("GET", "/portfolios"),
        ("GET", "/posts"),
        ("GET", "/team"),
        ("GET", "/clients"),
        ("GET", "/faqs"),
        ("GET", "/settings"),
        ("GET", "/pages"),
    ]
    
    for method, path in public_endpoints:
        url = f"{BASE_URL}{path}"
        try:
            time.sleep(DELAY)
            response = requests.request(method, url, timeout=TIMEOUT)
            if response.status_code == 200:
                print(f"[SUCCESS] {method} {path} - Status: {response.status_code}")
            else:
                print(f"[FAILED] {method} {path} - Status: {response.status_code}")
        except Exception as e:
            print(f"[ERROR] {method} {path} - Could not connect: {e}")

    # 2. Test Login & Authenticated Flow
    print("\n--- Testing Authentication & Orders ---")
    login_data = {
        "email": "admin@afasya.com",
        "password": "password",
        "device_name": "PythonTestScript"
    }
    
    try:
        time.sleep(DELAY)
        resp = requests.post(f"{BASE_URL}/login", json=login_data, timeout=TIMEOUT)
        if resp.status_code == 200:
            token = resp.json().get('data', {}).get('token')
            print(f"[SUCCESS] Login successful. Token obtained.")
            headers = {"Authorization": f"Bearer {token}", "Accept": "application/json"}

            # Test Order Creation
            print("\n- Testing Checkout Process -")
            # Fetch a package ID first
            time.sleep(DELAY)
            pkg_resp = requests.get(f"{BASE_URL}/service-packages", timeout=TIMEOUT)
            # Fetch a payment method ID
            time.sleep(DELAY)
            pm_resp = requests.get(f"{BASE_URL}/payment-methods", timeout=TIMEOUT)

            if pkg_resp.status_code == 200 and pm_resp.status_code == 200:
                pkgs = pkg_resp.json().get('data', [])
                pms = pm_resp.json().get('data', [])
                
                if pkgs and pms:
                    pkg_id = pkgs[0]['id']
                    pm_id = pms[0]['id']
                    
                    order_data = {
                        "service_package_id": pkg_id,
                        "payment_method_id": pm_id
                    }
                    time.sleep(DELAY)
                    order_resp = requests.post(f"{BASE_URL}/orders", json=order_data, headers=headers, timeout=TIMEOUT)
                    
                    if order_resp.status_code == 200:
                        order_uuid = order_resp.json().get('data', {}).get('uuid')
                        print(f"[SUCCESS] POST /orders - Order created: {order_uuid}")
                    else:
                        print(f"[FAILED] POST /orders - Status: {order_resp.status_code}")
                else:
                    print("[SKIP] Skipping order test: No packages or payment methods found.")
            
            # Test Dashboard / User Packages
            print("\n- Testing User Dashboard -")
            time.sleep(DELAY)
            up_resp = requests.get(f"{BASE_URL}/user-packages", headers=headers, timeout=TIMEOUT)
            if up_resp.status_code == 200:
                count = len(up_resp.json().get('data', []))
                print(f"[SUCCESS] GET /user-packages - Retrieved {count} active packages.")
            else:
                print(f"[FAILED] GET /user-packages - Status: {up_resp.status_code}")

        else:
            print(f"[FAILED] Login - Status: {resp.status_code}")
    except Exception as e:
        print(f"[ERROR] Auth Flow - Could not connect: {e}")

    # 3. Test Contact Submission
    print("\n--- Testing Lead Generation ---")
    contact_data = {
        "name": "Tester Otomatis",
        "email": "test@afasya.com",
        "message": "Testing dari script python"
    }
    try:
        time.sleep(DELAY)
        c_resp = requests.post(f"{BASE_URL}/contact", json=contact_data, timeout=TIMEOUT)
        if c_resp.status_code in [200, 201]:
            print(f"[SUCCESS] POST /contact - Message sent.")
        else:
            print(f"[FAILED] POST /contact - Status: {c_resp.status_code}")
    except Exception as e:
        print(f"[ERROR] POST /contact - Could not connect: {e}")

if __name__ == "__main__":
    test_api()
