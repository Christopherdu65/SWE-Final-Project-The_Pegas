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
    score = db.Column(db.Integer)
    maximum = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

def is_category_valid(category):
    category = int(category)

    if (category < 9 or category > 32) and category != 1:
        return False
    return True
