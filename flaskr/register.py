from flask import Blueprint, render_template

from models import db

bp = Blueprint("register", __name__)

@bp.route("/register")
def register():
    """ Registration route for social media app """
    return render_template("register.html")
