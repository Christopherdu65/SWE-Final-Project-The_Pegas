import unittest
import requests
from unittest import mock
from models import validateJSON
import unittest.mock
from unittest.mock import patch
import __init__
import json


class TestJSON(unittest.TestCase):
    def test_json_success(self):
        d = '{"username": "faith", "password": "faith"}'
        expected = True
        output = validateJSON(d)
        self.assertEquals(output, expected)


if __name__ == "__main__":
    unittest.main()
