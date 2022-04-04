"""
Application entry point.
"""

from trivia_api import create_app
from dotenv import load_dotenv

load_dotenv()

app = create_app()

if __name__ == "__main__":
    app.run(port=5000)
