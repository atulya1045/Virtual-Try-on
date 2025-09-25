from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json
import uuid
from datetime import datetime
import base64
import io
from PIL import Image
import cv2
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Configuration
app.config['SECRET_KEY'] = 'fitspaceai-secret-key-2023'
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create upload directory if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# In-memory storage (replace with database in production)
users_db = {}
products_db = {
    'clothes': [
        {
            'id': 'c1',
            'name': 'Classic Denim Jacket',
            'price': 89.99,
            'image': 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'category': 'clothes',
            'type': 'jacket',
            'trending': True,
            'colors': ['#4A90E2', '#2C3E50', '#E74C3C'],
            'sizes': ['S', 'M', 'L', 'XL'],
            'description': 'Premium quality denim jacket perfect for any occasion'
        },
        {
            'id': 'c2',
            'name': 'Casual Cotton T-Shirt',
            'price': 29.99,
            'image': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'category': 'clothes',
            'type': 'tshirt',
            'trending': False,
            'colors': ['#FFFFFF', '#000000', '#E74C3C'],
            'sizes': ['XS', 'S', 'M', 'L', 'XL'],
            'description': 'Comfortable cotton t-shirt for everyday wear'
        },
        {
            'id': 'c3',
            'name': 'Summer Floral Dress',
            'price': 79.99,
            'image': 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'category': 'clothes',
            'type': 'dress',
            'trending': True,
            'colors': ['#FF6B6B', '#4ECDC4', '#45B7D1'],
            'sizes': ['XS', 'S', 'M', 'L'],
            'description': 'Beautiful floral dress perfect for summer'
        },
        {
            'id': 'c4',
            'name': 'Business Blazer',
            'price': 129.99,
            'image': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'category': 'clothes',
            'type': 'blazer',
            'trending': False,
            'colors': ['#2C3E50', '#34495E', '#7F8C8D'],
            'sizes': ['S', 'M', 'L', 'XL'],
            'description': 'Professional blazer for business occasions'
        }
    ],
    'sunglasses': [
        {
            'id': 's1',
            'name': 'Aviator Classic',
            'price': 149.99,
            'image': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'category': 'sunglasses',
            'type': 'aviator',
            'trending': True,
            'colors': ['#FFD700', '#C0C0C0', '#000000'],
            'faceTypes': ['oval', 'square', 'heart'],
            'description': 'Classic aviator sunglasses with timeless style'
        },
        {
            'id': 's2',
            'name': 'Retro Round',
            'price': 99.99,
            'image': 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'category': 'sunglasses',
            'type': 'round',
            'trending': False,
            'colors': ['#8B4513', '#000000', '#FF1493'],
            'faceTypes': ['square', 'diamond', 'heart'],
            'description': 'Retro round sunglasses for vintage lovers'
        },
        {
            'id': 's3',
            'name': 'Modern Wayfarer',
            'price': 119.99,
            'image': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'category': 'sunglasses',
            'type': 'wayfarer',
            'trending': True,
            'colors': ['#000000', '#8B4513', '#4A4A4A'],
            'faceTypes': ['round', 'oval', 'square'],
            'description': 'Modern wayfarer style for contemporary look'
        },
        {
            'id': 's4',
            'name': 'Cat Eye Glamour',
            'price': 139.99,
            'image': 'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'category': 'sunglasses',
            'type': 'cateye',
            'trending': False,
            'colors': ['#FF1493', '#000000', '#8B4513'],
            'faceTypes': ['round', 'heart', 'oval'],
            'description': 'Glamorous cat eye sunglasses for elegant style'
        }
    ]
}
carts_db = {}
orders_db = {}

# Helper functions
def generate_id():
    return str(uuid.uuid4())

def get_all_products():
    return products_db['clothes'] + products_db['sunglasses']

def find_product_by_id(product_id):
    all_products = get_all_products()
    return next((p for p in all_products if p['id'] == product_id), None)

