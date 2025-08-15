"""Students routes"""
from flask import Blueprint, jsonify
from src.utils.common import clear
from src.models.student import Student

bp = Blueprint("students", __name__)

@bp.route("/")
def get_students():
    """Return all students"""
    clear()
    students = Student.get_all()
    return jsonify(students)
