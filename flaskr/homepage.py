# Blueprints are essentially decentralized routes. Instead of keeping all the routes in a big jumble in app.py, it is more convenient for larger projects to separate the routes into "blueprints", which app.py will then import.
from flask import Blueprint, render_template
from flask_login import current_user
import psycopg2
from models import db, login

# create a connection to the postgreSQL database
con = psycopg2.connect(database="socialmediaapp", user="socialmediaapp_user", password="", host="localhost")
cursor = con.cursor()

bp = Blueprint("homepage", __name__)

# the @bp.route decorator configures the URL needed before the view (the function hi is called the view) is ran. This route means that the default page when you open localhost in the browser will run this
@bp.route("/")
def login():
    """ Login page for social media app """

    loggedin = False

    if current_user.is_authenticated:
        loggedin = True
        return render_template("index.html", loggedin=loggedin)

    return render_template("index.html", loggedin=loggedin)
