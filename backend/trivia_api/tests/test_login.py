import pytest
from flask import request
from ..models import validate_json
from .. import create_app
import json


@pytest.fixture
def app():
    app = create_app()
    return app


def test_valid_json():
    raw_data = '{"username": "faith", "password": "faith"}'
    assert validate_json(raw_data, ["username", "password"]) == json.loads(raw_data)


def test_invalid_json_missing_key():
    raw_data = '{"username": "faith"}'
    assert validate_json(raw_data, ["username", "password"]) == False


def test_invalid_json_malformed():
    raw_data = "abcdef"
    assert validate_json(raw_data, ["key"]) == False
