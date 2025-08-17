"""User model for Python SQL access"""
from dataclasses import dataclass
# @dataclass == class decorator that generates constructor (__init__)
from datetime import date  # JS: Date class
from src.db.initdb import get_cursor

@dataclass  # decorator, automatically generates constructor, repr
class User:
    """Dataclass-based User model for plain SQL"""
    first_name: str
    last_name:  str
    email:      str
    dob:       date
    joined_on:  int
    id:         int | None = None  # Optional, default None;

    def save(self):
        """Insert or update User in DB"""
        cursor, db = get_cursor()

        # tuple == array in JS
        values = (
            self.first_name,
            self.last_name,
            self.email,
            self.dob.isoformat(), # .isoformat() == toISOString() in JS
            self.joined_on,
        )

        if self.id is None:  # New User
            cursor.execute(
                """
                INSERT INTO users (first_name, last_name, email, dob, joined_on)
                VALUES (?,?,?,?,?)
                """,
                values,
            )
            db.commit()  # commit() == save changes to DB (like .run() in JS better-sqlite3)
            self.id = cursor.lastrowid
        else:  # Existing User
            cursor.execute(
                """
                UPDATE users
                SET first_name=?, last_name=?, email=?, dob=?, joined_on=?
                WHERE id=?
                """,
                values + (self.id,),  # append id for WHERE
            )
            db.commit()

    @staticmethod
    def get_all() -> list["User"]:
        """Fetch all Users from DB"""
        cursor = get_cursor(as_dict=True)[0]
        cursor.execute("SELECT * FROM users")
        rows = cursor.fetchall()  # fetchall() == db.prepare(...).all() in JS
        # dict creates an object from the sql_dict_row
        return [dict(row) for row in rows]  # [newVal for oldVal in values]
