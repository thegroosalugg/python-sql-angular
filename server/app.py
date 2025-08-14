"""Main App Server"""
from src import create_app

if __name__ == "__main__":
    print("http://localhost:5000")
    app = create_app()
    app.run(
        debug=True,  # auto reloads on file change
        host="0.0.0.0",  # accessible on other devices on the network
        port=5000,  # localhost
    )
