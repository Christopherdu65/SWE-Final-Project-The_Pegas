"""conftest.py"""

import pytest
from unittest.mock import patch
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
import os
from ..models import User, Result
from .. import create_app


@pytest.fixture
def mock_user():
    mock_user = User(
        id=1,
        username="username",
        password=generate_password_hash("password"),
        plays={"0": 1, "1": 1},
        points={"0": 15, "1": 15},
    )

    return mock_user


@pytest.fixture
def mock_recent_results(mocker):
    mock_result = Result(category=1, score=15, maximum=30, user_id=1)

    mock = mocker.patch(
        "trivia_api.models.User.recents",
        new_callable=mocker.PropertyMock,
        return_value=[mock_result],
    )

    return mock


@pytest.fixture
def mock_get_sqlalchemy(mocker):
    mock = mocker.patch(
        "flask_sqlalchemy._QueryProperty.__get__"
    ).return_value = mocker.Mock()

    return mock


@pytest.fixture
def mock_flask_app():
    with patch.dict(
        os.environ, {"DATABASE_URL": "postgresql://", "SECRET_KEY": "secret"}
    ):
        mock_app = create_app(test=True)

    return mock_app


# @pytest.fixture
# def mock_result_property(mocker):
#     mock = mocker.patch(
#         "trivia_api.models.Result.",
#         new_callable=mocker.PropertyMock,
#         return_value="new_property_value"
#     )
#     return mock
