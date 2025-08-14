"""Students routes"""
from flask import Blueprint
from src.db.initdb import students
from src.utils.common import clear

bp = Blueprint("students", __name__)

@bp.route("/")
def get_students():
    """Return all students"""
    clear()
    print("Server received a request to /")
    return students
