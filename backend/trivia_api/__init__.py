"""
Initialization file for the API utilized by the
trivia app to store/fetch data from the database
and authenticate users
"""

import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

db = SQLAlchemy()
login_manager = LoginManager()

# Cyclic import warning disabled as it is implicit that no functionality
# that is not yet initialized will be used

# pylint: disable=cyclic-import
def create_app():
    """
    Basic Flask application setup for trivia API package.
    """

    # Create app and setup configuration for database access
    app = Flask(__name__, static_folder=None, static_url_path=None)

    # Patch URL if necessary when using Heroku hosted instances
    db_url = os.getenv("DATABASE_URL")
    if "postgresql" not in db_url:
        db_url = "postgresql" + db_url[8:]

    # Setup app configuration for database and authentication
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

    # Activate database and initialize all models if necessary

    from . import models  # pylint: disable=import-outside-toplevel

    db.init_app(app)
    db.create_all(app=app)

    # Setup authentication logic
    login_manager.login_view = "blueprint.login"
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return models.User.query.get(int(user_id))

    # Setup blueprint containing routing logic
    from .views import blueprint  # pylint: disable=import-outside-toplevel

    app.register_blueprint(blueprint)

    return app
