from flask import Blueprint, render_template, request, redirect

from models import db, userInformation
import psycopg2

# create a connection to the postgreSQL database
con = psycopg2.connect(database="socialmediaapp", user="socialmediaapp_user", password="", host="localhost")
cursor = con.cursor()

bp = Blueprint("register", __name__)

@bp.route("/register", methods=['POST', 'GET'])
def register():
    """ Renders registration page for social media app """
    return render_template("register.html")

@bp.route("/send-username-password", methods=['POST', 'GET'])
def register_account():
    """ Register form functionality """
    if request.method == "POST":
        username = request.form['user-name']
        password = request.form['user-password']

        new_login = userInformation(username=username, password=password)
        db.session.add(new_login)
        db.session.commit()
    
        return redirect('register')
