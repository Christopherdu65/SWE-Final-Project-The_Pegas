import unittest
import requests
from unittest import mock
from flask_login import current_user
from flask import request
from flask import request
from models import validate_json, User
import unittest.mock
from unittest.mock import patch
import __init__
import json
from views import blueprint
from views import signup_post


class TestJSON(unittest.TestCase):
    def test_json_success(self):
        d = '{"username": "faith", "password": "faith"}'
        expected = True
        output = validate_json(d)
        self.assertEquals(output, expected)

    def test_user_registeration(self):
        with blueprint.signup_post():
            response = signup_post().post(
                "/signup",
                jsons={"username": "faith1", "password": "secret"},
                follow_redirects=True,
            )

            self.assertIn(response.jsons)
            self.assertTrue(current_user.name == "faith1")
            self.assertTrue(current_user.is_active())
            user = User.query.filter_by(username="faith1").first()
            self.assertTrue(user, response)
        #  self.assertTrue(str(user) == '<name - Michael>')


if __name__ == "__main__":
    unittest.main()