# Authentication endpoints
@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password required'}), 400
        
        # Simple authentication (replace with proper auth in production)
        user_id = generate_id()
        user = {
            'id': user_id,
            'name': data.get('name', 'User'),
            'email': email,
            'bodyType': data.get('bodyType', 'athletic'),
            'height': data.get('height', 175),
            'preferences': data.get('preferences', [])
        }
        
        users_db[user_id] = user
        carts_db[user_id] = []
        
        return jsonify({
            'success': True,
            'user': user,
            'token': user_id  # Simple token (use JWT in production)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        
        if not email or not password or not name:
            return jsonify({'error': 'Name, email and password required'}), 400
        
        # Check if user already exists
        existing_user = next((u for u in users_db.values() if u['email'] == email), None)
        if existing_user:
            return jsonify({'error': 'User already exists'}), 400
        
        user_id = generate_id()
        user = {
            'id': user_id,
            'name': name,
            'email': email,
            'bodyType': data.get('bodyType', 'athletic'),
            'height': data.get('height', 175),
            'preferences': data.get('preferences', [])
        }
        
        users_db[user_id] = user
        carts_db[user_id] = []
        
        return jsonify({
            'success': True,
            'user': user,
            'token': user_id
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Product endpoints
@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        category = request.args.get('category')
        
        if category and category in products_db:
            return jsonify({
                'success': True,
                'products': products_db[category]
            })
        
        return jsonify({
            'success': True,
            'products': {
                'clothes': products_db['clothes'],
                'sunglasses': products_db['sunglasses']
            }
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<product_id>', methods=['GET'])
def get_product(product_id):
    try:
        product = find_product_by_id(product_id)
        
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        
        return jsonify({
            'success': True,
            'product': product
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Virtual try-on endpoints
@app.route('/api/tryon/process-image', methods=['POST'])
def process_tryon_image():
    try:
        data = request.get_json()
        image_data = data.get('image')
        product_id = data.get('productId')
        
        if not image_data or not product_id:
            return jsonify({'error': 'Image and product ID required'}), 400
        
        product = find_product_by_id(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        
        # Decode base64 image
        image_bytes = base64.b64decode(image_data.split(',')[1])
        image = Image.open(io.BytesIO(image_bytes))
        
        # Simple image processing (replace with actual AI model)
        # For now, just return success with mock pose data
        mock_pose_data = {
            'keypoints': [
                {'x': 320, 'y': 240, 'confidence': 0.9},  # nose
                {'x': 305, 'y': 230, 'confidence': 0.8},  # left eye
                {'x': 335, 'y': 230, 'confidence': 0.8},  # right eye
                # Add more keypoints as needed
            ],
            'confidence': 0.85,
            'timestamp': datetime.now().isoformat()
        }
        
        return jsonify({
            'success': True,
            'poseData': mock_pose_data,
            'productOverlay': {
                'type': product['type'],
                'color': product['colors'][0],
                'position': {'x': 320, 'y': 280}
            }
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/tryon/pose-detection', methods=['POST'])
def detect_pose():
    try:
        data = request.get_json()
        image_data = data.get('image')
        
        if not image_data:
            return jsonify({'error': 'Image data required'}), 400
        
        # Mock pose detection (replace with actual AI model)
        mock_keypoints = []
        for i in range(33):  # MediaPipe pose has 33 keypoints
            mock_keypoints.append({
                'x': 320 + (i % 10 - 5) * 20,
                'y': 240 + (i // 10) * 30,
                'z': 0,
                'visibility': 0.8 + (i % 3) * 0.1
            })
        
        return jsonify({
            'success': True,
            'keypoints': mock_keypoints,
            'confidence': 0.9,
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Cart endpoints
@app.route('/api/cart/<user_id>', methods=['GET'])
def get_cart(user_id):
    try:
        if user_id not in carts_db:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'success': True,
            'cart': carts_db[user_id]
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/cart/<user_id>/add', methods=['POST'])
def add_to_cart(user_id):
    try:
        if user_id not in carts_db:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.get_json()
        product_id = data.get('productId')
        quantity = data.get('quantity', 1)
        selected_color = data.get('selectedColor')
        selected_size = data.get('selectedSize')
        
        product = find_product_by_id(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        
        cart_item = {
            'id': generate_id(),
            'productId': product_id,
            'product': product,
            'quantity': quantity,
            'selectedColor': selected_color,
            'selectedSize': selected_size,
            'addedAt': datetime.now().isoformat()
        }
        
        carts_db[user_id].append(cart_item)
        
        return jsonify({
            'success': True,
            'cartItem': cart_item,
            'cart': carts_db[user_id]
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/cart/<user_id>/remove/<item_id>', methods=['DELETE'])
def remove_from_cart(user_id, item_id):
    try:
        if user_id not in carts_db:
            return jsonify({'error': 'User not found'}), 404
        
        carts_db[user_id] = [item for item in carts_db[user_id] if item['id'] != item_id]
        
        return jsonify({
            'success': True,
            'cart': carts_db[user_id]
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/cart/<user_id>/update/<item_id>', methods=['PUT'])
def update_cart_item(user_id, item_id):
    try:
        if user_id not in carts_db:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.get_json()
        quantity = data.get('quantity', 1)
        
        for item in carts_db[user_id]:
            if item['id'] == item_id:
                item['quantity'] = quantity
                break
        
        return jsonify({
            'success': True,
            'cart': carts_db[user_id]
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/cart/<user_id>/clear', methods=['DELETE'])
def clear_cart(user_id):
    try:
        if user_id not in carts_db:
            return jsonify({'error': 'User not found'}), 404
        
        carts_db[user_id] = []
        
        return jsonify({
            'success': True,
            'cart': []
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Order endpoints
@app.route('/api/orders/<user_id>', methods=['POST'])
def create_order(user_id):
    try:
        if user_id not in users_db:
            return jsonify({'error': 'User not found'}), 404
        
        if user_id not in carts_db or not carts_db[user_id]:
            return jsonify({'error': 'Cart is empty'}), 400
        
        data = request.get_json()
        
        order_id = generate_id()
        order = {
            'id': order_id,
            'userId': user_id,
            'items': carts_db[user_id].copy(),
            'shippingAddress': data.get('shippingAddress'),
            'paymentMethod': data.get('paymentMethod'),
            'total': sum(item['product']['price'] * item['quantity'] for item in carts_db[user_id]),
            'status': 'confirmed',
            'createdAt': datetime.now().isoformat(),
            'estimatedDelivery': data.get('estimatedDelivery')
        }
        
        if user_id not in orders_db:
            orders_db[user_id] = []
        
        orders_db[user_id].append(order)
        carts_db[user_id] = []  # Clear cart after order
        
        return jsonify({
            'success': True,
            'order': order
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders/<user_id>', methods=['GET'])
def get_user_orders(user_id):
    try:
        if user_id not in users_db:
            return jsonify({'error': 'User not found'}), 404
        
        user_orders = orders_db.get(user_id, [])
        
        return jsonify({
            'success': True,
            'orders': user_orders
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'success': True,
        'message': 'FitSpaceAI Backend is running!',
        'timestamp': datetime.now().isoformat()
    })

# Static file serving
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("🚀 Starting FitSpaceAI Backend...")
    print("📍 API Endpoints:")
    print("   • Health Check: http://localhost:5000/api/health")
    print("   • Products: http://localhost:5000/api/products")
    print("   • Authentication: http://localhost:5000/api/auth/login")
    print("   • Virtual Try-On: http://localhost:5000/api/tryon/process-image")
    print("   • Cart Management: http://localhost:5000/api/cart/<user_id>")
    print("🌐 CORS enabled for React frontend")
    print("📁 Upload folder: uploads/")
    print("=" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
