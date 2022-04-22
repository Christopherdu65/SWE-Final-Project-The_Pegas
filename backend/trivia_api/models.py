"""
Database models and helper methods used by the trivia
app API.
"""

import json
from flask_login import UserMixin
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.mutable import MutableDict
from . import db


class User(UserMixin, db.Model):  # pylint: disable=too-few-public-methods
    """
    User model for storing login data. Primary key set automatically on user
    creation.
    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    recents = db.relationship("Result", backref="user", lazy="dynamic")
    plays = db.Column(MutableDict.as_mutable(JSONB))
    points = db.Column(MutableDict.as_mutable(JSONB))


class Result(db.Model):  # pylint: disable=too-few-public-methods
    """
    Result model for storing recent quizzes taken and their statistic.
    Saved results are appended as children to the associated User record.
    """

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.Integer)
    score = db.Column(db.Integer)
    maximum = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)


def is_category_valid(category):
    """
    Checks whether the category provided is a valid category for
    the trivia app; if false, the return will cause the caller
    route to return with a failure response.
    """

    category = int(category)

    if (category < 9 or category > 32) and category != 1:
        return False
    return True


def validate_json(data, required):
    """
    Validates given JSON string as both well-formed and
    containing all the required arguments provided by
    the caller. Returns true on passing conditions.
    """

    try:
        parsed = json.loads(data)
        if not all(variable in parsed for variable in required):
            raise KeyError

        return parsed
    except ValueError:
        return False
    except KeyError:
        return False
