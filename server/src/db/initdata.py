"""Generate dummy user data"""
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
        "Mueller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker",
        "Smith", "Johnson", "Brown", "Williams", "Jones", "Garcia", "Martinez", "Lee",
        "Kim", "Patel", "Nguyen", "Hernandez"
    ]

    today = date.today()
    users = []

    for last in last_names:
        first = random.choice(first_names)
        email = f"{first.lower()}.{last.lower()}@email.com"
        # random birth day: clamped
        dob = today - timedelta(days=random.randint(365 * 18, 365 * 99))
        created_at = today - timedelta(days=random.randint(0, 365 * 15))
        users.append((first, last, email, dob, created_at))

    return users
