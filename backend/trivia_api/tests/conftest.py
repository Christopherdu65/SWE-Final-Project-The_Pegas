"""
Configuration of mock fixtures.
"""

import os
from unittest.mock import patch
import pytest
from werkzeug.security import generate_password_hash
from ..models import User, Result
from .. import create_app


@pytest.fixture
def mock_user():
    """
    Mocked user object fixture.
    """

    mock_user_object = User(
        id=1,
        username="username",
        password=generate_password_hash("password"),
        plays={"0": 1, "1": 1},
        points={"0": 15, "1": 15},
    )

    return mock_user_object


@pytest.fixture
def mock_recent_results(mocker):
    """
    Patches the .recents property on the
    User object to prevent the fetch/set
    from calling actual database methods
    """

    mock_result = Result(category=1, score=15, maximum=30, user_id=1)

    mock = mocker.patch(
        "trivia_api.models.User.recents",
        new_callable=mocker.PropertyMock,
        return_value=[mock_result],
    )

    return mock


@pytest.fixture
def mock_get_sqlalchemy(mocker):
    """
    Patch the SQLAlchemy query object to remove
    necessity for a live database and allow mocking.
    """

    mock = mocker.patch(
        "flask_sqlalchemy._QueryProperty.__get__"
    ).return_value = mocker.Mock()

    return mock


@pytest.fixture
def mock_flask_app():
    """
    Create a test Flask mock environment with
    dummy parameters.
    """

    with patch.dict(
        os.environ, {"DATABASE_URL": "postgresql://", "SECRET_KEY": "secret"}
    ):
        mock_app = create_app(test=True)

    return mock_app
