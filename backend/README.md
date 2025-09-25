# FitSpaceAI Backend 🚀

A minimal and easy Flask backend for the FitSpaceAI virtual try-on application.

## Features ✨

- **🔐 Authentication**: Simple login/register system
- **👕 Product Management**: Clothes and sunglasses catalog
- **🤖 Virtual Try-On**: AI-powered pose detection and overlay
- **🛒 Cart Management**: Add, remove, update cart items
- **📦 Order Processing**: Order creation and management
- **🌐 CORS Enabled**: Ready for React frontend
- **📱 RESTful API**: Clean and simple endpoints

## Quick Start 🏃‍♂️

### 1. Install Dependencies

```bash
# Navigate to backend directory
cd backend

# Install Python packages
pip install -r requirements.txt
```

### 2. Setup Environment (Optional)

```bash
# Copy environment example
cp env.example .env

# Edit .env file with your settings
nano .env
```

### 3. Run the Server

```bash
# Simple start
python app.py

# Or with startup script
python run.py

# Or for production
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

The server will start at `http://localhost:5000` 🌐

## API Endpoints 📚

### Health Check
```
GET /api/health
```

### Authentication
```
POST /api/auth/login
POST /api/auth/register
```

### Products
```
GET /api/products
GET /api/products/<product_id>
GET /api/products?category=clothes
GET /api/products?category=sunglasses
```

### Virtual Try-On
```
POST /api/tryon/process-image
POST /api/tryon/pose-detection
```

### Cart Management
```
GET /api/cart/<user_id>
POST /api/cart/<user_id>/add
PUT /api/cart/<user_id>/update/<item_id>
DELETE /api/cart/<user_id>/remove/<item_id>
DELETE /api/cart/<user_id>/clear
```

### Orders
```
POST /api/orders/<user_id>
GET /api/orders/<user_id>
```

## Example API Usage 💡

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "bodyType": "athletic",
    "height": 175
  }'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Add to Cart
```bash
curl -X POST http://localhost:5000/api/cart/USER_ID/add \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "c1",
    "quantity": 1,
    "selectedColor": "#4A90E2",
    "selectedSize": "M"
  }'
```

### Virtual Try-On
```bash
curl -X POST http://localhost:5000/api/tryon/process-image \
  -H "Content-Type: application/json" \
  -d '{
    "image": "data:image/jpeg;base64,/9j/4AAQ...",
    "productId": "c1"
  }'
```

## Data Storage 💾

Currently uses **in-memory storage** for simplicity. For production, consider:

- **SQLite**: For single-server deployments
- **PostgreSQL**: For scalable production
- **Redis**: For caching and sessions

## Configuration ⚙️

Edit `config.py` or use environment variables:

- `SECRET_KEY`: Flask secret key
- `UPLOAD_FOLDER`: File upload directory
- `MAX_CONTENT_LENGTH`: Max file size
- `DATABASE_URL`: Database connection string
- `REDIS_URL`: Redis connection string

## Production Deployment 🚀

### Using Gunicorn
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Using Docker
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

## Security Notes 🔒

⚠️ **This is a minimal setup for development. For production:**

- Use proper JWT authentication
- Implement input validation
- Add rate limiting
- Use HTTPS
- Secure file uploads
- Use environment variables for secrets

## Extending the Backend 🔧

### Add Database Support
```python
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fitspaceai.db'
db = SQLAlchemy(app)
```

### Add Real AI Models
```python
import mediapipe as mp
import tensorflow as tf

# Load your trained models
pose_model = mp.solutions.pose.Pose()
tryon_model = tf.keras.models.load_model('models/tryon_model.h5')
```

### Add Caching
```python
import redis
from flask_caching import Cache

cache = Cache(app, config={'CACHE_TYPE': 'redis'})
```

## Support 💬

For questions or issues:
1. Check the API endpoints documentation
2. Verify your request format
3. Check the server logs
4. Make sure CORS is properly configured

Happy coding! 🎉
