"""
Mocked tests for server-based testing of
authentication and user state.
"""

import json


def test_login(mock_user, mock_get_sqlalchemy, mock_flask_app):
    """
    Use mocked user + Flask app to verify the login process.
    """

    mock_get_sqlalchemy.filter_by.return_value.first.return_value = mock_user

    with mock_flask_app.test_client() as client:
        response = client.post(
            "/api/login",
            data=json.dumps({"username": "username", "password": "password"}),
        )

    assert response.json["success"]


def test_login_incorrect_password(mock_user, mock_get_sqlalchemy, mock_flask_app):
    """
    Attempt the login test with incorrect credentials to test security.
    """

    mock_get_sqlalchemy.filter_by.return_value.first.return_value = mock_user

    with mock_flask_app.test_client() as client:
        response = client.post(
            "/api/login",
            data=json.dumps({"username": "username", "password": "invalid"}),
        )

    assert not response.json["success"]


# pylint: disable=unused-argument
def test_user_info(mock_user, mock_get_sqlalchemy, mock_flask_app, mock_recent_results):
    """
    Test the user-state route to ensure well-formed response
    to be used by frontend.
    """
    mock_get_sqlalchemy.filter_by.return_value.first.return_value = mock_user
    mock_get_sqlalchemy.get.return_value = mock_user

    with mock_flask_app.test_client() as client:
        client.post(
            "/api/login",
            data=json.dumps({"username": "username", "password": "password"}),
        )
        response = client.get("/api/me")

    response = response.json

    assert response["success"]
    assert response["username"] == mock_user.username
    assert len(response["recents"]) > 0
    for result in response["recents"]:
        category = str(result["category"])
        assert category in response["plays"] and category in response["points"]
