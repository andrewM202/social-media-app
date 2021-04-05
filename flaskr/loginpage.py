from flask import Blueprint, request, Flask, render_template, redirect
from flask_login import current_user, login_user, logout_user

from models import db, userInformation, login

bp = Blueprint("loginpage", __name__)

@bp.route("/login", methods = ['POST', 'GET'])
def register():
    """ Login route for social media app """
    if current_user.is_authenticated:
        loggedin = "You are already logged in!"
        return render_template("login.html", loggedin=loggedin)

    if request.method == "POST":
        email = request.form['user-email']
        user = userInformation.query.filter_by(email = email).first()
        if user is not None and user.check_password(request.form['user-password']):
            login_user(user)
            return 'You have logged in!'

    return render_template("login.html")


@bp.route("/logout", methods = ['POST', 'GET'])
def logout():
    """ Route for logging out the user """
    logout_user()
    return redirect("/")
