"""Users routes"""
from flask import Blueprint, jsonify
from src.utils.common import clear
from src.models.user import User

bp = Blueprint("users", __name__)

@bp.route("/users/all")
def get_users():
    """Return all Users"""
    clear()
    users = User.get_all()
    return jsonify(users)

# Flasks type system auto converts to given type
@bp.route("/user/<int:user_id>")  # other types: <string/int/float/path>
def find_user_by_id(user_id):  # route name must match parameter
    """Find user by ID"""
    clear()
    user = User.find(user_id)
    return jsonify(user)
