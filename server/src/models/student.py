"""Student model for Python SQL access"""
from dataclasses import dataclass
# @dataclass == class decorator that generates constructor (__init__)
from datetime import date  # JS: Date class
from src.db.initdb import get_cursor

@dataclass  # decorator, automatically generates constructor, repr
class Student:
    """Dataclass-based Student model for plain SQL"""
    first_name:      str
    last_name:       str
    email:           str
    dob:            date
    enrollment_year: int
    id:              int | None = None  # Optional, default None;

    def save(self):
        """Insert or update student in DB"""
        cursor, db = get_cursor()

        # tuple == array in JS
        values = (
            self.first_name,
            self.last_name,
            self.email,
            self.dob.isoformat(), # .isoformat() == toISOString() in JS
            self.enrollment_year,
        )

        if self.id is None:  # New student
            cursor.execute(
                """
                INSERT INTO students (first_name, last_name, email, dob, enrollment_year)
                VALUES (?,?,?,?,?)
                """,
                values,
            )
            db.commit()  # commit() == save changes to DB (like .run() in JS better-sqlite3)
            self.id = cursor.lastrowid
        else:  # Existing student
            cursor.execute(
                """
                UPDATE students
                SET first_name=?, last_name=?, email=?, dob=?, enrollment_year=?
                WHERE id=?
                """,
                values + (self.id,),  # append id for WHERE
            )
            db.commit()

    @staticmethod
    def get_all() -> list["Student"]:
        """Fetch all students from DB"""
        cursor = get_cursor(as_dict=True)[0]
        cursor.execute("SELECT * FROM students")
        rows = cursor.fetchall()  # fetchall() == db.prepare(...).all() in JS
        # dict creates an object from the sql_dict_row
        return [dict(row) for row in rows]  # [newVal for oldVal in values]
