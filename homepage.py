# Blueprints are essentially decentralized routes. Instead of keeping all the routes in a big jumble in app.py, it is more convenient for larger projects to separate the routes into "blueprints", which app.py will then import.
from flask import Blueprint, render_template
from flask_login import current_user
import psycopg2
from models import db, login

# create a connection to the postgreSQL database

bp = Blueprint("homepage", __name__)

# the @bp.route decorator configures the URL needed before the view (the function hi is called the view) is ran. This route means that the default page when you open localhost in the browser will run this
@bp.route("/")
def login():
    """ Login page for social media app """


    if current_user.is_authenticated:
        return render_template("index.html")

    return render_template("index.html")

