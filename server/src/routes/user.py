"""Users routes"""
from flask import Blueprint, jsonify
from src.utils.common import clear
from src.models.user import User

bp = Blueprint("users", __name__)

@bp.route("/")
def get_users():
    """Return all Users"""
    clear()
    users = User.get_all()
    return jsonify(users)
