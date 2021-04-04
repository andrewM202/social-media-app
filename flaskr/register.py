from flask import Blueprint, render_template, request, redirect
from models import db, userInformation
from flask_sqlalchemy import SQLAlchemy
import psycopg2
from flask_login import current_user

# create a connection to the postgreSQL database
con = psycopg2.connect(database="socialmediaapp", user="socialmediaapp_user", password="", host="localhost")
cursor = con.cursor()

bp = Blueprint("register", __name__)

@bp.route("/register", methods=['POST', 'GET'])
def register():
    """ Renders registration page for social media app """

    return render_template("register.html")

@bp.route("/send-user-info", methods=['POST', 'GET'])
def register_account():
    """ Register form functionality """

    if current_user.is_authenticated:
        return 'It worked! you are authenticated'

    if request.method == "POST":
        username = request.form['user-name']
        password = request.form['user-password']
        email = request.form['user-email']

        emailalready = userInformation.query.filter_by(email=email).first()
        usernamealready = userInformation.query.filter_by(username=username).first()

        if emailalready:
            error = "Sorry, that email is already present."
            return render_template("register.html", error=error)
        elif usernamealready:
            error = "Sorry, that username is already present."
            return render_template("register.html", error=error)

        user = userInformation(email=email, username=username)
        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        success = "Registration successful!"
        return render_template("register.html", success=success)




