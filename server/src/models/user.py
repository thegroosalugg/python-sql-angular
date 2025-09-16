"""User model for Python SQL access"""
import re  # regex library, like JS RegExp
from dataclasses import dataclass, field
# @dataclass == class decorator that generates constructor (__init__)
from datetime import date  # JS: Date class
from src.db.initdb import get_cursor

def flatten(s: str) -> str:
    """Flatten multi whitespaces"""
    return re.sub(r'\s+', ' ', s).strip()

@dataclass  # decorator, automatically generates constructor, repr
class User:
    """Dataclass-based User model for plain SQL"""
    first_name: str
    last_name:  str
    email:      str
    dob:        str
    # field: return an object to identify dataclass fields.
    # default_factory: expects function instead of static value;
    # lambda: anonymous function () => {}
    # init=False: created in the constructor only, cannot be passed as argument
    # isoformat() == toISOString(),
    created_at: str = field(default_factory=lambda: date.today().isoformat(), init=False)
    id:         int | None = None  # Optional, default None;

    def serialize(self):  # self = instance reference, passed implicitly on user.serialize()
        """Dataclass to dict (cheap shallow copy)
        JS: Object.keys(this).reduce((a,k) => { a[k]=this[k]; return a; }, {})"""
        return self.__dict__.copy()  # __dict__: instance vars dict, .copy(): shallow clone

    def save(self):
        """Insert or update User in DB"""
        cursor, db = get_cursor()

        # tuple == array in JS
        values = (
            flatten(self.first_name),
            flatten(self.last_name),
            self.email,  # non collapsed whitespaces are rejected during validation
            self.dob,
        )

        if self.id is None:  # New User
            cursor.execute(
                """
                INSERT INTO users (first_name, last_name, email, dob, created_at)
                VALUES (?,?,?,?,?)
                """,
                # must use a tuple. Comma tells python to treat element as a single value tuple
                values + (self.created_at,),
            )
            db.commit()  # commit() == save changes to DB (like .run() in JS better-sqlite3)
            self.id = cursor.lastrowid
        else:  # Existing User
            cursor.execute(
                """
                UPDATE users
                SET first_name=?, last_name=?, email=?, dob=?
                WHERE id=?
                """,
                values + (self.id,),  # append id for WHERE
            )
            db.commit()

        return self.serialize()

    @staticmethod
    def get_all() -> list[dict]:
        """Fetch all Users from DB"""
        cursor = get_cursor(as_dict=True)[0]
        cursor.execute("SELECT * FROM users")
        rows = cursor.fetchall()  # fetchall() == db.prepare(...).all() in JS
        # dict creates an object from the sql_dict_row
        return [dict(row) for row in rows]  # [newVal for oldVal in values]

    @staticmethod
    def find(user_id: int) -> dict | None:
        """Find user by ID"""
        cursor = get_cursor(as_dict=True)[0]
        # must use a tuple. Comma tells python to treat element as a single value tuple
        cursor.execute("SELECT * FROM users WHERE id=?", (user_id,))
        row = cursor.fetchone()
        if row is None:
            return None
        return dict(row)
