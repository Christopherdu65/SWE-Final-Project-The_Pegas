from ..models import validate_json
import json


def test_valid_json():
    raw_data = '{"username": "username", "password": "password"}'
    assert validate_json(raw_data, ["username", "password"]) == json.loads(raw_data)


def test_invalid_json_missing_key():
    raw_data = '{"username": "username"}'
    assert validate_json(raw_data, ["username", "password"]) == False


def test_invalid_json_malformed():
    raw_data = "abcdef"
    assert validate_json(raw_data, ["key"]) == False
