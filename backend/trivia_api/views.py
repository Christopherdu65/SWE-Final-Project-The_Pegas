"""
Contains all route logic for authentication + data retrieval
and storage required by the user interface.
"""

from flask import Blueprint, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from sqlalchemy import desc
from .models import is_category_valid, validate_json
from .models import User, Result
from . import db, login_manager

# Global variables
blueprint = Blueprint(
    "blueprint", __name__, static_folder="./static", static_url_path=""
)


@blueprint.route("/")
def index():
    """
    Main route at /. This default route will serve the last React app build.
    """

    return blueprint.send_static_file("index.html")


@blueprint.route("/api/signup", methods=["POST"])
def signup_post():
    """
    Handles submission of user authentication data to create
    a new user if nonexistant and submission is valid. Saves
    user with hashed password to database.
    """

    data = validate_json(request.data, ["username", "password"])
    if not (data and len(data["username"]) > 0 and len(data["password"]) > 0):
        return {"success": False, "error": "invalid payload"}

    username = data["username"]
    password = data["password"]

    user = User.query.filter_by(username=username).first()

    if user:
        return {"success": False, "error": "username already taken"}

    new_user = User(
        username=username,
        password=generate_password_hash(password, method="sha256"),
        plays={},
        points={},
    )

    db.session.add(new_user)
    db.session.commit()
    return {"success": True}


@blueprint.route("/api/login", methods=["POST"])
def login_post():
    """
    Logs user in using authentication info retrieved
    from JSON body. Returns success-indicating JSON
    body for frontend use.
    """

    data = validate_json(request.data, ["username", "password"])
    if not (data and len(data["username"]) > 0 and len(data["password"]) > 0):
        return {"success": False, "error": "invalid payload"}

    username = data["username"]
    password = data["password"]

    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password, password):
        return {"success": False, "error": "invalid login"}

    login_user(user)
    return {"success": True}


@blueprint.route("/api/logout")
@login_required
def logout():
    """
    Logs user out and ends their session.
    """

    logout_user()
    return {"success": True}


@blueprint.route("/api/me")
@login_required
def user_info_api():
    """
    Fetches currently authenticated user's information. Used
    by the frontend to keep user session state across reloads,
    and will return an error if no user is logged in.
    """

    user = User.query.get(current_user.id)

    user_info = {"username": user.username, "plays": user.plays, "points": user.points}

    recent_quizzes = user.recents
    mapped_quizzes = [
        {"category": quiz.category, "score": quiz.score, "maximum": quiz.maximum}
        for quiz in recent_quizzes
    ]
    user_info["recents"] = mapped_quizzes

    return {**user_info, "success": True}


@blueprint.route("/api/quiz", methods=["POST"])
@login_required
def submit_quiz():
    """
    Submission route for completed quiz. Score is
    calculated in the frontend and sent to the backend
    along with information about the quiz (subject,
    difficulty).
    """

    data = validate_json(request.data, ["category", "score", "maximum"])
    if not (data and is_category_valid(data["category"])):
        return {"success": False, "error": "invalid payload"}

    category = data["category"]
    score = int(data["score"])
    maximum = int(data["maximum"])

    user = User.query.get(current_user.id)

    new_quiz = Result(category=category, score=score, maximum=maximum)

    while len(user.recents.all()) >= 10:
        db.session.delete(user.recents.first())
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
@login_required
def get_achievements():
    """
    Get the user's achievements. Achievements are
    provided to the user for hitting certain
    milestones by play count and points earned
    on a category-by-category basis. Returned object
    contains achievements by category in lists.
    """

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
    """
    Retrieve leaderboard data; accepts optional URL
    query parameters specifying the category to fetch
    leaderboard results for. Returns entries with
    usernames and scores.
    """

    category = request.args.get("category", default="0")
    if category != "0":
        if not is_category_valid(category):
            return {"success": False, "error": "invalid request"}

    top_users = (
        db.session.query(User)
        .filter(User.points.op("?")(category))
        .order_by(desc(User.points[category]))
        .limit(10)
    )

    leaderboard = {"results": []}
    for user in top_users:
        entry = {"username": user.username, "score": user.points[category]}
        leaderboard["results"].append(entry)

    return {**leaderboard, "success": True}


@login_manager.unauthorized_handler
def login_error():
    """
    Responds to all authentication-requiring requests
    with a default body if the user is not logged in.
    """

    return {"success": False, "error": "login required"}
