"""User validation"""
import re  # regex library, like JS RegExp
from datetime import datetime  # like JS Date
from typing import Dict  # type hint, like TS Record<string, string>

# re: python regexp; compile: saves expression for reuse;
# r: raw string, tells python to ignore \ escape slashes ""
EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")

def validate_user(data: Dict) -> Dict[str, str]:
    """Concise user validation, returns { field: error }"""
    errors: Dict[str, str] = {}

    # --- helper for first_name / last_name ---
    def validate_name(field):
        # get value from data, fallback to empty string (2nd arg) if missing or not string
        value = data.get(field, "")
        # Python ternary = A if condition else B (JS: condition ? A : B)
        # const name = (typeof value === "string") ? value.trim() : "";
        name = value.strip() if isinstance(value, str) else ""
        formatted = field.replace('_', ' ')
        if not name:  # required check
            errors[field] = f"{formatted} is required" # f"{}" == `${}`
        elif len(name) < 2:  # min length 2
            errors[field] = f"{formatted} be at least 2 characters"
        # re.match(pattern, value) -> function call, passes pattern + string (pattern.test(value))
        elif not re.match(r"^[a-zA-Z\s]+$", name):  # only letters + spaces
            errors[field] = "Letters only"

    # --- validate first_name and last_name ---
    validate_name("first_name")
    validate_name("last_name")

    # --- email validation --- (data.get('email') || "").toString().trim()
    email = str(data.get("email", "")).strip()  # convert to str, fallback to empty string
    if not email:  # required check
        errors["email"] = "Email is required"
    # EMAIL_REGEX.match(email) -> compiled regex object has a .match() method,
    # passes just the string, regex is already precompiled.
    elif not EMAIL_REGEX.match(email):  # regex match like JS pattern.test(email)
        errors["email"] = "Invalid email"

    # --- dob (date of birth) validation ---
    dob_raw = str(data.get("dob", "")).strip()  # fallback to empty string
    if not dob_raw:  # required check
        errors["dob"] = "Date of birth is required"
    else:
        #  try {
        #   new Date(dob_raw); // or parse
        # } catch(err) {
        #   errors["dob"] = "Invalid date format";
        # }
        try:
            # like new Date(dob) in JS, strict YYYY-MM-DD format
            datetime.strptime(dob_raw, "%Y-%m-%d")
        except ValueError:
            errors["dob"] = "Invalid date format (must be YYYY-MM-DD)"

    return errors  # final object, only failing fields appear
