"""Main App Server"""
from flask import Flask
from db.initdb import students

# Create Flask app
app = Flask(__name__)

def clear():
    """ANSI escape code: Clears console"""
    print("\033c", end="")

# Basic route
@app.route("/")
def hello():
    """test function"""
    clear()
    print("Server received a request to /")  # This logs to terminal
    return students


@app.route("/test")
def test():
    """test function"""
    clear()
    print("Server received a request to /test")  # This logs to terminal
    return {"message": "Test endpoint working", "status": "success"}


if __name__ == "__main__":
    # clear()
    print("Server will be available at: http://localhost:5000")
    app.run(
        debug=True,  # auto reloads on file change
        host="0.0.0.0",  # accessible on other devices on the network
        port=5000,  # localhost
    )
