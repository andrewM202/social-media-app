from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, LoginManager
import flask_security
from sqlalchemy import create_engine
# import python libraries for strings and random string generator
import string
import random
import datetime
from sqlalchemy.sql import func


# create our SQLAlchemy db object that will be used to interact with our databa    se
db = SQLAlchemy()
login = LoginManager()

# define variables to use imported module methods
letters = string.ascii_letters
digits = string.digits

# function to return randomly generated string
def salt():
    return ''.join(random.choice(letters + digits) for i in range(20))

# Below two tables are created, userinfo and userposts. These are the same tables that will show up in postgres once migrations are completed
class userInformation(db.Model, UserMixin):
    __tablename__ = 'userinfo'

    id = db.Column(db.BigInteger, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique = True)
    password_salt_hash = db.Column(db.String(500), nullable=False)
    salt_key = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique = True)

    def __init__(self, username, email):
        self.salt_key = salt()
        self.username = username
        self.email = email

    def set_password(self, password):
        salted_password = password + self.salt_key
        self.password_salt_hash = generate_password_hash(salted_password)

    def check_password(self, password):
        password = password + self.salt_key
        return check_password_hash(self.password_salt_hash, password)

    def __repr__(self):
        return f"{self.username}"


@login.user_loader
def load_user(id):
    return userInformation.query.get(int(id))


class userPostings(db.Model):
    __tablename__ = 'userposts'

    # each post will have an id so we can uniquely identify each post
    postid = db.Column(db.BigInteger, primary_key=True)
    # get userid so we can connect each post to the user
    username = db.Column(db.String(20), nullable=False)
    # store the actual post itself
    posts = db.Column(db.String(5000))
    # get the post's date so we can know when the post was made
    postdate = db.Column(db.DateTime(timezone=True), server_default=func.now())
    # connect the session id to the user id
    sessionid = db.Column(db.String(300))
    # what room message in
    

    def __init__(self, posts, sessionid, username):
        self.username = username
        self.posts = posts
        self.sessionid = sessionid

    def __repr__(self):
        return f"{self.posts}:{self.postdate}"

