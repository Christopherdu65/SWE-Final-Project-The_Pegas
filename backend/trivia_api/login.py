from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired


class loginforms(FlaskForm):
    """Creates Login Forms."""

    users = StringField("Username: ", validators=[DataRequired()])
    passwords = PasswordField("Password: ", validators=[DataRequired()])
