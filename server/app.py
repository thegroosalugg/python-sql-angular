from flask import Flask

# Create Flask app
app = Flask(__name__)

def clear(): print("\033c", end="")  # ANSI escape code: Clears console

# Basic route
@app.route("/")
def hello():
    clear()
    print("Server received a request to /")  # This logs to terminal
    return "Hello from Python server!"


@app.route("/test")
def test():
    clear()
    print("Server received a request to /test")  # This logs to terminal
    return {"message": "Test endpoint working", "status": "success"}


if __name__ == "__main__":
    clear()
    print("Server will be available at: http://localhost:5000")
    app.run(
        debug=True,  # auto reloads on file change
        host="0.0.0.0",  # accessible on other devices on the network
        port=5000,  # localhost
    )
