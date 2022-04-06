import os
import flask
from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_login import (
    login_user,
    logout_user,
    login_required,
    current_user,
    LoginManager,
)
from login import loginforms
from dotenv import load_dotenv, find_dotenv
from models import db, User

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

# db.create_all()

# from login import loginforms


blueprint = Blueprint(
    "blueprint",
    __name__,
    static_folder="./static",
    static_url_path="/home/faithy/finalproj/SWE-Final-Project-The_Pegas/backend/trivia_api/static",
)


@app.route("/")
def index():
    """
    # Main route at /. This default route will serve the last React app build."""

    return flask.render_template("index.html")


@app.route("/signup")
def signup():
    #
    #     Signup flow entrypoint. Accessible from the navbar when user is not
    #     authenticated.
    #

    return flask.render_template("signup.html")


@app.route("/signup", methods=["POST", "GET"])
def signup_post():
    if flask.request.method == "POST":
        data = flask.request.form
        passwords = flask.request.form
        newuser = User(username=data["username"])
        newpass = passwords["password"]
        newpass = generate_password_hash(passwords, method="sha256")

        if (
            User.query.filter_by(username=newuser.username).first() is None
            and User.query.filter_by(password=newpass.password) is None
        ):  # if username and password is not in database
            newentry = User(username=newuser.username, password=newpass.password)
            db.session.add(newentry)
            db.session.commit()
            return flask.redirect("/")
        elif User.query.filter_by(username=newuser.username).first() is not None:
            flash("User Name is already Taken")

    return flask.render_template("signup.html")


# @app.route("/login")
# def login():

#  return render_template("login.html")


@login_manager.user_loader
def loaduser(user_id):

    return User.query.get(user_id)


@app.route("/login", methods=["POST", "GET"])
def login_post():
    form = loginforms()
    if form.validate_on_submit():
        data = flask.request.form
        returning_user = User(username=data["users"])

        usersid = User.query.filter_by(
            username=returning_user.username
        ).first()  # the first username in database
        if usersid is not None:
            login_user(usersid, remember=True)
            return flask.redirect("/")  # idk the route for the quizzes yet
        else:
            flask.flash("You have entered the wrong login! Try again")
    return flask.render_template(
        "login.html", form=form
    )  # what do u want me to return here


@app.route("/logout", methods=["GET", "POST"])
@login_required
def logout():
    logout_user()
    return flask.redirect("/login")


app.run(debug=True)
