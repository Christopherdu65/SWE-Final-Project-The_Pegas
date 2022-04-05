import os
import flask
from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user


# from models import User
app = flask.Flask(__name__)
bp = flask.Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
)


# Global variables
blueprint = Blueprint(
    "blueprint", __name__, static_folder="./static", static_url_path=""
)


@blueprint.before_app_first_request
def setup_app():
    pass


@blueprint.route("/")
def index():
    """
    Main route at /. This default route will serve the last React app build.
    """

    return blueprint.send_static_file("index.html")


# @blueprint.route("/login")
# def login():
#     """
#     Login flow entrypoint. All attempts to access authentication-gated pages
#     will redirect here.
#     """

#     return render_template("login.html")


# @blueprint.route("/login", methods=["POST"])
# def login_post():
#     """
#     Login endpoint for authentication. Invalid login data will result in a
#     message being flashed to the user. On authentication success, the user
#     will be redirected to the randomizer page.
#     """

#     username = request.form.get("username")
#     password = request.form.get("password")
#     remember = bool(request.form.get("remember"))

#     user = User.query.filter_by(username=username).first()

#     if not user or not check_password_hash(user.password, password):
#         flash("Please check your login details and try again.")
#         return redirect(url_for("blueprint.login"))

#     login_user(user, remember=remember)
#     return redirect(url_for("blueprint.movies"))


@blueprint.route("/signup")
def signup():
    #     """
    #     Signup flow entrypoint. Accessible from the navbar when user is not
    #     authenticated.
    #     """

    return render_template("signup.html")


# @blueprint.route("/signup", methods=["POST"])
# def signup_post():
#     """
#     Signup endpoint. Ensures duplication of usernames is not possible,
#     and hashes passwords for secure storage of user data.
#     """

#     username = request.form.get("username")
#     password = request.form.get("password")

#     user = User.query.filter_by(username=username).first()

#     if user:
#         flash("Username already exists")
#         return redirect(url_for("blueprint.signup"))

#     new_user = User(
#         username=username,
#         password=generate_password_hash(password, method="sha256"),
#     )

#     db.session.add(new_user)
#     db.session.commit()

#     return redirect(url_for("blueprint.login"))


# @blueprint.route("/logout")
# @login_required
# def logout():
#     """
#     Logout endpoint. Deactivates user session and redirects user to
#     login page.
#     """

#     logout_user()
#     return redirect(url_for("blueprint.login"))


app.register_blueprint(bp)
app.run(debug=True)
