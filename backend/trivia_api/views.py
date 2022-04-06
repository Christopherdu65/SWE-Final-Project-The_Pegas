import os
import random
import flask
from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify
from itsdangerous import json
from werkzeug.security import generate_password_hash, check_password_hash

# from flask_login import login_user, logout_user, login_required, current_user
from flask_login import (
    login_user,
    logout_user,
    login_required,
    current_user,
    LoginManager,
)
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

# from models import db, User
from models import db, userlogin

# from . import db
load_dotenv(find_dotenv())
app = flask.Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
FLASK_ENV = os.getenv("FLASK_ENV")

login_manager = LoginManager()  # is for the flask login extension

login_manager.init_app(app)
db.init_app(app)
with app.app_context():
    db.create_all()

# Global variables
blueprint = Blueprint(
    "blueprint",
    __name__,
    static_folder="./static",
    static_url_path="/home/faithy/finalproj/SWE-Final-Project-The_Pegas/backend/trivia_api/static",
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


@blueprint.route("/signup", methods=["GET", "POST"])
def signup_post():
    if flask.request.method == "POST":
        # return jsonify({"message": "success"}, 200)
        data = flask.request.get_json("password")
        newusers = data["username"]
        #  newusers2 = str(newusers)
        newpasswords = data["password"]
        passwords = generate_password_hash(newpasswords, method="sha256")
        newuser = userlogin(username=newusers)
        newpass = userlogin(password=passwords)
        if (
            userlogin.query.filter_by(username=newuser.username).first() is None
            and userlogin.query.filter_by(password=newpass.password).first() is None
        ):
            entry = userlogin(username=newuser.username, password=newpass.password)

            db.session.add(entry)
            db.session.commit()
            return jsonify({"code": 200, "message": "failed", "message": "success"})
        else:
            return jsonify(
                {
                    "code": 400,
                    "message": "failed",
                    "message": "User Name is already Taken",
                }
            )

    #  return jsonify({"new": newusers})

    return jsonify({"code": 400, "message": "failed"})  # what am I returning here


@login_manager.user_loader
def loaduser(user_id):

    return userlogin.query.get(user_id)


@blueprint.route("/login", methods=["GET", "POST"])
def login_post():
    username = flask.request.get_json("username")
    checkusers = username["username"]
    password = username["password"]
    #     remember = bool(request.form.get("remember"))

    user = userlogin.query.filter_by(username=checkusers).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify(
            {
                "code": 400,
                "message": "failed",
                "message": "You have entered the wrong login! Try again",
            }
        )
    #         flash("Please check your login details and try again.")
    #         return redirect(url_for("blueprint.login"))

    else:
        login_user(user)
        return jsonify({"code": 200, "message": "failed", "message": "success"})


# return jsonify({"message": "tryagain"})


#  return redirect(url_for("blueprint.movies"))


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


app.register_blueprint(blueprint)

app.run(debug=True)


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


# @blueprint.route("/signup")
# def signup():
#     """
#     Signup flow entrypoint. Accessible from the navbar when user is not
#     authenticated.
#     """

#     return render_template("signup.html")


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
