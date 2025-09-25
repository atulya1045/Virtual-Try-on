#!/usr/bin/env python3
"""
Simple API Test Script for FitSpaceAI Backend
"""
import requests
import json
import base64
from datetime import datetime

# Configuration
BASE_URL = 'http://localhost:5000/api'
headers = {'Content-Type': 'application/json'}

def test_health_check():
    """Test the health check endpoint"""
    print("🔍 Testing Health Check...")
    try:
        response = requests.get(f'{BASE_URL}/health')
        if response.status_code == 200:
            print("✅ Health check passed")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Health check error: {e}")
    print()

def test_authentication():
    """Test authentication endpoints"""
    print("🔍 Testing Authentication...")
    
    # Test login
    login_data = {
        "email": "test@example.com",
        "password": "password123",
        "name": "Test User",
        "bodyType": "athletic",
        "height": 175
    }
    
    try:
        response = requests.post(f'{BASE_URL}/auth/login', json=login_data, headers=headers)
        if response.status_code == 200:
            print("✅ Login test passed")
            user_data = response.json()
            user_id = user_data['user']['id']
            print(f"   User ID: {user_id}")
            return user_id
        else:
            print(f"❌ Login test failed: {response.status_code}")
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"❌ Login test error: {e}")
    
    print()
    return None

def test_products():
    """Test product endpoints"""
    print("🔍 Testing Products...")
    
    try:
        # Get all products
        response = requests.get(f'{BASE_URL}/products')
        if response.status_code == 200:
            print("✅ Get all products passed")
            products = response.json()
            print(f"   Found {len(products['products']['clothes'])} clothes")
            print(f"   Found {len(products['products']['sunglasses'])} sunglasses")
        else:
            print(f"❌ Get products failed: {response.status_code}")
        
        # Get specific product
        response = requests.get(f'{BASE_URL}/products/c1')
        if response.status_code == 200:
            print("✅ Get specific product passed")
            product = response.json()
            print(f"   Product: {product['product']['name']}")
        else:
            print(f"❌ Get specific product failed: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Products test error: {e}")
    
    print()

def test_cart(user_id):
    """Test cart endpoints"""
    if not user_id:
        print("⏭️ Skipping cart tests (no user ID)")
        return
    
    print("🔍 Testing Cart...")
    
    try:
        # Add item to cart
        cart_item = {
            "productId": "c1",
            "quantity": 2,
            "selectedColor": "#4A90E2",
            "selectedSize": "M"
        }
        
        response = requests.post(f'{BASE_URL}/cart/{user_id}/add', json=cart_item, headers=headers)
        if response.status_code == 200:
            print("✅ Add to cart passed")
            cart_data = response.json()
            item_id = cart_data['cartItem']['id']
            print(f"   Added item ID: {item_id}")
        else:
            print(f"❌ Add to cart failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return
        
        # Get cart
        response = requests.get(f'{BASE_URL}/cart/{user_id}')
        if response.status_code == 200:
            print("✅ Get cart passed")
            cart = response.json()
            print(f"   Cart items: {len(cart['cart'])}")
        else:
            print(f"❌ Get cart failed: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Cart test error: {e}")
    
    print()

def test_tryon():
    """Test virtual try-on endpoints"""
    print("🔍 Testing Virtual Try-On...")
    
    try:
        # Create a simple base64 encoded test image (1x1 pixel)
        test_image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        
        tryon_data = {
            "image": test_image,
            "productId": "c1"
        }
        
        response = requests.post(f'{BASE_URL}/tryon/process-image', json=tryon_data, headers=headers)
        if response.status_code == 200:
            print("✅ Process try-on image passed")
            result = response.json()
            print(f"   Confidence: {result['poseData']['confidence']}")
        else:
            print(f"❌ Process try-on image failed: {response.status_code}")
            print(f"   Error: {response.text}")
        
        # Test pose detection
        pose_data = {"image": test_image}
        response = requests.post(f'{BASE_URL}/tryon/pose-detection', json=pose_data, headers=headers)
        if response.status_code == 200:
            print("✅ Pose detection passed")
            result = response.json()
            print(f"   Keypoints detected: {len(result['keypoints'])}")
        else:
            print(f"❌ Pose detection failed: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Try-on test error: {e}")
    
    print()

def test_orders(user_id):
    """Test order endpoints"""
    if not user_id:
        print("⏭️ Skipping order tests (no user ID)")
        return
    
    print("🔍 Testing Orders...")
    
    try:
        # Create order
        order_data = {
            "shippingAddress": {
                "street": "123 Test St",
                "city": "Test City",
                "zip": "12345"
            },
            "paymentMethod": "credit_card",
            "estimatedDelivery": "2023-12-01"
        }
        
        response = requests.post(f'{BASE_URL}/orders/{user_id}', json=order_data, headers=headers)
        if response.status_code == 200:
            print("✅ Create order passed")
            order = response.json()
            print(f"   Order ID: {order['order']['id']}")
            print(f"   Total: ${order['order']['total']}")
        else:
            print(f"❌ Create order failed: {response.status_code}")
            print(f"   Error: {response.text}")
        
        # Get user orders
        response = requests.get(f'{BASE_URL}/orders/{user_id}')
        if response.status_code == 200:
            print("✅ Get orders passed")
            orders = response.json()
            print(f"   User orders: {len(orders['orders'])}")
        else:
            print(f"❌ Get orders failed: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Orders test error: {e}")
    
    print()

def main():
    """Run all API tests"""
    print("🚀 FitSpaceAI Backend API Tests")
    print("=" * 40)
    print(f"🌐 Testing API at: {BASE_URL}")
    print(f"⏰ Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Run tests
    test_health_check()
    user_id = test_authentication()
    test_products()
    test_cart(user_id)
    test_tryon()
    test_orders(user_id)
    
    print("✨ All tests completed!")
    print("💡 Make sure the Flask server is running on localhost:5000")

if __name__ == '__main__':
    main()
