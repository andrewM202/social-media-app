from flask import Blueprint, render_template

from models import db

bp = Blueprint("login", __name__)

@bp.route("/login")
def register():
    """ Registration route for social media app """
    return render_template("login.html")

