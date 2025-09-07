"""Users routes"""
from flask import Blueprint, jsonify, request
from src.utils.common import clear
from src.models.user import User
from src.validation.user import validate_user

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
    return jsonify(user)  # send JSON response - default Flask code is 200

# route with param & body - methods=["PUT", "POST", "DELETE"]
@bp.route("/user/update/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    """Update existing user"""
    clear()

    data = request.get_json()  # **req.body in JS
    if data is None:
        return jsonify({"error": "Invalid or missing JSON"}), 400  # return HTTP 400 + JSON

    errors = validate_user(data)

    if errors:
        return jsonify(errors), 422

    user = User(id=user_id, **data).save()
    return jsonify(user)
