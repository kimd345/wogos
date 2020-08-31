from flask import Blueprint, redirect, render_template, url_for
from flask_login import current_user, login_user, logout_user

from starter_app.models import User

bp = Blueprint("session", __name__, url_prefix="/session")


# @bp.route("/", methods=["GET", "POST"])
# def login():
