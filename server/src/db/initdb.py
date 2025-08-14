"""Initialize the students database with random student data."""
import sqlite3
from .initdata import generate_data

db = sqlite3.connect("src/db/students.db")
cursor = db.cursor()

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
