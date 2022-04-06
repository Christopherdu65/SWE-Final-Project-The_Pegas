import random
from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from .models import get_trivia_api, is_request_valid
from .models import User, Result
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


@blueprint.route("/users", defaults={"user_id": None})
@blueprint.route("/users/<user_id>")
def users(user_id):
    """
    Dummy user data endpoint.
    """

    if user_id:
        result = list(filter(lambda x: x["id"] == int(user_id), dummy_users["users"]))

        if len(result) > 0:
            return result[0]
        return {}

    return dummy_users


@blueprint.route("/api/getquiz", methods=["POST"])
def get_quiz():
    data = request.get_json()

    if not is_request_valid(data):
        return {"error": "invalid request"}

    category = data["category"]
    difficulty = data["difficulty"]

    questions = get_trivia_api(
        {
            "category": category,
            "difficulty": difficulty,
            "amount": 10,
        }
    )
    return {**questions, "success": True}


@blueprint.route("/api/submitquiz", methods=["POST"])
def submit_quiz():
    data = request.get_json()

    if not is_request_valid(data):
        return {"status": False, "error": "invalid request"}

    correct = data["correct"]
    category = data["category"]
    difficulty = data["difficulty"]
    score = 0

    if difficulty == "easy":
        score = correct * 1
    elif difficulty == "medium":
        score = correct * 3
    elif difficulty == "hard":
        score = correct * 5

    user = User.query.get(current_user.id)

    new_quiz = Result(category=category, difficulty=difficulty, score=score)

    while len(len(user.recents) >= 10):
        user.recents.delete(user.recents[0])
    user.recents.append(new_quiz)

    if "0" not in user.plays:
        user.plays["0"] = 1
    else:
        user.plays["0"] += 1
    if str(category) not in user.plays:
        user.plays[str(category)] = 1
    else:
        user.plays[str(category)] += 1

    if "0" not in user.points:
        user.points["0"] = score
    else:
        user.points["0"] += score
    if str(category) not in user.points and score > 0:
        user.points[str(category)] = score
    else:
        user.points[str(category)] += score

    db.session.add(user)
    db.session.commit()

    return {"status": True}


@blueprint.route("/api/achievements")
def get_achievements():
    achievements = {}

    user = User.query.get(current_user.id)

    plays = user.plays
    points = user.points

    for key, value in plays.items():
        targets = [1, 5, 10, 50, 100]
        achievements[key] = {"plays": [x for x in targets if value >= x]}

    for key, value in points.items():
        targets = [10, 25, 50, 100, 500]
        achievements[key] = {
            **achievements[key],
            "points": [x for x in targets if value >= x],
        }

    return {**achievements, "success": True}


@login_manager.unauthorized_handler
def login_error():
    return {"status": "success", "error": "login required"}


# get leaderboard/per category

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
