"""
Unmocked tests for testing of server
utility methods for processed requests.
"""

import json
from ..models import validate_json


def test_valid_json():
    """
    Test that valid JSON passes utility check.
    """

    raw_data = '{"username": "username", "password": "password"}'
    assert validate_json(raw_data, ["username", "password"]) == json.loads(raw_data)


def test_invalid_json_missing_key():
    """
    Test that valid JSON missing a required key fails utility check.
    """

    raw_data = '{"username": "username"}'
    assert validate_json(raw_data, ["username", "password"]) is False


def test_invalid_json_malformed():
    """
    Test that malformed JSON fails utility check.
    """

    raw_data = "abcdef"
    assert validate_json(raw_data, ["key"]) is False
