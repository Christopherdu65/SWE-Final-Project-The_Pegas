import requests
from flask_login import UserMixin
from . import db
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.mutable import MutableDict


class User(UserMixin, db.Model):  # pylint: disable=too-few-public-methods
    """
    User model for storing login data. Primary key set automatically on user
    creation.
    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    recents = db.relationship("Result", backref="user", lazy=True)
    plays = db.Column(MutableDict.as_mutable(JSONB))
    points = db.Column(MutableDict.as_mutable(JSONB))


class Result(db.Model):  # pylint: disable=too-few-public-methods
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.Integer)
    difficulty = db.Column(db.String(100))
    score = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)


def get_url(url, params=None):
    """
    Internal method to make GET requests. Should only return a dictionary by calling .json() on
    the response object, which should fail in the case that proper JSON is not provided by the
    request target.
    """

    try:
        req = requests.get(url, params=params)
        return req.json()
    except:
        print(
            f"WARNING: Network error occurred when making request to {url} or response was not JSON."
        )
        raise


def get_trivia_api(params, endpoint="/api.php"):
    """
    Used to make Open Trivia API requests. No API key is required. Method may fail if
    request somehow ends up malformed or a network error occurs.
    """

    # Common format for Open Trivia Database API requests
    base_url = "https://opentdb.com"

    req = get_url(base_url + endpoint, params=params)

    # Error handling/logging
    if "response_code" in req and req["response_code"] == 0:
        raise Exception(
            f"Open Trivia API call failed. Provided response code: {req['response_code']}"
        )

    return req


def is_request_valid(json):
    if "category" in json:
        if json["category"] < 9 or json["category"] > 32:
            return False

    if "difficulty" in json:
        if not (
            json["difficulty"] == "easy"
            or json["difficulty"] == "medium"
            or json["difficulty"] == "hard"
        ):
            return False

    if "correct" in json:
        if json["correct"] < 0 or json["correct"] > 10:
            return False

    return True
