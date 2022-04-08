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


@blueprint.route("/signup", methods=["POST"])
def signup_post():
    # return jsonify({"message": "success"}, 200)
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    newuser = User(username=username, password=password)

    if User.query.filter_by(username=newuser.username).first() is None:
        # entry = User(username=newuser.username, password=newpass.password)
        new_users = User(
            username=username,
            password=generate_password_hash(password, method="sha256"),
        )

        db.session.add(new_users)
        db.session.commit()
        return {"success": True}
    else:
        return {"success": False, "error": "username already taken"}


def loaduser(user_id):
    return User.query.get(user_id)


@blueprint.route("/login", methods=["POST"])
def login_post():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    #     remember = bool(request.form.get("remember"))
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return {"success": False, "error": "invalid login"}
    login_user(user)
    return {"success": True}


@blueprint.route("/logout", methods=["GET", "POST"])
@login_required
def logout():
    logout_user()
    return {"success": True}


@blueprint.route("/api/quiz", methods=["POST"])
def submit_quiz():
    data = request.get_json()

    if not is_category_valid(data["category"]):
        return {"success": False, "error": "invalid request"}

    category = data["category"]
    score = data["score"]
    maximum = data["maximum"]

    user = User.query.get(current_user.id)

    new_quiz = Result(category=category, score=score, maximum=maximum)

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

    return {"success": True}


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


@blueprint.route("/api/leaderboard")
def get_leaderboard():
    category = request.args.get("category", default="0")
    if category != "0":
        if not is_category_valid(category):
            return {"success": False, "error": "invalid request"}

    top_users = db.session.query(User).order_by(desc(User.points[category])).limit(10)

    leaderboard = {"results": []}
    for user in top_users:
        entry = {"username": user.username, "score": User.points[category]}
        leaderboard["results"].append(entry)

    return {**leaderboard, "success": True}


@login_manager.unauthorized_handler
def login_error():
    return {"status": "success", "error": "login required"}
