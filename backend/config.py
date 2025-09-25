import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration class"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'fitspaceai-secret-key-2023'
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER') or 'uploads'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    
    # CORS settings
    CORS_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000']
    
    # AI Model settings
    POSE_DETECTION_MODEL = os.environ.get('POSE_DETECTION_MODEL') or 'mediapipe'
    TRYON_MODEL_PATH = os.environ.get('TRYON_MODEL_PATH') or 'models/'
    
    # Database settings (for future use)
    DATABASE_URL = os.environ.get('DATABASE_URL') or 'sqlite:///fitspaceai.db'
    
    # Redis settings (for caching)
    REDIS_URL = os.environ.get('REDIS_URL') or 'redis://localhost:6379/0'

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    DEVELOPMENT = True

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    DEVELOPMENT = False

class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    DEBUG = True

# Configuration mapping
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
