"""Generate dummy student data"""
import random
from datetime import date, timedelta

def generate_data():
    """Generate dummy data"""
    first_names = [
        "Lukas", "Anna", "Jonas", "Lea", "Felix", "Emma", "Max", "Sophie",
        "Noah", "Mia", "Liam", "Olivia", "Ethan", "Isabella", "Lucas", "Amelia",
        "Sophia", "Finn", "Hannah", "Leo"
    ]

    last_names = [
        "Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker",
        "Smith", "Johnson", "Brown", "Williams", "Jones", "Garcia", "Martinez", "Lee",
        "Kim", "Patel", "Nguyen", "Hernandez"
    ]

    today = date.today()
    students = []

    def get_enrollment_year(birth_date: date) -> int:
        """Generate random enrollment year based on date of birth."""
        age = (today - birth_date).days // 365   # division with Math.Floor()
        max_years = max(0, age - 6)  # start at ~6 years old
        years_since_enrollment = random.randint(0, max_years)
        return today.year - years_since_enrollment

    # random birthday between 10 and 18 years ago
    for last in last_names:
        first = random.choice(first_names)
        email = f"{first.lower()}.{last.lower()}@school.edu"
        dob = today - timedelta(days=random.randint(365 * 10, 365 * 18))
        enrollment_year = get_enrollment_year(dob)
        students.append((first, last, email, dob, enrollment_year))

    return students
