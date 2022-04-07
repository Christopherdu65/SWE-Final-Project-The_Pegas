from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from .models import is_category_valid
from .models import User, Result
from sqlalchemy import desc
from . import db, login_manager

# Global variables
blueprint = Blueprint(
    "blueprint", __name__, static_folder="./static", static_url_path=""
)

dummy_users = {
    "users": [
        {"id": 1, "username": "Pegasus65", "password": "Pegasus65", "totalPoints": 101},
        {"id": 2, "username": "Rushi_Daddy", "password": "Pleborus", "totalPoints": 88},
        {
            "id": 3,
            "username": "HarinLameman",
            "password": "Pagorus77",
            "totalPoints": 55,
        },
        {"id": 4, "username": "loupWeep", "password": "Platorus", "totalPoints": 100},
        {"id": 5, "username": "flesky65", "password": "abcd1234", "totalPoints": 36},
        {"id": 6, "username": "pluto-clep", "password": "Lmr910", "totalPoints": 138},
        {"id": 7, "username": "dogDoux", "password": "ddd123", "totalPoints": 120},
        {"id": 8, "username": "lukeKal", "password": "pigeon1", "totalPoints": 99},
    ]
}


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
    if request.method == "POST":
        # return jsonify({"message": "success"}, 200)
        data = request.get_json("password")
        newusers = data["username"]
        #  newusers2 = str(newusers)
        newpasswords = data["password"]
        passwords = generate_password_hash(newpasswords, method="sha256")
        newuser = User(username=newusers)
        newpass = User(password=passwords)
        if (
            User.query.filter_by(username=newuser.username).first() is None
            and User.query.filter_by(password=newpass.password).first() is None
        ):
            entry = User(username=newuser.username, password=newpass.password)
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
    return User.query.get(user_id)


@blueprint.route("/login", methods=["GET", "POST"])
def login_post():
    username = request.get_json("username")
    checkusers = username["username"]
    password = username["password"]
    #     remember = bool(request.form.get("remember"))
    user = User.query.filter_by(username=checkusers).first()
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


@blueprint.route("/logout", methods=["GET", "POST"])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Success"})
