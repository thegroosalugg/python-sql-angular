"""Flask application factory"""
from flask import Flask
from .routes import user

def create_app():
    """Create and return a Flask app instance. __name__ is reserved name"""
    app = Flask(__name__)
    # Import routes (this registers routes to the app)
    app.register_blueprint(user.bp)  # attach routes
    return app
