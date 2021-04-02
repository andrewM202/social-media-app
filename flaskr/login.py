# Blueprints are essentially decentralized routes. Instead of keeping all the routes in a big jumble in app.py, it is more convenient for larger projects to separate the routes into "blueprints", which app.py will then import.

from flask import Blueprint, render_template

from . import db

bp = Blueprint("login", __name__)

@bp.route("/")
def index():
    """ Login page for social media app """
    return render_template("index.html")
