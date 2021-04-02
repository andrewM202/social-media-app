from flask import Blueprint, render_template

from . import db

bp = Blueprint("login", __name__)

@bp.route("/")
def index():
    """ Login page for social media app """
    return render_template("index.html")
