"""Initialize the students database with random student data."""
import sqlite3
from sqlite3 import Cursor, Connection
from .initdata import generate_data

def get_cursor(
    *,  # forces keyword-only arguments, makes calls like get_cursor(as_dict=True)
    as_dict: bool = False  # optional, default False (tuple rows)
) -> tuple[Cursor, Connection]:
    """
    Return a new cursor and connection for the students database.

    Parameters
    ----------
    as_dict : bool
        If True, rows will be returned as dict-like objects instead of tuples.
        JS equivalent: row_factory = sqlite3.Row -> object mapping
    """
    db_: Connection = sqlite3.connect("src/db/students.db")
    if as_dict:
        db_.row_factory = sqlite3.Row  # JS: makes rows behave like objects instead of arrays
    return db_.cursor(), db_

cursor, db = get_cursor()

# """ is JS template literal `` equivalent
cursor.execute("""
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  dob        TEXT NOT NULL,            -- store as ISO string
  enrollment_year INTEGER NOT NULL
)
""")
db.commit()

count = cursor.execute("SELECT COUNT(*) FROM students").fetchone()[0]

students = []

if count == 0:
    students = generate_data()

    cursor.executemany(
        "INSERT INTO students (first_name,last_name,email,dob,enrollment_year) VALUES (?,?,?,?,?)",
        # [new_tuple for old_tuple in list (array)] -> array.map(oldTuple => newTuple)
        [(f, l, e, d.isoformat(), y) for (f, l, e, d, y) in students],
    )
    db.commit()
