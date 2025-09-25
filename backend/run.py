#!/usr/bin/env python3
"""
FitSpaceAI Backend Startup Script
"""
import os
import sys
from app import app
from config import config

def create_app(config_name=None):
    """Create and configure the Flask app"""
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')
    
    app.config.from_object(config[config_name])
    
    # Create necessary directories
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs('models', exist_ok=True)
    
    return app

if __name__ == '__main__':
    # Get configuration from environment
    config_name = os.environ.get('FLASK_ENV', 'development')
    
    print("🚀 Starting FitSpaceAI Backend...")
    print(f"📊 Environment: {config_name}")
    print("=" * 50)
    
    # Create and run the app
    app = create_app(config_name)
    
    # Development server settings
    if config_name == 'development':
        app.run(
            debug=True,
            host='0.0.0.0',
            port=5000,
            use_reloader=True
        )
    else:
        # Production server (use gunicorn instead)
        print("💡 For production, use: gunicorn -w 4 -b 0.0.0.0:5000 run:app")
        app.run(host='0.0.0.0', port=5000)
